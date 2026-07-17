import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { StatusConteudo } from "@prisma/client";
import { Badge, Box, Button, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import CarrosselImagens from "@/components/animal/CarrosselImagens";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";

// Ficha do animal — destino comum de Identificar e Catálogo. Só exibe
// fichas com status PUBLICADO; SEO: página indexável, pensada para buscas
// do tipo "picada de cobra o que fazer".
//
// Mobile: tudo empilhado em uma coluna (galeria no topo).
// Desktop (lg+): galeria e identificação à esquerda, primeiros socorros e
// soro à direita — lado a lado em vez de uma coluna única esticada.

const URGENCIA_LABEL: Record<string, string> = {
  ALTA: "urgência alta",
  MEDIA: "urgência média",
  BAIXA: "urgência baixa",
};

const URGENCIA_SCHEME: Record<string, "danger" | "warning" | "safe"> = {
  ALTA: "danger",
  MEDIA: "warning",
  BAIXA: "safe",
};

interface Props {
  params: { slug: string };
}

// ISR: as fichas publicadas são pré-geradas no build (generateStaticParams)
// e revalidadas no máximo a cada hora — evita bater no Postgres a cada
// visita, já que o conteúdo (revisado por um humano antes de publicar) não
// muda a todo instante. Uma ficha nova/editada aparece em até 1h, ou na hora
// se o deploy disparar um novo build.
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

  // NOTA: o repositório do SoroJá (github.com/educrvz/sos-antiveneno) foi
  // verificado e, até o momento, NÃO lê parâmetros de URL para pré-selecionar
  // tipo de soro/animal — os filtros da página são só estado interno de UI.
  const linkSoroJa = "https://soroja.com.br/";
  const scheme = URGENCIA_SCHEME[animal.nivelUrgencia];

  return (
    <PageShell maxW={{ base: "480px", lg: "900px" }}>
      <PageHeader title={animal.nomePopular} href="/catalogo" />

      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 6, lg: 10 }} align="start">
        <Box flex={{ lg: "1.1" }} w="full" minW={0}>
          <CarrosselImagens imagens={animal.imagens} alt={animal.nomePopular} />

          <Flex align="center" gap={2} flexWrap="wrap" mt={4}>
            <Heading as="h1" size="md">
              {animal.nomePopular}
            </Heading>
            <Badge bg={`${scheme}.bg`} color={`${scheme}.text`} fontSize="0.7rem">
              {URGENCIA_LABEL[animal.nivelUrgencia]}
            </Badge>
          </Flex>
          <Text fontStyle="italic" color="text.secondary" mt={0.5} mb={4}>
            {animal.nomeCientifico}
          </Text>

          <VStack align="stretch" spacing={4}>
            <Box>
              <Heading as="h2" size="xs" mb={1}>
                onde é mais comum
              </Heading>
              <Text fontSize="sm">{animal.regioes.length > 0 ? animal.regioes.join(", ") : "não informado"}</Text>
            </Box>

            <Box>
              <Heading as="h2" size="xs" mb={1}>
                como identificar
              </Heading>
              {animal.identificacao.length > 0 ? (
                <VStack as="ul" align="start" spacing={1} pl={4} fontSize="sm">
                  {animal.identificacao.map((item) => (
                    <Text as="li" key={item}>
                      {item}
                    </Text>
                  ))}
                </VStack>
              ) : (
                <Text fontSize="sm" color="text.secondary">
                  nenhuma característica cadastrada ainda.
                </Text>
              )}
            </Box>

            <Box>
              <Heading as="h2" size="xs" mb={1}>
                sintomas do acidente
              </Heading>
              <Text fontSize="sm">{animal.sintomas}</Text>
              <Text fontSize="xs" color="text.secondary" mt={1}>
                tempo até os sintomas: {animal.tempoSintomas}
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" w="full" minW={0} position={{ lg: "sticky" }} top={{ lg: 8 }}>
          <VStack align="stretch" spacing={4}>
            <Box bg="safe.bg" border="1px solid" borderColor="safe.border" borderRadius="card" p={4}>
              <Text fontWeight={700} color="safe.text" mb={1}>
                ✓ o que fazer
              </Text>
              <VStack as="ul" align="start" spacing={1} pl={4} fontSize="sm" color="safe.text">
                {animal.primeirosSocorrosFazer.map((item) => (
                  <Text as="li" key={item}>
                    {item}
                  </Text>
                ))}
              </VStack>
            </Box>

            <Box bg="danger.bg" border="1px solid" borderColor="danger.border" borderRadius="card" p={4}>
              <Text fontWeight={700} color="danger.text" mb={1}>
                ⛔ o que não fazer
              </Text>
              <VStack as="ul" align="start" spacing={1} pl={4} fontSize="sm" color="danger.text">
                {animal.primeirosSocorrosNaoFazer.map((item) => (
                  <Text as="li" key={item}>
                    {item}
                  </Text>
                ))}
              </VStack>
            </Box>

            <Divider borderColor="border" />

            <Box>
              <Heading as="h2" size="xs" mb={1}>
                soro indicado
              </Heading>
              <Text fontSize="sm">{animal.soroIndicado}</Text>
              <Text fontSize="xs" color="text.secondary" mt={1}>
                a aplicação do soro é exclusiva de profissional de saúde, em ambiente hospitalar.
              </Text>
            </Box>

            <Button as="a" href={linkSoroJa} target="_blank" rel="noopener noreferrer" size="lg">
              encontrar hospital com soro
            </Button>
          </VStack>
        </Box>
      </Flex>
    </PageShell>
  );
}
