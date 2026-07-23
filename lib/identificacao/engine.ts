import {
  PESOS,
  PESO_REGIAO,
  TRACOS,
  type CategoriaId,
} from "./conhecimento";

export interface Observacao {
  categoria: CategoriaId | null;
  regiao: string | null;
  visuais: string[];
  feridas: string[];
  sintomas: string[];
}

export interface CandidatoAnimal {
  id: string;
  slug: string;
  nomePopular: string;
  nomeCientifico: string;
  nivelUrgencia: string;
  categoria: string;
  regioes: string[];
  imagens: string[];
}

export interface Resultado {
  animal: CandidatoAnimal;
  pontos: number;
  pontosMax: number;
  proporcao: number;
  confianca: "alta" | "media" | "baixa";
  criteriosEmComum: number;
}

const URGENCIA_ORDEM: Record<string, number> = { ALTA: 0, MEDIA: 1, BAIXA: 2 };

function peso(tag: string): number {
  return PESOS[tag] ?? 1;
}

export function pontuar(obs: Observacao, animal: CandidatoAnimal): Resultado {
  const tracos = TRACOS[animal.slug];
  const visuaisAnimal = new Set(tracos?.visuais ?? []);
  const feridasAnimal = new Set(tracos?.feridas ?? []);
  const sintomasAnimal = new Set(tracos?.sintomas ?? []);

  let pontos = 0;
  let pontosMax = 0;
  let criteriosEmComum = 0;

  if (obs.regiao) {
    pontosMax += PESO_REGIAO;
    if (animal.regioes.includes(obs.regiao)) {
      pontos += PESO_REGIAO;
    }
  }

  for (const tag of obs.visuais) {
    const w = peso(tag);
    pontosMax += w;
    if (visuaisAnimal.has(tag)) {
      pontos += w;
      criteriosEmComum += 1;
    }
  }

  for (const tag of obs.feridas) {
    const w = peso(tag);
    pontosMax += w;
    if (feridasAnimal.has(tag)) {
      pontos += w;
      criteriosEmComum += 1;
    }
  }

  for (const tag of obs.sintomas) {
    const w = peso(tag);
    pontosMax += w;
    if (sintomasAnimal.has(tag)) {
      pontos += w;
      criteriosEmComum += 1;
    }
  }

  const proporcao = pontosMax > 0 ? Math.max(0, pontos) / pontosMax : 0;
  const confianca: Resultado["confianca"] =
    proporcao >= 0.65 ? "alta" : proporcao >= 0.35 ? "media" : "baixa";

  return { animal, pontos, pontosMax, proporcao, confianca, criteriosEmComum };
}

export function identificar(
  obs: Observacao,
  candidatos: CandidatoAnimal[],
  limite = 5
): Resultado[] {
  const elegiveis = obs.categoria
    ? candidatos.filter((a) => a.categoria === obs.categoria)
    : candidatos;

  const temCriterios =
    obs.visuais.length > 0 ||
    obs.feridas.length > 0 ||
    obs.sintomas.length > 0 ||
    obs.regiao !== null;

  const pontuados = elegiveis.map((animal) => pontuar(obs, animal));

  pontuados.sort((a, b) => {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;
    if (b.proporcao !== a.proporcao) return b.proporcao - a.proporcao;
    if (b.criteriosEmComum !== a.criteriosEmComum) return b.criteriosEmComum - a.criteriosEmComum;
    const ua = URGENCIA_ORDEM[a.animal.nivelUrgencia] ?? 3;
    const ub = URGENCIA_ORDEM[b.animal.nivelUrgencia] ?? 3;
    if (ua !== ub) return ua - ub;
    return a.animal.nomePopular.localeCompare(b.animal.nomePopular);
  });

  const comPontos = pontuados.filter((r) => r.pontos > 0);
  const base = temCriterios && comPontos.length > 0 ? comPontos : pontuados;

  return base.slice(0, limite);
}
