import type { Animal, DicaPrevencao, HistoricoAlteracao, User } from "@prisma/client";

export type { Animal, DicaPrevencao, HistoricoAlteracao, User };

export type UsuarioPublico = Omit<User, "passwordHash">;

export interface ErroApi {
  error: string;
  detalhes?: unknown;
}
