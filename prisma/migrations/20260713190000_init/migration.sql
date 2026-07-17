-- Migration inicial: cria os tipos enum e tabelas descritos em prisma/schema.prisma
-- Gerada manualmente (sandbox sem acesso ao registry/DB para rodar `prisma migrate dev`);
-- equivalente ao que o Prisma geraria a partir do schema. Antes do primeiro deploy real,
-- rode `npx prisma migrate dev` localmente para confirmar que o diff bate com o schema.

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('COBRA', 'ARANHA', 'ESCORPIAO', 'TATURANA', 'AGUA_VIVA');
CREATE TYPE "NivelUrgencia" AS ENUM ('ALTA', 'MEDIA', 'BAIXA');
CREATE TYPE "Ambiente" AS ENUM ('CASA', 'MATA_TRILHA', 'RIOS_LAGOS', 'PRAIA');
CREATE TYPE "StatusConteudo" AS ENUM ('RASCUNHO', 'REVISADO', 'PUBLICADO');
CREATE TYPE "TipoEntidade" AS ENUM ('ANIMAL', 'PREVENCAO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nome" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animais" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nomePopular" TEXT NOT NULL,
    "nomeCientifico" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "nivelUrgencia" "NivelUrgencia" NOT NULL,
    "regioes" TEXT[],
    "imagemUrl" TEXT,
    "identificacao" TEXT[],
    "sintomas" TEXT NOT NULL,
    "tempoSintomas" TEXT NOT NULL,
    "primeirosSocorrosFazer" TEXT[],
    "primeirosSocorrosNaoFazer" TEXT[],
    "soroIndicado" TEXT NOT NULL,
    "status" "StatusConteudo" NOT NULL DEFAULT 'RASCUNHO',
    "fonteConsultor" TEXT,
    "revisadoPor" TEXT,
    "revisadoEm" TIMESTAMP(3),
    "publicadoEm" TIMESTAMP(3),
    "criadoPorId" TEXT,
    "atualizadoPorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dicas_prevencao" (
    "id" TEXT NOT NULL,
    "ambiente" "Ambiente" NOT NULL,
    "icone" TEXT NOT NULL,
    "dicas" TEXT[],
    "status" "StatusConteudo" NOT NULL DEFAULT 'RASCUNHO',
    "fonteConsultor" TEXT,
    "revisadoPor" TEXT,
    "revisadoEm" TIMESTAMP(3),
    "publicadoEm" TIMESTAMP(3),
    "criadoPorId" TEXT,
    "atualizadoPorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dicas_prevencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_alteracoes" (
    "id" TEXT NOT NULL,
    "tipoEntidade" "TipoEntidade" NOT NULL,
    "animalId" TEXT,
    "dicaPrevencaoId" TEXT,
    "statusAnterior" "StatusConteudo",
    "statusNovo" "StatusConteudo",
    "camposAlterados" JSONB,
    "observacao" TEXT,
    "alteradoPorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_alteracoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "animais_slug_key" ON "animais"("slug");
CREATE INDEX "animais_status_idx" ON "animais"("status");
CREATE INDEX "animais_categoria_idx" ON "animais"("categoria");
CREATE INDEX "dicas_prevencao_status_idx" ON "dicas_prevencao"("status");
CREATE INDEX "dicas_prevencao_ambiente_idx" ON "dicas_prevencao"("ambiente");
CREATE INDEX "historico_alteracoes_animalId_idx" ON "historico_alteracoes"("animalId");
CREATE INDEX "historico_alteracoes_dicaPrevencaoId_idx" ON "historico_alteracoes"("dicaPrevencaoId");

-- AddForeignKey
ALTER TABLE "animais" ADD CONSTRAINT "animais_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "animais" ADD CONSTRAINT "animais_atualizadoPorId_fkey" FOREIGN KEY ("atualizadoPorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "dicas_prevencao" ADD CONSTRAINT "dicas_prevencao_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "dicas_prevencao" ADD CONSTRAINT "dicas_prevencao_atualizadoPorId_fkey" FOREIGN KEY ("atualizadoPorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "historico_alteracoes" ADD CONSTRAINT "historico_alteracoes_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "historico_alteracoes" ADD CONSTRAINT "historico_alteracoes_dicaPrevencaoId_fkey" FOREIGN KEY ("dicaPrevencaoId") REFERENCES "dicas_prevencao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "historico_alteracoes" ADD CONSTRAINT "historico_alteracoes_alteradoPorId_fkey" FOREIGN KEY ("alteradoPorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
