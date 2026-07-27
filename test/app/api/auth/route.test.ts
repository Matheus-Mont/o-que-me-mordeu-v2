import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const verifyCredentialsMock = vi.fn();
const createSessionMock = vi.fn();
const destroySessionMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  verifyCredentials: (...args: unknown[]) => verifyCredentialsMock(...args),
  createSession: (...args: unknown[]) => createSessionMock(...args),
  destroySession: (...args: unknown[]) => destroySessionMock(...args),
}));

const { POST, DELETE } = await import("@/app/api/auth/route");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/auth", () => {
  it("retorna 400 com corpo inválido (email malformado)", async () => {
    const req = new NextRequest("http://localhost/api/auth", {
      method: "POST",
      body: JSON.stringify({ email: "não-é-email", password: "x" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(verifyCredentialsMock).not.toHaveBeenCalled();
  });

  it("retorna 401 quando as credenciais estão erradas", async () => {
    verifyCredentialsMock.mockResolvedValue(null);
    const req = new NextRequest("http://localhost/api/auth", {
      method: "POST",
      body: JSON.stringify({ email: "a@b.com", password: "errada" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(createSessionMock).not.toHaveBeenCalled();
  });

  it("cria a sessão e retorna o usuário quando as credenciais estão certas", async () => {
    verifyCredentialsMock.mockResolvedValue({ id: "user-1", email: "a@b.com" });
    const req = new NextRequest("http://localhost/api/auth", {
      method: "POST",
      body: JSON.stringify({ email: "a@b.com", password: "certa" }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ id: "user-1", email: "a@b.com" });
    expect(createSessionMock).toHaveBeenCalledWith("user-1");
  });
});

describe("DELETE /api/auth", () => {
  it("destrói a sessão", async () => {
    const res = await DELETE();
    const json = await res.json();

    expect(destroySessionMock).toHaveBeenCalledTimes(1);
    expect(json).toEqual({ ok: true });
  });
});
