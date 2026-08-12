import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { act, fireEvent } from "@testing-library/react";
import { render, screen } from "@/test/test-utils";
import QuizCuriosidades from "@/components/curiosidades/QuizCuriosidades";

// Sem embaralhar de verdade, a ordem das perguntas e das opções fica
// determinística — o teste vira sobre a mecânica do quiz, não sobre sorte.
vi.mock("@/lib/curiosidades/utils", () => ({
  embaralhar: <T,>(itens: T[]) => itens,
}));

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("QuizCuriosidades", () => {
  it("mostra a pergunta na hora, mas as opções só depois de 3s", () => {
    render(<QuizCuriosidades />);

    expect(
      screen.getByText("As picadas de cobra no Brasil são divididas em quantos tipos, dependendo da espécie?")
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "4" })).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
  });

  it("acertar mostra feedback verde com a explicação e a fonte", () => {
    render(<QuizCuriosidades />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    fireEvent.click(screen.getByRole("button", { name: "4" }));

    expect(screen.getByText("Acertou! 🎉")).toBeInTheDocument();
    expect(screen.getByText(/são 4 grupos/i)).toBeInTheDocument();
    expect(screen.getByText(/Guia de Animais Peçonhentos do Brasil/)).toBeInTheDocument();
  });

  it("errar mostra a opção escolhida em vermelho e destaca a certa", () => {
    render(<QuizCuriosidades />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(screen.getByText("Não foi dessa vez.")).toBeInTheDocument();
  });

  it("esgotar os 20s sem clicar conta como errado, sem travar", () => {
    render(<QuizCuriosidades />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    act(() => {
      vi.advanceTimersByTime(20000);
    });

    expect(screen.getByText("Tempo esgotado!")).toBeInTheDocument();
  });

  it("resolve as 10 perguntas e mostra a pontuação final com link de volta", () => {
    render(<QuizCuriosidades />);

    for (let i = 0; i < 10; i++) {
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      // deixa o tempo esgotar em todas — sempre errado, pontuação final = 0
      act(() => {
        vi.advanceTimersByTime(20000);
      });
      const botao = screen.getByRole("button", {
        name: i === 9 ? "Ver resultado final" : "Próxima pergunta →",
      });
      fireEvent.click(botao);
    }

    expect(screen.getByText("Você acertou 0 de 10")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Voltar pras curiosidades" });
    expect(link).toHaveAttribute("href", "/curiosidades");
  });
});
