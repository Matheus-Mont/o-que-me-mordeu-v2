import { Box, Flex, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type EscalaTriagem = "danger" | "warning" | "safe" | "accent" | "neutral";

interface Props {
  escala: EscalaTriagem;
  titulo?: string;
  /** Passe JSX pronto (<TbCheck />), nunca a referência do componente. */
  icone?: ReactNode;
  children: ReactNode;
}

const FUNDO: Record<EscalaTriagem, string> = {
  danger: "danger.bg",
  warning: "warning.bg",
  safe: "safe.bg",
  accent: "accent.bg",
  neutral: "bg.surface",
};

const BORDA: Record<EscalaTriagem, string> = {
  danger: "danger.border",
  warning: "warning.border",
  safe: "safe.border",
  accent: "accent.border",
  neutral: "border",
};

const ESPINHA: Record<EscalaTriagem, string> = {
  danger: "danger.solid",
  warning: "warning.solid",
  safe: "safe.solid",
  accent: "accent.solid",
  neutral: "borderStrong",
};

const COR_TITULO: Record<EscalaTriagem, string> = {
  danger: "danger.text",
  warning: "warning.text",
  safe: "safe.text",
  accent: "accent.text",
  neutral: "text.primary",
};

// A "espinha": barra de cor colada na borda esquerda de todo bloco que carrega
// gravidade. O leitor aprende o código uma vez (vermelho/laranja/verde) e ele
// vale igual no resultado da triagem, na ficha do animal e no quiz.
export default function BlocoTriagem({ escala, titulo, icone, children }: Props) {
  return (
    <Flex
      bg={FUNDO[escala]}
      border="1px solid"
      borderColor={BORDA[escala]}
      borderRadius="card"
      overflow="hidden"
    >
      <Box w="5px" flexShrink={0} bg={ESPINHA[escala]} aria-hidden />
      <Box flex="1" minW={0} p={4}>
        {titulo && (
          <Flex align="center" gap={1.5} mb={2.5} color={COR_TITULO[escala]}>
            {icone && (
              <Box display="flex" flexShrink={0} aria-hidden>
                {icone}
              </Box>
            )}
            <Text as="span" fontFamily="heading" fontWeight={700} fontSize="14px">
              {titulo}
            </Text>
          </Flex>
        )}
        {children}
      </Box>
    </Flex>
  );
}
