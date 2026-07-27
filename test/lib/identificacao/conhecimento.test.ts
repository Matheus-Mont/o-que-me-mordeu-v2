import { describe, expect, it } from "vitest";
import { identificar, type CandidatoAnimal, type Observacao } from "@/lib/identificacao/engine";
import { TRACOS, type CategoriaId } from "@/lib/identificacao/conhecimento";

// Testa o catálogo real de TRACOS contra o engine real — não são fixtures
// sintéticas, é uma checagem de regressão: será que os traços cadastrados em
// conhecimento.ts ainda deixam o motor discriminar os 36 animais entre si?
// Região/local ficam de fora de propósito, pra medir só o poder de
// discriminação de visuais/feridas/sintomas.

const slugs = Object.keys(TRACOS);

function candidatosReais(): CandidatoAnimal[] {
  return slugs.map((slug) => ({
    id: slug,
    slug,
    nomePopular: slug,
    nomeCientifico: "",
    nivelUrgencia: "MEDIA",
    categoria: TRACOS[slug].categoria,
    regioes: [],
    imagens: [],
  }));
}

function obsDe(slug: string, tracosParciais?: { visuais: string[]; feridas: string[]; sintomas: string[] }): Observacao {
  const t = tracosParciais ?? TRACOS[slug];
  return {
    categoria: TRACOS[slug].categoria as CategoriaId,
    regiao: null,
    local: null,
    visuais: t.visuais,
    feridas: t.feridas,
    sintomas: t.sintomas,
  };
}

// PRNG determinístico (mesma semente sempre) — os testes de "informação
// parcial" precisam de aleatoriedade, mas não podem ser flaky no CI.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function amostra<T>(arr: T[], fracao: number, rand: () => number): T[] {
  return arr.filter(() => rand() < fracao);
}

describe("catálogo de traços (conhecimento.ts) — autoconsistência do motor de identificação", () => {
  it("não tem dois animais da mesma categoria com o exato mesmo conjunto de traços", () => {
    const porCategoria = new Map<string, string[]>();
    for (const slug of slugs) {
      const cat = TRACOS[slug].categoria;
      porCategoria.set(cat, [...(porCategoria.get(cat) ?? []), slug]);
    }

    const assinatura = (slug: string) => {
      const t = TRACOS[slug];
      return [...t.visuais, ...t.feridas, ...t.sintomas].sort().join(",");
    };

    const colisoes: string[] = [];
    for (const doGrupo of porCategoria.values()) {
      for (let i = 0; i < doGrupo.length; i++) {
        for (let j = i + 1; j < doGrupo.length; j++) {
          if (assinatura(doGrupo[i]) === assinatura(doGrupo[j])) {
            colisoes.push([doGrupo[i], doGrupo[j]].sort().join(" == "));
          }
        }
      }
    }

    // Único par aceito: as duas lonomias são descritas de forma quase
    // idêntica no guia oficial do MS (cerdas verdes, agrupadas em tronco,
    // camufladas) — não é erro de cadastro, é o bicho mesmo sendo parecido.
    // Se essa lista crescer, é sinal de que um traço novo foi copiado sem
    // diferenciar de um animal já existente na mesma categoria.
    expect(colisoes).toEqual(["lonomia-achelous-exemplo == taturana-lonomia-exemplo"]);
  });

  it("com todos os próprios traços reportados, todo animal aparece no top 3", () => {
    const candidatos = candidatosReais();
    const forasDoTop3: string[] = [];

    for (const slug of slugs) {
      const resultado = identificar(obsDe(slug), candidatos, 5);
      const posicao = resultado.findIndex((r) => r.animal.slug === slug);
      if (posicao === -1 || posicao >= 3) forasDoTop3.push(slug);
    }

    expect(forasDoTop3).toEqual([]);
  });

  it("com todos os próprios traços reportados, pelo menos 30 dos 36 animais ficam em 1º lugar", () => {
    // Hoje são 34/36. Os que não ficam em 1º têm o próprio conjunto de
    // traços como subconjunto exato de outro animal da mesma categoria (ex.:
    // vespa-do-mar ⊂ água-viva-cubo, que tem uma tag visual a mais) — nesse
    // caso os dois empatam em pontos e o desempate por nome decide. Esperado,
    // não é bug; a barra aqui é só pra pegar uma regressão grande (ex.:
    // alguém copiar o array de traços de um animal pro outro sem editar).
    const candidatos = candidatosReais();
    let top1 = 0;

    for (const slug of slugs) {
      const resultado = identificar(obsDe(slug), candidatos, 5);
      if (resultado[0]?.animal.slug === slug) top1++;
    }

    expect(top1).toBeGreaterThanOrEqual(30);
  });

  it("com ~50% dos traços reportados, mantém pelo menos 60% de acerto em 1º e 85% no top 3", () => {
    const candidatos = candidatosReais();
    const rand = rng(42);
    const RODADAS = 200;
    let amostras = 0;
    let top1 = 0;
    let top3 = 0;

    for (let rodada = 0; rodada < RODADAS; rodada++) {
      for (const slug of slugs) {
        const t = TRACOS[slug];
        const parcial = {
          visuais: amostra(t.visuais, 0.5, rand),
          feridas: amostra(t.feridas, 0.5, rand),
          sintomas: amostra(t.sintomas, 0.5, rand),
        };
        if (parcial.visuais.length + parcial.feridas.length + parcial.sintomas.length === 0) continue;

        amostras++;
        const resultado = identificar(obsDe(slug, parcial), candidatos, 5);
        const posicao = resultado.findIndex((r) => r.animal.slug === slug);
        if (posicao === 0) top1++;
        if (posicao !== -1 && posicao < 3) top3++;
      }
    }

    expect(amostras).toBeGreaterThan(0);
    expect(top1 / amostras).toBeGreaterThanOrEqual(0.6);
    expect(top3 / amostras).toBeGreaterThanOrEqual(0.85);
  });
});
