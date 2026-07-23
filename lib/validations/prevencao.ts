import { z } from "zod";

export const ambienteEnum = z.enum(["CASA", "MATA_TRILHA", "RIOS_LAGOS", "PRAIA"]);

export const dicaContentSchema = z.object({
  ambiente: ambienteEnum,
  icone: z.string().min(1),
  dicas: z.array(z.string().min(1)).min(1),
  fonteConsultor: z.string().optional().nullable(),
});

export const dicaUpdateSchema = dicaContentSchema.partial();

export const statusTransitionSchema = z.object({
  status: z.enum(["RASCUNHO", "REVISADO", "PUBLICADO"]),
  revisadoPor: z.string().min(1).optional(),
  observacao: z.string().optional(),
});

export type DicaContentInput = z.infer<typeof dicaContentSchema>;
