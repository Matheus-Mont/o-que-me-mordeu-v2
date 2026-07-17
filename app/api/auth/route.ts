import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { verifyCredentials, createSession, destroySession } from "@/lib/auth";

// POST /api/auth — login do administrador (email + senha)
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", detalhes: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const user = await verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) {
    return NextResponse.json(
      { error: "Email ou senha incorretos." },
      { status: 401 }
    );
  }

  await createSession(user.id);

  return NextResponse.json({ id: user.id, email: user.email });
}

// DELETE /api/auth — logout
export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
