import NextLink from "next/link";
import { Box, Button, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TbCircleCheck, TbBan, TbPhoneCall } from "react-icons/tb";
import AvisoFotografar from "@/components/animal/AvisoFotografar";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import BlocoTriagem from "@/components/ui/BlocoTriagem";
import Etiqueta from "@/components/ui/Etiqueta";

export const metadata = {
  title: "Emergência | O que me mordeu?",
};

// SAMU sai da lista e vira o maior elemento da tela: numa emergência, ligar é a
// ação que salva, então ela não pode ter menos peso visual que um link de apoio.
const SECUNDARIOS = [
  { nome: "Bombeiros", numero: "193", tel: "193" },
  { nome: "CIATox", numero: "0800 722 6001", tel: "08007226001" },
];

export default function EmergenciaPage() {
  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      <PageHeader href="/" />

      <Box mb={5}>
        <Etiqueta traco cor="danger.text">
          Emergência
        </Etiqueta>
        <Heading
          as="h1"
          fontSize={{ base: "28px", md: "34px" }}
          lineHeight={1.08}
          fontWeight={800}
          mt={2}
          mb={2}
        >
          Ligue agora. Fique com a vítima.
        </Heading>
        <Text color="text.secondary" fontSize="sm" lineHeight={1.5}>
          Toque no número para chamar. Depois siga os cuidados desta página
          enquanto a ajuda chega.
        </Text>
      </Box>

      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 6, md: 10 }} align="start">
        <Box flex="1" minW={0} w="full">
          <Flex
            as="a"
            href="tel:192"
            align="center"
            gap={4}
            bg="danger.solid"
            color="white"
            borderRadius="card"
            p={{ base: "18px 20px", md: "20px 22px" }}
            mb="10px"
            transition="background 0.15s ease"
            _hover={{ bg: "danger.solidHover", textDecoration: "none" }}
          >
            <Flex
              align="center"
              justify="center"
              w="46px"
              h="46px"
              borderRadius="12px"
              bg="blackAlpha.300"
              flexShrink={0}
              aria-hidden
            >
              <TbPhoneCall size={23} />
            </Flex>
            <Box flex="1" minW={0}>
              <Text
                fontFamily="mono"
                fontSize="10px"
                fontWeight={600}
                letterSpacing="0.14em"
                opacity={0.85}
              >
                SAMU
              </Text>
              <Text
                fontFamily="heading"
                fontWeight={800}
                fontSize={{ base: "42px", md: "46px" }}
                lineHeight={1}
                letterSpacing="-0.03em"
              >
                192
              </Text>
            </Box>
            <Text
              fontFamily="heading"
              fontWeight={700}
              fontSize="13px"
              bg="blackAlpha.300"
              borderRadius="9px"
              px="14px"
              py="9px"
              flexShrink={0}
            >
              Ligar
            </Text>
          </Flex>

          <SimpleGrid columns={2} spacing="10px" mb="14px">
            {SECUNDARIOS.map((t) => (
              <Flex
                key={t.numero}
                as="a"
                href={`tel:${t.tel}`}
                direction="column"
                gap={1}
                bg="danger.bg"
                border="1px solid"
                borderColor="danger.border"
                borderRadius="12px"
                p="14px 16px"
                transition="background 0.15s ease"
                _hover={{ bg: "bg.surfaceHover", textDecoration: "none" }}
              >
                <Text
                  fontFamily="mono"
                  fontSize="9.5px"
                  fontWeight={600}
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="text.secondary"
                >
                  {t.nome}
                </Text>
                <Text
                  fontFamily="heading"
                  fontWeight={800}
                  fontSize={{ base: "19px", md: "22px" }}
                  lineHeight={1.15}
                  letterSpacing="-0.02em"
                  color="danger.text"
                >
                  {t.numero}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>

          <Button
            as="a"
            href="https://soroja.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            w="full"
            size="lg"
            variant="outline"
            borderColor="accent.border"
            bg="accent.bg"
            color="accent.text"
            _hover={{ bg: "accent.bg", borderColor: "accent.solid" }}
          >
            Encontrar hospital com soro
          </Button>

          <Box textAlign="center" mt={3}>
            <Button as={NextLink} href="/identificar" variant="link" color="text.secondary" fontSize="13px">
              Sei que tipo de animal foi
            </Button>
          </Box>
        </Box>

        <Box flex="1" minW={0} w="full">
          <Box mb={3}>
            <Etiqueta>Enquanto a ajuda chega</Etiqueta>
          </Box>

          <VStack align="stretch" spacing="10px">
            <BlocoTriagem escala="safe" titulo="Faça" icone={<TbCircleCheck size={16} />}>
              <VStack align="stretch" spacing={1.5} fontSize="13px" lineHeight={1.45}>
                <Text>Lave o local com água e sabão.</Text>
                <Text>Mantenha o membro atingido elevado e em repouso.</Text>
                <Text>Ofereça água à vítima, se ela conseguir beber.</Text>
              </VStack>
            </BlocoTriagem>

            <BlocoTriagem escala="danger" titulo="Nunca faça" icone={<TbBan size={16} />}>
              <VStack align="stretch" spacing={1.5} fontSize="13px" lineHeight={1.45}>
                <Text>Torniquete ou atadura apertada.</Text>
                <Text>Cortar o local da picada.</Text>
                <Text>Tentar sugar o veneno.</Text>
              </VStack>
            </BlocoTriagem>

            <AvisoFotografar />
          </VStack>
        </Box>
      </Flex>
    </PageShell>
  );
}
