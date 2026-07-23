"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import type { DicaPrevencao } from "@prisma/client";

function arrayParaTexto(valores: string[]) {
  return valores.join("\n");
}
function textoParaArray(texto: string) {
  return texto
    .split("\n")
    .map((linha) => linha.trim())
    .filter(Boolean);
}

type Ambiente = DicaPrevencao["ambiente"];

interface Props {
  dica?: DicaPrevencao;
}

export default function DicaForm({ dica }: Props) {
  const router = useRouter();
  const editando = Boolean(dica);

  const [form, setForm] = useState({
    ambiente: (dica?.ambiente ?? "CASA") as Ambiente,
    icone: dica?.icone ?? "",
    dicas: arrayParaTexto(dica?.dicas ?? []),
    fonteConsultor: dica?.fonteConsultor ?? "",
  });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function set<K extends keyof typeof form>(campo: K, valor: (typeof form)[K]) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);

    const payload = {
      ...form,
      dicas: textoParaArray(form.dicas),
      fonteConsultor: form.fonteConsultor || null,
    };

    try {
      const res = await fetch(editando ? `/api/prevencao/${dica!.id}` : "/api/prevencao", {
        method: editando ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErro(data.error ?? "não foi possível salvar.");
        return;
      }

      if (!editando) {
        const criado = await res.json();
        router.push(`/admin/prevencao/${criado.id}`);
      } else {
        router.refresh();
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Stack as="form" onSubmit={handleSubmit} spacing={4} maxW="560px">
      <FormControl>
        <FormLabel>ambiente</FormLabel>
        <Select value={form.ambiente} onChange={(e) => set("ambiente", e.target.value as Ambiente)} isDisabled={editando}>
          <option value="CASA">casa</option>
          <option value="MATA_TRILHA">mata ou trilha</option>
          <option value="RIOS_LAGOS">rios e lagos</option>
          <option value="PRAIA">praia</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>ícone (nome/identificador do ícone)</FormLabel>
        <Input value={form.icone} onChange={(e) => set("icone", e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>dicas (uma por linha)</FormLabel>
        <Textarea value={form.dicas} onChange={(e) => set("dicas", e.target.value)} rows={4} />
      </FormControl>

      <FormControl>
        <FormLabel>fonte/consultor responsável</FormLabel>
        <Input value={form.fonteConsultor} onChange={(e) => set("fonteConsultor", e.target.value)} />
        <FormHelperText>campo interno de governança</FormHelperText>
      </FormControl>

      {erro && (
        <Text role="alert" color="danger.text" fontSize="sm">
          {erro}
        </Text>
      )}

      <Button type="submit" isLoading={salvando} loadingText="salvando..." alignSelf="start">
        {editando ? "salvar alterações" : "criar rascunho"}
      </Button>
    </Stack>
  );
}
