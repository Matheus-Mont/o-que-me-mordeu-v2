"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { TbCheck, TbClock, TbX } from "react-icons/tb";
import { CATEGORIA_LABEL, CURIOSIDADES, type Curiosidade } from "@/lib/curiosidades/dados";
import { embaralhar } from "@/lib/curiosidades/utils";
import BlocoTriagem from "@/components/ui/BlocoTriagem";
import Etiqueta from "@/components/ui/Etiqueta";

const TOTAL_PERGUNTAS = 10;
const TEMPO_REVELACAO_MS = 3000;
const TEMPO_RESPOSTA_S = 20;

type Fase = "revelando" | "respondendo" | "resultado";

function prepararPergunta(curiosidade: Curiosidade): Curiosidade {
  const comMarcador = curiosidade.opcoes.map((texto, i) => ({
    texto,
    ehCorreta: i === curiosidade.respostaCorreta,
  }));
  const embaralhadas = embaralhar(comMarcador);
  return {
    ...curiosidade,
    opcoes: embaralhadas.map((o) => o.texto),
    respostaCorreta: embaralhadas.findIndex((o) => o.ehCorreta),
  };
}

function prepararRodada(): Curiosidade[] {
  return embaralhar(CURIOSIDADES).slice(0, TOTAL_PERGUNTAS).map(prepararPergunta);
}

