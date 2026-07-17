import { db } from "@/lib/db";
import { StatusConteudo, type Ambiente } from "@prisma/client";
import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TbHome, TbMountain, TbDroplet, TbSun } from "react-icons/tb";
import type { IconType } from "react-icons";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";

// Prevenção — organizada por ambiente, não por tipo de animal, para não
// repetir conteúdo já presente nas fichas. Em telas maiores, os quatro
// cartões de ambiente viram um grid de 2 colunas em vez de uma coluna só.

const AMBIENTE_LABEL: Record<Ambiente, string> = {
  CASA: "em casa",
  MATA_TRILHA: "na mata ou trilha",
  RIOS_LAGOS: "em rios e lagos",
  PRAIA: "na praia",
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
    <PageShell maxW={{ base: "480px", md: "700px" }}>
      <PageHeader title="prevenção" href="/" />

      <Text color="text.secondary" fontSize="sm" mb={5}>
        pequenos cuidados no dia a dia reduzem bastante o risco de acidentes com
        animais peçonhentos.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        {ORDEM.map((ambiente) => {
          const dica = porAmbiente.get(ambiente);
          const Icon = AMBIENTE_ICONE[ambiente];
          return (
            <Box key={ambiente} bg="accent.bg" border="1px solid" borderColor="accent.border" borderRadius="card" p={4}>
              <Flex align="center" gap={3} mb={2}>
                {/* Ícone renderizado aqui (não via `as={Icon}`) porque esta é
                    uma Server Component: passar o componente em si como prop
                    pro Box (Client Component do Chakra) quebra o build —
                    "Functions cannot be passed directly to Client Components".
                    Passar o elemento já renderizado como children funciona. */}
                <Box fontSize="1.3rem" color="accent.text" aria-hidden>
                  <Icon />
                </Box>
                <Text fontWeight={700} color="accent.text">
                  {AMBIENTE_LABEL[ambiente]}
                </Text>
              </Flex>
              {dica ? (
                <VStack as="ul" align="start" spacing={1} pl={4} fontSize="sm" color="accent.text">
                  {dica.dicas.slice(0, 2).map((item) => (
                    <Text as="li" key={item}>
                      {item}
                    </Text>
                  ))}
                </VStack>
              ) : (
                <Text fontSize="sm" color="text.secondary">
                  conteúdo em preparação.
                </Text>
              )}
            </Box>
          );
        })}
      </SimpleGrid>

      <Box bg="accent.bg" border="1px solid" borderColor="accent.border" borderRadius="card" p={4} textAlign="center">
        <Text color="accent.text" fontSize="sm">
          na maioria das vezes, esses animais não atacam por conta própria — os
          acidentes costumam acontecer por contato acidental.
        </Text>
      </Box>
    </PageShell>
  );
}
