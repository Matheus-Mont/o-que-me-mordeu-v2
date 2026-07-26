import { Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  titulo: string;
  descricao: string;
  imagem?: string;
}

// O banner tem fundo verde-escuro fixo, então a partir de md o texto precisa ser
// claro nos dois modos de cor. No mobile não há imagem e valem os tokens do tema.
const COR_TITULO = { base: "text.primary", md: "#f4f1e8" };
const COR_DESCRICAO = { base: "text.secondary", md: "rgba(244,241,232,0.75)" };

export default function HomeBanner({ titulo, descricao, imagem = "/banner-home.webp" }: Props) {
  return (
    // Usa backgroundColor em vez de `bg`: a shorthand `background` que o `bg`
    // gera reseta backgroundSize/Position, e a imagem deixa de cobrir o banner.
    <Box
      position="relative"
      overflow="hidden"
      borderRadius={{ base: "0", md: "card" }}
      border={{ base: "none", md: "1px solid" }}
      borderColor="border"
      backgroundColor={{ base: "transparent", md: "#224436" }}
      backgroundImage={{ base: "none", md: `url('${imagem}')` }}
      backgroundSize="cover"
      backgroundPosition="right center"
      backgroundRepeat="no-repeat"
      minH={{ base: "auto", md: "270px", lg: "320px" }}
      display="flex"
      alignItems="center"
      px={{ base: 0, md: 8, lg: 10 }}
      py={{ base: 0, md: 8 }}
    >
      <Box
        position="absolute"
        inset={0}
        display={{ base: "none", md: "block" }}
        aria-hidden
        bgGradient="linear(to-r, rgba(11,23,19,0.55) 0%, rgba(11,23,19,0.2) 45%, transparent 70%)"
      />
      <Box position="relative" zIndex={1} maxW={{ base: "100%", md: "58%", lg: "52%" }}>
        <Heading
          as="h1"
          fontSize={{ base: "24px", md: "32px", lg: "38px" }}
          lineHeight={1.15}
          mb={3}
          color={COR_TITULO}
        >
          {titulo}
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color={COR_DESCRICAO} maxW="440px">
          {descricao}
        </Text>
      </Box>
    </Box>
  );
}
