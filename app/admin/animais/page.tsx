import NextLink from "next/link";
import { db } from "@/lib/db";
import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function AdminAnimaisPage() {
  const animais = await db.animal.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={5}>
        <Heading as="h1" size="md">
          animais
        </Heading>
        <Button as={NextLink} href="/admin/animais/novo" size="sm">
          + novo animal
        </Button>
      </Flex>

      <TableContainer bg="bg.surface" border="1px solid" borderColor="border" borderRadius="card">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>nome popular</Th>
              <Th>categoria</Th>
              <Th>status</Th>
              <Th>atualizado em</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {animais.map((a) => (
              <Tr key={a.id}>
                <Td fontWeight={600}>{a.nomePopular}</Td>
                <Td>{a.categoria.toLowerCase()}</Td>
                <Td>
                  <StatusBadge status={a.status} />
                </Td>
                <Td color="text.secondary">{a.updatedAt.toLocaleString("pt-BR")}</Td>
                <Td>
                  <Button as={NextLink} href={`/admin/animais/${a.id}`} size="xs" variant="outline">
                    editar
                  </Button>
                </Td>
              </Tr>
            ))}
            {animais.length === 0 && (
              <Tr>
                <Td colSpan={5} color="text.secondary">
                  nenhum animal cadastrado ainda.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
