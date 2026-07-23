import { Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  href: string;
  title: string;
  subtitle: string;
  variant?: "default" | "primary";
}

export default function NavCard({ href, title, subtitle, variant = "default" }: Props) {
  const primary = variant === "primary";

  return (
    <Box
      as={NextLink}
      href={href}
      display="block"
      bg={primary ? "accent.solid" : "bg.surface"}
      color={primary ? "accent.onSolid" : "text.primary"}
      border="1px solid"
      borderColor={primary ? "accent.solid" : "border"}
      borderRadius="card"
      p="18px"
      transition="background 0.15s ease, border-color 0.15s ease"
      _hover={{
        textDecoration: "none",
        ...(primary
          ? { bg: "accent.solidHover", borderColor: "accent.solidHover" }
          : { bg: "bg.surfaceHover", borderColor: "borderStrong" }),
      }}
    >
      <Text fontFamily="heading" fontWeight={700} fontSize="md" mb={1}>
        {title}
      </Text>
      <Text
        fontSize="12.5px"
        color={primary ? "accent.onSolid" : "text.secondary"}
        opacity={primary ? 0.75 : 1}
      >
        {subtitle}
      </Text>
    </Box>
  );
}
