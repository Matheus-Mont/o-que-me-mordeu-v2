import { describe, expect, it } from "vitest";
import { capitalizar, compararNomes, normalizarTexto } from "@/lib/texto";

describe("capitalizar", () => {
  it("deixa a primeira letra maiúscula", () => {
    expect(capitalizar("jararaca")).toBe("Jararaca");
  });

  it("não quebra com string vazia", () => {
    expect(capitalizar("")).toBe("");
  });
});

describe("compararNomes", () => {
  it("ordena com collation pt-BR: água-viva entre os nomes com 'a', não depois de 'z'", () => {
    const nomes = ["zebra-fictícia", "água-viva", "aranha"];
    nomes.sort(compararNomes);
    expect(nomes).toEqual(["água-viva", "aranha", "zebra-fictícia"]);
  });

  it("ignora maiúsculas/minúsculas", () => {
    expect(compararNomes("Aranha", "aranha")).toBe(0);
  });
});

describe("normalizarTexto", () => {
  it("remove acentos e deixa minúsculo, pra busca sem acento funcionar", () => {
    expect(normalizarTexto("Água-viva")).toBe("agua-viva");
  });

  it("permite que 'agua' encontre 'água-viva' via includes", () => {
    expect(normalizarTexto("água-viva").includes(normalizarTexto("agua"))).toBe(true);
  });
});
