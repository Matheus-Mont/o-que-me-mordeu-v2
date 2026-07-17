"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import type { StatusConteudo } from "@prisma/client";
import StatusBadge from "./StatusBadge";

// Ações de transição de status (rascunho -> revisado -> publicado),
// espelhando as regras de lib/historico.ts (transicaoValida) no servidor.
const PROXIMAS: Record<
  StatusConteudo,
  { status: StatusConteudo; label: string; pedeRevisor?: boolean }[]
> = {
  RASCUNHO: [{ status: "REVISADO", label: "marcar como revisado", pedeRevisor: true }],
  REVISADO: [
    { status: "PUBLICADO", label: "publicar" },
    { status: "RASCUNHO", label: "voltar para rascunho" },
  ],
  PUBLICADO: [{ status: "REVISADO", label: "despublicar (voltar para revisão)" }],
};

interface Props {
  entidade: "animais" | "prevencao";
  id: string;
  statusAtual: StatusConteudo;
}

export default function StatusActions({ entidade, id, statusAtual }: Props) {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function transicionar(novoStatus: StatusConteudo, pedeRevisor?: boolean) {
    setErro(null);

    let revisadoPor: string | undefined;
    if (pedeRevisor) {
      revisadoPor = window.prompt("fonte/consultor responsável pela revisão:") ?? undefined;
      if (!revisadoPor) return;
    }

    setCarregando(true);
    try {
      const res = await fetch(`/api/${entidade}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus, revisadoPor }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErro(data.error ?? "não foi possível atualizar o status.");
        return;
      }

      router.refresh();
    } finally {
      setCarregando(false);
    }
  }

  const opcoes = PROXIMAS[statusAtual] ?? [];

  return (
    <Box bg="bg.surface" border="1px solid" borderColor="border" borderRadius="card" p={4} mb={5}>
      <HStack mb={opcoes.length > 0 ? 3 : 0}>
        <Text fontSize="sm" color="text.secondary">
          status atual:
        </Text>
        <StatusBadge status={statusAtual} />
      </HStack>
      <HStack spacing={2} flexWrap="wrap">
        {opcoes.map((op) => (
          <Button
            key={op.status}
            size="sm"
            variant="outline"
            isLoading={carregando}
            onClick={() => transicionar(op.status, op.pedeRevisor)}
          >
            {op.label}
          </Button>
        ))}
      </HStack>
      {erro && (
        <Text role="alert" color="danger.text" fontSize="sm" mt={2}>
          {erro}
        </Text>
      )}
    </Box>
  );
}
