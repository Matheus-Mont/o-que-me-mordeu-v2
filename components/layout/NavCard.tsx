import { Box, HStack, LinkBox, LinkOverlay, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import type { IconType } from "react-icons";
import { TbChevronRight } from "react-icons/tb";

interface Props {
  href: string;
  icon: IconType;
  title: string;
  subtitle: string;
}

// Card de navegação usado na tela inicial (identificar / catálogo /
// prevenção) — ícone, título, subtítulo discreto e seta, com área de
// toque generosa para uso confortável em celular.

export default function NavCard({ href, icon: Icon, title, subtitle }: Props) {
  return (
    <LinkBox
      as="article"
      display="flex"
      alignItems="center"
      gap={4}
      bg="bg.surface"
      border="1px solid"
      borderColor="border"
      borderRadius="card"
      p={4}
      transition="background 0.15s ease, border-color 0.15s ease"
      _hover={{ bg: "bg.surfaceHover", borderColor: "borderStrong" }}
    >
      <Box
        as={Icon}
        fontSize="1.4rem"
        color="accent.text"
        flexShrink={0}
        aria-hidden
      />
      <VStack align="start" spacing={0} flex={1}>
        <LinkOverlay as={NextLink} href={href}>
          <Text fontWeight={600}>{title}</Text>
        </LinkOverlay>
        <Text fontSize="sm" color="text.secondary">
          {subtitle}
        </Text>
      </VStack>
      <Box as={TbChevronRight} color="text.secondary" fontSize="1.1rem" flexShrink={0} />
    </LinkBox>
  );
}
