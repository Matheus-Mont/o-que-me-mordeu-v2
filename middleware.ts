import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Protege todo o painel administrativo (app/admin/**), exceto a própria
// página de login. Implementado no middleware (Edge runtime) em vez de
// reutilizar lib/auth.ts para não puxar o Prisma Client para o Edge —
// aqui só validamos a assinatura do cookie de sessão.

const COOKIE_NAME = "admin_session";

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const secret = process.env.AUTH_SECRET;
  if (!secret) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAdminRoute || isLoginPage) {
    return NextResponse.next();
  }

  const authenticated = await hasValidSession(request);
  if (!authenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
