"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { TbChevronLeft, TbChevronRight, TbSearch } from "react-icons/tb";
import type { Animal } from "@prisma/client";
import AnimalCard from "@/components/animal/AnimalCard";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";

// Parte interativa do catálogo. Os dados chegam prontos como prop (buscados no
// servidor — ver app/(public)/catalogo/page.tsx), então aqui não há fetch nem
// estado de "carregando": busca, filtro de região/categoria e paginação rodam
// 100% em memória sobre a lista já embutida no HTML.

export type AnimalCatalogo = Pick<
  Animal,
  "id" | "slug" | "nomePopular" | "nivelUrgencia" | "categoria" | "regioes" | "imagens"
>;

const REGIOES = [
  { valor: "", label: "todo o brasil" },
  { valor: "norte", label: "norte" },
  { valor: "nordeste", label: "nordeste" },
  { valor: "centro-oeste", label: "centro-oeste" },
  { valor: "sudeste", label: "sudeste" },
  { valor: "sul", label: "sul" },
];

const CATEGORIAS = [
  { valor: "", label: "todos" },
  { valor: "COBRA", label: "cobras" },
  { valor: "ARANHA", label: "aranhas" },
  { valor: "ESCORPIAO", label: "escorpiões" },
  { valor: "TATURANA", label: "lagartas" },
  { valor: "AGUA_VIVA", label: "águas-vivas" },
];

const ITENS_POR_PAGINA = 9;

export default function CatalogoClient({ animais }: { animais: AnimalCatalogo[] }) {
  const [busca, setBusca] = useState("");
  const [regiao, setRegiao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagina, setPagina] = useState(1);

  const animaisFiltrados = useMemo(() => {
    const buscaNormalizada = busca.trim().toLowerCase();
    return animais.filter((animal) => {
      if (buscaNormalizada && !animal.nomePopular.toLowerCase().includes(buscaNormalizada)) {
        return false;
      }
      if (regiao && !animal.regioes.includes(regiao)) return false;
      if (categoria && animal.categoria !== categoria) return false;
      return true;
    });
  }, [animais, busca, regiao, categoria]);

  // Reinicia a paginação a partir dos próprios filtros (durante o render), em
  // vez de num useEffect: evita um render extra com a página antiga antes de
  // "voltar para a 1". Se o total de páginas encolheu abaixo da página atual,
  // corrige na hora.
  const totalPaginas = Math.max(1, Math.ceil(animaisFiltrados.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);

  const animaisDaPagina = useMemo(() => {
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    return animaisFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA);
  }, [animaisFiltrados, paginaAtual]);

  function trocarFiltro<T>(setter: (v: T) => void, valor: T) {
    setter(valor);
    setPagina(1);
  }

  return (
    <PageShell maxW={{ base: "480px", md: "960px" }}>
      <PageHeader title="catálogo" href="/" />

      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 5, md: 8 }} align="start">
        <Box w={{ base: "full", md: "200px" }} flexShrink={0}>
          <InputGroup mb={3}>
            <InputLeftElement pointerEvents="none" color="text.muted">
              <TbSearch />
            </InputLeftElement>
            <Input
              placeholder="buscar por nome"
              value={busca}
              onChange={(e) => trocarFiltro(setBusca, e.target.value)}
            />
          </InputGroup>

          <Select
            display={{ base: "block", md: "none" }}
            value={regiao}
            onChange={(e) => trocarFiltro(setRegiao, e.target.value)}
            mb={3}
          >
            {REGIOES.map((r) => (
              <option key={r.valor} value={r.valor}>
                {r.label}
              </option>
            ))}
          </Select>

          <VStack display={{ base: "none", md: "flex" }} align="stretch" spacing={0.5} mb={5}>
            <Text fontSize="xs" color="text.secondary" fontWeight={600} mb={1}>
              região
            </Text>
            {REGIOES.map((r) => (
              <Button
                key={r.valor}
                size="sm"
                variant={regiao === r.valor ? "solid" : "ghost"}
                justifyContent="start"
                onClick={() => trocarFiltro(setRegiao, r.valor)}
              >
                {r.label}
              </Button>
            ))}
          </VStack>

          <HStack display={{ base: "flex", md: "none" }} overflowX="auto" spacing={2} pb={1}>
            {CATEGORIAS.map((c) => (
              <Button
                key={c.valor}
                size="sm"
                borderRadius="full"
                flexShrink={0}
                variant={categoria === c.valor ? "solid" : "outline"}
                onClick={() => trocarFiltro(setCategoria, c.valor)}
              >
                {c.label}
              </Button>
            ))}
          </HStack>

          <Box display={{ base: "none", md: "block" }}>
            <Text fontSize="xs" color="text.secondary" fontWeight={600} mb={1}>
              categoria
            </Text>
            <Wrap spacing={2}>
              {CATEGORIAS.map((c) => (
                <Button
                  key={c.valor}
                  size="sm"
                  borderRadius="full"
                  variant={categoria === c.valor ? "solid" : "outline"}
                  onClick={() => trocarFiltro(setCategoria, c.valor)}
                >
                  {c.label}
                </Button>
              ))}
            </Wrap>
          </Box>
        </Box>

        <Box flex={1} minW={0} w="full">
          <Text color="text.secondary" fontSize="sm" mb={4}>
            {`${animaisFiltrados.length} animais encontrados`}
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {animaisDaPagina.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </SimpleGrid>

          {animaisFiltrados.length === 0 && (
            <Text color="text.secondary">nenhum animal encontrado com esses filtros.</Text>
          )}

          {animaisFiltrados.length > ITENS_POR_PAGINA && (
            <HStack justify="center" spacing={2} mt={6}>
              <IconButton
                aria-label="página anterior"
                icon={<TbChevronLeft />}
                size="sm"
                variant="outline"
                isDisabled={paginaAtual === 1}
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
              />
              <Text fontSize="sm" color="text.secondary" minW="90px" textAlign="center">
                página {paginaAtual} de {totalPaginas}
              </Text>
              <IconButton
                aria-label="próxima página"
                icon={<TbChevronRight />}
                size="sm"
                variant="outline"
                isDisabled={paginaAtual === totalPaginas}
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              />
            </HStack>
          )}
        </Box>
      </Flex>
    </PageShell>
  );
}
