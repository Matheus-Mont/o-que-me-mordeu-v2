import { TbArrowZigZag, TbBug, TbMapPin, TbSpider, TbWaveSine } from "react-icons/tb";
import type { IconType } from "react-icons";

export type CategoriaCuriosidade = "COBRA" | "ESCORPIAO" | "ARANHA" | "TATURANA" | "AGUA_VIVA" | "GERAL";
export type TipoPergunta = "multipla" | "vf";

export interface Curiosidade {
  id: string;
  categoria: CategoriaCuriosidade;
  tipo: TipoPergunta;
  imagem: string;
  alt: string;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
  fonte: string;
}

export const CATEGORIA_LABEL: Record<CategoriaCuriosidade, string> = {
  COBRA: "Cobras",
  ESCORPIAO: "Escorpiões",
  ARANHA: "Aranhas",
  TATURANA: "Taturanas",
  AGUA_VIVA: "Águas-vivas",
  GERAL: "Geral",
};

export const CATEGORIA_ICONE: Record<CategoriaCuriosidade, IconType> = {
  COBRA: TbArrowZigZag,
  ESCORPIAO: TbBug,
  ARANHA: TbSpider,
  TATURANA: TbBug,
  AGUA_VIVA: TbWaveSine,
  GERAL: TbMapPin,
};

const VF = ["Verdade", "Mito"];

