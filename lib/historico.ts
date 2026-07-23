import { db } from "@/lib/db";
import { Prisma, type StatusConteudo, type TipoEntidade } from "@prisma/client";

interface RegistrarHistoricoParams {
  tipoEntidade: TipoEntidade;
  animalId?: string;
  dicaPrevencaoId?: string;
  statusAnterior?: StatusConteudo | null;
  statusNovo?: StatusConteudo | null;
  camposAlterados?: Record<string, unknown> | null;
  observacao?: string | null;
  alteradoPorId?: string | null;
}

export async function registrarHistorico(params: RegistrarHistoricoParams) {
  return db.historicoAlteracao.create({
    data: {
      tipoEntidade: params.tipoEntidade,
      animalId: params.animalId,
      dicaPrevencaoId: params.dicaPrevencaoId,
      statusAnterior: params.statusAnterior ?? undefined,
      statusNovo: params.statusNovo ?? undefined,
      camposAlterados: params.camposAlterados
        ? (params.camposAlterados as Prisma.InputJsonValue)
        : undefined,
      observacao: params.observacao ?? undefined,
      alteradoPorId: params.alteradoPorId ?? undefined,
    },
  });
}

export function calcularDiff(
  antes: Record<string, unknown>,
  camposEnviados: Record<string, unknown>
) {
  const diff: Record<string, { de: unknown; para: unknown }> = {};
  for (const key of Object.keys(camposEnviados)) {
    if (JSON.stringify(antes[key]) !== JSON.stringify(camposEnviados[key])) {
      diff[key] = { de: antes[key] ?? null, para: camposEnviados[key] };
    }
  }
  return diff;
}

const TRANSICOES_VALIDAS: Record<StatusConteudo, StatusConteudo[]> = {
  RASCUNHO: ["REVISADO"],
  REVISADO: ["PUBLICADO", "RASCUNHO"],
  PUBLICADO: ["REVISADO"],
};

export function transicaoValida(de: StatusConteudo, para: StatusConteudo) {
  if (de === para) return false;
  return TRANSICOES_VALIDAS[de]?.includes(para) ?? false;
}
