export function capitalizar(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const COLLATOR_PT = new Intl.Collator("pt-BR", { sensitivity: "base", numeric: true });

export function compararNomes(a: string, b: string): number {
  return COLLATOR_PT.compare(a, b);
}

export function normalizarTexto(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
