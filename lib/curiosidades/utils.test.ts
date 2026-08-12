import { describe, expect, it } from "vitest";
import { embaralhar } from "@/lib/curiosidades/utils";

describe("embaralhar", () => {
  it("mantém o mesmo conjunto de elementos e o mesmo tamanho", () => {
    const original = [1, 2, 3, 4, 5];
    const resultado = embaralhar(original);

    expect(resultado).toHaveLength(original.length);
    expect([...resultado].sort()).toEqual([...original].sort());
  });

  it("não modifica o array original", () => {
    const original = [1, 2, 3, 4, 5];
    embaralhar(original);

    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
