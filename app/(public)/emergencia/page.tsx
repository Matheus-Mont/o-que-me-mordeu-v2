import NextLink from "next/link";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { TbCircleCheck, TbBan } from "react-icons/tb";
import AvisoFotografar from "@/components/animal/AvisoFotografar";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";

export const metadata = {
  title: "Emergência | O que me mordeu?",
};

const TELEFONES = [
  { nome: "SAMU", numero: "192", tel: "192" },
  { nome: "Bombeiros", numero: "193", tel: "193" },
  { nome: "Disque-Intoxicação (CIATox)", numero: "0800 722 6001", tel: "08007226001" },
];

export default function EmergenciaPage() {
  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      <PageHeader href="/" />

      <Flex
        direction="column"
        justify={{ md: "center" }}
        minH={{ base: "auto", md: "60vh" }}
      >
      <Heading as="h1" fontSize="22px" fontWeight={800} color="danger.text" mb={2}>
        Emergência
      </Heading>
      <Text color="text.secondary" fontSize="sm" mb={5}>
        Fique calmo. Ligue para o socorro e siga os cuidados abaixo enquanto a
        ajuda chega.
      </Text>

      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 6, md: 10 }} align="start">
        <Box flex="1" minW={0} w="full">
          <VStack align="stretch" spacing={2} mb={3}>
            {TELEFONES.map((t) => (
              <Flex
                key={t.numero}
                as="a"
                href={`tel:${t.tel}`}
                justify="space-between"
                align="center"
                bg="bg.surface"
                border="1px solid"
                borderColor="border"
                borderRadius="control"
                p="14px 16px"
                fontSize="sm"
                transition="background 0.15s ease"
                _hover={{ bg: "bg.surfaceHover" }}
              >
                {t.nome}
                <Text as="span" fontWeight={700} color="accent.text">
                  {t.numero}
                </Text>
              </Flex>
            ))}
          </VStack>

          <Button
            as="a"
            href="https://soroja.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            w="full"
            size="lg"
          >
            Encontrar hospital com soro
          </Button>

          <Box textAlign="center" mt={4}>
            <Button as={NextLink} href="/identificar" variant="link" color="text.secondary" fontSize="13px">
              Sei que tipo de animal foi
            </Button>
          </Box>
        </Box>

        <Box flex="1" minW={0} w="full">
          <Text fontFamily="heading" fontWeight={700} fontSize="13.5px" color="accent.text" mb={1}>
            Enquanto isso
          </Text>
          <Text color="text.secondary" fontSize="13px" mb={4}>
            Primeiros socorros gerais, que independem do tipo de animal:
          </Text>

          <Box
            bg="safe.bg"
            border="1px solid"
            borderColor="safe.border"
            borderRadius="card"
            p={4}
            mb="14px"
          >
            <Flex align="start" gap={1.5} color="safe.text" fontSize="13px">
              <TbCircleCheck aria-hidden size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
              <Text as="span">
                Lave o local com água e sabão e mantenha o membro afetado elevado
                e em repouso.
              </Text>
            </Flex>
          </Box>

          <Box
            bg="danger.bg"
            border="1px solid"
            borderColor="danger.border"
            borderRadius="card"
            p={4}
            mb="14px"
          >
            <Flex align="start" gap={1.5} color="danger.text" fontSize="13px">
              <TbBan aria-hidden size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
              <Text as="span">Nunca faça torniquete, corte ou tente sugar o veneno.</Text>
            </Flex>
          </Box>

          <AvisoFotografar />
        </Box>
      </Flex>
      </Flex>
    </PageShell>
  );
}
