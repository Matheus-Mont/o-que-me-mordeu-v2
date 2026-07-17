"use client";

import { Flex, HStack, IconButton, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TbArrowLeft } from "react-icons/tb";
import ColorModeToggle from "./ColorModeToggle";

// Cabeçalho padrão das telas públicas: seta de voltar + título + alternador
// de tema. `href` faz um Link normal; sem `href`, volta pelo histórico
// (usado no wizard de identificação, que tem etapas internas).

interface Props {
  title?: string;
  href?: string;
  onBack?: () => void;
}

export default function PageHeader({ title, href, onBack }: Props) {
  const router = useRouter();

  function voltar() {
    if (onBack) return onBack();
    if (href) return router.push(href);
    router.back();
  }

  return (
    <Flex align="center" mb={{ base: 5, md: 7 }} gap={2}>
      <HStack spacing={2} flex={1}>
        <IconButton
          aria-label="voltar"
          icon={<TbArrowLeft />}
          onClick={voltar}
          variant="ghost"
          size="sm"
          borderRadius="full"
        />
        {title && (
          <Heading as="h1" size="sm" fontWeight={600}>
            {title}
          </Heading>
        )}
      </HStack>
      <ColorModeToggle />
    </Flex>
  );
}
