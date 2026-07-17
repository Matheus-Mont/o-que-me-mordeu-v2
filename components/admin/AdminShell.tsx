"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { TbLayoutDashboard, TbMenu2, TbPaw, TbShieldCheck } from "react-icons/tb";
import type { IconType } from "react-icons";
import ColorModeToggle from "@/components/layout/ColorModeToggle";
import LogoutButton from "./LogoutButton";

const NAV: { href: string; label: string; icon: IconType }[] = [
  { href: "/admin", label: "visão geral", icon: TbLayoutDashboard },
  { href: "/admin/animais", label: "animais", icon: TbPaw },
  { href: "/admin/prevencao", label: "prevenção", icon: TbShieldCheck },
];

// Casca do painel administrativo: sidebar fixa em telas médias/grandes,
// vira menu em Drawer (hambúrguer) no mobile — só a navegação muda de
// apresentação, a lógica de rotas é a mesma nos dois casos.

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <VStack align="stretch" spacing={1}>
      {NAV.map((item) => {
        const ativo = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <HStack
            key={item.href}
            as={NextLink}
            href={item.href}
            onClick={onNavigate}
            px={3}
            py={2}
            borderRadius="control"
            bg={ativo ? "accent.bg" : "transparent"}
            color={ativo ? "accent.text" : "text.secondary"}
            fontWeight={ativo ? 600 : 400}
            _hover={{ bg: ativo ? "accent.bg" : "bg.surfaceHover" }}
          >
            <Box as={item.icon} aria-hidden />
            <Text fontSize="sm">{item.label}</Text>
          </HStack>
        );
      })}
    </VStack>
  );
}

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh">
      <Box
        as="aside"
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        w="220px"
        flexShrink={0}
        borderRight="1px solid"
        borderColor="border"
        bg="bg.surface"
        p={4}
      >
        <HStack mb={6} spacing={2}>
          <Box as={TbPaw} color="accent.text" fontSize="1.1rem" aria-hidden />
          <Text fontWeight={600} fontSize="sm">
            painel
          </Text>
        </HStack>
        <Box flex={1}>
          <NavLinks />
        </Box>
        <VStack align="stretch" spacing={2} pt={4} borderTop="1px solid" borderColor="border">
          {userEmail && (
            <Text fontSize="xs" color="text.secondary" noOfLines={1}>
              {userEmail}
            </Text>
          )}
          <HStack justify="space-between">
            <LogoutButton />
            <ColorModeToggle />
          </HStack>
        </VStack>
      </Box>

      <Box flex={1} minW={0}>
        <Flex
          as="header"
          display={{ base: "flex", md: "none" }}
          align="center"
          justify="space-between"
          px={4}
          py={3}
          borderBottom="1px solid"
          borderColor="border"
        >
          <HStack spacing={2}>
            <IconButton aria-label="abrir menu" icon={<TbMenu2 />} size="sm" variant="ghost" onClick={onOpen} />
            <Text fontWeight={600} fontSize="sm">
              painel
            </Text>
          </HStack>
          <ColorModeToggle />
        </Flex>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="bg.canvas">
            <DrawerBody pt={8}>
              <NavLinks onNavigate={onClose} />
              <VStack align="stretch" spacing={2} mt={8} pt={4} borderTop="1px solid" borderColor="border">
                {userEmail && (
                  <Text fontSize="xs" color="text.secondary" noOfLines={1}>
                    {userEmail}
                  </Text>
                )}
                <LogoutButton />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Box as="main" p={{ base: 5, md: 8 }}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
