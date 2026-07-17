import type { Animal, DicaPrevencao, HistoricoAlteracao, User } from "@prisma/client";

// Tipos compartilhados pela aplicação. Os modelos de dados em si vêm do
// Prisma Client (gerado a partir de prisma/schema.prisma); aqui só
// re-exportamos e compomos tipos auxiliares usados pela UI/API.

export type { Animal, DicaPrevencao, HistoricoAlteracao, User };

/** Usuário sem o hash de senha, seguro para trafegar para o cliente. */
export type UsuarioPublico = Omit<User, "passwordHash">;

/** Resposta padrão de erro das rotas de API. */
export interface ErroApi {
  error: string;
  detalhes?: unknown;
}
