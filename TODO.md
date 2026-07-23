# Correções futuras

- [ ] Adicionar `DIRECT_URL` ao `.env` — o `schema.prisma` usa `env("DIRECT_URL")` (string do Neon **sem** `-pooler`). Sem ela, comandos da CLI do Prisma (`migrate`, `db push`) falham localmente.
- [ ] Investigar `.jpg` em `public/animais-guia-ms/` marcados como modificados no `git status` sem mudança de conteúdo (resquício da cópia Windows→WSL). Normalizar com commit único ou `git checkout -- public/`.
