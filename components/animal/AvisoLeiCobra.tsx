import { Box, Flex, Text } from "@chakra-ui/react";
import { TbScale } from "react-icons/tb";

export default function AvisoLeiCobra() {
  return (
    <Box
      bg="safe.bg"
      border="1px solid"
      borderColor="safe.border"
      borderRadius="card"
      p={4}
    >
      <Flex gap={2.5} align="flex-start">
        <Box color="safe.text" fontSize="1.1rem" mt="1px" flexShrink={0}>
          <TbScale aria-hidden />
        </Box>
        <Box>
          <Text fontWeight={700} fontSize="13.5px" color="safe.text" mb={1}>
            Não mate a cobra
          </Text>
          <Text fontSize="13px" color="text.secondary" lineHeight={1.5}>
            Matar animais silvestres sem autorização é crime ambiental no Brasil
            (Lei nº 9.605/1998, art. 29), punível com detenção de 6 meses a 1 ano
            e multa — a pena aumenta para espécies ameaçadas. A maioria dos
            acidentes acontece justamente na tentativa de matar ou manusear o
            animal; mantenha distância.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
