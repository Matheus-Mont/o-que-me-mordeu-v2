"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Animal } from "@prisma/client";
import AnimalCard from "@/components/animal/AnimalCard";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";

// Identificar animal — fluxo de perguntas guiadas.
// 1) tipo de animal  2) região  3) características visuais  4) sintomas
// -> tela de "sugestão de espécies" com nível de confiança (nunca certeza
// absoluta), levando à ficha do animal correspondente.
//
// As perguntas 3 e 4 mudam de acordo com o tipo escolhido na pergunta 1 (ver
// CARACTERISTICAS_POR_TIPO / SINTOMAS_POR_TIPO) — não faz sentido perguntar
// sobre pelos ou "encontrado dentro de casa" para quem foi picado por uma
// água-viva, por exemplo.

const TIPOS = [
  { valor: "COBRA", label: "cobra" },
  { valor: "ARANHA", label: "aranha" },
  { valor: "ESCORPIAO", label: "escorpião" },
  { valor: "TATURANA", label: "lagarta (taturana)" },
  { valor: "AGUA_VIVA", label: "água-viva" },
  { valor: "", label: "não sei" },
] as const;

const REGIOES = ["norte", "nordeste", "centro-oeste", "sudeste", "sul"];

// Características e sintomas mudam de acordo com o tipo de animal (etapa 0) —
// não faz sentido perguntar sobre pelos ou chocalho para quem foi picado por
// uma água-viva, por exemplo. As opções de cada categoria refletem os
// critérios de identificação usados pelo "Guia de Animais Peçonhentos do
// Brasil" (Ministério da Saúde, 2024) para cada grupo. A chave "" (tipo não
// selecionado / "não sei") mantém uma lista genérica que cobre um pouco de
// cada grupo, já que aí não é possível filtrar.
const CARACTERISTICAS_POR_TIPO: Record<string, string[]> = {
  COBRA: [
    "cabeça triangular, bem distinta do corpo",
    "fosseta loreal (um buraco) entre o olho e a narina",
    "chocalho (guizo) na ponta da cauda",
    "anéis coloridos (vermelho, preto e branco) ao redor de todo o corpo",
    "padrão de losangos ou em forma de \"v\" invertido no dorso",
    "cabeça pouco distinta do corpo, sem fosseta",
    "tamanho grande (mais de 1,5 m)",
    "encontrada dentro de casa ou no quintal",
    "encontrada em mata, trilha ou área rural",
  ],
  ARANHA: [
    "pernas longas, fica apoiada nas pernas traseiras quando ameaçada",
    "corpo pequeno, cor marrom uniforme, com desenho de violino no dorso",
    "abdômen preto brilhante, com mancha vermelha em forma de ampulheta",
    "abdômen com manchas geométricas claras (bege ou marrom)",
    "corpo grande e peludo (vários centímetros de envergadura)",
    "cores vivas, teia grande e bem organizada",
    "corpo robusto e peludo, anda pelo chão, não fica em teia",
    "encontrada dentro de casa, em roupas ou calçados",
    "encontrada em mata ou jardim",
  ],
  ESCORPIAO: [
    "cor amarela",
    "cor marrom",
    "cor preta ou vermelho-escura, quase negra",
    "espinho visível sob o ferrão, na base da cauda",
    "sem espinho sob o ferrão",
    "tamanho pequeno (poucos centímetros)",
    "tamanho grande (mais de 7 cm)",
    "encontrado dentro de casa, em entulho ou esgoto",
    "encontrado em mata, sob pedras ou troncos",
  ],
  TATURANA: [
    "cerdas ou espinhos esverdeados",
    "corpo coberto por pelos longos e macios, parece pelúcia",
    "cor escura, com espinhos rígidos bem visíveis",
    "encontrada em grande grupo, agrupada no tronco de uma árvore",
    "encontrada sozinha em uma folha",
    "encontrada em pomar ou área urbana",
    "encontrada em mata",
  ],
  AGUA_VIVA: [
    "flutuador (bexiga) azulado ou arroxeado na superfície da água",
    "corpo em formato de cubo, quase transparente",
    "guarda-chuva (sino) translúcido ou esbranquiçado, com tentáculos longos",
    "corpo pequeno e quase transparente, difícil de ver na água",
    "fixa em rochas, não flutua na água (pode não ser uma água-viva)",
    "encontrada em costão rochoso",
    "encontrada boiando ou encalhada na areia",
  ],
  "": [
    "cor escura / preta",
    "cor clara / amarelada",
    "listras, anéis ou faixas no corpo",
    "corpo peludo / com pelos ou cerdas visíveis",
    "corpo liso, sem pelos",
    "tamanho pequeno (poucos centímetros)",
    "tamanho grande",
    "encontrado dentro de casa",
    "encontrado em mata, área externa ou na água",
  ],
};

