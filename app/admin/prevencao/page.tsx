import NextLink from "next/link";
import { db } from "@/lib/db";
import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function AdminPrevencaoPage() {
  const dicas = await db.dicaPrevencao.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={5}>
        <Heading as="h1" size="md">
          dicas de prevenção
        </Heading>
        <Button as={NextLink} href="/admin/prevencao/novo" size="sm">
          + nova dica
        </Button>
      </Flex>

      <TableContainer bg="bg.surface" border="1px solid" borderColor="border" borderRadius="card">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ambiente</Th>
              <Th>status</Th>
              <Th>atualizado em</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {dicas.map((d) => (
              <Tr key={d.id}>
                <Td fontWeight={600}>{d.ambiente.toLowerCase()}</Td>
                <Td>
                  <StatusBadge status={d.status} />
                </Td>
                <Td color="text.secondary">{d.updatedAt.toLocaleString("pt-BR")}</Td>
                <Td>
                  <Button as={NextLink} href={`/admin/prevencao/${d.id}`} size="xs" variant="outline">
                    editar
                  </Button>
                </Td>
              </Tr>
            ))}
            {dicas.length === 0 && (
              <Tr>
                <Td colSpan={4} color="text.secondary">
                  nenhuma dica cadastrada ainda.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
