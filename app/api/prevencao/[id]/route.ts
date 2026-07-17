import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { registrarHistorico, calcularDiff, transicaoValida } from "@/lib/historico";
import {
  dicaUpdateSchema,
  statusTransitionSchema,
} from "@/lib/validations/prevencao";
import { StatusConteudo } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const userId = await getSessionUserId();
  const dica = await db.dicaPrevencao.findUnique({ where: { id: params.id } });

  if (!dica) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }
  if (dica.status !== StatusConteudo.PUBLICADO && !userId) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }

  return NextResponse.json(dica);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const dica = await db.dicaPrevencao.findUnique({ where: { id: params.id } });
  if (!dica) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  if (typeof (body as Record<string, unknown>).status === "string") {
    const parsed = statusTransitionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", detalhes: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { status: novoStatus, revisadoPor, observacao } = parsed.data;

    if (!transicaoValida(dica.status, novoStatus)) {
      return NextResponse.json(
        {
          error: `Transição de "${dica.status}" para "${novoStatus}" não é permitida.`,
        },
        { status: 422 }
      );
    }

    if (novoStatus === StatusConteudo.REVISADO && !(revisadoPor ?? dica.revisadoPor)) {
      return NextResponse.json(
        {
          error:
            "Informe revisadoPor (fonte/consultor responsável) para marcar como revisado.",
        },
        { status: 422 }
      );
    }

    const atualizado = await db.dicaPrevencao.update({
      where: { id: params.id },
      data: {
        status: novoStatus,
        revisadoPor: revisadoPor ?? dica.revisadoPor,
        revisadoEm: novoStatus === StatusConteudo.REVISADO ? new Date() : dica.revisadoEm,
        publicadoEm: novoStatus === StatusConteudo.PUBLICADO ? new Date() : dica.publicadoEm,
        atualizadoPorId: userId,
      },
    });

    await registrarHistorico({
      tipoEntidade: "PREVENCAO",
      dicaPrevencaoId: params.id,
      statusAnterior: dica.status,
      statusNovo: novoStatus,
      observacao: observacao ?? `Status alterado de ${dica.status} para ${novoStatus}.`,
      alteradoPorId: userId,
    });

    return NextResponse.json(atualizado);
  }

  const parsed = dicaUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", detalhes: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: "Nenhum campo para atualizar." }, { status: 400 });
  }

  const diff = calcularDiff(dica as unknown as Record<string, unknown>, parsed.data);

  const atualizado = await db.dicaPrevencao.update({
    where: { id: params.id },
    data: { ...parsed.data, atualizadoPorId: userId },
  });

  if (Object.keys(diff).length > 0) {
    await registrarHistorico({
      tipoEntidade: "PREVENCAO",
      dicaPrevencaoId: params.id,
      camposAlterados: diff,
      observacao: "Conteúdo editado.",
      alteradoPorId: userId,
    });
  }

  return NextResponse.json(atualizado);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const dica = await db.dicaPrevencao.findUnique({ where: { id: params.id } });
  if (!dica) {
    return NextResponse.json({ error: "Não encontrado." }, { status: 404 });
  }

  await db.dicaPrevencao.delete({ where: { id: params.id } });

  return NextResponse.json({ ok: true });
}