const SINTOMAS_POR_TIPO: Record<string, string[]> = {
  COBRA: [
    "dor e inchaço no local",
    "sangramento",
    "manchas arroxeadas na pele",
    "pálpebra caída ou visão dupla",
    "dificuldade para engolir ou respirar",
    "mal-estar, suor ou vômito",
    "poucos sintomas, mal-estar leve",
  ],
  ARANHA: [
    "dor local muito intensa",
    "dor que se espalha pelo corpo",
    "vermelhidão ou ferida no local",
    "cãibras ou rigidez muscular",
    "suor e alteração da pressão",
    "poucos sintomas, mal-estar leve",
  ],
  ESCORPIAO: [
    "dor local intensa e imediata",
    "suor, náusea ou vômito",
    "alterações no batimento cardíaco",
    "poucos sintomas, mal-estar leve",
  ],
  TATURANA: [
    "dor em queimação no contato",
    "vermelhidão e inchaço no local",
    "coceira intensa",
    "sangramento (gengiva, urina ou pele) horas depois",
    "dor ou inchaço nas articulações",
    "poucos sintomas, mal-estar leve",
  ],
  AGUA_VIVA: [
    "dor em queimação forte e imediata",
    "marcas avermelhadas ou em relevo na pele",
    "mal-estar geral ou reação alérgica",
    "poucos sintomas, irritação leve",
  ],
  "": [
    "dor local intensa",
    "inchaço no local",
    "vermelhidão",
    "sangramento",
    "dormência ou formigamento",
    "dificuldade para respirar",
    "visão embaçada",
    "poucos sintomas, mal-estar leve",
  ],
};

type Etapa = 0 | 1 | 2 | 3 | 4;

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// palavras muito comuns em português que não ajudam a diferenciar um animal
// do outro (ex.: "de", "com", "sem") — ignoradas na hora de comparar uma
// característica/sintoma escolhido com o texto da ficha do animal.
const PALAVRAS_IGNORADAS = new Set([
  "de", "da", "do", "das", "dos", "com", "sem", "no", "na", "nos", "nas", "ao", "aos",
  "a", "o", "e", "ou", "um", "uma", "uns", "umas", "em", "para", "mais", "que", "se",
  "seu", "sua", "como", "bem", "ser", "tem", "muito", "pode", "quando",
]);

// Extrai as palavras "significativas" de uma frase (ignorando as muito curtas
// ou muito comuns), para comparar uma característica/sintoma escolhido pela
// pessoa com o texto de identificação/sintomas de cada animal — em vez de
// olhar só a primeira palavra da frase, o que fazia opções parecidas (ex.:
// "cabeça triangular..." e "cabeça pouco distinta...") pontuarem igual.
function palavrasChave(frase: string): string[] {
  return normalizar(frase)
    .split(/[^a-z0-9]+/)
    .filter((p) => p.length > 3 && !PALAVRAS_IGNORADAS.has(p));
}

interface Sugestao {
  animal: Animal;
  pontos: number;
  confianca: "alta" | "media" | "baixa";
}

const CONFIANCA_SCHEME: Record<Sugestao["confianca"], "safe" | "warning" | "danger"> = {
  alta: "safe",
  media: "warning",
  baixa: "danger",
};

