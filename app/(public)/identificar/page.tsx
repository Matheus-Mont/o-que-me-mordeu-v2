"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import NextImage from "next/image";
import { TbPhoto } from "react-icons/tb";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  CARACTERISTICAS,
  FERIDAS,
  LOCAIS,
  SINTOMAS,
  TRAIT_IMAGENS,
  type CategoriaId,
  type GrupoTriagem,
} from "@/lib/identificacao/conhecimento";
import {
  identificar,
  type CandidatoAnimal,
  type Observacao,
  type Resultado,
} from "@/lib/identificacao/engine";
import { URGENCIA_LABEL, URGENCIA_SCHEME } from "@/lib/urgencia";
import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import TraitCard from "@/components/identificacao/TraitCard";
import GrupoBotoes from "@/components/ui/GrupoBotoes";
import Etiqueta from "@/components/ui/Etiqueta";

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

// Confiança não usa vermelho: nessa interface vermelho quer dizer gravidade, e
// "correspondência baixa" não é perigo, é só menos certeza.
const CONFIANCA_COR: Record<Resultado["confianca"], string> = {
  alta: "safe.solid",
  media: "warning.solid",
  baixa: "text.muted",
};

const CONFIANCA_NIVEL: Record<Resultado["confianca"], number> = {
  alta: 3,
  media: 2,
  baixa: 1,
};

const CONFIANCA_LABEL: Record<Resultado["confianca"], string> = {
  alta: "alta",
  media: "média",
  baixa: "baixa",
};

type PassoId = "tipo" | "regiao" | "local" | "visuais" | "feridas" | "sintomas";

const TOTAL_PERGUNTAS = 5;

