import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Providers from "./providers";
import ScrollToTop from "@/components/layout/ScrollToTop";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

// Mono só para dado clínico: código de urgência, número, fonte da informação.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
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
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${archivo.variable} ${plex.variable} ${plexMono.variable}`}
    >
      <body suppressHydrationWarning>
        <Providers>
          <ScrollToTop />
          <div className="app-frame">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
