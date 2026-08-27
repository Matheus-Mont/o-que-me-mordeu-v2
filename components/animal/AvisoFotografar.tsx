import { Box, Flex, Text } from "@chakra-ui/react";
import { TbCamera } from "react-icons/tb";

export default function AvisoFotografar() {
  return (
    // Neutro de propósito: laranja passou a significar urgência média, e "tire
    // uma foto" é orientação de apoio, não nível de gravidade.
    <Box
      bg="bg.surface"
      border="1px solid"
      borderColor="border"
      borderRadius="card"
      p={4}
    >
      <Flex gap={2.5} align="flex-start">
        <Box color="accent.text" fontSize="1.1rem" mt="1px" flexShrink={0}>
          <TbCamera aria-hidden />
        </Box>
        <Box>
          <Text fontFamily="heading" fontWeight={700} fontSize="13.5px" color="accent.text" mb={1}>
            Fotografe o animal, se for seguro
          </Text>
          <Text fontSize="13px" color="text.secondary" lineHeight={1.5}>
            Uma foto a distância ajuda a equipe médica a identificar a espécie e
            escolher o soro certo. Não tente se aproximar, capturar ou matar o
            animal.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
