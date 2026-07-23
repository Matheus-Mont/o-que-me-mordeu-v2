"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

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
    <Box mb={{ base: 4, md: 5 }}>
      <Text
        as="button"
        onClick={voltar}
        fontSize="13px"
        color="text.secondary"
        cursor="pointer"
        _hover={{ color: "text.primary" }}
        display="block"
        mb={title ? "14px" : 0}
      >
        ← Voltar
      </Text>
      {title && (
        <Heading as="h1" fontSize="xl" fontWeight={700}>
          {title}
        </Heading>
      )}
    </Box>
  );
}
