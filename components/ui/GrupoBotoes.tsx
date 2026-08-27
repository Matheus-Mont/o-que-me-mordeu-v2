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
  size = "lg",
}: {
  itens: ItemGrupoBotoes[];
  ehSelecionado: (valor: string | null) => boolean;
  onSelecionar: (valor: string | null) => void;
  size?: "lg" | "sm";
}) {
  const compacto = size === "sm";

  return (
    <Flex wrap="wrap" justify="center" gap={compacto ? "8px" : "10px"}>
      {itens.map((item) => {
        const ativo = ehSelecionado(item.valor);
        const Icon = item.icon;
        return (
          <Button
            key={item.label}
            aria-pressed={ativo}
            h="auto"
            flexBasis={
              compacto
                ? { base: "calc(50% - 4px)", sm: "calc(33.333% - 6px)" }
                : { base: "100%", md: "calc(50% - 5px)" }
            }
            flexGrow={0}
            flexShrink={0}
            minW={0}
            // Button do Chakra vem com white-space: nowrap embutido; sem isso,
            // label longo vaza pra fora do botão em vez de quebrar linha.
            whiteSpace="normal"
            textAlign="center"
            lineHeight={1.35}
            py={compacto ? "10px" : { base: "14px", md: "18px" }}
            px={compacto ? "12px" : "18px"}
            borderRadius={compacto ? "12px" : "16px"}
            variant={ativo ? "solid" : "outline"}
            bg={ativo ? undefined : "bg.surface"}
            color={ativo ? undefined : "text.secondary"}
            fontWeight={500}
            fontSize={compacto ? "13px" : { base: "14px", md: "15px" }}
            onClick={() => onSelecionar(item.valor)}
          >
            {Icon ? (
              <Flex align="center" gap={compacto ? 1.5 : 2}>
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
