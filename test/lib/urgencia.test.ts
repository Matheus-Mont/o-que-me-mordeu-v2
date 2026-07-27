import { describe, expect, it } from "vitest";
import { URGENCIA_LABEL, URGENCIA_ORDEM, URGENCIA_SCHEME } from "@/lib/urgencia";

const NIVEIS = ["ALTA", "MEDIA", "BAIXA"] as const;

describe("mapas de urgência", () => {
  it("têm entrada para os 3 níveis em todos os mapas", () => {
    for (const nivel of NIVEIS) {
      expect(URGENCIA_LABEL[nivel]).toBeTypeOf("string");
      expect(URGENCIA_SCHEME[nivel]).toBeTypeOf("string");
      expect(URGENCIA_ORDEM[nivel]).toBeTypeOf("number");
    }
  });

  it("URGENCIA_ORDEM reflete gravidade decrescente (alta < média < baixa)", () => {
    expect(URGENCIA_ORDEM.ALTA).toBeLessThan(URGENCIA_ORDEM.MEDIA);
    expect(URGENCIA_ORDEM.MEDIA).toBeLessThan(URGENCIA_ORDEM.BAIXA);
  });

  it("URGENCIA_SCHEME usa danger para alta e safe para baixa", () => {
    expect(URGENCIA_SCHEME.ALTA).toBe("danger");
    expect(URGENCIA_SCHEME.BAIXA).toBe("safe");
  });
});
