"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import GrupoBotoes from "@/components/ui/GrupoBotoes";
import {
  CATEGORIA_ICONE,
  CATEGORIA_LABEL,
  CURIOSIDADES,
  type CategoriaCuriosidade,
} from "@/lib/curiosidades/dados";

const ORDEM: CategoriaCuriosidade[] = ["COBRA", "ESCORPIAO", "ARANHA", "TATURANA", "AGUA_VIVA", "GERAL"];

export default function ListaCuriosidades() {
  const [categoria, setCategoria] = useState<CategoriaCuriosidade>(ORDEM[0]);

  const itens = CURIOSIDADES.filter((c) => c.categoria === categoria);
  const Icon = CATEGORIA_ICONE[categoria];

  return (
    <Box>
      <GrupoBotoes
        itens={ORDEM.map((c) => ({
          valor: c,
          label: CATEGORIA_LABEL[c],
          icon: CATEGORIA_ICONE[c],
        }))}
        ehSelecionado={(valor) => valor === categoria}
        onSelecionar={(valor) => setCategoria(valor as CategoriaCuriosidade)}
        size="sm"
      />

      <Flex align="center" gap={2} mt="18px" mb={3}>
        <Box color="accent.text" fontSize="1.1rem" aria-hidden>
          <Icon />
        </Box>
        <Text fontFamily="heading" fontWeight={700} fontSize="16px">
          {CATEGORIA_LABEL[categoria]}
        </Text>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="18px">
        {itens.map((item, i) => {
          const numero = i + 1;

          return (
            <Flex
              key={item.id}
              gap={4}
              bg="bg.surface"
              border="1px solid"
              borderColor="border"
              borderRadius="card"
              p={4}
            >
              <Box
                w="112px"
                h="112px"
                flexShrink={0}
                borderRadius="12px"
                overflow="hidden"
                position="relative"
                bg="bg.canvas"
              >
                <NextImage
                  src={item.imagem}
                  alt={item.alt}
                  fill
                  sizes="112px"
                  style={{ objectFit: "contain", padding: "6px" }}
                />
              </Box>
              <Box flex="1" minW={0}>
                <Text fontSize="15.5px" lineHeight={1.5} mb={2}>
                  <Text as="span" fontWeight={700} color="accent.text">
                    {numero}.{" "}
                  </Text>
                  {item.explicacao}
                </Text>
                <Text
                  fontFamily="mono"
                  fontSize="9.5px"
                  fontWeight={500}
                  letterSpacing="0.06em"
                  lineHeight={1.5}
                  color="text.muted"
                >
                  Fonte: {item.fonte}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
