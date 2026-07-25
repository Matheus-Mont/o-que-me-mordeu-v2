import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  accent: {
    50: "#fdf6e3",
    100: "#faeac0",
    200: "#f5d98c",
    300: "#f0c75f",
    400: "#f0bf52",
    500: "#e8b23d",
    600: "#d9a32e",
    700: "#b98722",
    800: "#96700f",
    900: "#6f520a",
  },
};

const semanticTokens = {
  colors: {
    "bg.page": { default: "#eae6da", _dark: "#0b1713" },
    "bg.canvas": { default: "#f7f4ea", _dark: "#132821" },
    "bg.main": { default: "#f1ecdd", _dark: "#0f2119" },
    "bg.surface": { default: "#fffdf6", _dark: "#1d3226" },
    "bg.surfaceHover": { default: "#f1ecdd", _dark: "#22392b" },
    border: { default: "rgba(19,40,33,0.12)", _dark: "rgba(244,241,232,0.10)" },
    borderStrong: { default: "rgba(19,40,33,0.24)", _dark: "rgba(244,241,232,0.20)" },
    "text.primary": { default: "#1c2a22", _dark: "#f4f1e8" },
    "text.secondary": { default: "rgba(28,42,34,0.64)", _dark: "rgba(244,241,232,0.60)" },
    "text.muted": { default: "rgba(28,42,34,0.45)", _dark: "rgba(244,241,232,0.42)" },

    "safe.bg": { default: "rgba(111,174,124,0.16)", _dark: "rgba(93,214,130,0.20)" },
    "safe.border": { default: "rgba(111,174,124,0.40)", _dark: "rgba(120,224,150,0.55)" },
    "safe.text": { default: "#2f5e3c", _dark: "#7ff0a0" },
    "safe.solid": { default: "#3a6b47", _dark: "#57d47f" },

    "danger.bg": { default: "rgba(226,83,61,0.08)", _dark: "rgba(255,99,71,0.22)" },
    "danger.border": { default: "rgba(226,83,61,0.30)", _dark: "rgba(255,120,96,0.62)" },
    "danger.text": { default: "#8a3226", _dark: "#ff9580" },
    "danger.solid": { default: "#c8432f", _dark: "#f2543c" },
    "danger.solidHover": { default: "#b03a28", _dark: "#ff6a4f" },

    "warning.bg": { default: "rgba(232,178,61,0.16)", _dark: "rgba(245,190,70,0.22)" },
    "warning.border": { default: "rgba(200,150,40,0.45)", _dark: "rgba(245,196,80,0.62)" },
    "warning.text": { default: "#8a6410", _dark: "#f7c948" },

    "accent.bg": { default: "rgba(232,178,61,0.18)", _dark: "rgba(232,178,61,0.14)" },
    "accent.border": { default: "rgba(200,150,40,0.45)", _dark: "rgba(232,178,61,0.40)" },
    "accent.text": { default: "#96700f", _dark: "#e8b23d" },
    "accent.solid": { default: "#e8b23d", _dark: "#e8b23d" },
    "accent.solidHover": { default: "#d9a32e", _dark: "#f0bf52" },
    "accent.onSolid": { default: "#132821", _dark: "#132821" },
  },
};

const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  fonts: {
    heading: "var(--font-sora), 'Sora', system-ui, sans-serif",
    body: "var(--font-plex), 'IBM Plex Sans', system-ui, sans-serif",
  },
  radii: {
    card: "14px",
    control: "10px",
  },
  styles: {
    global: {
      body: {
        bg: "bg.page",
        color: "text.primary",
      },
      ".app-frame": {
        maxWidth: "1040px",
        marginInline: "auto",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        bg: "bg.canvas",
        boxShadow: "0 0 60px rgba(0,0,0,0.4)",
      },
      "*::placeholder": {
        color: "text.muted",
      },
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-thumb": {
        bg: "borderStrong",
        borderRadius: "8px",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: "control",
      },
      variants: {
        solid: (props: { colorScheme: string }) =>
          props.colorScheme === "accent"
            ? {
                bg: "accent.solid",
                color: "accent.onSolid",
                _hover: {
                  bg: "accent.solidHover",
                  _disabled: { bg: "accent.solid" },
                },
                _active: { bg: "accent.solidHover" },
              }
            : {},
        outline: {
          borderColor: "borderStrong",
          color: "text.primary",
          _hover: { bg: "bg.surfaceHover" },
          _active: { bg: "bg.surfaceHover" },
        },
        ghost: {
          color: "text.secondary",
          _hover: { bg: "bg.surfaceHover", color: "text.primary" },
          _active: { bg: "bg.surfaceHover" },
        },
      },
      defaultProps: {
        colorScheme: "accent",
      },
    },
    Badge: {
      baseStyle: {
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "8px",
        px: 2.5,
        py: 0.5,
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "bg.surface",
            borderColor: "border",
            borderRadius: "control",
            _hover: { borderColor: "borderStrong" },
            _focusVisible: {
              borderColor: "accent.solid",
              boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: "bg.surface",
            borderColor: "border",
            borderRadius: "control",
            _hover: { borderColor: "borderStrong" },
            _focusVisible: {
              borderColor: "accent.solid",
              boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          bg: "bg.surface",
          borderColor: "border",
          borderRadius: "control",
          _hover: { borderColor: "borderStrong" },
          _focusVisible: {
            borderColor: "accent.solid",
            boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "borderStrong",
          borderRadius: "4px",
          _checked: {
            bg: "accent.solid",
            borderColor: "accent.solid",
            color: "accent.onSolid",
            _hover: {
              bg: "accent.solidHover",
              borderColor: "accent.solidHover",
            },
          },
        },
      },
    },
    Progress: {
      baseStyle: {
        track: {
          bg: "border",
        },
        filledTrack: {
          bg: "accent.solid",
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "border",
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "bg.surface",
          borderColor: "border",
          borderRadius: "control",
          boxShadow: "lg",
        },
        item: {
          bg: "transparent",
          _hover: { bg: "bg.surfaceHover" },
          _focus: { bg: "bg.surfaceHover" },
        },
      },
    },
  },
});

export default theme;
