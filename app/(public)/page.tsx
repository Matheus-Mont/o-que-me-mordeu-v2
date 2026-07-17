"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbMapPin, TbPaw, TbSearch, TbList, TbShieldCheck } from "react-icons/tb";
import ColorModeToggle from "@/components/layout/ColorModeToggle";
import NavCard from "@/components/layout/NavCard";
import PageShell from "@/components/layout/PageShell";

// Tela de abertura (aviso de responsabilidade) + tela inicial (ramificação
// para os três caminhos principais). As duas vivem na mesma rota raiz: o
// aviso é um "gate" antes do conteúdo.

export default function PaginaInicial() {
  const [etapa, setEtapa] = useState<"aviso" | "inicio">("aviso");

  if (etapa === "aviso") {
    return (
      <PageShell>
        <Flex justify="flex-end" mb={2}>
          <ColorModeToggle />
        </Flex>
        <Flex direction="column" justify="center" minH="calc(100vh - 120px)" gap={5}>
          <VStack spacing={3} textAlign="center">
            <Flex
              w="64px"
              h="64px"
              borderRadius="16px"
              bg="accent.bg"
              color="accent.text"
              align="center"
              justify="center"
              fontSize="1.6rem"
            >
              <TbPaw aria-hidden />
            </Flex>
            <Heading as="h1" size="md">
              o que me mordeu?
            </Heading>
            <Text color="text.secondary" fontSize="sm">
              identificação de animais peçonhentos e orientação de primeiros socorros
            </Text>
          </VStack>

          <Alert status="warning" bg="warning.bg" borderColor="warning.border" borderWidth="1px" borderRadius="card" color="warning.text">
            <AlertIcon color="warning.text" />
            este app é informativo e não substitui atendimento médico. em emergência,
            ligue 192 (samu) imediatamente.
          </Alert>

          <VStack spacing={2}>
            <Button w="full" size="lg" onClick={() => setEtapa("inicio")}>
              entendi, continuar
            </Button>
            <Button
              as={NextLink}
              href="/emergencia"
              w="full"
              size="lg"
              variant="outline"
              leftIcon={<TbMapPin aria-hidden />}
            >
              preciso de ajuda agora
            </Button>
          </VStack>
        </Flex>
      </PageShell>
    );
  }

  return (
    <PageShell maxW={{ base: "480px", md: "640px" }}>
      <Flex align="center" justify="space-between" mb={6}>
        <HStack spacing={2}>
          <Flex w="32px" h="32px" borderRadius="9px" bg="accent.bg" color="accent.text" align="center" justify="center">
            <TbPaw aria-hidden />
          </Flex>
          <Text fontSize="sm" color="text.secondary">
            o que me mordeu?
          </Text>
        </HStack>
        <ColorModeToggle />
      </Flex>

      <Heading as="h2" size="md" mb={1}>
        o que você precisa?
      </Heading>
      <Text color="text.secondary" fontSize="sm" mb={6}>
        escolha uma opção para começar
      </Text>

      <VStack spacing={3} align="stretch">
        <NavCard
          href="/identificar"
          icon={TbSearch}
          title="identificar animal"
          subtitle="responda perguntas guiadas sobre o que aconteceu"
        />
        <NavCard
          href="/catalogo"
          icon={TbList}
          title="catálogo"
          subtitle="navegue ou busque por nome e região"
        />
        <NavCard
          href="/prevencao"
          icon={TbShieldCheck}
          title="prevenção"
          subtitle="cuidados por ambiente para evitar acidentes"
        />
      </VStack>
    </PageShell>
  );
}
