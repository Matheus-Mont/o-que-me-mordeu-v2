import NextLink from "next/link";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import NavCard from "@/components/layout/NavCard";
import PageShell from "@/components/layout/PageShell";

export default function PaginaInicial() {
  return (
    <PageShell maxW={{ base: "100%", md: "1040px" }}>
      <Box
        bg="danger.bg"
        border="1px solid"
        borderColor="danger.border"
        borderRadius="card"
        p={{ base: "14px 16px", md: "16px 20px" }}
        mb={{ base: 6, md: 10 }}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "stretch", sm: "center" }}
          justify="space-between"
          gap={3}
        >
          <Text fontWeight={600} fontSize="13px" color="danger.text">
            Sintomas graves agora? Falta de ar, desmaio ou sangramento intenso.
          </Text>
          <Button
            as={NextLink}
            href="/emergencia"
            size="sm"
            flexShrink={0}
            bg="danger.solid"
            color="white"
            _hover={{ bg: "danger.solidHover" }}
            borderRadius="8px"
          >
            Ver primeiros socorros e ligar 192 →
          </Button>
        </Flex>
      </Box>

      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 6, md: 12 }} align="start">
        <Box flex="1" pt={{ md: 3 }}>
          <Heading as="h1" fontSize={{ base: "24px", md: "34px" }} lineHeight={1.2} mb={3}>
            Respire. Vamos descobrir juntos o que aconteceu.
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="text.secondary" maxW="400px">
            Cobras, aranhas, escorpiões, lagartas e águas-vivas — triagem rápida,
            com orientação segura.
          </Text>
        </Box>

        <VStack flex="1" w="full" maxW={{ md: "480px" }} spacing={3} align="stretch">
          <NavCard
            href="/identificar"
            title="Fazer triagem guiada"
            subtitle="Algumas perguntas rápidas sobre local, sintomas e o animal."
            variant="primary"
          />
          <NavCard
            href="/catalogo"
            title="Explorar o catálogo"
            subtitle="Compare a aparência e as características das espécies."
          />
          <NavCard
            href="/prevencao"
            title="Cuidados de prevenção"
            subtitle="Como evitar acidentes em cada ambiente."
          />
        </VStack>
      </Flex>

      <Text fontSize="12px" color="text.muted" mt={{ base: 8, md: 12 }} lineHeight={1.6}>
        Este app é informativo e não substitui avaliação médica presencial. Em
        emergência, ligue 192 (SAMU) imediatamente.
      </Text>
    </PageShell>
  );
}
