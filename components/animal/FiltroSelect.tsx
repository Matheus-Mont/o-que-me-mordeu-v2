"use client";

import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text } from "@chakra-ui/react";
import { TbChevronDown } from "react-icons/tb";

interface Opcao {
  valor: string;
  label: string;
}

interface Props {
  rotulo: string;
  valor: string;
  opcoes: Opcao[];
  onChange: (valor: string) => void;
}

export default function FiltroSelect({ rotulo, valor, opcoes, onChange }: Props) {
  const labelAtual = opcoes.find((o) => o.valor === valor)?.label ?? "";

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        size="sm"
        bg="bg.surface"
        rightIcon={<TbChevronDown />}
        fontWeight={500}
      >
        <Text as="span" color="text.secondary">
          {rotulo}:{" "}
        </Text>
        <Text as="span" color="text.primary">
          {labelAtual}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          value={valor}
          onChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
        >
          {opcoes.map((o) => (
            <MenuItemOption key={o.valor} value={o.valor}>
              {o.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
