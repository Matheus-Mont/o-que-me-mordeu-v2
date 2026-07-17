import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { registrarHistorico } from "@/lib/historico";
import { dicaContentSchema } from "@/lib/validations/prevencao";
import { Prisma, StatusConteudo } from "@prisma/client";

// GET /api/prevencao?status=&ambiente=
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = await getSessionUserId();

  const ambiente = searchParams.get("ambiente");
  const statusParam = searchParams.get("status");

  const where: Prisma.DicaPrevencaoWhereInput = {};

  if (!userId) {
    where.status = StatusConteudo.PUBLICADO;
  } else if (statusParam) {
    where.status = statusParam as StatusConteudo;
  }

  if (ambiente) where.ambiente = ambiente as Prisma.DicaPrevencaoWhereInput["ambiente"];

  const dicas = await db.dicaPrevencao.findMany({
    where,
    orderBy: { ambiente: "asc" },
  });

  return NextResponse.json(dicas);
}

// POST /api/prevencao — cria uma nova dica, sempre como RASCUNHO.
export async function POST(request: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = dicaContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", detalhes: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const dica = await db.dicaPrevencao.create({
    data: {
      ...parsed.data,
      status: StatusConteudo.RASCUNHO,
      criadoPorId: userId,
      atualizadoPorId: userId,
    },
  });

  await registrarHistorico({
    tipoEntidade: "PREVENCAO",
    dicaPrevencaoId: dica.id,
    statusNovo: StatusConteudo.RASCUNHO,
    observacao: "Dica criada.",
    alteradoPorId: userId,
  });

  return NextResponse.json(dica, { status: 201 });
}
