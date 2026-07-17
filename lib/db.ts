import { PrismaClient } from "@prisma/client";

// Singleton do Prisma Client — evita esgotar conexões em dev (hot reload
// do Next.js recarrega este módulo a cada mudança) e mantém a conexão
// reutilizável em ambiente serverless (Vercel).

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
