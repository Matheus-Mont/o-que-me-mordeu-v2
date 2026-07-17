import { z } from "zod";

export const categoriaEnum = z.enum([
  "COBRA",
  "ARANHA",
  "ESCORPIAO",
  "TATURANA",
  "AGUA_VIVA",
]);

export const nivelUrgenciaEnum = z.enum(["ALTA", "MEDIA", "BAIXA"]);

/** Campos de conteúdo da ficha (seção "Modelo de dados — animal" da spec). */
export const animalContentSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "use apenas letras minúsculas, números e hífens"),
  nomePopular: z.string().min(1),
  nomeCientifico: z.string().min(1),
  categoria: categoriaEnum,
  nivelUrgencia: nivelUrgenciaEnum,
  regioes: z.array(z.string()).default([]),
  /** Várias fotos/ângulos da espécie — ordem da lista = ordem no carrossel. */
  imagens: z.array(z.string().url()).default([]),
  identificacao: z.array(z.string()).default([]),
  sintomas: z.string().min(1),
  tempoSintomas: z.string().min(1),
  primeirosSocorrosFazer: z.array(z.string()).default([]),
  primeirosSocorrosNaoFazer: z.array(z.string()).default([]),
  soroIndicado: z.string().min(1),
  /// Campo interno de governança — fonte/consultor responsável.
  fonteConsultor: z.string().optional().nullable(),
});

export const animalUpdateSchema = animalContentSchema.partial();

/** Body para transição de status (rascunho -> revisado -> publicado). */
export const statusTransitionSchema = z.object({
  status: z.enum(["RASCUNHO", "REVISADO", "PUBLICADO"]),
  revisadoPor: z.string().min(1).optional(),
  observacao: z.string().optional(),
});

export type AnimalContentInput = z.infer<typeof animalContentSchema>