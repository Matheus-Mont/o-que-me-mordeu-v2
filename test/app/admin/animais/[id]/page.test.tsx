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
    animal: { findUnique: (...args: unknown[]) => findUniqueMock(...args) },
    historicoAlteracao: { findMany: (...args: unknown[]) => historicoFindManyMock(...args) },
  },
}));

const { default: EditarAnimalPage } = await import("@/app/admin/animais/[id]/page");

const animalFixture = {
  id: "abc123",
  slug: "jararaca-exemplo",
  nomePopular: "jararaca",
  nomeCientifico: "Bothrops jararaca",
  categoria: "COBRA",
  nivelUrgencia: "ALTA",
  status: "RASCUNHO",
  regioes: [],
  imagens: [],
  identificacao: [],
  sintomas: "dor",
  tempoSintomas: "minutos",
  primeirosSocorrosFazer: [],
  primeirosSocorrosNaoFazer: [],
  soroIndicado: "antibotrópico",
  fonteConsultor: null,
};

beforeEach(() => {
  vi.clearAllMocks();
  historicoFindManyMock.mockResolvedValue([]);
});

describe("EditarAnimalPage", () => {
  it("chama notFound quando o id não corresponde a nenhum animal", async () => {
    findUniqueMock.mockResolvedValue(null);

    await expect(EditarAnimalPage({ params: { id: "não-existe" } })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });

  it("mostra o nome do animal, o status atual e o formulário pré-preenchido", async () => {
    findUniqueMock.mockResolvedValue(animalFixture);

    render(await EditarAnimalPage({ params: { id: "abc123" } }));

    expect(screen.getByRole("heading", { name: "editar: jararaca" })).toBeInTheDocument();
    expect(screen.getByText("rascunho")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "marcar como revisado" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^slug/i)).toHaveValue("jararaca-exemplo");
    expect(screen.getByLabelText(/^slug/i)).toBeDisabled(); // slug não muda ao editar
  });

  it("mostra o histórico de alterações quando existe", async () => {
    findUniqueMock.mockResolvedValue(animalFixture);
    historicoFindManyMock.mockResolvedValue([
      {
        id: "h1",
        createdAt: new Date("2026-01-10T12:00:00Z"),
        statusAnterior: null,
        statusNovo: "RASCUNHO",
        observacao: "Ficha criada.",
      },
    ]);

    render(await EditarAnimalPage({ params: { id: "abc123" } }));

    expect(screen.getByText(/Ficha criada\./)).toBeInTheDocument();
    expect(screen.getByText(/novo -> rascunho/)).toBeInTheDocument();
  });

  it("mostra a mensagem de vazio quando não há histórico", async () => {
    findUniqueMock.mockResolvedValue(animalFixture);
    historicoFindManyMock.mockResolvedValue([]);

    render(await EditarAnimalPage({ params: { id: "abc123" } }));

    expect(screen.getByText("nenhuma alteração registrada ainda.")).toBeInTheDocument();
  });
});
