import NextLink from "next/link";
import { db } from "@/lib/db";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";

// Dashboard do painel — visão geral de quantas fichas existem em cada
// etapa do fluxo de publicação (rascunho / revisado / publicado).

const STATUS_LABEL: Record<string, string> = {
  RASCUNHO: "rascunho",
  REVISADO: "revisado",
  PUBLICADO: "publicado",
};

const STATUS_BG: Record<string, string> = {
  RASCUNHO: "bg.surface",
  REVISADO: "warning.bg",
  PUBLICADO: "safe.bg",
};

const STATUS_TEXT: Record<string, string> = {
  RASCUNHO: "text.primary",
  REVISADO: "warning.text",
  PUBLICADO: "safe.text",
};

function StatCards({ dados }: { dados: { status: string; _count: { _all: number } }[] }) {
  const mapa = new Map(dados.map((d) => [d.status, d._count._all]));
  const ordem = ["RASCUNHO", "REVISADO", "PUBLICADO"];

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3} mb={5}>
      {ordem.map((status) => (
        <Box key={status} bg={STATUS_BG[status]} borderRadius="card" p={4}>
          <Text fontSize="xs" color={status === "RASCUNHO" ? "text.secondary" : STATUS_TEXT[status]}>
            {STATUS_LABEL[status]}
          </Text>
          <Text fontSize="2xl" fontWeight={600} color={STATUS_TEXT[status]}>
            {mapa.get(status) ?? 0}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default async function AdminDashboardPage() {
  const [animaisPorStatus, dicasPorStatus] = await Promise.all([
    db.animal.groupBy({ by: ["status"], _count: { _all: true } }),
    db.dicaPrevencao.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  return (
    <Box maxW="900px">
      <Heading as="h1" size="md" mb={1}>
        painel administrativo
      </Heading>
      <Text color="text.secondary" fontSize="sm" mb={8}>
        fundação do "o que me mordeu?" — visão geral de conteúdo.
      </Text>

      <Box mb={10}>
        <Heading as="h2" size="sm" mb={3}>
          animais
        </Heading>
        {animaisPorStatus.length === 0 ? (
          <Text color="text.secondary" fontSize="sm" mb={3}>
            nenhum animal cadastrado ainda.
          </Text>
        ) : (
          <StatCards dados={animaisPorStatus} />
        )}
        <Button as={NextLink} href="/admin/animais" size="sm" variant="outline">
          gerenciar animais
        </Button>
      </Box>

      <Box>
        <Heading as="h2" size="sm" mb={3}>
          dicas de prevenção
        </Heading>
        {dicasPorStatus.length === 0 ? (
          <Text color="text.secondary" fontSize="sm" mb={3}>
            nenhuma dica cadastrada ainda.
          </Text>
        ) : (
          <StatCards dados={dicasPorStatus} />
        )}
        <Button as={NextLink} href="/admin/prevencao" size="sm" variant="outline">
          gerenciar prevenção
        </Button>
      </Box>
    </Box>
  );
}
