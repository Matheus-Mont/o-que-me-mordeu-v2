import { db } from "@/lib/db";
import { StatusConteudo } from "@prisma/client";
import CatalogoClient from "@/components/animal/CatalogoClient";

export const revalidate = 3600;

export default async function CatalogoPage() {
  const animais = await db.animal.findMany({
    where: { status: StatusConteudo.PUBLICADO },
    orderBy: { nomePopular: "asc" },
    select: {
      id: true,
      slug: true,
      nomePopular: true,
      nivelUrgencia: true,
      categoria: true,
      regioes: true,
      imagens: true,
    },
  });

  return <CatalogoClient animais={animais} />;
}
