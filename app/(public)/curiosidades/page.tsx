import { SimpleGrid } from "@chakra-ui/react";
import { TbBulb, TbPlayCard } from "react-icons/tb";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import NavCard from "@/components/layout/NavCard";

export const metadata = {
  title: "Curiosidades | O que me mordeu?",
};

export default function CuriosidadesPage() {
  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      <PageHeader title="Curiosidades" href="/" />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }} mt="4px">
        <NavCard
          href="/curiosidades/quiz"
          title="Jogar o quiz"
          subtitle="10 perguntas sobre os animais peçonhentos do Brasil, com tempo pra responder."
          icon={TbPlayCard}
          variant="primary"
        />
        <NavCard
          href="/curiosidades/ler"
          title="Ler as curiosidades"
          subtitle="Todos os fatos, sem cronômetro nem pontuação."
          icon={TbBulb}
        />
      </SimpleGrid>
    </PageShell>
  );
}
