import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { registrarHistorico, calcularDiff, transicaoValida } from "@/lib/historico";
import {
  animalUpdateSchema,
  statusTransitionSchema,
} from "@/lib/validations/animal";
import { StatusConteudo } from "@prisma/client";

interface Params {
  params: { id: string };
}

// GET /api/animais/:id — visitante só enxerga fichas publicadas.
export async function GET(_request: NextRequest, { params }: Params) {
  const userId = await getSessionUserId();
  const animal = await db.animal.findUnique({ where: { id: params.id } });

  if (!animal) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }
  if (animal.status !== StatusConteudo.PUBLICADO && !userId) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }

  return NextResponse.json(animal);
}

// PATCH /api/animais/:id
// Dois modos, conforme o corpo enviado:
//  - { status, revisadoPor?, observacao? } -> transição de status, validando
//    o fluxo rascunho -> revisado -> publicado.
//  - campos de conteúdo (parcial) -> edição de conteúdo, mantendo o status,
//    com registro de diff no histórico.
export async function PATCH(request: NextRequest, { params }: Params) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const animal = await db.animal.findUnique({ where: { id: params.id } });
  if (!animal) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  // --- Transição de status ---
  if (typeof (body as Record<string, unknown>).status === "string") {
    const parsed = statusTransitionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", detalhes: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { status: novoStatus, revisadoPor, observacao } = parsed.data;

    if (!transicaoValida(animal.status, novoStatus)) {
      return NextResponse.json(
        {
          error: `Transição de "${animal.status}" para "${novoStatus}" não é permitida.`,
        },
        { status: 422 }
      );
    }

    if (novoStatus === StatusConteudo.REVISADO && !(revisadoPor ?? animal.revisadoPor)) {
      return NextResponse.json(
        {
          error:
            "Informe revisadoPor (fonte/consultor responsável) para marcar como revisado.",
        },
        { status: 422 }
      );
    }

    const atualizado = await db.animal.update({
      where: { id: params.id },
      data: {
        status: novoStatus,
        revisadoPor: revisadoPor ?? animal.revisadoPor,
        revisadoEm: novoStatus === StatusConteudo.REVISADO ? new Date() : animal.revisadoEm,
        publicadoEm: novoStatus === StatusConteudo.PUBLICADO ? new Date() : animal.publicadoEm,
        atualizadoPorId: userId,
      },
    });

    await registrarHistorico({
      tipoEntidade: "ANIMAL",
      animalId: params.id,
      statusAnterior: animal.status,
      statusNovo: novoStatus,
      observacao: observacao ?? `Status alterado de ${animal.status} para ${novoStatus}.`,
      alteradoPorId: userId,
    });

    return NextResponse.json(atualizado);
  }

  // --- Edição de conteúdo ---
  const parsed = animalUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", detalhes: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: "Nenhum campo para atualizar." }, { status: 400 });
  }

  const diff = calcularDiff(animal as unknown as Record<string, unknown>, parsed.data);

  const atualizado = await db.animal.update({
    where: { id: params.id },
    data: { ...parsed.data, atualizadoPorId: userId },
  });

  if (Object.keys(diff).length > 0) {
    await registrarHistorico({
      tipoEntidade: "ANIMAL",
      animalId: params.id,
      camposAlterados: diff,
      observacao: "Conteúdo editado.",
      alteradoPorId: userId,
    });
  }

  return NextResponse.json(atualizado);
}

// DELETE /api/animais/:id
export async function DELETE(_request: NextRequest, { params }: Params) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const animal = await db.animal.findUnique({ where: { id: params.id } });
  if (!animal) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }

  await db.animal.delete({ where: { id: params.id } });

  return NextResponse.json({ ok: true });
}
