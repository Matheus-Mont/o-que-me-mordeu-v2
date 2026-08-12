"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

export interface ItemGrupoBotoes {
  valor: string | null;
  label: string;
  icon?: IconType;
}

// Empilhado e em largura cheia no mobile (toque maior, uma opção por linha);
// em duas colunas no desktop pra aproveitar o espaço e sobrar menos vazio.
// Com número ímpar de opções, o Flex+wrap centraliza sozinho a última linha
// incompleta (mesma solução já usada no catálogo pra não deixar card orfão).
export default function GrupoBotoes({
  itens,
  ehSelecionado,
  onSelecionar,
}: {
  itens: ItemGrupoBotoes[];
  ehSelecionado: (valor: string | null) => boolean;
  onSelecionar: (valor: string | null) => void;
}) {
  return (
    <Flex wrap="wrap" justify="center" gap="10px">
      {itens.map((item) => {
        const ativo = ehSelecionado(item.valor);
        const Icon = item.icon;
        return (
          <Button
            key={item.label}
            aria-pressed={ativo}
            h="auto"
            flexBasis={{ base: "100%", md: "calc(50% - 5px)" }}
            flexGrow={0}
            flexShrink={0}
            py={{ base: "14px", md: "18px" }}
            px="18px"
            borderRadius="16px"
            variant={ativo ? "solid" : "outline"}
            bg={ativo ? undefined : "bg.surface"}
            color={ativo ? undefined : "text.secondary"}
            fontWeight={500}
            fontSize={{ base: "14px", md: "15px" }}
            onClick={() => onSelecionar(item.valor)}
          >
            {Icon ? (
              <Flex align="center" gap={2}>
                <Icon aria-hidden />
                <Text as="span">{item.label}</Text>
              </Flex>
            ) : (
              item.label
            )}
          </Button>
        );
      })}
    </Flex>
  );
}
