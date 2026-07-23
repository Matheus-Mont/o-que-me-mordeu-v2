"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import NextImage from "next/image";
import { TbPhoto } from "react-icons/tb";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  CARACTERISTICAS,
  FERIDAS,
  SINTOMAS,
  type CategoriaId,
  type GrupoTriagem,
} from "@/lib/identificacao/conhecimento";
import {
  identificar,
  type CandidatoAnimal,
  type Observacao,
  type Resultado,
} from "@/lib/identificacao/engine";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import TraitCard from "@/components/identificacao/TraitCard";

const TIPOS: { valor: CategoriaId | null; label: string }[] = [
  { valor: "COBRA", label: "Cobra" },
  { valor: "ARANHA", label: "Aranha" },
  { valor: "ESCORPIAO", label: "Escorpião" },
  { valor: "TATURANA", label: "Lagarta (taturana)" },
  { valor: "AGUA_VIVA", label: "Água-viva" },
  { valor: null, label: "Não sei" },
];

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const REGIOES = ["norte", "nordeste", "centro-oeste", "sudeste", "sul"];

const URGENCIA_LABEL: Record<string, string> = {
  ALTA: "Urgência alta",
  MEDIA: "Urgência média",
  BAIXA: "Urgência baixa",
};

const URGENCIA_SCHEME: Record<string, "danger" | "warning" | "safe"> = {
  ALTA: "danger",
  MEDIA: "warning",
  BAIXA: "safe",
};

const CONFIANCA_SCHEME: Record<Resultado["confianca"], "safe" | "warning" | "danger"> = {
  alta: "safe",
  media: "warning",
  baixa: "danger",
};

const CONFIANCA_LABEL: Record<Resultado["confianca"], string> = {
  alta: "alta",
  media: "média",
  baixa: "baixa",
};

type Etapa = 0 | 1 | 2 | 3 | 4 | 5;

const TOTAL_PERGUNTAS = 5;

