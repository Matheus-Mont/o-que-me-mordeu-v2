"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { TbSun, TbMoon } from "react-icons/tb";

// Alternador de tema — o app abre em modo escuro (app/theme.ts), mas o
// usuário pode trocar para claro a qualquer momento; a escolha persiste
// sozinha (Chakra grava em localStorage/cookie via ColorModeScript).

interface Props {
  size?: "sm" | "md";
}

export default function ColorModeToggle({ size = "sm" }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label={isDark ? "mudar para modo claro" : "mudar para modo escuro"}
      icon={isDark ? <TbSun /> : <TbMoon />}
      onClick={toggleColorMode}
      variant="ghost"
      size={size}
      borderRadius="full"
      color="text.secondary"
    />
  );
}
