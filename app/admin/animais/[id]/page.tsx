import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import AnimalForm from "@/components/admin/AnimalForm";
import StatusActions from "@/components/admin/StatusActions";

export default async function EditarAnimalPage({ params }: { params: { id: string } }) {
  const animal = await db.animal.findUnique({ where: { id: params.id } });
  if (!animal) notFound();

  const historico = await db.historicoAlteracao.findMany({
    where: { animalId: animal.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Heading as="h1" size="md" mb={5}>
        editar: {animal.nomePopular}
      </Heading>

      <StatusActions entidade="animais" id={animal.id} statusAtual={animal.status} />

      <AnimalForm animal={animal} />

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
