"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { TbChevronLeft, TbChevronRight, TbSearch } from "react-icons/tb";
import type { Animal } from "@prisma/client";
import AnimalCard from "@/components/animal/AnimalCard";
import FiltroSelect from "@/components/animal/FiltroSelect";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import { compararNomes, normalizarTexto } from "@/lib/texto";
import { URGENCIA_LABEL, URGENCIA_ORDEM } from "@/lib/urgencia";

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

const URGENCIAS = [
  { valor: "", label: "Todas" },
  { valor: "ALTA", label: URGENCIA_LABEL.ALTA },
  { valor: "MEDIA", label: URGENCIA_LABEL.MEDIA },
  { valor: "BAIXA", label: URGENCIA_LABEL.BAIXA },
];

const ORDENACOES = [
  { valor: "nome", label: "Nome (A–Z)" },
  { valor: "gravidade", label: "Gravidade (mais grave primeiro)" },
];

const ITENS_POR_PAGINA = 15;

function irParaTopo() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export default function CatalogoClient({ animais }: { animais: AnimalCatalogo[] }) {
  const [busca, setBusca] = useState("");
  const [regiao, setRegiao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [ordem, setOrdem] = useState<"nome" | "gravidade">("nome");
  const [pagina, setPagina] = useState(1);

  const animaisFiltrados = useMemo(() => {
    const buscaNormalizada = normalizarTexto(busca.trim());
    return animais.filter((animal) => {
      if (buscaNormalizada && !normalizarTexto(animal.nomePopular).includes(buscaNormalizada)) {
        return false;
      }
      if (regiao && !animal.regioes.includes(regiao)) return false;
      if (categoria && animal.categoria !== categoria) return false;
      if (urgencia && animal.nivelUrgencia !== urgencia) return false;
      return true;
    });
  }, [animais, busca, regiao, categoria, urgencia]);

  const animaisOrdenados = useMemo(() => {
    const lista = [...animaisFiltrados];
    lista.sort((a, b) => {
      if (ordem === "gravidade") {
        const diff = URGENCIA_ORDEM[a.nivelUrgencia] - URGENCIA_ORDEM[b.nivelUrgencia];
        if (diff !== 0) return diff;
      }
      return compararNomes(a.nomePopular, b.nomePopular);
    });
    return lista;
  }, [animaisFiltrados, ordem]);

  const totalPaginas = Math.max(1, Math.ceil(animaisOrdenados.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);

  const animaisDaPagina = useMemo(() => {
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    return animaisOrdenados.slice(inicio, inicio + ITENS_POR_PAGINA);
  }, [animaisOrdenados, paginaAtual]);

  function trocarFiltro<T>(setter: (v: T) => void, valor: T) {
    setter(valor);
    setPagina(1);
    irParaTopo();
  }

  function trocarPagina(valor: number) {
    setPagina(valor);
    irParaTopo();
  }

  return (
    <PageShell maxW={{ base: "100%", md: "1040px" }}>
      <PageHeader title="Catálogo" href="/" />

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

      <Wrap spacing={2} mb={4}>
        <WrapItem>
          <FiltroSelect
            rotulo="Animal"
            valor={categoria}
            opcoes={CATEGORIAS}
            onChange={(v) => trocarFiltro(setCategoria, v)}
          />
        </WrapItem>
        <WrapItem>
          <FiltroSelect
            rotulo="Região"
            valor={regiao}
            opcoes={REGIOES}
            onChange={(v) => trocarFiltro(setRegiao, v)}
          />
        </WrapItem>
        <WrapItem>
          <FiltroSelect
            rotulo="Gravidade"
            valor={urgencia}
            opcoes={URGENCIAS}
            onChange={(v) => trocarFiltro(setUrgencia, v)}
          />
        </WrapItem>
        <WrapItem>
          <FiltroSelect
            rotulo="Ordenar"
            valor={ordem}
            opcoes={ORDENACOES}
            onChange={(v) => trocarFiltro(setOrdem, v as "nome" | "gravidade")}
          />
        </WrapItem>
      </Wrap>

      <Text color="text.secondary" fontSize="sm" mb={4}>
        {`${animaisOrdenados.length} ${animaisOrdenados.length === 1 ? "animal encontrado" : "animais encontrados"}`}
      </Text>

      <Flex wrap="wrap" justify="center" gap={{ base: 3, md: 4 }}>
        {animaisDaPagina.map((animal) => (
          <Box
            key={animal.id}
            flex={{
              base: "0 0 calc((100% - 12px) / 2)",
              sm: "0 0 calc((100% - 24px) / 3)",
              md: "0 0 calc((100% - 48px) / 4)",
              lg: "0 0 calc((100% - 64px) / 5)",
            }}
            minW={0}
          >
            <AnimalCard animal={animal} />
          </Box>
        ))}
      </Flex>

      {animaisOrdenados.length === 0 && (
        <Box textAlign="center" py={10}>
          <Text color="text.secondary" fontSize="sm">
            Nenhum animal encontrado com esses filtros.
          </Text>
        </Box>
      )}

      {animaisOrdenados.length > ITENS_POR_PAGINA && (
        <HStack justify="center" spacing={2} mt={6}>
          <IconButton
            aria-label="página anterior"
            icon={<TbChevronLeft />}
            size="sm"
            variant="outline"
            isDisabled={paginaAtual === 1}
            onClick={() => trocarPagina(Math.max(1, paginaAtual - 1))}
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
            onClick={() => trocarPagina(Math.min(totalPaginas, paginaAtual + 1))}
          />
        </HStack>
      )}
    </PageShell>
  );
}