export default function IdentificarPage() {
  const router = useRouter();
  const [etapa, setEtapa] = useState(0);
  const [tipoDefinido, setTipoDefinido] = useState(false);
  const [categoria, setCategoria] = useState<CategoriaId | null>(null);
  const [regiao, setRegiao] = useState<string | null>(null);
  const [local, setLocal] = useState<string | null>(null);
  const [visuais, setVisuais] = useState<string[]>([]);
  const [feridas, setFeridas] = useState<string[]>([]);
  const [sintomas, setSintomas] = useState<string[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultados, setResultados] = useState<Resultado[] | null>(null);

  const passos: PassoId[] = useMemo(
    () =>
      categoria
        ? ["tipo", "regiao", "visuais", "feridas", "sintomas"]
        : ["tipo", "regiao", "local", "feridas", "sintomas"],
    [categoria]
  );
  const passo = passos[Math.min(etapa, passos.length - 1)];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [etapa]);

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
    setLocal(null);
    setVisuais([]);
    setFeridas([]);
    setSintomas([]);
  }

  function voltarEtapa() {
    if (etapa === 0) return router.push("/");
    setEtapa((e) => e - 1);
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

      const observacao: Observacao = { categoria, regiao, local, visuais, feridas, sintomas };
      setResultados(identificar(observacao, candidatos, 5));
      setEtapa(passos.length);
    } catch {
      setErro("Não foi possível buscar sugestões agora.");
    } finally {
      setCarregando(false);
    }
  }

  const perguntaAtual = Math.min(etapa, TOTAL_PERGUNTAS - 1) + 1;

  if (etapa === passos.length) {
    return (
      <PageShell maxW={{ base: "100%", md: "content" }}>
        <Flex
          direction="column"
          justify={{ md: "center" }}
          minH={{ base: "auto", md: "60vh" }}
        >
        <PageHeader title="Sugestão de espécies" onBack={() => setEtapa(passos.length - 1)} />

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

        <Flex wrap="wrap" justify="center" gap="14px">
          {resultados?.map(({ animal, confianca }) => {
            const scheme = URGENCIA_SCHEME[animal.nivelUrgencia];
            return (
              <Box
                key={animal.id}
                as={NextLink}
                href={`/animal/${animal.slug}`}
                display="flex"
                h="full"
                flex={{ base: "0 0 100%", md: "0 0 calc((100% - 14px) / 2)" }}
                minW={0}
                bg="bg.surface"
                border="1px solid"
                borderColor="border"
                borderRadius="card"
                overflow="hidden"
                transition="background 0.15s ease, border-color 0.15s ease"
                _hover={{ textDecoration: "none", bg: "bg.surfaceHover", borderColor: "borderStrong" }}
              >
                <Box w="5px" flexShrink={0} bg={`${scheme}.solid`} aria-hidden />

                <Flex gap={3} p={3} flex="1" minW={0}>
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
                        style={{ objectFit: "contain", padding: "4px" }}
                      />
                    ) : (
                      <Flex position="absolute" inset={0} align="center" justify="center" color="text.muted">
                        <TbPhoto aria-hidden />
                      </Flex>
                    )}
                  </Box>

                  <Flex direction="column" flex={1} minW={0}>
                    <Box minW={0} mb={1}>
                      <Text fontFamily="heading" fontWeight={700} fontSize="15px" noOfLines={1}>
                        {capitalizar(animal.nomePopular)}
                      </Text>
                      <Text fontSize="11.5px" fontStyle="italic" color="text.muted" noOfLines={1}>
                        {animal.nomeCientifico}
                      </Text>
                    </Box>

                    <Text
                      fontFamily="mono"
                      fontSize="9.5px"
                      fontWeight={600}
                      letterSpacing="0.10em"
                      textTransform="uppercase"
                      color={`${scheme}.text`}
                    >
                      {URGENCIA_LABEL[animal.nivelUrgencia]}
                    </Text>

                    <Flex justify="space-between" align="center" gap={2} mt="auto" pt={2}>
                      <Flex align="center" gap={1.5} minW={0}>
                        {/* Nível, não porcentagem: o motor devolve uma faixa de
                            confiança, então mostrar "82%" seria precisão inventada. */}
                        <Flex gap="2px" flexShrink={0} aria-hidden>
                          {[1, 2, 3].map((n) => (
                            <Box
                              key={n}
                              w="10px"
                              h="3px"
                              borderRadius="2px"
                              bg={n <= CONFIANCA_NIVEL[confianca] ? CONFIANCA_COR[confianca] : "border"}
                            />
                          ))}
                        </Flex>
                        <Text
                          fontFamily="mono"
                          fontSize="9px"
                          fontWeight={600}
                          letterSpacing="0.08em"
                          textTransform="uppercase"
                          color="text.muted"
                          noOfLines={1}
                        >
                          Correspondência {CONFIANCA_LABEL[confianca]}
                        </Text>
                      </Flex>
                      <Text fontSize="12.5px" fontWeight={600} color="accent.text" whiteSpace="nowrap">
                        Ver ficha →
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </Flex>
        </Flex>
      </PageShell>
    );
  }

  const ehUltimaEtapa = etapa === passos.length - 1;
  const disabled =
    (passo === "tipo" && !tipoDefinido) ||
    (passo === "regiao" && regiao === null) ||
    (passo === "local" && local === null);

  function avancar() {
    if (ehUltimaEtapa) {
      buscarSugestoes();
    } else {
      setEtapa((e) => e + 1);
    }
  }

  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      {/* Progresso segmentado: mostra de relance quantas perguntas faltam,
          o que uma barra contínua não deixa claro. */}
      <Flex gap="5px" mb="18px" aria-hidden>
        {Array.from({ length: TOTAL_PERGUNTAS }).map((_, i) => (
          <Box
            key={i}
            flex="1"
            h="4px"
            borderRadius="2px"
            bg={i < perguntaAtual ? "accent.solid" : "border"}
          />
        ))}
      </Flex>
      <Flex
        direction="column"
        justify={{ md: "center" }}
        minH={{ base: "auto", md: "60vh" }}
      >
      <Box mb={1}>
        <Etiqueta cor="accent.text">
          Pergunta {perguntaAtual} de {TOTAL_PERGUNTAS}
        </Etiqueta>
      </Box>

      {passo === "tipo" && (
        <Stack spacing="18px">
          <Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="xl" mb={1.5}>
              Que tipo de animal foi?
            </Text>
            <Text color="text.secondary" fontSize="13px">
              Sem pressa. Responda o que conseguir — cada detalhe ajuda.
            </Text>
          </Box>
          <GrupoBotoes
            itens={TIPOS}
            ehSelecionado={(valor) => tipoDefinido && categoria === valor}
            onSelecionar={(valor) => escolherTipo(valor as CategoriaId | null)}
          />
          <Text color="text.muted" fontSize="12.5px" lineHeight={1.45} textAlign="center">
            Não saber não atrapalha: resposta em branco só reduz a confiança do
            resultado, nunca elimina um animal da lista.
          </Text>
        </Stack>
      )}

      {passo === "regiao" && (
        <Stack spacing="18px">
          <Text fontFamily="heading" fontWeight={700} fontSize="xl">
            Em que região ocorreu?
          </Text>
          <GrupoBotoes
            itens={REGIOES.map((r) => ({ valor: r, label: capitalizar(r) }))}
            ehSelecionado={(valor) => regiao === valor}
            onSelecionar={(valor) => setRegiao(valor)}
          />
          <Button
            variant="ghost"
            size="sm"
            color="text.secondary"
            alignSelf="start"
            onClick={() => {
              setRegiao(null);
              setEtapa((e) => e + 1);
            }}
          >
            Não sei / pular
          </Button>
        </Stack>
      )}

      {passo === "local" && (
        <Stack spacing="18px">
          <Text fontFamily="heading" fontWeight={700} fontSize="xl">
            Onde o acidente aconteceu?
          </Text>
          <GrupoBotoes
            itens={LOCAIS.map((l) => ({ valor: l.id, label: capitalizar(l.label) }))}
            ehSelecionado={(valor) => local === valor}
            onSelecionar={(valor) => setLocal(valor)}
          />
          <Button
            variant="ghost"
            size="sm"
            color="text.secondary"
            alignSelf="start"
            onClick={() => {
              setLocal(null);
              setEtapa((e) => e + 1);
            }}
          >
            Não sei / pular
          </Button>
        </Stack>
      )}

      {passo === "visuais" && (
        <Stack spacing="18px">
          <Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="xl" mb={1.5}>
              O que você notou no animal?
            </Text>
            <Text color="text.secondary" fontSize="13px">
              Toque em todas as características que se aplicarem.
            </Text>
          </Box>
          <Flex wrap="wrap" justify="center" gap={{ base: 3, md: 4 }}>
            {cardsCaracteristicas.map((card) => (
              <Box key={card.id} flex={{ base: "0 0 150px", md: "0 0 210px" }} maxW={{ base: "150px", md: "210px" }}>
                <TraitCard
                  label={card.label}
                  descricao={card.descricao}
                  imagem={TRAIT_IMAGENS[card.id]}
                  selecionado={visuais.includes(card.id)}
                  onToggle={() => alternar(visuais, setVisuais, card.id)}
                />
              </Box>
            ))}
          </Flex>
        </Stack>
      )}

      {passo === "feridas" && (
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
          <Flex wrap="wrap" justify="center" gap={{ base: 3, md: 4 }}>
            {cardsFeridas.map((card) => (
              <Box key={card.id} flex={{ base: "0 0 150px", md: "0 0 210px" }} maxW={{ base: "150px", md: "210px" }}>
                <TraitCard
                  label={card.label}
                  descricao={card.descricao}
                  imagem={TRAIT_IMAGENS[card.id]}
                  selecionado={feridas.includes(card.id)}
                  onToggle={() => alternar(feridas, setFeridas, card.id)}
                />
              </Box>
            ))}
          </Flex>
        </Stack>
      )}

      {passo === "sintomas" && (
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
          onClick={avancar}
          isDisabled={disabled}
          isLoading={ehUltimaEtapa && carregando}
          loadingText="Buscando..."
        >
          {ehUltimaEtapa ? "Ver sugestões" : "Próximo"}
        </Button>
      </Flex>
      </Flex>
    </PageShell>
  );
}
