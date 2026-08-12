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
      />

      <Flex align="center" gap={2} mt="18px" mb={3}>
        <Box color="accent.text" fontSize="1.1rem" aria-hidden>
          <Icon />
        </Box>
        <Text fontFamily="heading" fontWeight={700} fontSize="16px">
          {CATEGORIA_LABEL[categoria]}
        </Text>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="14px">
        {itens.map((item, i) => {
          const numero = i + 1;

          return (
            <Flex
              key={item.id}
              gap={3}
              bg="bg.surface"
              border="1px solid"
              borderColor="border"
              borderRadius="card"
              p={3}
            >
              <Box
                w="72px"
                h="72px"
                flexShrink={0}
                borderRadius="10px"
                overflow="hidden"
                position="relative"
                bg="bg.canvas"
              >
                <NextImage
                  src={item.imagem}
                  alt={item.alt}
                  fill
                  sizes="72px"
                  style={{ objectFit: "contain", padding: "4px" }}
                />
              </Box>
              <Box flex="1" minW={0}>
                <Text fontSize="13.5px" mb={1.5}>
                  <Text as="span" fontWeight={700} color="accent.text">
                    {numero}.{" "}
                  </Text>
                  {item.explicacao}
                </Text>
                <Text fontSize="11px" color="text.muted">
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
