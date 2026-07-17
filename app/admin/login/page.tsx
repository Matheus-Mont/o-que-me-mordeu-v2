"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";

// Tela de login do admin. Único usuário administrador, sem cadastro público.

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErro(data.error ?? "não foi possível entrar.");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Box maxW="360px" mx="auto" mt={{ base: 8, md: 16 }}>
      <Heading as="h1" size="md" mb={6}>
        painel administrativo — login
      </Heading>
      <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel htmlFor="email">email</FormLabel>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">senha</FormLabel>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        {erro && (
          <Text role="alert" color="danger.text" fontSize="sm">
            {erro}
          </Text>
        )}
        <Button type="submit" isLoading={carregando} loadingText="entrando...">
          entrar
        </Button>
      </VStack>
    </Box>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
