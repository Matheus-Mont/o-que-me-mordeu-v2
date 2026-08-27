import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { StatusConteudo } from "@prisma/client";
import { Box, Button, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TbCircleCheck, TbBan } from "react-icons/tb";
import CarrosselImagens from "@/components/animal/CarrosselImagens";
import AvisoFotografar from "@/components/animal/AvisoFotografar";
import AvisoLeiCobra from "@/components/animal/AvisoLeiCobra";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import BlocoTriagem from "@/components/ui/BlocoTriagem";
import Etiqueta from "@/components/ui/Etiqueta";
import { capitalizar } from "@/lib/texto";
import { URGENCIA_LABEL, URGENCIA_SCHEME } from "@/lib/urgencia";

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

  const nome = capitalizar(animal.nomePopular);
  return {
    title: `${nome} — o que fazer | o que me mordeu?`,
    description: `Como identificar ${nome.toLowerCase()}, sintomas e primeiros socorros. ${animal.sintomas}`,
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
    <PageShell maxW={{ base: "100%", lg: "content" }}>
      <PageHeader href="/catalogo" />

      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 6, lg: 12 }} align="start">
        <Box flex={{ lg: "1.15" }} minW={0} w="full">
          <CarrosselImagens imagens={animal.imagens} alt={capitalizar(animal.nomePopular)} />

          <Box mt={5} mb={5}>
            <Etiqueta cor={`${scheme}.text`}>{URGENCIA_LABEL[animal.nivelUrgencia]}</Etiqueta>
            <Heading
              as="h1"
              fontSize={{ base: "26px", md: "30px" }}
              fontWeight={800}
              lineHeight={1.06}
              mt={1.5}
            >
              {capitalizar(animal.nomePopular)}
            </Heading>
            <Text fontSize="13px" fontStyle="italic" color="text.muted" mt={1}>
              {animal.nomeCientifico}
            </Text>
          </Box>

          {/* Ficha de dados: lê-se como registro, não como parágrafo */}
          <SimpleGrid
            columns={2}
            spacing="1px"
            bg="border"
            border="1px solid"
            borderColor="border"
            borderRadius="12px"
            overflow="hidden"
            mb={5}
          >
            <Box bg="bg.surface" p="13px 14px">
              <Etiqueta>Onde ocorre</Etiqueta>
              <Text fontSize="12.5px" lineHeight={1.35} mt={1}>
                {animal.regioes.length > 0
                  ? animal.regioes.map(capitalizar).join(", ")
                  : "Não informado"}
              </Text>
            </Box>
            <Box bg="bg.surface" p="13px 14px">
              <Etiqueta>Sintomas em</Etiqueta>
              <Text fontSize="12.5px" lineHeight={1.35} mt={1}>
                {capitalizar(animal.tempoSintomas)}
              </Text>
            </Box>
          </SimpleGrid>

          <VStack align="stretch" spacing={5}>
            <Box>
              <Box mb={2.5}>
                <Etiqueta>Como identificar</Etiqueta>
              </Box>
              {animal.identificacao.length > 0 ? (
                <VStack align="stretch" spacing={2}>
                  {animal.identificacao.map((item) => (
                    <Flex key={item} gap={2.5} fontSize="13.5px" lineHeight={1.45}>
                      <Box
                        w="5px"
                        h="5px"
                        borderRadius="full"
                        bg="accent.solid"
                        flexShrink={0}
                        mt="7px"
                        aria-hidden
                      />
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
              <Box mb={2.5}>
                <Etiqueta>Sintomas do acidente</Etiqueta>
              </Box>
              <Text fontSize="13.5px" lineHeight={1.5}>
                {capitalizar(animal.sintomas)}
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" minW={0} w="full" position={{ lg: "sticky" }} top={{ lg: "96px" }}>
          <VStack align="stretch" spacing="14px">
            <BlocoTriagem escala="safe" titulo="O que fazer" icone={<TbCircleCheck size={16} />}>
              <VStack align="stretch" spacing={1.5}>
                {animal.primeirosSocorrosFazer.map((item) => (
                  <Text key={item} fontSize="13px" lineHeight={1.45}>
                    {capitalizar(item)}
                  </Text>
                ))}
              </VStack>
            </BlocoTriagem>

            <BlocoTriagem escala="danger" titulo="O que não fazer" icone={<TbBan size={16} />}>
              <VStack align="stretch" spacing={1.5}>
                {animal.primeirosSocorrosNaoFazer.map((item) => (
                  <Text key={item} fontSize="13px" lineHeight={1.45}>
                    {capitalizar(item)}
                  </Text>
                ))}
              </VStack>
            </BlocoTriagem>

            <Box
              bg="bg.surface"
              border="1px solid"
              borderColor="accent.border"
              borderRadius="card"
              p={4}
            >
              <Etiqueta cor="accent.text">Soro indicado</Etiqueta>
              <Text fontFamily="heading" fontWeight={700} fontSize="17px" mt={1.5} mb={1.5}>
                {capitalizar(animal.soroIndicado)}
              </Text>
              <Text fontSize="12px" color="text.secondary" lineHeight={1.45}>
                Aplicação exclusiva de profissional de saúde, em ambiente hospitalar.
              </Text>
            </Box>

            <AvisoFotografar />

            {animal.categoria === "COBRA" && <AvisoLeiCobra />}

            <Button as="a" href={linkSoroJa} target="_blank" rel="noopener noreferrer" w="full" size="lg">
              Encontrar hospital com soro
            </Button>
          </VStack>
        </Box>
      </Flex>
    </PageShell>
  );
}
