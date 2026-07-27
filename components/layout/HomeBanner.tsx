import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { TbArrowRight } from "react-icons/tb";

interface Props {
  titulo: string;
  descricao: string;
  imagem?: string;
  href?: string;
}

// O banner tem fundo verde-escuro fixo, então a partir de md o texto precisa ser
// claro nos dois modos de cor. No mobile não há imagem e valem os tokens do tema.
const COR_TITULO = { base: "text.primary", md: "#f4f1e8" };
const COR_DESCRICAO = { base: "text.secondary", md: "rgba(244,241,232,0.75)" };

export default function HomeBanner({
  titulo,
  descricao,
  imagem = "/banner-home.webp",
  href,
}: Props) {
  return (
    // Usa backgroundColor em vez de `bg`: a shorthand `background` que o `bg`
    // gera reseta backgroundSize/Position, e a imagem deixa de cobrir o banner.
    // `href` só vira link a partir de md: no mobile o banner não tem foto/borda
    // nenhuma, então não há nenhuma pista visual de que seria clicável ali.
    <Box
      position="relative"
      role="group"
      overflow="hidden"
      borderRadius={{ base: "0", md: "card" }}
      border={{ base: "none", md: "2px solid" }}
      borderColor={{ base: "border", md: href ? "accent.solid" : "border" }}
      boxShadow={{
        base: "none",
        md: href ? "0 14px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(232,178,61,0.15)" : "none",
      }}
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
      transition="border-color 0.15s ease, box-shadow 0.15s ease"
      _hover={
        href
          ? {
              borderColor: "accent.solidHover",
              boxShadow: "0 18px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(232,178,61,0.35)",
            }
          : undefined
      }
    >
      {href && (
        <Box
          as={NextLink}
          href={href}
          position="absolute"
          inset={0}
          zIndex={2}
          display={{ base: "none", md: "block" }}
          borderRadius="card"
          aria-label={`${titulo} — clique para iniciar a triagem`}
        />
      )}

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

        {href && (
          <Flex
            display={{ base: "none", md: "flex" }}
            align="center"
            gap={2}
            mt={4}
            color="accent.solid"
            fontWeight={700}
            fontSize="13.5px"
            transition="gap 0.15s ease"
            _groupHover={{ gap: "14px" }}
          >
            <Box as="span" textDecoration="underline" textUnderlineOffset="3px">
              Clique aqui e comece a triagem agora
            </Box>
            <TbArrowRight aria-hidden />
          </Flex>
        )}
      </Box>

      {href && (
        <Flex
          position="relative"
          zIndex={1}
          display={{ base: "none", md: "flex" }}
          ml="auto"
          align="center"
          justify="center"
          flexShrink={0}
          w="56px"
          h="56px"
          borderRadius="full"
          bg="accent.solid"
          color="accent.onSolid"
          boxShadow="0 6px 20px rgba(232,178,61,0.45)"
          transition="transform 0.15s ease, box-shadow 0.15s ease"
          _groupHover={{
            transform: "scale(1.1)",
            boxShadow: "0 8px 26px rgba(232,178,61,0.6)",
          }}
        >
          <TbArrowRight size="1.4rem" aria-hidden />
        </Flex>
      )}
    </Box>
  );
}
