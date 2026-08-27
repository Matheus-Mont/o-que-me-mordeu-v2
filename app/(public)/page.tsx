import NextLink from "next/link";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { TbAlertTriangle, TbBook2, TbBulb, TbHelpCircle, TbPhoneCall, TbShieldCheck } from "react-icons/tb";
import HomeBanner from "@/components/layout/HomeBanner";
import NavCard from "@/components/layout/NavCard";
import PageShell from "@/components/layout/PageShell";
import BlocoTriagem from "@/components/ui/BlocoTriagem";
import Etiqueta from "@/components/ui/Etiqueta";

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

      <Box mb={{ base: 4, md: 5 }}>
        <BlocoTriagem escala="danger" titulo="Sinais de gravidade" icone={<TbAlertTriangle size={16} />}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "stretch", sm: "center" }}
            justify="space-between"
            gap={3}
          >
            <Box>
              <Text fontFamily="heading" fontWeight={700} fontSize="15px" lineHeight={1.25} mb={1}>
                Falta de ar, desmaio ou sangramento intenso?
              </Text>
              <Text fontSize="13px" color="text.secondary">
                Não use a triagem. Ligue para o SAMU agora.
              </Text>
            </Box>
            <Button
              as={NextLink}
              href="/emergencia"
              leftIcon={<TbPhoneCall size={16} />}
              flexShrink={0}
              bg="danger.solid"
              color="white"
              _hover={{ bg: "danger.solidHover" }}
              borderRadius="10px"
            >
              Ligar 192
            </Button>
          </Flex>
        </BlocoTriagem>
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

      <Box mt={{ base: 6, md: 7 }} mb={3}>
        <Etiqueta>Consultar sem pressa</Etiqueta>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 4 }}>
        <NavCard
          href="/catalogo"
          title="Explorar o catálogo"
          subtitle="Compare a aparência e as características das espécies."
          icon={TbBook2}
        />
        <NavCard
          href="/prevencao"
          title="Cuidados e prevenção"
          subtitle="Como evitar acidentes em cada ambiente."
          icon={TbShieldCheck}
        />
        <NavCard
          href="/curiosidades"
          title="Curiosidades"
          subtitle="Fatos verificados sobre os animais, num quiz ou pra ler com calma."
          icon={TbBulb}
        />
      </SimpleGrid>

      <Text fontSize="12px" color="text.muted" mt={{ base: 8, md: 10 }} lineHeight={1.6}>
        Este app é informativo e não substitui avaliação médica presencial. Em
        emergência, ligue 192 (SAMU) imediatamente.
      </Text>
    </PageShell>
  );
}
