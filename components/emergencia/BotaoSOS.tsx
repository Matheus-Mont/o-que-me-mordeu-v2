"use client";

import { Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function BotaoSOS() {
  const pathname = usePathname();
  if (pathname === "/emergencia") return null;

  return (
    <Box
      as={NextLink}
      href="/emergencia"
      aria-label="sos — ir para tela de emergência"
      position="fixed"
      right={{ base: 4, md: 8 }}
      bottom={{ base: 5, md: 8 }}
      width="56px"
      height="56px"
      borderRadius="full"
      bg="danger.solid"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="heading"
      fontWeight={800}
      fontSize="0.75rem"
      textTransform="uppercase"
      textDecoration="none"
      boxShadow="0 6px 20px rgba(226,83,61,0.5)"
      zIndex={50}
      transition="transform 0.15s ease, background 0.15s ease"
      _hover={{ transform: "scale(1.05)", bg: "danger.solidHover" }}
    >
      sos
    </Box>
  );
}
