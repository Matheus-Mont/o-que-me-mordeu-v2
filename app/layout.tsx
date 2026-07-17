import type { Metadata } from "next";
import Providers from "./providers";

// Layout raiz — shell HTML exigido pelo App Router. As telas em si
// vivem em app/(public)/** (usuário final) e app/admin/** (painel).
// Todo o estilo vem do Chakra UI (app/theme.ts); não há mais globals.css
// com classes utilitárias manuais.

export const metadata: Metadata = {
  title: "O que me mordeu?",
  description:
    "App informativo para identificação de animais peçonhentos comuns no Brasil e orientação de primeiros socorros. Não substitui atendimento médico.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
