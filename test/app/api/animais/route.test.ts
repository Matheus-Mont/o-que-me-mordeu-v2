import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const findManyMock = vi.fn();
const findUniqueMock = vi.fn();
const createMock = vi.fn();

vi.mock("@/lib/db", () => ({
  db: {
    animal: {
      findMany: (...args: unknown[]) => findManyMock(...args),
      findUnique: (...args: unknown[]) => findUniqueMock(...args),
      create: (...args: unknown[]) => createMock(...args),
    },
  },
}));

const getSessionUserIdMock = vi.fn();
vi.mock("@/lib/auth", () => ({
  getSessionUserId: () => getSessionUserIdMock(),
}));

const registrarHistoricoMock = vi.fn();
vi.mock("@/lib/historico", () => ({
  registrarHistorico: (...args: unknown[]) => registrarHistoricoMock(...args),
}));

const { GET, POST } = await import("@/app/api/animais/route");

const payloadValido = {
  slug: "cobra-teste",
  nomePopular: "Cobra teste",
  nomeCientifico: "Testus cobra",
  categoria: "COBRA",
  nivelUrgencia: "ALTA",
  sintomas: "dor",
  tempoSintomas: "imediato",
  soroIndicado: "antibotrópico",
};

beforeEach(() => {
  vi.clearAllMocks();
  findManyMock.mockResolvedValue([]);
});

describe("GET /api/animais", () => {
  it("visitante anônimo só vê PUBLICADO, mesmo pedindo outro status", async () => {
    getSessionUserIdMock.mockResolvedValue(null);
    const req = new NextRequest("http://localhost/api/animais?status=RASCUNHO");

    await GET(req);

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ status: "PUBLICADO" }) })
    );
  });

  it("admin logado pode pedir um status específico", async () => {
    getSessionUserIdMock.mockResolvedValue("user-1");
    const req = new NextRequest("http://localhost/api/animais?status=RASCUNHO");

    await GET(req);

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ status: "RASCUNHO" }) })
    );
  });

  it("filtra por categoria, região e busca por nome quando informados", async () => {
    getSessionUserIdMock.mockResolvedValue(null);
    const req = new NextRequest(
      "http://localhost/api/animais?categoria=COBRA&regiao=nordeste&q=jarara"
    );

    await GET(req);

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          categoria: "COBRA",
          regioes: { has: "nordeste" },
          nomePopular: { contains: "jarara", mode: "insensitive" },
        }),
      })
    );
  });
});

describe("POST /api/animais", () => {
  it("retorna 401 se não estiver autenticado", async () => {
    getSessionUserIdMock.mockResolvedValue(null);
    const req = new NextRequest("http://localhost/api/animais", {
      method: "POST",
      body: JSON.stringify(payloadValido),
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(createMock).not.toHaveBeenCalled();
  });

  it("retorna 400 com corpo inválido", async () => {
    getSessionUserIdMock.mockResolvedValue("user-1");
    const req = new NextRequest("http://localhost/api/animais", {
      method: "POST",
      body: JSON.stringify({ slug: "" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  it("retorna 409 se o slug já existir", async () => {
    getSessionUserIdMock.mockResolvedValue("user-1");
    findUniqueMock.mockResolvedValue({ id: "existente" });
    const req = new NextRequest("http://localhost/api/animais", {
      method: "POST",
      body: JSON.stringify(payloadValido),
    });

    const res = await POST(req);

    expect(res.status).toBe(409);
    expect(createMock).not.toHaveBeenCalled();
  });

  it("cria a ficha em RASCUNHO e registra histórico quando o corpo é válido", async () => {
    getSessionUserIdMock.mockResolvedValue("user-1");
    findUniqueMock.mockResolvedValue(null);
    createMock.mockResolvedValue({ id: "novo-id", ...payloadValido });

    const req = new NextRequest("http://localhost/api/animais", {
      method: "POST",
      body: JSON.stringify(payloadValido),
    });

    const res = await POST(req);

    expect(res.status).toBe(201);
    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          slug: "cobra-teste",
          status: "RASCUNHO",
          criadoPorId: "user-1",
          atualizadoPorId: "user-1",
        }),
      })
    );
    expect(registrarHistoricoMock).toHaveBeenCalledWith(
      expect.objectContaining({ tipoEntidade: "ANIMAL", animalId: "novo-id" })
    );
  });
});
