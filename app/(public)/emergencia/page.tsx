import NextLink from "next/link";
import { Box, Button, Divider, SimpleGrid, Text } from "@chakra-ui/react";
import { TbPhone } from "react-icons/tb";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";

// Tela de emergência — acessada pelo botão SOS ou pelo botão "preciso de
// ajuda agora" da abertura. Conteúdo 100% estático (sem fetch ao banco),
// para funcionar offline, por ser a parte mais crítica em uso real.

export const metadata = {
  title: "emergência | o que me mordeu?",
};

export default function EmergenciaPage() {
  return (
    <PageShell maxW={{ base: "480px", md: "560px" }}>
      <PageHeader title="emergência" href="/" />

      <SimpleGrid columns={2} spacing={3} mb={3}>
        <Button as="a" href="tel:192" bg="danger.solid" color="white" size="lg" leftIcon={<TbPhone />} _hover={{ opacity: 0.9 }}>
          samu 192
        </Button>
        <Button as="a" href="tel:193" bg="danger.solid" color="white" size="lg" leftIcon={<TbPhone />} _hover={{ opacity: 0.9 }}>
          bombeiros 193
        </Button>
      </SimpleGrid>

      <Button as="a" href="https://soroja.com.br/" target="_blank" rel="noopener noreferrer" w="full" size="lg" mb={6}>
        encontrar hospital com soro
      </Button>

      <Divider borderColor="border" mb={6} />

      <Text fontWeight={600} mb={1}>
        enquanto isso
      </Text>
      <Text color="text.secondary" fontSize="sm" mb={4}>
        primeiros socorros gerais, independem do tipo de animal:
      </Text>

      <Box bg="safe.bg" border="1px solid" borderColor="safe.border" borderRadius="card" p={4} mb={3}>
        <Text color="safe.text" fontSize="sm">
          ✓ lave o local com água e sabão, mantenha o membro afetado elevado e em repouso
        </Text>
      </Box>

      <Box bg="danger.bg" border="1px solid" borderColor="danger.border" borderRadius="card" p={4} mb={6}>
        <Text color="danger.text" fontSize="sm">
          ⛔ nunca faça torniquete, corte ou tente sugar o veneno
        </Text>
      </Box>

      <Box textAlign="center">
        <Button as={NextLink} href="/identificar" variant="link" color="text.secondary">
          sei que tipo de animal foi
        </Button>
      </Box>
    </PageShell>
  );
}
