import { Box } from "@chakra-ui/react";
import BotaoSOS from "@/components/emergencia/BotaoSOS";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Box
        as="main"
        flex="1"
        minH={{ base: "70vh", md: "78vh" }}
        bg="bg.main"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
      <Footer />
      <BotaoSOS />
    </>
  );
}