export default function IdentificarPage() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<Etapa>(0);
  const [tipoDefinido, setTipoDefinido] = useState(false);
  const [categoria, setCategoria] = useState<CategoriaId | null>(null);
  const [regiao, setRegiao] = useState<string | null>(null);
  const [visuais, setVisuais] = useState<string[]>([]);
  const [feridas, setFeridas] = useState<string[]>([]);
  const [sintomas, setSintomas] = useState<string[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultados, setResultados] = useState<Resultado[] | null>(null);

  const grupo: GrupoTriagem = categoria ?? "GERAL";
  const cardsCaracteristicas = CARACTERISTICAS[grupo];
  const cardsFeridas = FERIDAS[grupo];
  const opcoesSintomas = SINTOMAS[grupo];

  function alternar(lista: string[], setLista: (v: string[]) => void, valor: string) {
    setLista(lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]);
  }

  function escolherTipo(valor: CategoriaId | null) {
    setCategoria(valor);
    setTipoDefinido(true);
    setVisuais([]);
    setFeridas([]);
    setSintomas([]);
  }

  function voltarEtapa() {
    if (etapa === 0) return router.push("/");
    setEtapa((e) => (e - 1) as Etapa);
  }

  async function buscarSugestoes() {
    setCarregando(true);
    setErro(null);
    try {
      const params = new URLSearchParams({ status: "PUBLICADO" });
      if (categoria) params.set("categoria", categoria);

      const res = await fetch(`/api/animais?${params.toString()}`);
      if (!res.ok) {
        setErro("Não foi possível buscar sugestões agora.");
        return;
      }
      const candidatos: CandidatoAnimal[] = await res.json();

      const observacao: Observacao = { categoria, regiao, visuais, feridas, sintomas };
      setResultados(identificar(observacao, candidatos, 5));
      setEtapa(5);
    } catch {
      setErro("Não foi possível buscar sugestões agora.");
    } finally {
      setCarregando(false);
    }
  }

  const perguntaAtual = Math.min(etapa, TOTAL_PERGUNTAS - 1) + 1;
  const progresso = useMemo(
    () => (perguntaAtual / TOTAL_PERGUNTAS) * 100,
    [perguntaAtual]
  );

  if (etapa === 5) {
    return (
      <PageShell maxW={{ base: "100%", md: "760px" }}>
        <PageHeader title="Sugestão de espécies" onBack={() => setEtapa(4)} />

        <Text color="text.secondary" fontSize="sm" mb={5}>
          Isto é só um ponto de partida. Nenhuma identificação aqui é uma certeza
          absoluta — na dúvida, procure atendimento médico sem esperar.
        </Text>

        {erro && (
          <Text role="alert" color="danger.text" fontSize="sm" mb={3}>
            {erro}
          </Text>
        )}

        {resultados && resultados.length === 0 && (
          <Text mb={3}>Nenhum animal correspondeu às respostas. Tente ajustar os filtros.</Text>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="14px">
          {resultados?.map(({ animal, confianca }) => {
            const scheme = URGENCIA_SCHEME[animal.nivelUrgencia];
            return (
              <Box
                key={animal.id}
                as={NextLink}
                href={`/animal/${animal.slug}`}
                display="flex"
                gap={3}
                h="full"
                bg="bg.surface"
                border="1px solid"
                borderColor="border"
                borderRadius="card"
                p={3}
                transition="background 0.15s ease, border-color 0.15s ease"
                _hover={{ textDecoration: "none", bg: "bg.surfaceHover", borderColor: "borderStrong" }}
              >
                <Box
                  w="80px"
                  h="80px"
                  flexShrink={0}
                  borderRadius="10px"
                  overflow="hidden"
                  position="relative"
                  bg="bg.canvas"
                >
                  {animal.imagens[0] ? (
                    <NextImage
                      src={animal.imagens[0]}
                      alt={capitalizar(animal.nomePopular)}
                      fill
                      sizes="80px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Flex position="absolute" inset={0} align="center" justify="center" color="text.muted">
                      <TbPhoto aria-hidden />
                    </Flex>
                  )}
                </Box>

                <Flex direction="column" flex={1} minW={0}>
                  <Flex justify="space-between" align="flex-start" gap={2} mb={1}>
                    <Box minW={0}>
                      <Text fontFamily="heading" fontWeight={700} fontSize="15px" noOfLines={1}>
                        {capitalizar(animal.nomePopular)}
                      </Text>
                      <Text fontSize="11.5px" fontStyle="italic" color="text.muted" noOfLines={1}>
                        {animal.nomeCientifico}
                      </Text>
                    </Box>
                    <Badge
                      bg={`${scheme}.bg`}
                      color={`${scheme}.text`}
                      fontSize="10.5px"
                      whiteSpace="nowrap"
                      flexShrink={0}
                    >
                      {URGENCIA_LABEL[animal.nivelUrgencia]}
                    </Badge>
                  </Flex>

                  <Flex justify="space-between" align="center" gap={2} mt="auto" pt={2}>
                    <Badge
                      bg={`${CONFIANCA_SCHEME[confianca]}.bg`}
                      color={`${CONFIANCA_SCHEME[confianca]}.text`}
                      fontSize="0.65rem"
                    >
                      Correspondência {CONFIANCA_LABEL[confianca]}
                    </Badge>
                    <Text fontSize="12.5px" fontWeight={600} color="accent.text" whiteSpace="nowrap">
                      Ver ficha →
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </PageShell>
    );
  }

  const acaoEtapa: Record<number, { label: string; onClick: () => void; disabled?: boolean }> = {
    0: { label: "Próximo", onClick: () => setEtapa(1), disabled: !tipoDefinido },
    1: { label: "Próximo", onClick: () => setEtapa(2), disabled: regiao === null },
    2: { label: "Próximo", onClick: () => setEtapa(3) },
    3: { label: "Próximo", onClick: () => setEtapa(4) },
    4: { label: "Ver sugestões", onClick: buscarSugestoes },
  };
  const acao = acaoEtapa[etapa];

  return (
    <PageShell maxW={{ base: "100%", md: "760px" }}>
      <Progress value={progresso} h="4px" borderRadius="2px" mb="18px" />
      <Text
        color="text.muted"
        fontSize="11px"
        textTransform="uppercase"
        letterSpacing="0.05em"
        mb={1}
      >
        Pergunta {perguntaAtual} de {TOTAL_PERGUNTAS}
      </Text>

      {etapa === 0 && (
        <Stack spacing="18px">
          <Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="xl" mb={1.5}>
              Que tipo de animal foi?
            </Text>
            <Text color="text.secondary" fontSize="13px">
              Sem pressa. Responda o que conseguir — cada detalhe ajuda.
            </Text>
          </Box>
          <Wrap spacing={2}>
            {TIPOS.map((t) => {
              const ativo = tipoDefinido && categoria === t.valor;
              return (
                <WrapItem key={t.label}>
                  <Button
                    size="sm"
                    h="auto"
                    py="10px"
                    px="14px"
                    borderRadius="20px"
                    variant={ativo ? "solid" : "outline"}
                    bg={ativo ? undefined : "bg.surface"}
                    color={ativo ? undefined : "text.secondary"}
                    fontWeight={500}
                    fontSize="13px"
                    onClick={() => escolherTipo(t.valor)}
                  >
                    {t.label}
                  </Button>
                </WrapItem>
              );
            })}
          </Wrap>
        </Stack>
      )}

      {etapa === 1 && (
        <Stack spacing="18px">
          <Text fontFamily="heading" fontWeight={700} fontSize="xl">
            Em que região ocorreu?
          </Text>
          <Wrap spacing={2}>
            {REGIOES.map((r) => (
              <WrapItem key={r}>
                <Button
                  size="sm"
                  h="auto"
                  py="10px"
                  px="14px"
                  borderRadius="20px"
                  variant={regiao === r ? "solid" : "outline"}
                  bg={regiao === r ? undefined : "bg.surface"}
                  color={regiao === r ? undefined : "text.secondary"}
                  fontWeight={500}
                  fontSize="13px"
                  onClick={() => setRegiao(r)}
                >
                  {capitalizar(r)}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
          <Button
            variant="ghost"
            size="sm"
            color="text.secondary"
            alignSelf="start"
            onClick={() => {
              setRegiao(null);
              setEtapa(2);
            }}
          >
            Não sei / pular
          </Button>
        </Stack>
      )}

      {etapa === 2 && (
        <Stack spacing="18px">
          <Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="xl" mb={1.5}>
              O que você notou no animal?
            </Text>
            <Text color="text.secondary" fontSize="13px">
              Toque em todas as características que se aplicarem.
            </Text>
          </Box>
          <SimpleGrid minChildWidth="150px" spacing={3}>
            {cardsCaracteristicas.map((card) => (
              <TraitCard
                key={card.id}
                label={card.label}
                descricao={card.descricao}
                imagem={card.imagem}
                selecionado={visuais.includes(card.id)}
                onToggle={() => alternar(visuais, setVisuais, card.id)}
              />
            ))}
          </SimpleGrid>
        </Stack>
      )}

      {etapa === 3 && (
        <Stack spacing="18px">
          <Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="xl" mb={1.5}>
              Como está a marca da picada ou do contato?
            </Text>
            <Text color="text.secondary" fontSize="13px">
              A marca ajuda a confirmar o animal, mas não é definitiva. Se não
              conseguiu ver bem, pode pular.
            </Text>
          </Box>
          <SimpleGrid minChildWidth="150px" spacing={3}>
            {cardsFeridas.map((card) => (
              <TraitCard
                key={card.id}
                label={card.label}
                descricao={card.descricao}
                imagem={card.imagem}
                selecionado={feridas.includes(card.id)}
                onToggle={() => alternar(feridas, setFeridas, card.id)}
              />
            ))}
          </SimpleGrid>
        </Stack>
      )}

      {etapa === 4 && (
        <Stack spacing="18px">
          <Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="xl" mb={1.5}>
              Sintomas atuais
            </Text>
            <Text color="text.secondary" fontSize="13px">
              Selecione quantos se aplicarem.
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={6} spacingY={3}>
            {opcoesSintomas.map((s) => (
              <Checkbox
                key={s.id}
                isChecked={sintomas.includes(s.id)}
                onChange={() => alternar(sintomas, setSintomas, s.id)}
                colorScheme="accent"
                alignItems="flex-start"
              >
                {capitalizar(s.label)}
              </Checkbox>
            ))}
          </SimpleGrid>
        </Stack>
      )}

      <Flex gap="10px" mt={7}>
        <Button variant="outline" flex={1} color="text.secondary" onClick={voltarEtapa}>
          Voltar
        </Button>
        <Button
          flex={2}
          onClick={acao.onClick}
          isDisabled={acao.disabled}
          isLoading={etapa === 4 && carregando}
          loadingText="Buscando..."
        >
          {acao.label}
        </Button>
      </Flex>
    </PageShell>
  );
}
