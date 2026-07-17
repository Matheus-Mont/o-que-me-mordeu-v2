import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Tema do "O que me mordeu?" — mesma paleta semântica do projeto original
// (globals.css): verde = "o que fazer", vermelho = "o que não fazer" / SOS,
// âmbar = aviso geral, azul = navegação/ação neutra. Aqui cada cor ganha um
// par claro/escuro via tokens semânticos, com o app abrindo em modo escuro
// por padrão e o usuário podendo trocar para claro a qualquer momento.

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  // Escala completa "accent" (mesmo azul do design system original) —
  // necessária para que colorScheme="accent" funcione nos componentes
  // padrão do Chakra (Button, Checkbox, Progress etc). Os tokens
  // semânticos abaixo (accent.bg/text/solid...) continuam sendo a forma
  // preferida de estilizar diretamente com suporte a claro/escuro.
  accent: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
};

const semanticTokens = {
  colors: {
    "bg.canvas": { default: "#ffffff", _dark: "#14161a" },
    "bg.surface": { default: "#f9fafb", _dark: "#1c1f24" },
    "bg.surfaceHover": { default: "#f1f5f9", _dark: "#22262c" },
    border: { default: "#e5e7eb", _dark: "#2a2e35" },
    borderStrong: { default: "#d1d5db", _dark: "#3a3e46" },
    "text.primary": { default: "#1f2937", _dark: "#e8e9ec" },
    "text.secondary": { default: "#6b7280", _dark: "#9aa0aa" },
    "text.muted": { default: "#9ca3af", _dark: "#6b7078" },

    "safe.bg": { default: "#dcfce7", _dark: "#103a20" },
    "safe.border": { default: "#86efac", _dark: "#1f6b3f" },
    "safe.text": { default: "#15803d", _dark: "#86efac" },
    "safe.solid": { default: "#15803d", _dark: "#22c55e" },

    "danger.bg": { default: "#fee2e2", _dark: "#451a1a" },
    "danger.border": { default: "#fca5a5", _dark: "#7f2020" },
    "danger.text": { default: "#b91c1c", _dark: "#fca5a5" },
    "danger.solid": { default: "#b91c1c", _dark: "#dc2626" },

    "warning.bg": { default: "#fef3c7", _dark: "#402c08" },
    "warning.border": { default: "#fcd34d", _dark: "#7a5810" },
    "warning.text": { default: "#b45309", _dark: "#fcd34d" },

    "accent.bg": { default: "#dbeafe", _dark: "#16305c" },
    "accent.border": { default: "#93c5fd", _dark: "#2f5aa8" },
    "accent.text": { default: "#1d4ed8", _dark: "#93c5fd" },
    "accent.solid": { default: "#1d4ed8", _dark: "#2f5aa8" },
    "accent.solidHover": { default: "#1e40af", _dark: "#3b6bc0" },
  },
};

const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  fonts: {
    heading: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  radii: {
    card: "14px",
    control: "10px",
  },
  styles: {
    global: {
      body: {
        bg: "bg.canvas",
        color: "text.primary",
      },
      "*::placeholder": {
        color: "text.muted",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
      },
      defaultProps: {
        colorScheme: "accent",
      },
    },
    Badge: {
      baseStyle: {
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "full",
      },
    },
  },
});

export default theme;
