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
  WrapItem,
} from "@chakra-ui/react";
import { TbChevronLeft, TbChevronRight, TbSearch } from "react-icons/tb";
import type { Animal } from "@prisma/client";
import AnimalCard from "@/components/animal/AnimalCard";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";

export type AnimalCatalogo = Pick<
  Animal,
  "id" | "slug" | "nomePopular" | "nivelUrgencia" | "categoria" | "regioes" | "imagens"
>;

const REGIOES = [
  { valor: "", label: "Todo o Brasil" },
  { valor: "norte", label: "Norte" },
  { valor: "nordeste", label: "Nordeste" },
  { valor: "centro-oeste", label: "Centro-oeste" },
  { valor: "sudeste", label: "Sudeste" },
  { valor: "sul", label: "Sul" },
];

const CATEGORIAS = [
  { valor: "", label: "Todos" },
  { valor: "COBRA", label: "Cobras" },
  { valor: "ARANHA", label: "Aranhas" },
  { valor: "ESCORPIAO", label: "Escorpiões" },
  { valor: "TATURANA", label: "Lagartas" },
  { valor: "AGUA_VIVA", label: "Águas-vivas" },
];

const ITENS_POR_PAGINA = 12;

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
    <PageShell maxW={{ base: "100%", md: "1040px" }}>
      <PageHeader title="Catálogo" href="/" />

      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 5, md: 8 }} align="start">
        <Box
          w={{ base: "full", md: "240px" }}
          flexShrink={0}
          position={{ md: "sticky" }}
          top={{ md: "96px" }}
        >
          <InputGroup mb={3}>
            <InputLeftElement pointerEvents="none" color="text.muted">
              <TbSearch />
            </InputLeftElement>
            <Input
              placeholder="Buscar por nome"
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

          <Box display={{ base: "none", md: "block" }} mb={5}>
            <Text fontSize="xs" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing="0.04em" mb={2}>
              região
            </Text>
            <VStack align="stretch" spacing={0.5}>
              {REGIOES.map((r) => (
                <Button
                  key={r.valor}
                  size="sm"
                  variant={regiao === r.valor ? "solid" : "ghost"}
                  justifyContent="start"
                  fontWeight={regiao === r.valor ? 600 : 500}
                  color={regiao === r.valor ? undefined : "text.secondary"}
                  onClick={() => trocarFiltro(setRegiao, r.valor)}
                >
                  {r.label}
                </Button>
              ))}
            </VStack>
          </Box>

          <Box>
            <Text
              display={{ base: "none", md: "block" }}
              fontSize="xs"
              color="text.secondary"
              fontWeight={600}
              textTransform="uppercase"
              letterSpacing="0.04em"
              mb={2}
            >
              categoria
            </Text>
            <Wrap spacing={2}>
              {CATEGORIAS.map((c) => (
                <WrapItem key={c.valor}>
                  <Button
                    size="sm"
                    borderRadius="full"
                    px="14px"
                    variant={categoria === c.valor ? "solid" : "outline"}
                    bg={categoria === c.valor ? undefined : "bg.surface"}
                    color={categoria === c.valor ? undefined : "text.secondary"}
                    fontWeight={500}
                    onClick={() => trocarFiltro(setCategoria, c.valor)}
                  >
                    {c.label}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>

        <Box flex="1" minW={0} w="full">
          <Text color="text.secondary" fontSize="sm" mb={4}>
            {`${animaisFiltrados.length} ${animaisFiltrados.length === 1 ? "animal encontrado" : "animais encontrados"}`}
          </Text>

          <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} spacing={{ base: 3, md: 4 }}>
            {animaisDaPagina.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </SimpleGrid>

          {animaisFiltrados.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text color="text.secondary" fontSize="sm">
                Nenhum animal encontrado com esses filtros.
              </Text>
            </Box>
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
                Página {paginaAtual} de {totalPaginas}
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
