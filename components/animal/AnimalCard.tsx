import { memo } from "react";
import { Badge, Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { TbPhoto } from "react-icons/tb";
import type { Animal } from "@prisma/client";
import { capitalizar } from "@/lib/texto";

export type AnimalCardData = Pick<
  Animal,
  "slug" | "nomePopular" | "nivelUrgencia" | "imagens"
>;

const URGENCIA_LABEL: Record<Animal["nivelUrgencia"], string> = {
  ALTA: "Urgência alta",
  MEDIA: "Urgência média",
  BAIXA: "Urgência baixa",
};

const URGENCIA_SCHEME: Record<Animal["nivelUrgencia"], "danger" | "warning" | "safe"> = {
  ALTA: "danger",
  MEDIA: "warning",
  BAIXA: "safe",
};

function AnimalCard({ animal }: { animal: AnimalCardData }) {
  const scheme = URGENCIA_SCHEME[animal.nivelUrgencia];

  return (
    <Box
      as={NextLink}
      href={`/animal/${animal.slug}`}
      display="flex"
      flexDirection="column"
      bg="bg.surface"
      border="1px solid"
      borderColor="border"
      borderRadius="12px"
      overflow="hidden"
      transition="background 0.15s ease, border-color 0.15s ease"
      _hover={{ textDecoration: "none", bg: "bg.surfaceHover", borderColor: "borderStrong" }}
    >
      <Box height="96px" position="relative" bg="bg.canvas">
        {animal.imagens[0] ? (
          <NextImage
            src={animal.imagens[0]}
            alt={animal.nomePopular}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            style={{ objectFit: "cover" }}
          />
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
        <Badge
          bg={`${scheme}.bg`}
          color={`${scheme}.text`}
          fontSize="10.5px"
          borderRadius="6px"
          px="7px"
          py="2px"
        >
          {URGENCIA_LABEL[animal.nivelUrgencia]}
        </Badge>
      </Box>
    </Box>
  );
}

export default memo(AnimalCard);
