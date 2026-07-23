import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import Providers from "./providers";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

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
    <html lang="pt-BR" suppressHydrationWarning className={`${sora.variable} ${plex.variable}`}>
      <body>
        <Providers>
          <div className="app-frame">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
