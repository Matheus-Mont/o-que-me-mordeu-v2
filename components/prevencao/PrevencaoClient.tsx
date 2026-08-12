"use client";

import { useState } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { TbHome, TbMountain, TbDroplet, TbSun } from "react-icons/tb";
import type { Ambiente } from "@prisma/client";
import type { IconType } from "react-icons";
import GrupoBotoes from "@/components/ui/GrupoBotoes";
import { capitalizar } from "@/lib/texto";

const AMBIENTE_LABEL: Record<Ambiente, string> = {
  CASA: "Em casa",
  MATA_TRILHA: "Na mata ou trilha",
  RIOS_LAGOS: "Em rios e lagos",
  PRAIA: "Na praia",
};

const AMBIENTE_ICONE: Record<Ambiente, IconType> = {
  CASA: TbHome,
  MATA_TRILHA: TbMountain,
  RIOS_LAGOS: TbDroplet,
  PRAIA: TbSun,
};

const ORDEM: Ambiente[] = ["CASA", "MATA_TRILHA", "RIOS_LAGOS", "PRAIA"];

export interface DicaPrevencaoData {
  ambiente: Ambiente;
  dicas: string[];
}

export default function PrevencaoClient({ dicas }: { dicas: DicaPrevencaoData[] }) {
  const [ambiente, setAmbiente] = useState<Ambiente>(ORDEM[0]);

  const porAmbiente = new Map(dicas.map((d) => [d.ambiente, d]));
  const dicaAtual = porAmbiente.get(ambiente);
  const Icon = AMBIENTE_ICONE[ambiente];

  return (
    <Box>
      <GrupoBotoes
        itens={ORDEM.map((a) => ({
          valor: a,
          label: AMBIENTE_LABEL[a],
          icon: AMBIENTE_ICONE[a],
        }))}
        ehSelecionado={(valor) => valor === ambiente}
        onSelecionar={(valor) => setAmbiente(valor as Ambiente)}
      />

      <Box
        bg="bg.surface"
        border="1px solid"
        borderColor="border"
        borderRadius="card"
        p={5}
        mt="14px"
        minH={{ md: "260px" }}
      >
        <Flex align="center" gap={2.5} mb={3}>
          <Box fontSize="1.3rem" color="accent.text" aria-hidden>
            <Icon />
          </Box>
          <Text fontFamily="heading" fontWeight={700} fontSize="15px" color="accent.text">
            {AMBIENTE_LABEL[ambiente]}
          </Text>
        </Flex>

        {dicaAtual ? (
          <VStack align="stretch" spacing={2}>
            {dicaAtual.dicas.map((item) => (
              <Flex key={item} gap={2} fontSize="14px">
                <Text as="span" color="accent.text" flexShrink={0}>
                  •
                </Text>
                <Text as="span" flex={1} minW={0}>
                  {capitalizar(item)}
                </Text>
              </Flex>
            ))}
          </VStack>
        ) : (
          <Text fontSize="14px" color="text.secondary">
            Conteúdo em preparação.
          </Text>
        )}
      </Box>
    </Box>
  );
}
