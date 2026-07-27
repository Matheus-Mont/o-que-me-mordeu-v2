import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

const findManyMock = vi.fn();
vi.mock("@/lib/db", () => ({
  db: { dicaPrevencao: { findMany: (...args: unknown[]) => findManyMock(...args) } },
}));

const { default: AdminPrevencaoPage } = await import("@/app/admin/prevencao/page");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AdminPrevencaoPage", () => {
  it("lista as dicas com ambiente, status e link de edição", async () => {
    findManyMock.mockResolvedValue([
      {
        id: "d1",
        ambiente: "CASA",
        status: "PUBLICADO",
        updatedAt: new Date("2026-01-15T10:00:00Z"),
      },
    ]);

    render(await AdminPrevencaoPage());

    expect(screen.getByText("casa")).toBeInTheDocument();
    expect(screen.getByText("publicado")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "editar" })).toHaveAttribute(
      "href",
      "/admin/prevencao/d1"
    );
  });

  it("mostra a mensagem de vazio quando não há dicas", async () => {
    findManyMock.mockResolvedValue([]);

    render(await AdminPrevencaoPage());

    expect(screen.getByText("nenhuma dica cadastrada ainda.")).toBeInTheDocument();
  });
});
