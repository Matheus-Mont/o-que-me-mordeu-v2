"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

// Provider client-side do Chakra. Envolve toda a árvore em app/layout.tsx.
// O ColorModeScript injeta um script inline que aplica o modo de cor salvo
// (ou o padrão "dark" configurado em app/theme.ts) antes da primeira pintura,
// evitando flash de tela clara ao carregar.

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
