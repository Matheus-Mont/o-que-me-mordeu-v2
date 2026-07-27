# 🐍 O que me mordeu?

App informativo para identificação de animais peçonhentos comuns no Brasil — cobras, aranhas, escorpiões, lagartas (taturanas) e águas-vivas — com orientação de primeiros socorros. Todo o conteúdo tem como base o [Guia de Animais Peçonhentos do Brasil](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/publicacoes/guia-animais-peconhentos-do-brasil.pdf/view), do Ministério da Saúde.

> ⚠️ **Este projeto é informativo e educativo — não substitui avaliação médica.** Em caso de acidente real, procure atendimento de saúde imediatamente. Em emergência, ligue **192** (SAMU).

## O que tem no app

- **Triagem guiada** (`/identificar`) — um wizard de poucas perguntas (tipo de animal, região, características visuais, marca da picada, sintomas) que sugere as espécies mais prováveis, com nível de confiança.
- **Catálogo** (`/catalogo`) — todas as espécies cadastradas, com busca (sem acento), filtro por categoria/região/gravidade e ordenação.
- **Ficha de cada animal** (`/animal/[slug]`) — como identificar, sintomas, o que fazer e o que não fazer, soro indicado.
- **Prevenção** (`/prevencao`) — cuidados por ambiente (casa, mata/trilha, rios/lagos, praia).
- **Emergência** (`/emergencia`) — telefones, primeiros socorros gerais e o link mais rápido possível pra quem está em pânico.
- **Painel administrativo** (`/admin`) — CRUD de animais e dicas de prevenção, com fluxo de revisão (rascunho → revisado → publicado) e histórico de alterações.

## Stack

[Next.js 14](https://nextjs.org/) (App Router) · [TypeScript](https://www.typescriptlang.org/) · [Chakra UI](https://chakra-ui.com/) · [Prisma](https://www.prisma.io/) + PostgreSQL · [Zod](https://zod.dev/) · [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) · deploy na [Vercel](https://vercel.com/)

## Rodando localmente

**Pré-requisitos:** Node 22+, [pnpm](https://pnpm.io/) e um banco Postgres (o projeto foi feito pensando em [Neon](https://neon.tech/) ou [Supabase](https://supabase.com/), que têm plano gratuito).

```bash
pnpm install
cp .env.example .env
```

Preencha o `.env` (veja os comentários no próprio `.env.example` — `DATABASE_URL`/`DIRECT_URL` do seu banco, um `AUTH_SECRET` aleatório e as credenciais do admin de seed).

```bash
pnpm prisma:migrate   # cria as tabelas
pnpm db:seed          # popula com espécies e dicas de exemplo + cria o usuário admin
pnpm dev              # http://localhost:3000
```

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Aplica migrations pendentes e gera o build de produção |
| `pnpm start` | Sobe o build de produção |
| `pnpm typecheck` | Checagem de tipos (`tsc --noEmit`) |
| `pnpm test` | Roda a suíte de testes uma vez |
| `pnpm test:watch` | Testes em modo watch |
| `pnpm prisma:studio` | Abre o Prisma Studio (navegar/editar o banco visualmente) |
| `pnpm prisma:migrate` | Cria uma nova migration em desenvolvimento |
| `pnpm db:seed` | Repopula o banco com os dados de exemplo |

## Testes e CI

A suíte usa [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/), cobrindo desde a lógica pura de identificação (`lib/identificacao/engine.ts`) até páginas inteiras (mockando o Prisma) e rotas de API. Rode com `pnpm test`.

Todo PR e push em `main` disparam o workflow em [`.github/workflows/ci.yml`](.github/workflows/ci.yml), que roda `typecheck` + `test` sem precisar de banco de dados nem segredos.

## Estrutura do projeto

```
app/
  (public)/       páginas públicas — home, catálogo, ficha do animal, identificar, prevenção, emergência
  admin/          painel administrativo (autenticado)
  api/            rotas de API (animais, prevenção, autenticação)
components/       componentes de UI, organizados por área (animal, admin, layout, identificacao)
lib/              lógica de negócio: algoritmo de identificação, auth, validações (Zod), acesso ao banco
prisma/           schema, migrations e seed
test/             suíte de testes, espelhando a estrutura de app/ e components/
```

## Deploy

O deploy é feito na [Vercel](https://vercel.com/), conectada diretamente a este repositório — todo push em `main` gera um novo deploy de produção automaticamente. As variáveis de ambiente (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`) precisam estar configuradas no projeto da Vercel.

---

Contato e mais projetos: [github.com/Matheus-Mont](https://github.com/Matheus-Mont)
