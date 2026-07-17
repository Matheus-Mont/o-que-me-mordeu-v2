import { Box, Heading } from "@chakra-ui/react";
import AnimalForm from "@/components/admin/AnimalForm";

export default function NovoAnimalPage() {
  return (
    <Box>
      <Heading as="h1" size="md" mb={6}>
        novo animal
      </Heading>
      <AnimalForm />
    </Box>
  );
}
