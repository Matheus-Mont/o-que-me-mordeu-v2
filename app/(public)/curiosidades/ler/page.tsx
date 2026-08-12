import { Text } from "@chakra-ui/react";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import ListaCuriosidades from "@/components/curiosidades/ListaCuriosidades";

export const metadata = {
  title: "Curiosidades | O que me mordeu?",
};

export default function LerCuriosidadesPage() {
  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      <PageHeader title="Curiosidades" href="/curiosidades" />
      <Text color="text.secondary" fontSize="sm" mb={5}>
        Fatos sobre os animais peçonhentos do Brasil, tirados do guia do Ministério da Saúde e de outras fontes.
      </Text>
      <ListaCuriosidades />
    </PageShell>
  );
}
