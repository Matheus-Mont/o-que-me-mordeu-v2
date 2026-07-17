import { memo } from "react";
import { Badge, Box, LinkBox, LinkOverlay, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { TbChevronRight, TbPhoto } from "react-icons/tb";
import type { Animal } from "@prisma/client";

// Só os campos que o card realmente usa — assim tanto o objeto enxuto vindo
// do catálogo (select parcial no servidor) quanto um Animal completo (usado
// pelo wizard "identificar") satisfazem a prop.
export type AnimalCardData = Pick<
  Animal,
  "slug" | "nomePopular" | "nivelUrgencia" | "imagens"
>;

const URGENCIA_LABEL: Record<Animal["nivelUrgencia"], string> = {
  ALTA: "urgência alta",
  MEDIA: "urgência média",
  BAIXA: "urgência baixa",
};

const URGENCIA_SCHEME: Record<Animal["nivelUrgencia"], "danger" | "warning" | "safe"> = {
  ALTA: "danger",
  MEDIA: "warning",
  BAIXA: "safe",
};

// Card usado no catálogo e nas sugestões do wizard "identificar". A
// miniatura usa só a primeira foto — o carrossel completo fica na ficha
// do animal (app/(public)/animal/[slug]).
//
// Memoizado: no catálogo, digitar no filtro re-renderiza a lista inteira; sem
// o memo, cada um dos ~9 cards (com vários componentes estilizados do Chakra)
// recalcularia estilos a cada tecla. Com o memo, só re-renderiza o card cujo
// `animal` de fato mudou.

function AnimalCard({ animal }: { animal: AnimalCardData }) {
  const scheme = URGENCIA_SCHEME[animal.nivelUrgencia];

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
        width="48px"
        height="48px"
        borderRadius="10px"
        bg="bg.canvas"
        border="1px dashed"
        borderColor="border"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        overflow="hidden"
        position="relative"
      >
        {animal.imagens[0] ? (
          <NextImage
            src={animal.imagens[0]}
            alt={animal.nomePopular}
            fill
            sizes="48px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Box as={TbPhoto} color="text.muted" fontSize="1.1rem" />
        )}
      </Box>

      <VStack align="start" spacing={0.5} flex={1} minW={0}>
        <LinkOverlay as={NextLink} href={`/animal/${animal.slug}`}>
          <Text fontWeight={600} noOfLines={1}>
            {animal.nomePopular}
          </Text>
        </LinkOverlay>
        <Badge bg={`${scheme}.bg`} color={`${scheme}.text`} fontSize="0.68rem">
          {URGENCIA_LABEL[animal.nivelUrgencia]}
        </Badge>
      </VStack>

      <Box as={TbChevronRight} color="text.secondary" fontSize="1.1rem" flexShrink={0} />
    </LinkBox>
  );
}

export default memo(AnimalCard);
