"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Collapse, Flex, Grid, HStack, Link, Text } from "@chakra-ui/react";
import { TbHelpCircle, TbMenu2, TbX } from "react-icons/tb";
import ColorModeToggle from "./ColorModeToggle";
import LogoMark from "./LogoMark";

const LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/prevencao", label: "Prevenção" },
  { href: "/curiosidades", label: "Curiosidades" },
];

export default function TopBar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();

  // Fecha o menu mobile sozinho quando o usuário navega pra outra página.
  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={5}
      bg="bg.canvas"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1fr auto 1fr" }}
        alignItems="center"
        columnGap={2.5}
        rowGap={2.5}
        px={{ base: 5, md: 6 }}
        pt="18px"
        pb="14px"
        maxW="content"
        mx="auto"
      >
        <Flex align="center" gap={2.5} w={{ base: "full", md: "auto" }} justifySelf="start">
          <Flex
            as={NextLink}
            href="/"
            w="36px"
            h="36px"
            borderRadius="control"
            overflow="hidden"
            align="center"
            justify="center"
            flexShrink={0}
            aria-label="início"
          >
            <LogoMark size={36} />
          </Flex>
          <Box as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
            <Text fontFamily="heading" fontWeight={700} fontSize="md" lineHeight={1.1}>
              O que me mordeu?
            </Text>
            <Text fontSize="11px" color="text.secondary" display={{ base: "none", sm: "block" }}>
              Identificação de animais peçonhentos e orientação de primeiros socorros
            </Text>
          </Box>
          <ColorModeToggle ml="auto" display={{ base: "inline-flex", md: "none" }} />
        </Flex>

        <Flex display={{ base: "none", md: "flex" }} justify="center">
          <Link
            as={NextLink}
            href="/identificar"
            display="inline-flex"
            alignItems="center"
            gap={1.5}
            h="36px"
            px="18px"
            flexShrink={0}
            borderRadius="control"
            border="1px solid"
            borderColor="accent.solid"
            bg="accent.bg"
            color="accent.text"
            fontSize="13.5px"
            fontWeight={700}
            animation="pulso-destaque 3s ease-out infinite"
            transition="background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.15s ease"
            _hover={{
              bg: "accent.solid",
              color: "accent.onSolid",
              borderColor: "accent.solid",
              transform: "scale(1.04)",
              textDecoration: "none",
            }}
            sx={{
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          >
            <Box as={TbHelpCircle} fontSize="1.05rem" aria-hidden />
            Identificar
          </Link>
        </Flex>

        {/* Desktop: todos os links soltos lado a lado. */}
        <HStack
          display={{ base: "none", md: "flex" }}
          spacing="18px"
          justify="flex-start"
          justifySelf="end"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              as={NextLink}
              href={link.href}
              fontSize="13px"
              color="text.secondary"
              _hover={{ color: "text.primary", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            as={NextLink}
            href="/emergencia"
            fontSize="13px"
            color="danger.text"
            _hover={{ color: "danger.solid", textDecoration: "none" }}
          >
            Emergência
          </Link>
          <ColorModeToggle />
        </HStack>

        {/* Mobile: só Identificar e Emergência à mostra; o resto fica atrás do menu. */}
        <Flex display={{ base: "flex", md: "none" }} align="center" justify="space-between" w="full">
          <Link
            as={NextLink}
            href="/identificar"
            fontSize="13px"
            color="accent.text"
            fontWeight={600}
            _hover={{ color: "accent.solidHover", textDecoration: "none" }}
          >
            Identificar
          </Link>

          <Flex
            as="button"
            type="button"
            align="center"
            gap={1}
            fontSize="13px"
            color="text.secondary"
            fontWeight={600}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            onClick={() => setMenuAberto((v) => !v)}
          >
            <Box as={menuAberto ? TbX : TbMenu2} fontSize="1.05rem" aria-hidden />
            Menu
          </Flex>

          <Link
            as={NextLink}
            href="/emergencia"
            fontSize="13px"
            color="danger.text"
            fontWeight={600}
            _hover={{ color: "danger.solid", textDecoration: "none" }}
          >
            Emergência
          </Link>
        </Flex>

        <Box display={{ base: "block", md: "none" }} gridColumn="1 / -1" w="full">
          <Collapse in={menuAberto} animateOpacity>
            <Flex
              id="menu-mobile"
              direction="column"
              align="stretch"
              gap="2px"
              mt="4px"
              pt="10px"
              borderTop="1px solid"
              borderColor="border"
            >
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  as={NextLink}
                  href={link.href}
                  py="10px"
                  fontSize="14px"
                  color="text.secondary"
                  _hover={{ color: "text.primary", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </Flex>
          </Collapse>
        </Box>
      </Grid>
    </Box>
  );
}
