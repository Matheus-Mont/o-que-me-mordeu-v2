"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

// Botão SOS — camada flutuante global. Um toque, sem confirmação, leva
// direto à tela de emergência. Escondido na própria tela de emergência
// para não duplicar a ação.

export default function BotaoSOS() {
  const pathname = usePathname();
  const ringColor = useColorModeValue("white", "bg.canvas");
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
      fontWeight={700}
      fontSize="0.8rem"
      textDecoration="none"
      boxShadow="0 2px 14px rgba(0,0,0,0.35)"
      border="3px solid"
      borderColor={ringColor}
      zIndex={50}
      transition="transform 0.15s ease"
      _hover={{ transform: "scale(1.05)" }}
    >
      sos
    </Box>
  );
}