export const CURIOSIDADES: Curiosidade[] = [
  // Cobras
  {
    id: "cobra-1",
    categoria: "COBRA",
    tipo: "multipla",
    imagem: "/guia/bothrops-jararaca.jpg",
    alt: "Jararaca enrolada no chão",
    pergunta: "As picadas de cobra no Brasil são divididas em quantos tipos, dependendo da espécie?",
    opcoes: ["2", "4", "6", "10"],
    respostaCorreta: 1,
    explicacao:
      "As picadas de cobra no Brasil são separadas em 4 grupos: jararaca, cascavel, surucucu e coral. Cada grupo tem um veneno diferente e pede um soro específico.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "cobra-2",
    categoria: "COBRA",
    tipo: "multipla",
    imagem: "/guia/crotalus-durissus-chocalho.jpg",
    alt: "Chocalho da cauda da cascavel",
    pergunta: "Qual cobra mais causa acidente no Brasil?",
    opcoes: ["Cascavel", "Jararaca", "Coral-verdadeira", "Surucucu"],
    respostaCorreta: 1,
    explicacao:
      "A jararaca e suas parentes próximas, como a jararacuçu e a urutu, respondem pela maioria das picadas de cobra no país. A cascavel vem em segundo lugar.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "cobra-3",
    categoria: "COBRA",
    tipo: "multipla",
    imagem: "/guia/lachesis-muta.jpg",
    alt: "Surucucu-pico-de-jaca",
    pergunta: "Qual é a maior cobra peçonhenta das Américas?",
    opcoes: ["Cascavel", "Surucucu", "Jararacuçu", "Coral-verdadeira"],
    respostaCorreta: 1,
    explicacao:
      "A surucucu-pico-de-jaca é a maior cobra peçonhenta das Américas e pode passar de 3,5 metros de comprimento.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "cobra-4",
    categoria: "COBRA",
    tipo: "vf",
    imagem: "/guia/jararacas-caracteristica-corporal.jpg",
    alt: "Detalhe do corpo de uma jararaca",
    pergunta: "A maioria das cobras do Brasil é peçonhenta.",
    opcoes: VF,
    respostaCorreta: 1,
    explicacao:
      "De mais de 400 espécies de cobra que vivem no Brasil, só cerca de 17% têm veneno perigoso pra gente, mais ou menos uma em cada seis.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "cobra-5",
    categoria: "COBRA",
    tipo: "multipla",
    imagem: "/guia/bothrops-jararaca.jpg",
    alt: "Jararaca",
    pergunta: "O Brasil tem cerca de 30 espécies de jararaca. Quantas causam a maioria dos acidentes?",
    opcoes: ["2", "7", "15", "25"],
    respostaCorreta: 1,
    explicacao:
      "O Brasil tem cerca de 30 espécies de jararaca, mas só 7 delas respondem pela maioria dos casos documentados no país.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "cobra-6",
    categoria: "COBRA",
    tipo: "multipla",
    imagem: "/guia/crotalus-durissus-chocalho.jpg",
    alt: "Cauda de cascavel",
    pergunta: "Entre as 4 cobras mais perigosas do Brasil, qual tem a maior chance de matar quem for picado sem tratamento?",
    opcoes: ["Cascavel", "Jararaca", "Surucucu", "Coral-verdadeira"],
    respostaCorreta: 0,
    explicacao:
      "Entre as picadas de cobra no Brasil, a da cascavel é a que tem a maior taxa de mortes, quase o dobro da surucucu, que vem em segundo lugar.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },
  {
    id: "cobra-7",
    categoria: "COBRA",
    tipo: "vf",
    imagem: "/guia/micrurus-corallinus.jpg",
    alt: "Coral-verdadeira",
    pergunta: "A cobra que mais mata gente no mundo vive no Brasil.",
    opcoes: VF,
    respostaCorreta: 1,
    explicacao:
      "A cobra que mais mata gente no mundo nem vive no Brasil: é a víbora-de-escamas-serrilhadas, da África e da Ásia. Sozinha, ela mata mais gente por ano do que todas as outras cobras somadas.",
    fonte: "National Geographic Brasil",
  },
  {
    id: "cobra-8",
    categoria: "COBRA",
    tipo: "multipla",
    imagem: "/guia/coral-padrao-monadal-triadal.jpg",
    alt: "Padrão de anéis de uma coral",
    pergunta: "No mundo existem mais de 3.400 espécies de cobra conhecidas. Quantas são peçonhentas?",
    opcoes: ["Cerca de 100", "Cerca de 600", "Cerca de 1.700", "Cerca de 3.000"],
    respostaCorreta: 1,
    explicacao:
      "No mundo todo já são mais de 3.400 espécies de cobra conhecidas, e cerca de 600 delas têm veneno capaz de machucar uma pessoa.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },

  // Escorpiões
  {
    id: "escorpiao-1",
    categoria: "ESCORPIAO",
    tipo: "vf",
    imagem: "/guia/tityus-serrulatus.jpg",
    alt: "Escorpião-amarelo",
    pergunta: "Hoje em dia, escorpião causa mais acidente no Brasil do que cobra.",
    opcoes: VF,
    respostaCorreta: 0,
    explicacao:
      "Desde meados dos anos 2000, o escorpião passou a ser o animal peçonhento que mais causa acidente no Brasil, à frente das cobras e das aranhas.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "escorpiao-2",
    categoria: "ESCORPIAO",
    tipo: "multipla",
    imagem: "/guia/tityus-serrulatus-cauda-detalhe.jpg",
    alt: "Cauda de escorpião-amarelo",
    pergunta: "Por que a picada de escorpião é considerada um problema \"de dentro de casa\"?",
    opcoes: [
      "Porque a maioria das picadas acontece ao vestir roupa, calçar sapato ou durante a limpeza",
      "Porque escorpião só existe dentro de casa",
      "Porque não existe escorpião na natureza",
      "Porque o veneno só funciona em ambiente fechado",
    ],
    respostaCorreta: 0,
    explicacao:
      "A maior parte das picadas de escorpião acontece dentro de casa, na hora de vestir uma roupa, calçar um sapato ou mexer em entulho durante a faxina.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "escorpiao-3",
    categoria: "ESCORPIAO",
    tipo: "multipla",
    imagem: "/guia/tityus-bahiensis-1.jpg",
    alt: "Escorpião-marrom",
    pergunta: "Quantos gêneros de escorpião são considerados perigosos pra saúde no Brasil?",
    opcoes: ["1", "3", "5", "10"],
    respostaCorreta: 0,
    explicacao:
      "De todos os gêneros de escorpião que existem no Brasil, só um preocupa a medicina: o Tityus, que reúne o escorpião-amarelo, o marrom e outros parentes.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },
  {
    id: "escorpiao-4",
    categoria: "ESCORPIAO",
    tipo: "vf",
    imagem: "/guia/ananteris-sp.jpg",
    alt: "Pequeno escorpião de jardim",
    pergunta: "Todo escorpião do Brasil é perigoso.",
    opcoes: VF,
    respostaCorreta: 1,
    explicacao:
      "Fora as espécies do gênero Tityus, a picada da maioria dos escorpiões brasileiros provoca só uma dor local, parecida com a de uma ferroada de abelha.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },
  {
    id: "escorpiao-5",
    categoria: "ESCORPIAO",
    tipo: "multipla",
    imagem: "/guia/tityus-serrulatus-femea.jpg",
    alt: "Escorpião-amarelo fêmea",
    pergunta: "Crianças picadas por qual escorpião correm mais risco de complicação grave?",
    opcoes: ["Escorpião-amarelo", "Escorpião-preto", "Escorpião-de-jardim", "O risco é igual em todos"],
    respostaCorreta: 0,
    explicacao:
      "Os casos graves e as mortes por picada de escorpião no Brasil estão ligados principalmente ao escorpião-amarelo (Tityus serrulatus), e as crianças são quem corre mais risco.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },

  // Aranhas
  {
    id: "aranha-1",
    categoria: "ARANHA",
    tipo: "multipla",
    imagem: "/guia/loxosceles-caracteristicas.jpg",
    alt: "Aranha-marrom",
    pergunta: "Qual aranha mais causa acidente no Brasil?",
    opcoes: ["Aranha-marrom", "Armadeira", "Viúva-negra", "Caranguejeira"],
    respostaCorreta: 0,
    explicacao:
      "A armadeira tem a fama de mais assustadora, mas quem mais pica gente no Brasil é a discreta aranha-marrom.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "aranha-2",
    categoria: "ARANHA",
    tipo: "multipla",
    imagem: "/guia/loxosceles-caracteristicas-2.jpg",
    alt: "Detalhe da aranha-marrom",
    pergunta: "Qual cidade brasileira mais registra picada de aranha-marrom?",
    opcoes: ["Curitiba", "São Paulo", "Rio de Janeiro", "Salvador"],
    respostaCorreta: 0,
    explicacao:
      "Curitiba é a cidade que mais registra picada de aranha-marrom no Brasil, o que faz sentido: a espécie se concentra na região Sul.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "aranha-3",
    categoria: "ARANHA",
    tipo: "vf",
    imagem: "/guia/caranguejeira.png",
    alt: "Caranguejeira grande e peluda",
    pergunta: "A maior aranha do mundo (em peso) vive na Amazônia brasileira.",
    opcoes: VF,
    respostaCorreta: 0,
    explicacao:
      "A maior aranha do mundo em peso vive na Amazônia: é a caranguejeira-golias, que chega a 30 cm de envergadura e pode passar de 170 gramas.",
    fonte: "National Geographic Brasil",
  },
  {
    id: "aranha-4",
    categoria: "ARANHA",
    tipo: "vf",
    imagem: "/guia/pelos-caranguejeira.png",
    alt: "Pelos urticantes de caranguejeira",
    pergunta: "As mais de 400 espécies de caranguejeira do Brasil são consideradas perigosas pra saúde.",
    opcoes: VF,
    respostaCorreta: 1,
    explicacao:
      "O Brasil tem mais de 400 espécies de caranguejeira e nenhuma delas é considerada de importância médica, por mais assustador que seja o tamanho.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "aranha-5",
    categoria: "ARANHA",
    tipo: "vf",
    imagem: "/guia/latrodectus-curacaviensis-femea.jpg",
    alt: "Viúva-negra fêmea",
    pergunta: "A viúva-negra é uma das aranhas que mais picam gente no Brasil.",
    opcoes: VF,
    respostaCorreta: 1,
    explicacao:
      "Acidente com viúva-negra é raro no Brasil, bem menos comum que os de aranha-marrom e de armadeira.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "aranha-6",
    categoria: "ARANHA",
    tipo: "multipla",
    imagem: "/guia/phoneutria-posicao-defensiva-1.jpg",
    alt: "Armadeira em posição de defesa",
    pergunta: "Por que a armadeira ganhou esse nome?",
    opcoes: [
      "Porque ergue as pernas da frente numa postura de defesa, como se estivesse \"se armando\"",
      "Porque tem uma armadura nas costas",
      "Porque costuma viver perto de armas de fogo",
      "Porque tem o formato de uma armadilha",
    ],
    respostaCorreta: 0,
    explicacao:
      "A armadeira ganhou esse nome por causa da postura de defesa: quando se sente ameaçada, ela se apoia nas pernas de trás e levanta as da frente, como se estivesse se armando pra atacar.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "aranha-7",
    categoria: "ARANHA",
    tipo: "multipla",
    imagem: "/guia/latrodectus-geometricus-femea.jpg",
    alt: "Viúva-marrom",
    pergunta: "O que diferencia a viúva-marrom da viúva-negra?",
    opcoes: [
      "A viúva-marrom é mais clara e os sintomas costumam ser mais leves",
      "A viúva-marrom é bem maior",
      "A viúva-marrom não tem veneno nenhum",
      "Não existe diferença nenhuma entre elas",
    ],
    respostaCorreta: 0,
    explicacao:
      "Viúva-negra e viúva-marrom são do mesmo gênero, o Latrodectus. A viúva-marrom tem cor mais clara e os sintomas da picada costumam ser mais brandos.",
    fonte: "Conteúdo revisado do app com base no Guia MS 2024",
  },

  // Taturanas
  {
    id: "taturana-1",
    categoria: "TATURANA",
    tipo: "multipla",
    imagem: "/guia/lonomia-obliqua-lagarta.jpg",
    alt: "Lagarta Lonomia obliqua",
    pergunta: "Qual lagarta brasileira é reconhecida pelo Guinness World Records como a mais venenosa do mundo?",
    opcoes: ["Lonomia obliqua", "Taturana-de-fogo", "Taturana-coruja", "Taturana-de-espinho"],
    respostaCorreta: 0,
    explicacao:
      "A Lonomia obliqua vive no Sul e no Sudeste do Brasil e é reconhecida pelo Guinness World Records como a lagarta mais venenosa do mundo.",
    fonte: "Guinness World Records, via Wikipédia",
  },
  {
    id: "taturana-2",
    categoria: "TATURANA",
    tipo: "vf",
    imagem: "/guia/lonomia-obliqua-colonia.jpg",
    alt: "Colônia de Lonomia obliqua",
    pergunta: "O veneno da Lonomia obliqua ataca a coagulação do sangue.",
    opcoes: VF,
    respostaCorreta: 0,
    explicacao:
      "O veneno da Lonomia obliqua mexe com a coagulação do sangue e pode provocar sangramentos graves. É a única taturana do Brasil que tem soro específico.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },
  {
    id: "taturana-3",
    categoria: "TATURANA",
    tipo: "multipla",
    imagem: "/guia/megalopyge-lanata-lagarta.jpg",
    alt: "Taturana-de-fogo, parecida com algodão",
    pergunta: "A taturana-de-fogo parece um chumaço de algodão fofinho. O que ela esconde?",
    opcoes: [
      "Cerdas urticantes escondidas nos pelos macios",
      "Nada, ela é totalmente inofensiva",
      "Presas venenosas escondidas na boca",
      "Um casulo de mariposa pronto pra abrir",
    ],
    respostaCorreta: 0,
    explicacao:
      "A taturana-de-fogo parece um chumaço de algodão, mas embaixo dos pelos macios existem cerdas que soltam veneno ao toque. A dor pega de surpresa quem achou que era inofensiva.",
    fonte: "Conteúdo revisado do app com base no Guia MS 2024",
  },
  {
    id: "taturana-4",
    categoria: "TATURANA",
    tipo: "vf",
    imagem: "/guia/premolis-semirufa-pararama.jpg",
    alt: "Taturana-da-seringueira",
    pergunta: "O contato repetido com a taturana-da-seringueira pode causar deformidade nas mãos, com o tempo.",
    opcoes: VF,
    respostaCorreta: 0,
    explicacao:
      "O contato repetido com a taturana-da-seringueira pode deformar as articulações das mãos com o tempo. É a pararamose, uma doença que afeta principalmente seringueiros.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },

  // Águas-vivas
  {
    id: "agua-viva-1",
    categoria: "AGUA_VIVA",
    tipo: "vf",
    imagem: "/guia/anemona-do-mar.jpg",
    alt: "Anêmona-do-mar presa em rocha",
    pergunta: "Anêmona-do-mar é um tipo de água-viva.",
    opcoes: VF,
    respostaCorreta: 1,
    explicacao:
      "Anêmona-do-mar não é água-viva. Ela também queima, mas fica presa nas rochas e pertence a outro grupo dentro dos cnidários.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },
  {
    id: "agua-viva-2",
    categoria: "AGUA_VIVA",
    tipo: "multipla",
    imagem: "/guia/cubomedusa-chiropsalmus.jpg",
    alt: "Água-viva em formato de cubo",
    pergunta: "Qual formato de água-viva costuma causar os acidentes mais graves no litoral do Brasil?",
    opcoes: ["Formato de cubo", "Formato de guarda-chuva", "Formato de estrela", "Formato de disco"],
    respostaCorreta: 0,
    explicacao:
      "As águas-vivas-caixa, também chamadas de cubomedusas, são as que causam os acidentes mais sérios no litoral brasileiro. A vespa-do-mar é uma delas.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },
  {
    id: "agua-viva-3",
    categoria: "AGUA_VIVA",
    tipo: "vf",
    imagem: "/guia/chrysaora-lactea.jpg",
    alt: "Água-viva comum",
    pergunta: "Água doce ajuda a aliviar a queimadura de água-viva.",
    opcoes: VF,
    respostaCorreta: 1,
    explicacao:
      "Água doce não alivia a queimadura de água-viva e ainda pode piorar: ela faz as células urticantes que continuam grudadas na pele soltarem mais veneno. O certo é lavar com água do mar.",
    fonte: "Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos, FUNASA 2001",
  },
  {
    id: "agua-viva-4",
    categoria: "AGUA_VIVA",
    tipo: "multipla",
    imagem: "/guia/tamoya-1.jpg",
    alt: "Água-viva-cubo",
    pergunta: "Uma caravela pode picar mesmo depois de...",
    opcoes: ["Encalhar morta na areia", "Ser fervida", "Ficar 1 semana fora da água", "Nunca, só pica viva"],
    respostaCorreta: 0,
    explicacao:
      "Os tentáculos da caravela continuam ativos mesmo depois que ela morre ou encalha na areia. Por isso não se toca numa caravela nem quando ela parece sem vida.",
    fonte: "Conteúdo revisado do app com base no Guia MS 2024",
  },

  // Geral
  {
    id: "geral-1",
    categoria: "GERAL",
    tipo: "multipla",
    imagem: "/guia/bothrops-jararaca.jpg",
    alt: "Jararaca",
    pergunta: "Qual região do Brasil tem mais acidente com cobra?",
    opcoes: ["Norte e Nordeste", "Sul", "Sudeste", "Centro-Oeste"],
    respostaCorreta: 0,
    explicacao:
      "Norte e Nordeste são as regiões com as maiores taxas de acidente com cobra do país, provavelmente pelo peso que a atividade agropecuária e extrativista tem por lá.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
  {
    id: "geral-2",
    categoria: "GERAL",
    tipo: "vf",
    imagem: "/guia/jararacas-caracteristica-corporal.jpg",
    alt: "Características do corpo de uma jararaca",
    pergunta:
      "Homem, entre 40 e 64 anos, morador de zona rural: esse é o perfil mais comum de vítima de picada de cobra no Brasil.",
    opcoes: VF,
    respostaCorreta: 0,
    explicacao:
      "O perfil mais comum de vítima de picada de cobra no Brasil, segundo o Ministério da Saúde, é homem de 40 a 64 anos morando em zona rural, quase sempre ligado a trabalho no campo.",
    fonte: "Guia de Animais Peçonhentos do Brasil, MS 2024",
  },
];
