import { Box, type ResponsiveValue } from "@chakra-ui/react";

// Contêiner padrão das telas públicas — largura de celular por padrão
// (como a antiga .tela), mas aceita `maxW` maior para telas que aproveitam
// mais espaço em desktop (catálogo, ficha do animal). `maxW` aceita tanto
// uma string fixa quanto um objeto responsivo ({ base, md, lg... }).

interface Props {
  children: React.ReactNode;
  maxW?: ResponsiveValue<string>;
}

export default function PageShell({ children, maxW = "480px" }: Props) {
  return (
    <Box maxW={maxW} mx="auto" px={{ base: 4, md: 6 }} py={{ base: 5, md: 8 }} pb={{ base: 24, md: 8 }} minH="100vh">
      {children}
    </Box>
  );
}