export default function QuizCuriosidades() {
  // O sorteio (embaralhar) só pode rodar no cliente: se rodasse já no useState
  // inicial, o Next renderiza esse componente no servidor também, e o
  // Math.random() do servidor nunca bate com o do cliente na hidratação.
  const [perguntas, setPerguntas] = useState<Curiosidade[]>([]);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState<Fase>("revelando");
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_RESPOSTA_S);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    setPerguntas(prepararRodada());
  }, []);

  const pergunta = perguntas[indice];

  // A cada pergunta nova: esconde as opções por 3s antes de revelar.
  useEffect(() => {
    setFase("revelando");
    setSelecionada(null);
    setTempoRestante(TEMPO_RESPOSTA_S);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const timer = setTimeout(() => setFase("respondendo"), TEMPO_REVELACAO_MS);
    return () => clearTimeout(timer);
  }, [indice]);

  // Contagem regressiva de 20s, só enquanto espera resposta.
  useEffect(() => {
    if (fase !== "respondendo") return;

    const intervalo = setInterval(() => {
      setTempoRestante((t) => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(intervalo);
  }, [fase]);

  useEffect(() => {
    if (fase === "respondendo" && tempoRestante === 0) {
      setFase("resultado");
    }
  }, [fase, tempoRestante]);

  function escolher(i: number) {
    if (fase !== "respondendo") return;
    setSelecionada(i);
    setFase("resultado");
    if (i === pergunta.respostaCorreta) setPontuacao((p) => p + 1);
  }

  function proxima() {
    if (indice + 1 >= perguntas.length) {
      setFinalizado(true);
    } else {
      setIndice((i) => i + 1);
    }
  }

  if (finalizado) {
    return <TelaFinal pontuacao={pontuacao} total={perguntas.length} />;
  }

  if (!pergunta) {
    return (
      <Text color="text.secondary" fontSize="sm">
        Preparando o quiz...
      </Text>
    );
  }

  const acertou = selecionada !== null && selecionada === pergunta.respostaCorreta;
  const tempoEsgotado = fase === "resultado" && selecionada === null;
  const ultimaPergunta = indice + 1 >= perguntas.length;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={2}>
        <Etiqueta cor="accent.text">
          Pergunta {indice + 1} de {perguntas.length}
        </Etiqueta>
        <Etiqueta>Acertos {pontuacao}</Etiqueta>
      </Flex>
      <Flex gap="3px" mb="18px" aria-hidden>
        {perguntas.map((p, i) => (
          <Box
            key={p.id}
            flex="1"
            h="4px"
            borderRadius="2px"
            bg={i <= indice ? "accent.solid" : "border"}
          />
        ))}
      </Flex>

      <Box mb={3}>
        <Etiqueta cor="accent.text">{CATEGORIA_LABEL[pergunta.categoria]}</Etiqueta>
      </Box>

      <Flex gap={4} align="center" mb={4} direction={{ base: "column", md: "row" }}>
        <Box
          borderRadius="card"
          overflow="hidden"
          bg="bg.canvas"
          w={{ base: "full", md: "220px" }}
          h={{ base: "180px", md: "160px" }}
          flexShrink={0}
          position="relative"
        >
          <NextImage
            src={pergunta.imagem}
            alt={pergunta.alt}
            fill
            sizes="(max-width: 768px) 100vw, 220px"
            priority
            style={{ objectFit: "contain", padding: "12px" }}
          />
        </Box>

        <Text fontFamily="heading" fontWeight={700} fontSize="xl" flex={1}>
          {pergunta.pergunta}
        </Text>
      </Flex>

      {fase === "respondendo" && (
        <Flex
          align="center"
          gap={1.5}
          mb={4}
          color={tempoRestante <= 5 ? "danger.text" : "text.secondary"}
        >
          <Box as={TbClock} aria-hidden />
          <Text fontSize="13px" fontWeight={600}>
            {tempoRestante}s pra responder
          </Text>
        </Flex>
      )}

      {fase !== "revelando" && (
        <Flex wrap="wrap" justify="center" gap="10px" mb={4}>
          {pergunta.opcoes.map((opcao, i) => {
            const ehCorreta = i === pergunta.respostaCorreta;
            const ehSelecionada = i === selecionada;
            const mostrarResultado = fase === "resultado";

            let bg: string | undefined;
            let borderColor: string | undefined;
            let color: string | undefined;
            if (mostrarResultado && ehCorreta) {
              bg = "safe.bg";
              borderColor = "safe.border";
              color = "safe.text";
            } else if (mostrarResultado && ehSelecionada && !ehCorreta) {
              bg = "danger.bg";
              borderColor = "danger.border";
              color = "danger.text";
            }

            return (
              <Button
                key={opcao}
                onClick={() => escolher(i)}
                isDisabled={fase !== "respondendo"}
                aria-pressed={ehSelecionada}
                h="auto"
                flexBasis={{ base: "100%", md: "calc(50% - 5px)" }}
                flexGrow={0}
                flexShrink={0}
                minW={0}
                // O Button do Chakra vem com white-space: nowrap embutido, então
                // alternativa longa vazava pra fora do card em vez de quebrar linha.
                whiteSpace="normal"
                textAlign="center"
                lineHeight={1.35}
                py={{ base: "14px", md: "16px" }}
                px="18px"
                borderRadius="12px"
                variant="outline"
                bg={bg ?? "bg.surface"}
                borderColor={borderColor}
                color={color ?? "text.secondary"}
                fontWeight={500}
                fontSize={{ base: "14px", md: "15px" }}
                animation="surge-opcao 0.3s ease-out"
                sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}
                _disabled={{ opacity: 1, cursor: mostrarResultado ? "default" : "not-allowed" }}
                rightIcon={
                  mostrarResultado && ehCorreta ? (
                    <TbCheck aria-hidden />
                  ) : mostrarResultado && ehSelecionada && !ehCorreta ? (
                    <TbX aria-hidden />
                  ) : undefined
                }
              >
                {opcao}
              </Button>
            );
          })}
        </Flex>
      )}

      {fase === "resultado" && (
        <Box role="status" mb={4}>
          <BlocoTriagem
            escala={acertou ? "safe" : "danger"}
            titulo={tempoEsgotado ? "Tempo esgotado!" : acertou ? "Acertou! 🎉" : "Não foi dessa vez."}
            icone={acertou ? <TbCheck size={16} /> : <TbX size={16} />}
          >
            <Text fontSize="13.5px" lineHeight={1.5} mb={1.5}>
              {pergunta.explicacao}
            </Text>
            <Text
              fontFamily="mono"
              fontSize="9.5px"
              fontWeight={500}
              letterSpacing="0.06em"
              color="text.muted"
              lineHeight={1.5}
            >
              Fonte: {pergunta.fonte}
            </Text>
          </BlocoTriagem>
        </Box>
      )}

      {fase === "resultado" && (
        <Button onClick={proxima} w="full" size="lg">
          {ultimaPergunta ? "Ver resultado final" : "Próxima pergunta →"}
        </Button>
      )}
    </Box>
  );
}

function TelaFinal({ pontuacao, total }: { pontuacao: number; total: number }) {
  const mensagem =
    pontuacao >= 9
      ? "Você é praticamente um herpetólogo!"
      : pontuacao >= 7
        ? "Mandou muito bem!"
        : pontuacao >= 4
          ? "Nada mal! Vale conferir as curiosidades de novo."
          : "Bora ler as curiosidades e tentar de novo?";

  return (
    <Box textAlign="center" py={{ base: 8, md: 12 }}>
      <Text fontFamily="heading" fontWeight={700} fontSize="2xl" mb={2}>
        Você acertou {pontuacao} de {total}
      </Text>
      <Text color="text.secondary" fontSize="sm" mb={6}>
        {mensagem}
      </Text>
      <Button as={NextLink} href="/curiosidades" size="lg">
        Voltar pras curiosidades
      </Button>
    </Box>
  );
}
