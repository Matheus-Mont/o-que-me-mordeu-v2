"use client";

import { useState } from "react";
import NextImage from "next/image";
import { AspectRatio, Box, HStack, IconButton } from "@chakra-ui/react";
import { TbChevronLeft, TbChevronRight, TbPhoto } from "react-icons/tb";

// Galeria de fotos da ficha do animal — mostra a espécie em vários ângulos
// (corpo todo, cabeça, padrão de cor etc.), úteis para identificação.
//
// Mobile: uma foto por vez, setas sobre a imagem, pontinhos de posição.
// Desktop (md+): a imagem principal ganha uma fileira de miniaturas
// clicáveis logo abaixo, aproveitando o espaço extra em vez de repetir
// o carrossel de toque — os pontinhos somem nesse breakpoint.

interface Props {
  imagens: string[];
  alt: string;
}

export default function CarrosselImagens({ imagens, alt }: Props) {
  const [indice, setIndice] = useState(0);

  if (imagens.length === 0) {
    return (
      <AspectRatio ratio={4 / 3} borderRadius="card" overflow="hidden">
        <Box
          bg="bg.surface"
          border="1px dashed"
          borderColor="border"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="text.secondary"
          gap={2}
        >
          <Box as={TbPhoto} fontSize="1.4rem" />
          sem foto
        </Box>
      </AspectRatio>
    );
  }

  function anterior() {
    setIndice((i) => (i - 1 + imagens.length) % imagens.length);
  }
  function proxima() {
    setIndice((i) => (i + 1) % imagens.length);
  }

  return (
    <Box>
      <AspectRatio ratio={4 / 3} borderRadius="card" overflow="hidden" position="relative">
        <Box bg="bg.surface">
          <NextImage
            src={imagens[indice]}
            alt={imagens.length > 1 ? `${alt} — foto ${indice + 1} de ${imagens.length}` : alt}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            style={{ objectFit: "cover" }}
            priority={indice === 0}
          />

          {imagens.length > 1 && (
            <>
              <IconButton
                aria-label="foto anterior"
                icon={<TbChevronLeft />}
                onClick={anterior}
                position="absolute"
                left={2}
                top="50%"
                transform="translateY(-50%)"
                size="sm"
                borderRadius="full"
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: "blackAlpha.700" }}
              />
              <IconButton
                aria-label="próxima foto"
                icon={<TbChevronRight />}
                onClick={proxima}
                position="absolute"
                right={2}
                top="50%"
                transform="translateY(-50%)"
                size="sm"
                borderRadius="full"
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: "blackAlpha.700" }}
              />

              <HStack
                spacing={1.5}
                position="absolute"
                bottom={2}
                left="50%"
                transform="translateX(-50%)"
                display={{ base: "flex", md: "none" }}
              >
                {imagens.map((_, i) => (
                  <Box
                    key={i}
                    as="button"
                    aria-label={`ir para a foto ${i + 1}`}
                    onClick={() => setIndice(i)}
                    width="6px"
                    height="6px"
                    borderRadius="full"
                    bg={i === indice ? "white" : "whiteAlpha.500"}
                  />
                ))}
              </HStack>
            </>
          )}
        </Box>
      </AspectRatio>

      {imagens.length > 1 && (
        <HStack spacing={2} mt={2} display={{ base: "none", md: "flex" }} flexWrap="wrap">
          {imagens.map((img, i) => (
            <Box
              key={img + i}
              as="button"
              onClick={() => setIndice(i)}
              width="56px"
              height="56px"
              borderRadius="6px"
              overflow="hidden"
              border="1px solid"
              borderColor={i === indice ? "accent.solid" : "border"}
              flexShrink={0}
              position="relative"
            >
              <NextImage
                src={img}
                alt=""
                aria-hidden
                fill
                sizes="56px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}
        </HStack>
      )}
    </Box>
  );
}
