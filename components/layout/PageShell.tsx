import { Box, type ResponsiveValue } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  maxW?: ResponsiveValue<string>;
}

export default function PageShell({ children, maxW = "640px" }: Props) {
  return (
    <Box
      w="full"
      maxW={maxW}
      mx="auto"
      flex="1"
      display="flex"
      flexDirection="column"
      px={{ base: 5, md: 6 }}
      py={{ base: 5, md: 8 }}
      pb={{ base: 24, md: 12 }}
    >
      {children}
    </Box>
  );
}
