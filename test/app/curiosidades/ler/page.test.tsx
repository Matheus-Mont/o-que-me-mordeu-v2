import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

const { default: LerCuriosidadesPage } = await import("@/app/(public)/curiosidades/ler/page");

describe("LerCuriosidadesPage", () => {
  it("mostra um seletor com todas as categorias de animal", () => {
    render(<LerCuriosidadesPage />);

    expect(screen.getByRole("button", { name: /cobras/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /escorpiões/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /aranhas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /taturanas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /águas-vivas/i })).toBeInTheDocument();
  });

  it("mostra só as curiosidades da categoria selecionada (padrão: cobras)", () => {
    render(<LerCuriosidadesPage />);

    expect(screen.getByText(/separadas em 4 grupos/i)).toBeInTheDocument();
    expect(screen.queryByText(/curitiba é a cidade que mais registra/i)).not.toBeInTheDocument();
  });

  it("troca a lista ao selecionar outra categoria", () => {
    render(<LerCuriosidadesPage />);

    fireEvent.click(screen.getByRole("button", { name: /aranhas/i }));

    expect(screen.getByText(/curitiba é a cidade que mais registra/i)).toBeInTheDocument();
    expect(screen.queryByText(/separadas em 4 grupos/i)).not.toBeInTheDocument();
  });
});
