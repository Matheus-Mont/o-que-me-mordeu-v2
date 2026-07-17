"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { Animal } from "@prisma/client";

// Editor de ficha de animal. Campos de lista (regiões, identificação,
// primeiros socorros) são editados como texto com um item por linha,
// por simplicidade nesta fase.

function arrayParaTexto(valores: string[]) {
  return valores.join("\n");
}
function textoParaArray(texto: string) {
  return texto
    .split("\n")
    .map((linha) => linha.trim())
    .filter(Boolean);
}

type Categoria = Animal["categoria"];
type NivelUrgencia = Animal["nivelUrgencia"];

interface Props {
  animal?: Animal;
}

export default function AnimalForm({ animal }: Props) {
  const router = useRouter();
  const editando = Boolean(animal);

  const [form, setForm] = useState({
    slug: animal?.slug ?? "",
    nomePopular: animal?.nomePopular ?? "",
    nomeCientifico: animal?.nomeCientifico ?? "",
    categoria: (animal?.categoria ?? "COBRA") as Categoria,
    nivelUrgencia: (animal?.nivelUrgencia ?? "MEDIA") as NivelUrgencia,
    regioes: arrayParaTexto(animal?.regioes ?? []),
    imagens: arrayParaTexto(animal?.imagens ?? []),
    identificacao: arrayParaTexto(animal?.identificacao ?? []),
    sintomas: animal?.sintomas ?? "",
    tempoSintomas: animal?.tempoSintomas ?? "",
    primeirosSocorrosFazer: arrayParaTexto(animal?.primeirosSocorrosFazer ?? []),
    primeirosSocorrosNaoFazer: arrayParaTexto(animal?.primeirosSocorrosNaoFazer ?? []),
    soroIndicado: animal?.soroIndicado ?? "",
    fonteConsultor: animal?.fonteConsultor ?? "",
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
      regioes: textoParaArray(form.regioes),
      imagens: textoParaArray(form.imagens),
      identificacao: textoParaArray(form.identificacao),
      primeirosSocorrosFazer: textoParaArray(form.primeirosSocorrosFazer),
      primeirosSocorrosNaoFazer: textoParaArray(form.primeirosSocorrosNaoFazer),
      fonteConsultor: form.fonteConsultor || null,
    };

    try {
      const res = await fetch(editando ? `/api/animais/${animal!.id}` : "/api/animais", {
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
        router.push(`/admin/animais/${criado.id}`);
      } else {
        router.refresh();
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Stack as="form" onSubmit={handleSubmit} spacing={4} maxW="720px">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl isRequired>
          <FormLabel>slug</FormLabel>
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} isDisabled={editando} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>nome popular</FormLabel>
          <Input value={form.nomePopular} onChange={(e) => set("nomePopular", e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>nome científico</FormLabel>
          <Input value={form.nomeCientifico} onChange={(e) => set("nomeCientifico", e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>categoria</FormLabel>
          <Select value={form.categoria} onChange={(e) => set("categoria", e.target.value as Categoria)}>
            <option value="COBRA">cobra</option>
            <option value="ARANHA">aranha</option>
            <option value="ESCORPIAO">escorpião</option>
            <option value="TATURANA">taturana</option>
            <option value="AGUA_VIVA">água-viva</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>nível de urgência</FormLabel>
          <Select
            value={form.nivelUrgencia}
            onChange={(e) => set("nivelUrgencia", e.target.value as NivelUrgencia)}
          >
            <option value="ALTA">alta</option>
            <option value="MEDIA">média</option>
            <option value="BAIXA">baixa</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>tempo até os sintomas</FormLabel>
          <Input value={form.tempoSintomas} onChange={(e) => set("tempoSintomas", e.target.value)} isRequired />
        </FormControl>
      </SimpleGrid>

      <FormControl>
        <FormLabel>regiões (uma por linha)</FormLabel>
        <Textarea value={form.regioes} onChange={(e) => set("regioes", e.target.value)} rows={3} />
      </FormControl>

      <FormControl>
        <FormLabel>imagens</FormLabel>
        <Textarea value={form.imagens} onChange={(e) => set("imagens", e.target.value)} rows={3} />
        <FormHelperText>uma URL por linha — várias fotos/ângulos aparecem como galeria na ficha</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>como identificar (uma característica por linha)</FormLabel>
        <Textarea value={form.identificacao} onChange={(e) => set("identificacao", e.target.value)} rows={3} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>sintomas</FormLabel>
        <Textarea value={form.sintomas} onChange={(e) => set("sintomas", e.target.value)} rows={3} />
      </FormControl>

      <FormControl>
        <FormLabel>primeiros socorros — o que fazer (um item por linha)</FormLabel>
        <Textarea
          value={form.primeirosSocorrosFazer}
          onChange={(e) => set("primeirosSocorrosFazer", e.target.value)}
          rows={3}
        />
      </FormControl>

      <FormControl>
        <FormLabel>primeiros socorros — o que não fazer (um item por linha)</FormLabel>
        <Textarea
          value={form.primeirosSocorrosNaoFazer}
          onChange={(e) => set("primeirosSocorrosNaoFazer", e.target.value)}
          rows={3}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>soro indicado</FormLabel>
        <Input value={form.soroIndicado} onChange={(e) => set("soroIndicado", e.target.value)} />
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
