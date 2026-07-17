import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// Autenticação simples para um único usuário administrador.
// Sem sistema de papéis/permissões nesta fase — qualquer usuário autenticado
// tem acesso total ao painel. O modelo User no banco já fica pronto para
// múltiplos usuários no futuro (ver prisma/schema.prisma).

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 dias

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET não configurado no .env.");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/** Verifica email/senha contra a tabela User e retorna o usuário se válido. */
export async function verifyCredentials(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return user;
}

/** Cria o JWT de sessão e grava no cookie httpOnly. */
export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Lê e valida o cookie de sessão atual. Retorna o userId ou null. */
export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

/** Retorna o usuário administrador da sessão atual, ou null. */
export async function getSessionUser() {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

/**
 * Helper para uso em route handlers e server components do painel.
 * Retorna o userId autenticado ou lança um erro 401 (para route handlers,
 * ver uso em app/api/*; para páginas, prefira checar `getSessionUser()`
 * e redirecionar — ver app/admin/layout.tsx).
 */
export async function requireAdmin(): Promise<string> {
  const userId = await getSessionUserId();
  if (!userId) {
    throw new AuthError("Não autenticado.");
  }
  return userId;
}

export class AuthError extends Error {}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
