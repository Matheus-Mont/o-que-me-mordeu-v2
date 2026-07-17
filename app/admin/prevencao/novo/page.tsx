import { Box, Heading } from "@chakra-ui/react";
import DicaForm from "@/components/admin/DicaForm";

export default function NovaDicaPage() {
  return (
    <Box>
      <Heading as="h1" size="md" mb={6}>
        nova dica de prevenção
      </Heading>
      <DicaForm />
    </Box>
  );
}
