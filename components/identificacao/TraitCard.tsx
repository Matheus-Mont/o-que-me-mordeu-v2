"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TbCheck, TbPhoto } from "react-icons/tb";

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

interface Props {
  label: string;
  descricao: string;
  imagem?: string;
  selecionado: boolean;
  onToggle: () => void;
}

export default function TraitCard({ label, descricao, imagem, selecionado, onToggle }: Props) {
  return (
    <Box
      as="button"
      type="button"
      role="checkbox"
      aria-checked={selecionado}
      onClick={onToggle}
      textAlign="left"
      display="flex"
      flexDirection="column"
      bg="bg.surface"
      border="2px solid"
      borderColor={selecionado ? "accent.solid" : "border"}
      borderRadius="12px"
      overflow="hidden"
      transition="border-color 0.15s ease, background 0.15s ease"
      _hover={{ bg: "bg.surfaceHover", borderColor: selecionado ? "accent.solid" : "borderStrong" }}
      h="full"
      minH={{ base: "220px", md: "270px" }}
    >
      <Box height={{ base: "100px", md: "140px" }} position="relative" bg="bg.canvas">
        {imagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagem}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
          />
        ) : (
          <Flex position="absolute" inset={0} align="center" justify="center" color="text.muted">
            <TbPhoto aria-hidden />
          </Flex>
        )}
        {selecionado && (
          <Flex
            position="absolute"
            top="6px"
            right="6px"
            w="20px"
            h="20px"
            borderRadius="full"
            bg="accent.solid"
            color="accent.onSolid"
            align="center"
            justify="center"
            fontSize="12px"
          >
            <TbCheck aria-hidden />
          </Flex>
        )}
      </Box>

      <Box p={{ base: "10px", md: "14px" }}>
        <Text fontFamily="heading" fontWeight={700} fontSize={{ base: "13px", md: "15px" }} mb={1}>
          {capitalizar(label)}
        </Text>
        <Text fontSize={{ base: "11.5px", md: "13px" }} color="text.secondary" lineHeight={1.35}>
          {capitalizar(descricao)}
        </Text>
      </Box>
    </Box>
  );
}
