import NextLink from "next/link";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { TbBook2, TbHelpCircle, TbShieldCheck } from "react-icons/tb";
import HomeBanner from "@/components/layout/HomeBanner";
import NavCard from "@/components/layout/NavCard";
import PageShell from "@/components/layout/PageShell";

export default function PaginaInicial() {
  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      <Box mb={{ base: 4, md: 5 }}>
        <HomeBanner
          titulo="Respire. Vamos descobrir juntos o que aconteceu."
          descricao="Cobras, aranhas, escorpiões, lagartas e águas-vivas — triagem rápida, com orientação segura."
          href="/identificar"
        />
      </Box>
      <Box
        bg="danger.bg"
        border="1px solid"
        borderColor="danger.border"
        borderRadius="card"
        p={{ base: "14px 16px", md: "16px 20px" }}
        mb={{ base: 4, md: 5 }}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "stretch", sm: "center" }}
          justify="space-between"
          gap={3}
        >
          <Text fontWeight={600} fontSize="13px" color="danger.text">
            Sintomas graves agora? Falta de ar, desmaio ou sangramento intenso.
          </Text>
          <Button
            as={NextLink}
            href="/emergencia"
            size="sm"
            flexShrink={0}
            bg="danger.solid"
            color="white"
            _hover={{ bg: "danger.solidHover" }}
            borderRadius="8px"
          >
            Ver primeiros socorros e ligar 192 →
          </Button>
        </Flex>
      </Box>


      <Box mt={{ base: 5, md: 6 }} display={{ base: "block", md: "none" }}>
        <NavCard
          href="/identificar"
          title="Fazer triagem guiada"
          subtitle="Algumas perguntas rápidas sobre local, sintomas e o animal."
          variant="primary"
          layout="row"
          icon={TbHelpCircle}
          showArrow
        />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }} mt={{ base: 3, md: 4 }}>
        <NavCard
          href="/catalogo"
          title="Explorar o catálogo"
          subtitle="Compare a aparência e as características das espécies."
          icon={TbBook2}
        />
        <NavCard
          href="/prevencao"
          title="Cuidados de prevenção"
          subtitle="Como evitar acidentes em cada ambiente."
          icon={TbShieldCheck}
        />
      </SimpleGrid>

      <Text fontSize="12px" color="text.muted" mt={{ base: 8, md: 10 }} lineHeight={1.6}>
        Este app é informativo e não substitui avaliação médica presencial. Em
        emergência, ligue 192 (SAMU) imediatamente.
      </Text>
    </PageShell>
  );
}
