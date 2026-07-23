import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { StatusConteudo } from "@prisma/client";
import { Badge, Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import CarrosselImagens from "@/components/animal/CarrosselImagens";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import { capitalizar } from "@/lib/texto";

const URGENCIA_LABEL: Record<string, string> = {
  ALTA: "Urgência alta",
  MEDIA: "Urgência média",
  BAIXA: "Urgência baixa",
};

const URGENCIA_SCHEME: Record<string, "danger" | "warning" | "safe"> = {
  ALTA: "danger",
  MEDIA: "warning",
  BAIXA: "safe",
};

interface Props {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const animais = await db.animal.findMany({
    where: { status: StatusConteudo.PUBLICADO },
    select: { slug: true },
  });
  return animais.map((animal) => ({ slug: animal.slug }));
}

export async function generateMetadata({ params }: Props) {
  const animal = await db.animal.findUnique({ where: { slug: params.slug } });
  if (!animal || animal.status !== StatusConteudo.PUBLICADO) return {};

  return {
    title: `${animal.nomePopular} — o que fazer | o que me mordeu?`,
    description: `Como identificar ${animal.nomePopular.toLowerCase()}, sintomas e primeiros socorros. ${animal.sintomas}`,
  };
}

export default async function FichaAnimalPage({ params }: Props) {
  const animal = await db.animal.findUnique({ where: { slug: params.slug } });

  if (!animal || animal.status !== StatusConteudo.PUBLICADO) {
    notFound();
  }

  const linkSoroJa = "https://soroja.com.br/";
  const scheme = URGENCIA_SCHEME[animal.nivelUrgencia];

  return (
    <PageShell maxW={{ base: "100%", lg: "1040px" }}>
      <PageHeader href="/catalogo" />

      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 6, lg: 12 }} align="start">
        <Box flex={{ lg: "1.15" }} minW={0} w="full">
          <CarrosselImagens imagens={animal.imagens} alt={animal.nomePopular} />

          <Flex justify="space-between" align="flex-start" gap={2.5} mt={5} mb={1}>
            <Heading as="h1" fontSize={{ base: "22px", md: "26px" }} fontWeight={800}>
              {capitalizar(animal.nomePopular)}
            </Heading>
            <Badge
              bg={`${scheme}.bg`}
              color={`${scheme}.text`}
              fontSize="11.5px"
              px="12px"
              py="5px"
              whiteSpace="nowrap"
              flexShrink={0}
            >
              {URGENCIA_LABEL[animal.nivelUrgencia]}
            </Badge>
          </Flex>
          <Text fontSize="13px" fontStyle="italic" color="text.muted" mb={5}>
            {animal.nomeCientifico}
          </Text>

          <VStack align="stretch" spacing={5}>
            <Box>
              <Heading as="h2" fontSize="13.5px" fontWeight={700} color="accent.text" mb={2}>
                Onde é mais comum
              </Heading>
              <Text fontSize="sm">
                {animal.regioes.length > 0
                  ? animal.regioes.map(capitalizar).join(", ")
                  : "Não informado"}
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="13.5px" fontWeight={700} color="accent.text" mb={2}>
                Como identificar
              </Heading>
              {animal.identificacao.length > 0 ? (
                <VStack align="stretch" spacing={2}>
                  {animal.identificacao.map((item) => (
                    <Flex key={item} gap={2} fontSize="13.5px">
                      <Text as="span" color="accent.text" flexShrink={0}>
                        •
                      </Text>
                      <Text as="span" flex={1} minW={0}>
                        {capitalizar(item)}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              ) : (
                <Text fontSize="sm" color="text.secondary">
                  Nenhuma característica cadastrada ainda.
                </Text>
              )}
            </Box>

            <Box>
              <Heading as="h2" fontSize="13.5px" fontWeight={700} color="accent.text" mb={2}>
                Sintomas do acidente
              </Heading>
              <Text fontSize="sm">{capitalizar(animal.sintomas)}</Text>
              <Text fontSize="xs" color="text.secondary" mt={1}>
                Tempo até os sintomas: {animal.tempoSintomas}
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box
          flex="1"
          minW={0}
          w="full"
          position={{ lg: "sticky" }}
          top={{ lg: "96px" }}
        >
          <VStack align="stretch" spacing="14px">
            <Box
              bg="safe.bg"
              border="1px solid"
              borderColor="safe.border"
              borderRadius="card"
              p={4}
            >
              <Text fontWeight={700} fontSize="13.5px" color="safe.text" mb={2.5}>
                ✓ O que fazer
              </Text>
              <VStack align="stretch" spacing={1.5}>
                {animal.primeirosSocorrosFazer.map((item) => (
                  <Flex key={item} gap={2} fontSize="13px">
                    <Text as="span" color="safe.text" flexShrink={0}>
                      ✓
                    </Text>
                    <Text as="span" flex={1} minW={0}>
                      {capitalizar(item)}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>

            <Box
              bg="danger.bg"
              border="1px solid"
              borderColor="danger.border"
              borderRadius="card"
              p={4}
            >
              <Text fontWeight={700} fontSize="13.5px" color="danger.text" mb={2.5}>
                ⛔ O que não fazer
              </Text>
              <VStack align="stretch" spacing={1.5}>
                {animal.primeirosSocorrosNaoFazer.map((item) => (
                  <Flex key={item} gap={2} fontSize="13px">
                    <Text as="span" color="danger.text" flexShrink={0}>
                      ✕
                    </Text>
                    <Text as="span" flex={1} minW={0}>
                      {capitalizar(item)}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>

            <Box bg="bg.surface" border="1px solid" borderColor="border" borderRadius="card" p={4}>
              <Text fontWeight={700} fontSize="13.5px" color="accent.text" mb={2}>
                Soro indicado
              </Text>
              <Text fontSize="13px" lineHeight={1.5}>
                {capitalizar(animal.soroIndicado)}
              </Text>
              <Text fontSize="xs" color="text.secondary" mt={2}>
                A aplicação do soro é exclusiva de profissional de saúde, em ambiente hospitalar.
              </Text>
            </Box>

            <Button as="a" href={linkSoroJa} target="_blank" rel="noopener noreferrer" w="full" size="lg">
              Encontrar hospital com soro
            </Button>
          </VStack>
        </Box>
      </Flex>
    </PageShell>
  );
}
