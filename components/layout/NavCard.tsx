import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { TbArrowRight } from "react-icons/tb";
import type { IconType } from "react-icons";

interface Props {
  href: string;
  title: string;
  subtitle: string;
  variant?: "default" | "primary";
  icon?: IconType;
  layout?: "stack" | "row";
  showArrow?: boolean;
}

export default function NavCard({
  href,
  title,
  subtitle,
  variant = "default",
  icon: Icon,
  layout = "stack",
  showArrow = false,
}: Props) {
  const primary = variant === "primary";
  const row = layout === "row";
  const chipBg = primary ? "blackAlpha.200" : "accent.bg";
  const chipColor = primary ? "accent.onSolid" : "accent.text";

  return (
    <Box
      as={NextLink}
      href={href}
      display="flex"
      flexDirection={row ? "row" : "column"}
      alignItems={row ? "center" : "flex-start"}
      gap={row ? { base: 3, md: 5 } : 0}
      bg={primary ? "accent.solid" : "bg.surface"}
      color={primary ? "accent.onSolid" : "text.primary"}
      border="1px solid"
      borderColor={primary ? "accent.solid" : "border"}
      borderRadius="card"
      p={row ? { base: "18px", md: "20px 24px" } : "18px"}
      transition="background 0.15s ease, border-color 0.15s ease"
      _hover={{
        textDecoration: "none",
        ...(primary
          ? { bg: "accent.solidHover", borderColor: "accent.solidHover" }
          : { bg: "bg.surfaceHover", borderColor: "borderStrong" }),
      }}
    >
      {Icon && (
        <Flex
          align="center"
          justify="center"
          flexShrink={0}
          w={{ base: "38px", md: row ? "48px" : "42px" }}
          h={{ base: "38px", md: row ? "48px" : "42px" }}
          mb={row ? 0 : 3}
          borderRadius="control"
          bg={chipBg}
          color={chipColor}
        >
          <Box fontSize={{ base: "1.15rem", md: row ? "1.45rem" : "1.3rem" }} aria-hidden>
            <Icon />
          </Box>
        </Flex>
      )}

      <Box flex={row ? "1" : undefined} minW={0}>
        <Text
          fontFamily="heading"
          fontWeight={700}
          fontSize={row ? { base: "xl", md: "2xl" } : "md"}
          mb={1}
        >
          {title}
        </Text>
        <Text
          fontSize={row ? { base: "13.5px", md: "sm" } : "12.5px"}
          color={primary ? "accent.onSolid" : "text.secondary"}
          opacity={primary ? 0.75 : 1}
        >
          {subtitle}
        </Text>
      </Box>

      {showArrow && (
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          justify="center"
          flexShrink={0}
          w="40px"
          h="40px"
          borderRadius="full"
          bg={chipBg}
          color={chipColor}
        >
          <Box fontSize="1.15rem" aria-hidden>
            <TbArrowRight />
          </Box>
        </Flex>
      )}
    </Box>
  );
}
