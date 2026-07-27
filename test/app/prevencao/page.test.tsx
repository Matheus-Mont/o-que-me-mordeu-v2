import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

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
  it("mostra as dicas do ambiente que tem conteúdo publicado", async () => {
    findManyMock.mockResolvedValue([
      { ambiente: "CASA", dicas: ["sacuda os sapatos antes de calçar"] },
    ]);

    render(await PrevencaoPage());

    expect(screen.getByText("Em casa")).toBeInTheDocument();
    expect(screen.getByText("Sacuda os sapatos antes de calçar")).toBeInTheDocument();
  });

  it("mostra 'Conteúdo em preparação.' pros ambientes sem dica publicada", async () => {
    findManyMock.mockResolvedValue([]);

    render(await PrevencaoPage());

    const mensagens = screen.getAllByText("Conteúdo em preparação.");
    expect(mensagens).toHaveLength(4); // CASA, MATA_TRILHA, RIOS_LAGOS, PRAIA
  });

  it("consulta só as dicas com status PUBLICADO", async () => {
    findManyMock.mockResolvedValue([]);

    await PrevencaoPage();

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "PUBLICADO" } })
    );
  });
});
