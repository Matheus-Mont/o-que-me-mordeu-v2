"use client";

import NextLink from "next/link";
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { TbPaw } from "react-icons/tb";
import ColorModeToggle from "./ColorModeToggle";

const LINKS = [
  { href: "/identificar", label: "Identificar" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/prevencao", label: "Prevenção" },
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
      <Flex
        align="center"
        gap={2.5}
        flexWrap="wrap"
        px={{ base: 5, md: 6 }}
        pt="18px"
        pb="14px"
        maxW="1040px"
        mx="auto"
      >
        <Flex
          as={NextLink}
          href="/"
          w="36px"
          h="36px"
          borderRadius="control"
          bg="bg.surface"
          color="accent.text"
          align="center"
          justify="center"
          flexShrink={0}
          fontSize="1.1rem"
          aria-label="início"
        >
          <TbPaw aria-hidden />
        </Flex>
        <Box as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <Text fontFamily="heading" fontWeight={700} fontSize="md" lineHeight={1.1}>
            O que me mordeu?
          </Text>
          <Text fontSize="11px" color="text.secondary" display={{ base: "none", sm: "block" }}>
            Identificação de animais peçonhentos e orientação de primeiros socorros
          </Text>
        </Box>
        <HStack spacing="18px" ml="auto" flexWrap="wrap">
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
      </Flex>
    </Box>
  );
}
