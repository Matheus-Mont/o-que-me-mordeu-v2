"use client";

import NextLink from "next/link";
import { Box, Flex, HStack, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TbBrandGithub, TbBrandLinkedin, TbMail, TbPhone } from "react-icons/tb";
import type { IconType } from "react-icons";

const GITHUB_URL = "https://github.com/Matheus-Mont";
const EMAIL = "dev.matheusmonteiro@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/matheusoliveiramonteiro/";

const FONTE_URL =
  "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/publicacoes/guia-animais-peconhentos-do-brasil.pdf/view";

const TELEFONES = [
  { nome: "SAMU", numero: "192", href: "tel:192" },
  { nome: "Bombeiros", numero: "193", href: "tel:193" },
  { nome: "Disque-Intoxicação (CIATox)", numero: "0800 722 6001", href: "tel:08007226001" },
];

const linkStyle = {
  color: "text.secondary",
  fontSize: "13px",
  _hover: { color: "accent.text", textDecoration: "none" },
} as const;

function ContatoLink({
  icon: Icon,
  href,
  children,
  externo,
}: {
  icon: IconType;
  href: string;
  children: React.ReactNode;
  externo?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      display="inline-flex"
      alignItems="center"
      gap={2}
      {...linkStyle}
    >
      <Box as={Icon} fontSize="1rem" flexShrink={0} aria-hidden />
      {children}
    </Link>
  );
}

function TituloColuna({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontFamily="heading"
      fontWeight={700}
      fontSize="12px"
      textTransform="uppercase"
      letterSpacing="0.05em"
      color="text.muted"
      mb={3}
    >
      {children}
    </Text>
  );
}

export default function Footer() {
  return (
    <Box as="footer" borderTop="1px solid" borderColor="border">
      <Box maxW="1040px" mx="auto" px={{ base: 5, md: 6 }} py={{ base: 8, md: 10 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 10 }} mb={8}>
          <Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="md" mb={2}>
              O que me mordeu?
            </Text>
            <Text fontSize="13px" color="text.secondary" lineHeight={1.6} maxW="320px">
              Identificação de animais peçonhentos do Brasil e orientação de
              primeiros socorros. Projeto informativo e educativo.
            </Text>
          </Box>

          <Box>
            <TituloColuna>contato</TituloColuna>
            <VStack align="start" spacing={2}>
              <ContatoLink icon={TbBrandGithub} href={GITHUB_URL} externo>
                github.com/Matheus-Mont
              </ContatoLink>
              {LINKEDIN_URL && (
                <ContatoLink icon={TbBrandLinkedin} href={LINKEDIN_URL} externo>
                  LinkedIn
                </ContatoLink>
              )}
              <ContatoLink icon={TbMail} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </ContatoLink>
            </VStack>
          </Box>

          <Box>
            <TituloColuna>em emergência, ligue</TituloColuna>
            <VStack align="stretch" spacing={2}>
              {TELEFONES.map((t) => (
                <Flex
                  key={t.numero}
                  as="a"
                  href={t.href}
                  justify="space-between"
                  align="center"
                  gap={3}
                  fontSize="13px"
                  color="text.secondary"
                  _hover={{ color: "text.primary" }}
                >
                  <HStack spacing={2} minW={0}>
                    <Box as={TbPhone} fontSize="0.95rem" flexShrink={0} aria-hidden />
                    <Text as="span" noOfLines={1}>
                      {t.nome}
                    </Text>
                  </HStack>
                  <Text as="span" fontWeight={700} color="accent.text" whiteSpace="nowrap">
                    {t.numero}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        <Box borderTop="1px dashed" borderColor="borderStrong" pt={5}>
          <Text fontSize="12px" color="text.secondary" lineHeight={1.6} mb={3}>
            Todas as informações sobre os animais, sintomas e primeiros socorros
            têm como base o{" "}
            <Link href={FONTE_URL} target="_blank" rel="noopener noreferrer" color="accent.text" _hover={{ textDecoration: "underline" }}>
              Guia de Animais Peçonhentos do Brasil — Ministério da Saúde
            </Link>
            .
          </Text>
          <Text fontSize="12px" color="text.muted" lineHeight={1.6} mb={4}>
            Este conteúdo é informativo e não substitui avaliação médica
            presencial. Em caso de acidente, procure atendimento de saúde
            imediatamente.
          </Text>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            gap={2}
            fontSize="11.5px"
            color="text.muted"
          >
            <Text>© {new Date().getFullYear()} O que me mordeu?</Text>
            <HStack spacing={4} flexWrap="wrap">
              <Link as={NextLink} href="/catalogo" _hover={{ color: "text.secondary", textDecoration: "none" }}>
                Catálogo
              </Link>
              <Link as={NextLink} href="/prevencao" _hover={{ color: "text.secondary", textDecoration: "none" }}>
                Prevenção
              </Link>
              <Link as={NextLink} href="/emergencia" _hover={{ color: "text.secondary", textDecoration: "none" }}>
                Emergência
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
