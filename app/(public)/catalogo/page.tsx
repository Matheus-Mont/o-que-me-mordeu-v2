import { db } from "@/lib/db";
import { StatusConteudo } from "@prisma/client";
import CatalogoClient from "@/components/animal/CatalogoClient";

// Catálogo — Server Component: lê a lista publicada direto do banco e entrega
// já pronta ao CatalogoClient (que cuida de busca/filtro/paginação no client).
// Isso elimina o antigo waterfall "renderiza -> useEffect -> fetch /api ->
// renderiza de novo" e o spinner de carregamento: os dados já vêm embutidos no
// HTML na primeira pintura.
//
// ISR (igual à ficha do animal): a página é pré-gerada no build e revalidada
// no máximo a cada hora — o conteúdo é revisado por humano antes de publicar,
// então não muda a todo instante.
export const revalidate = 3600;

// select enxuto: só os campos que o card e os filtros usam. Evita serializar
// os textos longos (sintomas, primeiros socorros, etc.) no payload da página.
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
