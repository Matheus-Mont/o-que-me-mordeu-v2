import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, setupUserEvent } from "@/test/test-utils";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, back: vi.fn() }),
}));

const { default: IdentificarPage } = await import("@/app/(public)/identificar/page");

const candidatosFicticios = [
  {
    id: "1",
    slug: "jararaca-exemplo",
    nomePopular: "jararaca",
    nomeCientifico: "Bothrops jararaca",
    nivelUrgencia: "ALTA",
    categoria: "COBRA",
    regioes: ["nordeste", "sudeste", "sul"],
    imagens: [],
  },
];

beforeEach(() => {
  pushMock.mockClear();
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(candidatosFicticios),
    })
  );
});

describe("IdentificarPage", () => {
  it("'Próximo' fica desabilitado até escolher um tipo de animal", async () => {
    render(<IdentificarPage />);

    expect(screen.getByRole("button", { name: "Próximo" })).toBeDisabled();

    const user = setupUserEvent();
    await user.click(screen.getByRole("button", { name: "Cobra" }));

    expect(screen.getByRole("button", { name: "Próximo" })).toBeEnabled();
  });

  it("'Voltar' na primeira etapa manda para a home", async () => {
    const user = setupUserEvent();
    render(<IdentificarPage />);

    await user.click(screen.getByRole("button", { name: "Voltar" }));

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("ao escolher um tipo específico, o fluxo pula a etapa de local", async () => {
    const user = setupUserEvent();
    render(<IdentificarPage />);

    await user.click(screen.getByRole("button", { name: "Cobra" }));
    await user.click(screen.getByRole("button", { name: "Próximo" }));
    expect(screen.getByText("Em que região ocorreu?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Norte" }));
    await user.click(screen.getByRole("button", { name: "Próximo" }));

    expect(screen.getByText("O que você notou no animal?")).toBeInTheDocument();
    expect(screen.queryByText("Onde o acidente aconteceu?")).not.toBeInTheDocument();
  });

  it("no fluxo 'Não sei', a etapa de local aparece entre região e feridas", async () => {
    const user = setupUserEvent();
    render(<IdentificarPage />);

    await user.click(screen.getByRole("button", { name: "Não sei" }));
    await user.click(screen.getByRole("button", { name: "Próximo" }));
    expect(screen.getByText("Em que região ocorreu?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Norte" }));
    await user.click(screen.getByRole("button", { name: "Próximo" }));

    expect(screen.getByText("Onde o acidente aconteceu?")).toBeInTheDocument();
  });

  it("completa o wizard e mostra os resultados vindos da API", async () => {
    const user = setupUserEvent();
    render(<IdentificarPage />);

    await user.click(screen.getByRole("button", { name: "Cobra" }));
    await user.click(screen.getByRole("button", { name: "Próximo" })); // -> região
    await user.click(screen.getByRole("button", { name: "Norte" }));
    await user.click(screen.getByRole("button", { name: "Próximo" })); // -> visuais
    await user.click(screen.getByRole("button", { name: "Próximo" })); // -> feridas
    await user.click(screen.getByRole("button", { name: "Próximo" })); // -> sintomas
    await user.click(screen.getByRole("button", { name: "Ver sugestões" }));

    expect(await screen.findByText("Sugestão de espécies")).toBeInTheDocument();
    expect(await screen.findByText("Jararaca")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/animais?status=PUBLICADO&categoria=COBRA")
    );
  });
});
