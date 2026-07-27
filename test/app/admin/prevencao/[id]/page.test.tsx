import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

const findUniqueMock = vi.fn();
const historicoFindManyMock = vi.fn();
vi.mock("@/lib/db", () => ({
  db: {
    dicaPrevencao: { findUnique: (...args: unknown[]) => findUniqueMock(...args) },
    historicoAlteracao: { findMany: (...args: unknown[]) => historicoFindManyMock(...args) },
  },
}));

const { default: EditarDicaPage } = await import("@/app/admin/prevencao/[id]/page");

const dicaFixture = {
  id: "d1",
  ambiente: "CASA",
  icone: "TbHome",
  dicas: ["sacuda os sapatos"],
  status: "RASCUNHO",
  fonteConsultor: null,
};

beforeEach(() => {
  vi.clearAllMocks();
  historicoFindManyMock.mockResolvedValue([]);
});

describe("EditarDicaPage", () => {
  it("chama notFound quando o id não corresponde a nenhuma dica", async () => {
    findUniqueMock.mockResolvedValue(null);

    await expect(EditarDicaPage({ params: { id: "não-existe" } })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });

  it("mostra o ambiente, o status atual e o formulário pré-preenchido", async () => {
    findUniqueMock.mockResolvedValue(dicaFixture);

    render(await EditarDicaPage({ params: { id: "d1" } }));

    expect(screen.getByRole("heading", { name: "editar dica: casa" })).toBeInTheDocument();
    expect(screen.getByText("rascunho")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "marcar como revisado" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^ícone/i)).toHaveValue("TbHome");
  });

  it("mostra a mensagem de vazio quando não há histórico", async () => {
    findUniqueMock.mockResolvedValue(dicaFixture);

    render(await EditarDicaPage({ params: { id: "d1" } }));

    expect(screen.getByText("nenhuma alteração registrada ainda.")).toBeInTheDocument();
  });
});
