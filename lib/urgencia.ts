export const URGENCIA_LABEL: Record<string, string> = {
  ALTA: "Urgência alta",
  MEDIA: "Urgência média",
  BAIXA: "Urgência baixa",
};

export const URGENCIA_SCHEME: Record<string, "danger" | "warning" | "safe"> = {
  ALTA: "danger",
  MEDIA: "warning",
  BAIXA: "safe",
};

export const URGENCIA_ORDEM: Record<string, number> = {
  ALTA: 0,
  MEDIA: 1,
  BAIXA: 2,
};
