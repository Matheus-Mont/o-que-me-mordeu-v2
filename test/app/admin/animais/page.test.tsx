import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

const findManyMock = vi.fn();
vi.mock("@/lib/db", () => ({
  db: { animal: { findMany: (...args: unknown[]) => findManyMock(...args) } },
}));

const { default: AdminAnimaisPage } = await import("@/app/admin/animais/page");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AdminAnimaisPage", () => {
  it("lista os animais com nome, categoria, status e link de edição", async () => {
    findManyMock.mockResolvedValue([
      {
        id: "abc123",
        nomePopular: "jararaca",
        categoria: "COBRA",
        status: "PUBLICADO",
        updatedAt: new Date("2026-01-15T10:00:00Z"),
      },
    ]);

    render(await AdminAnimaisPage());

    expect(screen.getByText("jararaca")).toBeInTheDocument();
    expect(screen.getByText("cobra")).toBeInTheDocument();
    expect(screen.getByText("publicado")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "editar" })).toHaveAttribute(
      "href",
      "/admin/animais/abc123"
    );
  });

  it("mostra a mensagem de vazio quando não há animais", async () => {
    findManyMock.mockResolvedValue([]);

    render(await AdminAnimaisPage());

    expect(screen.getByText("nenhum animal cadastrado ainda.")).toBeInTheDocument();
  });

  it("ordena por mais recentemente atualizado", async () => {
    findManyMock.mockResolvedValue([]);

    await AdminAnimaisPage();

    expect(findManyMock).toHaveBeenCalledWith({ orderBy: { updatedAt: "desc" } });
  });
});
