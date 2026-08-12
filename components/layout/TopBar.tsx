"use client";

import NextLink from "next/link";
import { Box, Flex, Grid, HStack, Link, Text } from "@chakra-ui/react";
import { TbHelpCircle } from "react-icons/tb";
import ColorModeToggle from "./ColorModeToggle";
import LogoMark from "./LogoMark";

const LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/prevencao", label: "Prevenção" },
  { href: "/curiosidades", label: "Curiosidades" },
];

export default function TopBar() {
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

        <HStack
          spacing="18px"
          flexWrap="wrap"
          justify={{ base: "center", md: "flex-start" }}
          justifySelf={{ md: "end" }}
        >
          <Link
            as={NextLink}
            href="/identificar"
            display={{ base: "inline-flex", md: "none" }}
            fontSize="13px"
            color="accent.text"
            fontWeight={600}
            _hover={{ color: "accent.solidHover", textDecoration: "none" }}
          >
            Identificar
          </Link>
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
          <ColorModeToggle display={{ base: "none", md: "inline-flex" }} />
        </HStack>
      </Grid>
    </Box>
  );
}
