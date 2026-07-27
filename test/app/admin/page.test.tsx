import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

const animalGroupByMock = vi.fn();
const dicaGroupByMock = vi.fn();
vi.mock("@/lib/db", () => ({
  db: {
    animal: { groupBy: (...args: unknown[]) => animalGroupByMock(...args) },
    dicaPrevencao: { groupBy: (...args: unknown[]) => dicaGroupByMock(...args) },
  },
}));

const { default: AdminDashboardPage } = await import("@/app/admin/page");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AdminDashboardPage", () => {
  it("mostra as contagens por status quando há conteúdo", async () => {
    animalGroupByMock.mockResolvedValue([
      { status: "RASCUNHO", _count: { _all: 3 } },
      { status: "PUBLICADO", _count: { _all: 7 } },
    ]);
    dicaGroupByMock.mockResolvedValue([{ status: "PUBLICADO", _count: { _all: 4 } }]);

    render(await AdminDashboardPage());

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("mostra a mensagem de vazio quando não há animais nem dicas cadastradas", async () => {
    animalGroupByMock.mockResolvedValue([]);
    dicaGroupByMock.mockResolvedValue([]);

    render(await AdminDashboardPage());

    expect(screen.getByText("nenhum animal cadastrado ainda.")).toBeInTheDocument();
    expect(screen.getByText("nenhuma dica cadastrada ainda.")).toBeInTheDocument();
  });

  it("tem os links de gerenciamento", async () => {
    animalGroupByMock.mockResolvedValue([]);
    dicaGroupByMock.mockResolvedValue([]);

    render(await AdminDashboardPage());

    expect(screen.getByRole("link", { name: "gerenciar animais" })).toHaveAttribute(
      "href",
      "/admin/animais"
    );
    expect(screen.getByRole("link", { name: "gerenciar prevenção" })).toHaveAttribute(
      "href",
      "/admin/prevencao"
    );
  });
});
