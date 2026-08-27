import { memo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { TbPhoto } from "react-icons/tb";
import type { Animal } from "@prisma/client";
import { capitalizar } from "@/lib/texto";
import { URGENCIA_LABEL, URGENCIA_SCHEME } from "@/lib/urgencia";

export type AnimalCardData = Pick<
  Animal,
  "slug" | "nomePopular" | "nivelUrgencia" | "imagens"
>;

function AnimalCard({ animal }: { animal: AnimalCardData }) {
  const scheme = URGENCIA_SCHEME[animal.nivelUrgencia];

  return (
    <Flex
      as={NextLink}
      href={`/animal/${animal.slug}`}
      bg="bg.surface"
      border="1px solid"
      borderColor="border"
      borderRadius="12px"
      overflow="hidden"
      transition="background 0.15s ease, border-color 0.15s ease"
      _hover={{ textDecoration: "none", bg: "bg.surfaceHover", borderColor: "borderStrong" }}
    >
      {/* Mesma espinha de gravidade dos blocos de primeiros socorros: na grade do
          catálogo ela é o que diferencia uma cascavel de uma aranha-de-jardim. */}
      <Box w="4px" flexShrink={0} bg={`${scheme}.solid`} aria-hidden />

      <Flex direction="column" flex="1" minW={0}>
        <Box height="128px" position="relative" bg="bg.canvas" overflow="hidden">
          {animal.imagens[0] ? (
            <>
              <NextImage
                src={animal.imagens[0]}
                alt={capitalizar(animal.nomePopular)}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                style={{ objectFit: "contain", padding: "8px" }}
              />
              <Box
                position="absolute"
                inset={0}
                pointerEvents="none"
                boxShadow="inset 0 0 22px 8px var(--chakra-colors-bg-canvas)"
              />
            </>
          ) : (
            <Box
              position="absolute"
              inset={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="text.muted"
              borderBottom="1px dashed"
              borderColor="border"
            >
              <TbPhoto aria-hidden />
            </Box>
          )}
        </Box>

        <Box p="10px">
          <Text fontFamily="heading" fontWeight={700} fontSize="13px" mb={1.5} noOfLines={2}>
            {capitalizar(animal.nomePopular)}
          </Text>
          <Text
            fontFamily="mono"
            fontSize="9.5px"
            fontWeight={600}
            letterSpacing="0.10em"
            textTransform="uppercase"
            color={`${scheme}.text`}
          >
            {URGENCIA_LABEL[animal.nivelUrgencia]}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default memo(AnimalCard);
