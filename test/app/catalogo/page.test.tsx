import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

const findManyMock = vi.fn();
vi.mock("@/lib/db", () => ({
  db: { animal: { findMany: (...args: unknown[]) => findManyMock(...args) } },
}));

const { default: CatalogoPage } = await import("@/app/(public)/catalogo/page");

beforeEach(() => {
  vi.clearAllMocks();
  findManyMock.mockResolvedValue([
    {
      id: "1",
      slug: "jararaca-exemplo",
      nomePopular: "jararaca",
      nivelUrgencia: "ALTA",
      categoria: "COBRA",
      regioes: ["sudeste"],
      imagens: [],
    },
  ]);
});

describe("CatalogoPage", () => {
  it("consulta só animais PUBLICADO, ordenados por nome, com os campos do card", async () => {
    await CatalogoPage();

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { status: "PUBLICADO" },
        orderBy: { nomePopular: "asc" },
        select: expect.objectContaining({
          slug: true,
          nomePopular: true,
          nivelUrgencia: true,
          categoria: true,
          regioes: true,
          imagens: true,
        }),
      })
    );
  });

  it("repassa os animais encontrados pro CatalogoClient", async () => {
    render(await CatalogoPage());

    expect(screen.getByText("Jararaca")).toBeInTheDocument();
    expect(screen.getByText("1 animal encontrado")).toBeInTheDocument();
  });
});