export default function IdentificarPage() {
  const [etapa, setEtapa] = useState<Etapa>(0);
  const [tipo, setTipo] = useState<string>("");
  const [regiao, setRegiao] = useState<string>("");
  const [caracteristicas, setCaracteristicas] = useState<string[]>([]);
  const [sintomas, setSintomas] = useState<string[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sugestoes, setSugestoes] = useState<Sugestao[] | null>(null);

  const caracteristicasDisponiveis = CARACTERISTICAS_POR_TIPO[tipo] ?? CARACTERISTICAS_POR_TIPO[""];
  const sintomasDisponiveis = SINTOMAS_POR_TIPO[tipo] ?? SINTOMAS_POR_TIPO[""];

  function alternar(lista: string[], setLista: (v: string[]) => void, valor: string) {
    setLista(lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]);
  }

  function escolherTipo(valor: string) {
    setTipo(valor);
    // as opções de característica/sintoma dependem do tipo — zera escolhas
    // anteriores para não arrastar critérios de outra categoria de animal.
    setCaracteristicas([]);
    setSintomas([]);
    setEtapa(1);
  }

  async function buscarSugestoes() {
    setCarregando(true);
    setErro(null);
    try {
      const params = new URLSearchParams({ status: "PUBLICADO" });
      if (tipo) params.set("categoria", tipo);
      if (regiao) params.set("regiao", regiao);

      const res = await fetch(`/api/animais?${params.toString()}`);
      if (!res.ok) {
        setErro("não foi possível buscar sugestões agora.");
        return;
      }
      const candidatos: Animal[] = await res.json();

      const criteriosSelecionados = [...caracteristicas, ...sintomas];
      const totalCriterios = Math.max(criteriosSelecionados.length, 1);

      const pontuados: Sugestao[] = candidatos.map((animal) => {
        const textoAnimal = normalizar([...animal.identificacao, animal.sintomas].join(" "));
        const pontos = criteriosSelecionados.filter((c) =>
          palavrasChave(c).some((palavra) => textoAnimal.includes(palavra))
        ).length;

        const proporcao = pontos / totalCriterios;
        const confianca: Sugestao["confianca"] =
          proporcao >= 0.5 ? "alta" : proporcao >= 0.25 ? "media" : "baixa";

        return { animal, pontos, confianca };
      });

      pontuados.sort((a, b) => b.pontos - a.pontos);
      setSugestoes(pontuados.slice(0, 5));
      setEtapa(4);
    } finally {
      setCarregando(false);
    }
  }

  const progresso = useMemo(() => ((Math.min(etapa, 3) + 1) / 4) * 100, [etapa]);

  if (etapa === 4) {
    return (
      <PageShell maxW={{ base: "480px", md: "560px" }}>
        <PageHeader title="sugestão de espécies" onBack={() => setEtapa(0)} />

        <Text color="text.secondary" fontSize="sm" mb={5}>
          nenhuma identificação aqui é uma certeza absoluta — use como ponto de
          partida e procure atendimento médico em caso de dúvida.
        </Text>

        {erro && (
          <Text role="alert" color="danger.text" fontSize="sm" mb={3}>
            {erro}
          </Text>
        )}

        {sugestoes && sugestoes.length === 0 && (
          <Text mb={3}>nenhum animal correspondeu às respostas. tente ajustar os filtros.</Text>
        )}

        <VStack spacing={3} align="stretch">
          {sugestoes?.map(({ animal, confianca }) => (
            <Box key={animal.id}>
              <AnimalCard animal={animal} />
              <Badge
                mt={-2}
                ml={4}
                bg={`${CONFIANCA_SCHEME[confianca]}.bg`}
                color={`${CONFIANCA_SCHEME[confianca]}.text`}
                fontSize="0.65rem"
              >
                confiança {confianca === "media" ? "média" : confianca}
              </Badge>
            </Box>
          ))}
        </VStack>
      </PageShell>
    );
  }

  return (
    <PageShell maxW={{ base: "480px", md: "560px" }}>
      <PageHeader
        title="identificar animal"
        onBack={() => setEtapa((e) => (e > 0 ? ((e - 1) as Etapa) : e))}
      />

      <Progress value={progresso} size="xs" borderRadius="full" mb={2} colorScheme="accent" />
      <Text color="text.secondary" fontSize="sm" mb={5}>
        pergunta {Math.min(etapa, 3) + 1} de 4
      </Text>

      {etapa === 0 && (
        <Stack spacing={4}>
          <Text fontWeight={600}>que tipo de animal foi?</Text>
          <Stack spacing={2}>
            {TIPOS.map((t) => (
              <Button
                key={t.valor}
                variant={tipo === t.valor ? "solid" : "outline"}
                justifyContent="start"
                onClick={() => escolherTipo(t.valor)}
              >
                {t.label}
              </Button>
            ))}
          </Stack>
        </Stack>
      )}

      {etapa === 1 && (
        <Stack spacing={4}>
          <Text fontWeight={600}>em que região ocorreu?</Text>
          <Stack spacing={2}>
            {REGIOES.map((r) => (
              <Button
                key={r}
                variant={regiao === r ? "solid" : "outline"}
                justifyContent="start"
                onClick={() => {
                  setRegiao(r);
                  setEtapa(2);
                }}
              >
                {r}
              </Button>
            ))}
          </Stack>
          <Button variant="ghost" color="text.secondary" onClick={() => setEtapa(2)}>
            não sei / pular
          </Button>
        </Stack>
      )}

      {etapa === 2 && (
        <Stack spacing={4}>
          <Box>
            <Text fontWeight={600}>características visuais notadas</Text>
            <Text color="text.secondary" fontSize="sm">
              selecione quantas se aplicarem
            </Text>
          </Box>
          <Stack spacing={3}>
            {caracteristicasDisponiveis.map((c) => (
              <Checkbox
                key={c}
                isChecked={caracteristicas.includes(c)}
                onChange={() => alternar(caracteristicas, setCaracteristicas, c)}
                colorScheme="accent"
              >
                {c}
              </Checkbox>
            ))}
          </Stack>
          <Button onClick={() => setEtapa(3)} alignSelf="start">
            próximo
          </Button>
        </Stack>
      )}

      {etapa === 3 && (
        <Stack spacing={4}>
          <Box>
            <Text fontWeight={600}>sintomas atuais</Text>
            <Text color="text.secondary" fontSize="sm">
              selecione quantos se aplicarem
            </Text>
          </Box>
          <Stack spacing={3}>
            {sintomasDisponiveis.map((s) => (
              <Checkbox
                key={s}
                isChecked={sintomas.includes(s)}
                onChange={() => alternar(sintomas, setSintomas, s)}
                colorScheme="accent"
              >
                {s}
              </Checkbox>
            ))}
          </Stack>
          <Button onClick={buscarSugestoes} isLoading={carregando} loadingText="buscando..." alignSelf="start">
            ver sugestões
          </Button>
        </Stack>
      )}
    </PageShell>
  );
}
