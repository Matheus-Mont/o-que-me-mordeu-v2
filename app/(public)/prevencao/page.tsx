import { db } from "@/lib/db";
import { StatusConteudo, type Ambiente } from "@prisma/client";
import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TbHome, TbMountain, TbDroplet, TbSun } from "react-icons/tb";
import type { IconType } from "react-icons";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
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

export default async function PrevencaoPage() {
  const dicas = await db.dicaPrevencao.findMany({
    where: { status: StatusConteudo.PUBLICADO },
  });

  const porAmbiente = new Map(dicas.map((d) => [d.ambiente, d]));

  return (
    <PageShell maxW={{ base: "100%", md: "900px" }}>
      <PageHeader title="Prevenção" href="/" />

      <Text color="text.secondary" fontSize="sm" mb={5}>
        Pequenos cuidados no dia a dia reduzem bastante o risco de acidentes com
        animais peçonhentos.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="14px" mb="14px">
        {ORDEM.map((ambiente) => {
          const dica = porAmbiente.get(ambiente);
          const Icon = AMBIENTE_ICONE[ambiente];
          return (
            <Box
              key={ambiente}
              bg="bg.surface"
              border="1px solid"
              borderColor="border"
              borderRadius="card"
              p={4}
              minH={{ base: "auto", md: "340px" }}
            >
              <Flex align="center" gap={2.5} mb={2.5}>
                <Box fontSize="1.2rem" color="accent.text" aria-hidden>
                  <Icon />
                </Box>
                <Text fontFamily="heading" fontWeight={700} fontSize="13.5px" color="accent.text">
                  {AMBIENTE_LABEL[ambiente]}
                </Text>
              </Flex>
              {dica ? (
                <VStack align="stretch" spacing={1.5}>
                  {dica.dicas.map((item) => (
                    <Flex key={item} gap={2} fontSize="13px">
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
                <Text fontSize="13px" color="text.secondary">
                  Conteúdo em preparação.
                </Text>
              )}
            </Box>
          );
        })}
      </SimpleGrid>

      <Box bg="bg.surface" border="1px solid" borderColor="border" borderRadius="card" p={4} textAlign="center">
        <Text color="text.secondary" fontSize="13px">
          Na maioria das vezes, esses animais não atacam por conta própria — os
          acidentes costumam acontecer por contato acidental.
        </Text>
      </Box>
    </PageShell>
  );
}
