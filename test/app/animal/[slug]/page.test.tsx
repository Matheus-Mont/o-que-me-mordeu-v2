import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

const findUniqueMock = vi.fn();
vi.mock("@/lib/db", () => ({
  db: { animal: { findUnique: (...args: unknown[]) => findUniqueMock(...args) } },
}));

const { default: FichaAnimalPage, generateMetadata } = await import(
  "@/app/(public)/animal/[slug]/page"
);

const animalCompleto = {
  id: "1",
  slug: "jararaca-exemplo",
  nomePopular: "jararaca",
  nomeCientifico: "Bothrops jararaca",
  categoria: "COBRA",
  nivelUrgencia: "ALTA",
  status: "PUBLICADO",
  regioes: ["sudeste", "sul"],
  imagens: [],
  identificacao: ["cabeça triangular"],
  sintomas: "dor e inchaço",
  tempoSintomas: "minutos",
  primeirosSocorrosFazer: ["lavar o local"],
  primeirosSocorrosNaoFazer: ["fazer torniquete"],
  soroIndicado: "antibotrópico",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("FichaAnimalPage", () => {
  it("chama notFound quando o animal não existe", async () => {
    findUniqueMock.mockResolvedValue(null);

    await expect(FichaAnimalPage({ params: { slug: "nao-existe" } })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });

  it("chama notFound quando o animal existe mas não está PUBLICADO", async () => {
    findUniqueMock.mockResolvedValue({ ...animalCompleto, status: "RASCUNHO" });

    await expect(
      FichaAnimalPage({ params: { slug: "jararaca-exemplo" } })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("renderiza os dados do animal quando publicado", async () => {
    findUniqueMock.mockResolvedValue(animalCompleto);

    render(await FichaAnimalPage({ params: { slug: "jararaca-exemplo" } }));

    expect(screen.getByRole("heading", { name: "Jararaca" })).toBeInTheDocument();
    expect(screen.getByText("Sudeste, Sul")).toBeInTheDocument();
    expect(screen.getByText("Cabeça triangular")).toBeInTheDocument();
    expect(screen.getByText("Lavar o local")).toBeInTheDocument();
    expect(screen.getByText("Fazer torniquete")).toBeInTheDocument();
  });

  it("mostra os textos de fallback quando região/identificação estão vazias", async () => {
    findUniqueMock.mockResolvedValue({ ...animalCompleto, regioes: [], identificacao: [] });

    render(await FichaAnimalPage({ params: { slug: "jararaca-exemplo" } }));

    expect(screen.getByText("Não informado")).toBeInTheDocument();
    expect(screen.getByText("Nenhuma característica cadastrada ainda.")).toBeInTheDocument();
  });

  it("só mostra o aviso de lei da cobra pra categoria COBRA", async () => {
    findUniqueMock.mockResolvedValue({ ...animalCompleto, categoria: "ARANHA" });

    render(await FichaAnimalPage({ params: { slug: "aranha-exemplo" } }));

    expect(screen.queryByText(/lei/i)).not.toBeInTheDocument();
  });
});

describe("generateMetadata", () => {
  it("retorna objeto vazio quando o animal não existe", async () => {
    findUniqueMock.mockResolvedValue(null);

    const meta = await generateMetadata({ params: { slug: "nao-existe" } });

    expect(meta).toEqual({});
  });

  it("monta título e descrição a partir do animal publicado", async () => {
    findUniqueMock.mockResolvedValue(animalCompleto);

    const meta = await generateMetadata({ params: { slug: "jararaca-exemplo" } });

    expect(meta.title).toBe("Jararaca — o que fazer | o que me mordeu?");
    expect(meta.description).toContain("jararaca");
    expect(meta.description).toContain("dor e inchaço");
  });
});
