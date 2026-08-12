import { db } from "@/lib/db";
import { StatusConteudo } from "@prisma/client";
import { Box, Text } from "@chakra-ui/react";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import PrevencaoClient from "@/components/prevencao/PrevencaoClient";

export default async function PrevencaoPage() {
  const dicas = await db.dicaPrevencao.findMany({
    where: { status: StatusConteudo.PUBLICADO },
    select: { ambiente: true, dicas: true },
  });

  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      <PageHeader title="Prevenção" href="/" />

      <Text color="text.secondary" fontSize="sm" mb={5}>
        Pequenos cuidados no dia a dia reduzem bastante o risco de acidentes com
        animais peçonhentos.
      </Text>

      <PrevencaoClient dicas={dicas} />

      <Box
        bg="bg.surface"
        border="1px solid"
        borderColor="border"
        borderRadius="card"
        p={4}
        mt="14px"
        textAlign="center"
      >
        <Text color="text.secondary" fontSize="13px">
          Na maioria das vezes, esses animais não atacam por conta própria — os
          acidentes costumam acontecer por contato acidental.
        </Text>
      </Box>
    </PageShell>
  );
}
