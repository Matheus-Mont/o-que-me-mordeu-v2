import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import DicaForm from "@/components/admin/DicaForm";
import StatusActions from "@/components/admin/StatusActions";

export default async function EditarDicaPage({ params }: { params: { id: string } }) {
  const dica = await db.dicaPrevencao.findUnique({ where: { id: params.id } });
  if (!dica) notFound();

  const historico = await db.historicoAlteracao.findMany({
    where: { dicaPrevencaoId: dica.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Heading as="h1" size="md" mb={5}>
        editar dica: {dica.ambiente.toLowerCase()}
      </Heading>

      <StatusActions entidade="prevencao" id={dica.id} statusAtual={dica.status} />

      <DicaForm dica={dica} />

      <Box mt={10}>
        <Heading as="h2" size="sm" mb={3}>
          histórico de alterações
        </Heading>
        {historico.length === 0 && (
          <Text color="text.secondary" fontSize="sm">
            nenhuma alteração registrada ainda.
          </Text>
        )}
        <VStack align="stretch" spacing={2}>
          {historico.map((h) => (
            <Box key={h.id} bg="bg.surface" border="1px solid" borderColor="border" borderRadius="control" p={3} fontSize="sm">
              <Text color="text.secondary" fontSize="xs" mb={0.5}>
                {h.createdAt.toLocaleString("pt-BR")}
              </Text>
              <Text>
                {h.statusNovo
                  ? `status: ${(h.statusAnterior ?? "novo").toString().toLowerCase()} -> ${h.statusNovo.toLowerCase()}. `
                  : ""}
                {h.observacao}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
