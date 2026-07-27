import { describe, expect, it } from "vitest";
import {
  identificar,
  pontuar,
  type CandidatoAnimal,
  type Observacao,
} from "@/lib/identificacao/engine";

// jararaca-exemplo e cascavel-exemplo são dados reais de lib/identificacao/conhecimento.ts,
// usados aqui pra testar pontuar()/identificar() contra o comportamento de verdade do app.
function candidatoReal(slug: string, overrides: Partial<CandidatoAnimal> = {}): CandidatoAnimal {
  return {
    id: slug,
    slug,
    nomePopular: slug,
    nomeCientifico: "",
    nivelUrgencia: "ALTA",
    categoria: "COBRA",
    regioes:
      slug === "jararaca-exemplo"
        ? ["nordeste", "sudeste", "sul"]
        : ["norte", "centro-oeste", "sudeste", "sul", "nordeste"],
    imagens: [],
    ...overrides,
  };
}

function fixture(overrides: Partial<CandidatoAnimal>): CandidatoAnimal {
  return {
    id: "fixture",
    slug: "slug-inexistente-em-tracos",
    nomePopular: "fixture",
    nomeCientifico: "",
    nivelUrgencia: "MEDIA",
    categoria: "COBRA",
    regioes: [],
    imagens: [],
    ...overrides,
  };
}

function obsBase(overrides: Partial<Observacao> = {}): Observacao {
  return {
    categoria: null,
    regiao: null,
    local: null,
    visuais: [],
    feridas: [],
    sintomas: [],
    ...overrides,
  };
}

describe("pontuar", () => {
  it("região/visuais são aditivos: uma característica que não bate não zera as outras", () => {
    // jararaca-exemplo não tem cobra_chocalho — só cascavel-exemplo tem.
    const obs = obsBase({
      regiao: "nordeste",
      visuais: ["cobra_cabeca_triangular", "cobra_losango_v", "cobra_chocalho"],
    });

    const jararaca = pontuar(obs, candidatoReal("jararaca-exemplo"));
    const cascavel = pontuar(obs, candidatoReal("cascavel-exemplo"));

    // jararaca não bate no chocalho, mas ainda pontua nos outros 3 critérios.
    expect(jararaca.pontos).toBeGreaterThan(0);
    expect(jararaca.criteriosEmComum).toBe(3); // regiao + cabeca_triangular + losango_v
    expect(jararaca.proporcao).toBeLessThan(1);

    // cascavel bate em tudo -> pontuação máxima.
    expect(cascavel.proporcao).toBe(1);
    expect(cascavel.confianca).toBe("alta");
  });

  it("região que não bate não elimina o candidato (fica sem esses pontos, só isso)", () => {
    // jararaca-exemplo não circula no norte.
    const obs = obsBase({
      regiao: "norte",
      visuais: ["cobra_cabeca_triangular", "cobra_losango_v"],
    });

    const resultado = pontuar(obs, candidatoReal("jararaca-exemplo"));

    expect(resultado.criteriosEmComum).toBe(2); // só os 2 visuais, não a região
    expect(resultado.proporcao).toBeGreaterThan(0);
    expect(resultado.confianca).toBe("alta"); // 4/5 = 0.8, ainda assim "alta"
  });

  it("respeita os limiares de confiança (0.65 alta, 0.35 média, abaixo disso baixa)", () => {
    const semNadaBatendo = pontuar(
      obsBase({ visuais: ["cobra_chocalho"] }), // jararaca não tem esse traço
      candidatoReal("jararaca-exemplo")
    );
    expect(semNadaBatendo.proporcao).toBe(0);
    expect(semNadaBatendo.confianca).toBe("baixa");
  });
});

describe("identificar", () => {
  it("filtra por categoria quando ela é informada", () => {
    const cobra = fixture({ slug: "c1", categoria: "COBRA", regioes: ["norte"] });
    const escorpiao = fixture({ slug: "e1", categoria: "ESCORPIAO", regioes: ["norte"] });
    const obs = obsBase({ categoria: "COBRA", regiao: "norte" });

    const resultado = identificar(obs, [cobra, escorpiao]);

    expect(resultado.map((r) => r.animal.slug)).toEqual(["c1"]);
  });

  it("não filtra por categoria no fluxo 'Não sei' (categoria null)", () => {
    const cobra = fixture({ slug: "c1", categoria: "COBRA", regioes: ["norte"] });
    const escorpiao = fixture({ slug: "e1", categoria: "ESCORPIAO", regioes: ["norte"] });
    const obs = obsBase({ categoria: null, regiao: "norte" });

    const resultado = identificar(obs, [cobra, escorpiao]);

    expect(resultado.map((r) => r.animal.slug).sort()).toEqual(["c1", "e1"]);
  });

  it("cai no fallback (mantém os candidatos) quando havia critérios mas ninguém pontuou", () => {
    const a = fixture({ slug: "a", regioes: ["norte"] });
    const b = fixture({ slug: "b", regioes: ["sul"] });
    const obs = obsBase({ regiao: "nordeste" }); // nenhum dos dois tem nordeste

    const resultado = identificar(obs, [a, b]);

    expect(resultado).toHaveLength(2);
  });

  it("desempata por nível de urgência antes do nome (mais grave primeiro)", () => {
    const baixa = fixture({ slug: "b", nomePopular: "aardvark", nivelUrgencia: "BAIXA" });
    const alta = fixture({ slug: "a", nomePopular: "zebra", nivelUrgencia: "ALTA" });

    const resultado = identificar(obsBase(), [baixa, alta]);

    expect(resultado.map((r) => r.animal.nivelUrgencia)).toEqual(["ALTA", "BAIXA"]);
  });

  it("desempata por nome com collation pt-BR quando todo o resto empata", () => {
    const zebra = fixture({ slug: "z", nomePopular: "zebra-fictícia", nivelUrgencia: "MEDIA" });
    const aguaViva = fixture({ slug: "av", nomePopular: "água-viva", nivelUrgencia: "MEDIA" });

    const resultado = identificar(obsBase(), [zebra, aguaViva]);

    expect(resultado.map((r) => r.animal.nomePopular)).toEqual(["água-viva", "zebra-fictícia"]);
  });

  it("respeita o parâmetro limite", () => {
    const candidatos = ["a", "b", "c"].map((slug) => fixture({ slug }));

    const resultado = identificar(obsBase(), candidatos, 2);

    expect(resultado).toHaveLength(2);
  });
});
