import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { registrarHistorico } from "@/lib/historico";
import { animalContentSchema } from "@/lib/validations/animal";
import { Prisma, StatusConteudo } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = await getSessionUserId();

  const categoria = searchParams.get("categoria");
  const regiao = searchParams.get("regiao");
  const q = searchParams.get("q");
  const statusParam = searchParams.get("status");

  const where: Prisma.AnimalWhereInput = {};

  if (!userId) {
    where.status = StatusConteudo.PUBLICADO;
  } else if (statusParam) {
    where.status = statusParam as StatusConteudo;
  }

  if (categoria) where.categoria = categoria as Prisma.AnimalWhereInput["categoria"];
  if (regiao) where.regioes = { has: regiao };
  if (q) where.nomePopular = { contains: q, mode: "insensitive" };

  const animais = await db.animal.findMany({
    where,
    orderBy: { nomePopular: "asc" },
  });

  return NextResponse.json(animais);
}

export async function POST(request: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = animalContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", detalhes: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existente = await db.animal.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existente) {
    return NextResponse.json(
      { error: "Já existe uma ficha com esse slug." },
      { status: 409 }
    );
  }

  const animal = await db.animal.create({
    data: {
      ...parsed.data,
      status: StatusConteudo.RASCUNHO,
      criadoPorId: userId,
      atualizadoPorId: userId,
    },
  });

  await registrarHistorico({
    tipoEntidade: "ANIMAL",
    animalId: animal.id,
    statusNovo: StatusConteudo.RASCUNHO,
    observacao: "Ficha criada.",
    alteradoPorId: userId,
  });

  return NextResponse.json(animal, { status: 201 });
}
