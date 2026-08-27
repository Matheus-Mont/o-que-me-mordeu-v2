import { Box, Flex, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  cor?: string;
  /** Tracinho curto antes do texto, para abrir uma seção importante. */
  traco?: boolean;
}

// Rótulo curto em mono, usado para dado clínico e abertura de seção.
// A monoespaçada só aparece aqui e em número/fonte: é o que dá ao app
// a textura de registro de campo sem precisar de mais cor.
export default function Etiqueta({ children, cor = "text.muted", traco = false }: Props) {
  const texto = (
    <Text
      as="span"
      fontFamily="mono"
      fontSize="10px"
      fontWeight={600}
      letterSpacing="0.14em"
      textTransform="uppercase"
      color={cor}
    >
      {children}
    </Text>
  );

  if (!traco) return texto;

  return (
    <Flex align="center" gap={2}>
      <Box w="22px" h="2px" bg={cor} flexShrink={0} aria-hidden />
      {texto}
    </Flex>
  );
}
