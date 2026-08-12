import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, setupUserEvent } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

const findManyMock = vi.fn();
vi.mock("@/lib/db", () => ({
  db: { dicaPrevencao: { findMany: (...args: unknown[]) => findManyMock(...args) } },
}));

const { default: PrevencaoPage } = await import("@/app/(public)/prevencao/page");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("PrevencaoPage", () => {
  it("mostra as dicas do ambiente selecionado por padrão (casa)", async () => {
    findManyMock.mockResolvedValue([
      { ambiente: "CASA", dicas: ["sacuda os sapatos antes de calçar"] },
    ]);

    render(await PrevencaoPage());

    expect(screen.getByRole("button", { name: "Em casa" })).toBeInTheDocument();
    expect(screen.getByText("Sacuda os sapatos antes de calçar")).toBeInTheDocument();
  });

  it("troca as dicas exibidas ao escolher outro ambiente no menu", async () => {
    findManyMock.mockResolvedValue([
      { ambiente: "CASA", dicas: ["sacuda os sapatos antes de calçar"] },
      { ambiente: "PRAIA", dicas: ["observe as bandeiras da guarda-vidas"] },
    ]);

    render(await PrevencaoPage());
    const user = setupUserEvent();

    expect(screen.getByText("Sacuda os sapatos antes de calçar")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Na praia" }));

    expect(screen.getByText("Observe as bandeiras da guarda-vidas")).toBeInTheDocument();
    expect(screen.queryByText("Sacuda os sapatos antes de calçar")).not.toBeInTheDocument();
  });

  it("mostra 'Conteúdo em preparação.' pro ambiente selecionado sem dica publicada", async () => {
    findManyMock.mockResolvedValue([]);

    render(await PrevencaoPage());

    expect(screen.getByText("Conteúdo em preparação.")).toBeInTheDocument();

    const user = setupUserEvent();
    await user.click(screen.getByRole("button", { name: "Na mata ou trilha" }));

    expect(screen.getByText("Conteúdo em preparação.")).toBeInTheDocument();
  });

  it("consulta só as dicas com status PUBLICADO", async () => {
    findManyMock.mockResolvedValue([]);

    await PrevencaoPage();

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "PUBLICADO" } })
    );
  });
});
