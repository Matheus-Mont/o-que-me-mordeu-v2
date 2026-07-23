export type CategoriaId = "COBRA" | "ARANHA" | "ESCORPIAO" | "TATURANA" | "AGUA_VIVA";
export type GrupoTriagem = CategoriaId | "GERAL";

export interface TracoAnimal {
  categoria: CategoriaId;
  regioes: string[];
  visuais: string[];
  feridas: string[];
  sintomas: string[];
}

export interface OpcaoCard {
  id: string;
  label: string;
  descricao: string;
  imagem?: string;
}

export interface OpcaoSintoma {
  id: string;
  label: string;
}

export const PESOS: Record<string, number> = {
  cobra_chocalho: 3,
  cobra_aneis_coral: 3,
  cobra_corpo_grosso_sela: 3,
  cobra_xadrez: 3,
  cobra_cauda_abacaxi: 3,
  cobra_cabeca_triangular: 2,
  cobra_losango_v: 2,
  cobra_gigante: 2,
  cobra_capuz_preto: 2,

  aranha_postura_armada: 3,
  aranha_violino_marrom: 3,
  aranha_preta_ampulheta: 3,
  aranha_grande_peluda: 3,
  aranha_prateada_teia: 3,
  aranha_marrom_geometrica: 2,
  aranha_robusta_chao: 2,
  aranha_pequena: 1,

  esc_serrilha: 3,
  esc_triangulo_dorso: 3,
  esc_sem_espinho: 2,
  esc_amarelo: 2,
  esc_marrom: 2,
  esc_preto: 2,
  esc_grande: 2,
  esc_pequeno: 1,
  esc_espinho_ferrao: 1,

  tat_cerdas_verdes_tronco: 3,
  tat_pelos_algodao: 3,
  tat_seringal: 3,
  tat_verde_espinhos_ramif: 2,
  tat_escura_espinhos_rigidos: 2,
  tat_pelos_finos_tufos: 2,

  av_flutuador_azul: 3,
  av_sino_listrado: 3,
  av_pequena_pontas_vermelhas: 3,
  av_prato_branco: 3,
  av_fixa_rocha: 3,
  av_cubo: 2,

  fer_dois_furos: 3,
  fer_fileira_dentes: 3,
  fer_marcas_discretas: 2,
  fer_necrose_evolui: 3,
  fer_pelos_urticantes: 2,
  fer_dois_pontos: 1,
  fer_ferroada_unica: 1,
  fer_pontos_ardencia: 1,
  fer_linhas_chicote: 2,
  fer_area_irritada: 1,

  s_neuro: 3,
  s_ferida_progressiva: 3,
  s_dor_articular: 3,
  s_sangramento: 2,
  s_caimbra: 2,
  s_mancha_roxa: 2,
  s_sistemico: 2,
  s_so_marca: 2,
  s_dor_forte: 1,
  s_dor_leve: 1,
  s_inchaco: 1,
  s_queimadura: 1,
  s_coceira: 1,
};

export const PESO_REGIAO = 1;

export const TRACOS: Record<string, TracoAnimal> = {
  "jararaca-exemplo": {
    categoria: "COBRA",
    regioes: ["nordeste", "sudeste", "sul"],
    visuais: ["cobra_cabeca_triangular", "cobra_losango_v"],
    feridas: ["fer_dois_furos"],
    sintomas: ["s_dor_forte", "s_inchaco", "s_sangramento", "s_mancha_roxa"],
  },
  "cascavel-exemplo": {
    categoria: "COBRA",
    regioes: ["norte", "centro-oeste", "sudeste", "sul", "nordeste"],
    visuais: ["cobra_cabeca_triangular", "cobra_losango_v", "cobra_chocalho"],
    feridas: ["fer_dois_furos"],
    sintomas: ["s_dor_leve", "s_neuro", "s_sistemico"],
  },
  "surucucu-exemplo": {
    categoria: "COBRA",
    regioes: ["norte", "nordeste", "sudeste"],
    visuais: ["cobra_cabeca_triangular", "cobra_losango_v", "cobra_gigante", "cobra_cauda_abacaxi"],
    feridas: ["fer_dois_furos"],
    sintomas: ["s_dor_forte", "s_inchaco", "s_sistemico"],
  },
  "coral-verdadeira-exemplo": {
    categoria: "COBRA",
    regioes: ["sudeste", "sul", "nordeste"],
    visuais: ["cobra_aneis_coral", "cobra_capuz_preto"],
    feridas: ["fer_marcas_discretas"],
    sintomas: ["s_dor_leve", "s_neuro"],
  },
  "jararacucu-exemplo": {
    categoria: "COBRA",
    regioes: ["nordeste", "sudeste", "sul"],
    visuais: ["cobra_cabeca_triangular", "cobra_losango_v", "cobra_gigante"],
    feridas: ["fer_dois_furos"],
    sintomas: ["s_dor_forte", "s_inchaco", "s_sangramento", "s_mancha_roxa"],
  },
  "jiboia-exemplo": {
    categoria: "COBRA",
    regioes: ["norte", "nordeste", "centro-oeste", "sudeste"],
    visuais: ["cobra_corpo_grosso_sela", "cobra_gigante"],
    feridas: ["fer_fileira_dentes"],
    sintomas: ["s_so_marca"],
  },
  "caninana-exemplo": {
    categoria: "COBRA",
    regioes: ["norte", "nordeste", "centro-oeste", "sudeste", "sul"],
    visuais: ["cobra_xadrez"],
    feridas: ["fer_fileira_dentes"],
    sintomas: ["s_so_marca"],
  },
  "falsa-coral-exemplo": {
    categoria: "COBRA",
    regioes: ["sudeste", "sul", "nordeste", "centro-oeste"],
    visuais: ["cobra_aneis_coral"],
    feridas: ["fer_fileira_dentes"],
    sintomas: ["s_so_marca"],
  },

  "armadeira-exemplo": {
    categoria: "ARANHA",
    regioes: ["norte", "centro-oeste", "sudeste", "sul"],
    visuais: ["aranha_postura_armada"],
    feridas: ["fer_dois_pontos"],
    sintomas: ["s_dor_forte", "s_sistemico"],
  },
  "aranha-marrom-exemplo": {
    categoria: "ARANHA",
    regioes: ["nordeste", "sudeste", "sul"],
    visuais: ["aranha_violino_marrom", "aranha_pequena"],
    feridas: ["fer_necrose_evolui"],
    sintomas: ["s_dor_leve", "s_ferida_progressiva", "s_mancha_roxa"],
  },
  "viuva-negra-exemplo": {
    categoria: "ARANHA",
    regioes: ["centro-oeste", "nordeste", "sudeste", "sul"],
    visuais: ["aranha_preta_ampulheta", "aranha_pequena"],
    feridas: ["fer_dois_pontos"],
    sintomas: ["s_caimbra", "s_dor_forte", "s_sistemico"],
  },
  "viuva-marrom-exemplo": {
    categoria: "ARANHA",
    regioes: ["norte", "nordeste", "centro-oeste", "sudeste", "sul"],
    visuais: ["aranha_marrom_geometrica", "aranha_pequena"],
    feridas: ["fer_dois_pontos"],
    sintomas: ["s_caimbra", "s_dor_leve"],
  },
  "caranguejeira-exemplo": {
    categoria: "ARANHA",
    regioes: ["nordeste", "norte", "sudeste"],
    visuais: ["aranha_grande_peluda"],
    feridas: ["fer_pelos_urticantes"],
    sintomas: ["s_dor_leve", "s_coceira"],
  },
  "aranha-de-jardim-exemplo": {
    categoria: "ARANHA",
    regioes: ["sudeste", "sul", "centro-oeste", "nordeste"],
    visuais: ["aranha_prateada_teia"],
    feridas: ["fer_dois_pontos"],
    sintomas: ["s_dor_leve"],
  },
  "aranha-lobo-exemplo": {
    categoria: "ARANHA",
    regioes: ["sul", "sudeste", "centro-oeste"],
    visuais: ["aranha_robusta_chao"],
    feridas: ["fer_dois_pontos"],
    sintomas: ["s_dor_leve", "s_inchaco"],
  },

  "escorpiao-amarelo-exemplo": {
    categoria: "ESCORPIAO",
    regioes: ["sudeste", "nordeste", "centro-oeste"],
    visuais: ["esc_amarelo", "esc_serrilha", "esc_espinho_ferrao"],
    feridas: ["fer_ferroada_unica"],
    sintomas: ["s_dor_forte", "s_sistemico"],
  },
  "escorpiao-marrom-exemplo": {
    categoria: "ESCORPIAO",
    regioes: ["sudeste", "sul", "centro-oeste"],
    visuais: ["esc_marrom", "esc_espinho_ferrao"],
    feridas: ["fer_ferroada_unica"],
    sintomas: ["s_dor_forte"],
  },
  "escorpiao-do-nordeste-exemplo": {
    categoria: "ESCORPIAO",
    regioes: ["nordeste"],
    visuais: ["esc_amarelo", "esc_triangulo_dorso", "esc_espinho_ferrao"],
    feridas: ["fer_ferroada_unica"],
    sintomas: ["s_dor_forte", "s_sistemico"],
  },
  "escorpiao-preto-amazonia-exemplo": {
    categoria: "ESCORPIAO",
    regioes: ["norte"],
    visuais: ["esc_preto", "esc_grande", "esc_espinho_ferrao"],
    feridas: ["fer_ferroada_unica"],
    sintomas: ["s_dor_forte", "s_neuro", "s_sistemico"],
  },
  "escorpiao-preto-exemplo": {
    categoria: "ESCORPIAO",
    regioes: ["sul", "sudeste"],
    visuais: ["esc_preto", "esc_pequeno", "esc_sem_espinho"],
    feridas: ["fer_ferroada_unica"],
    sintomas: ["s_dor_leve"],
  },
  "escorpiao-amarelo-amazonia-exemplo": {
    categoria: "ESCORPIAO",
    regioes: ["norte"],
    visuais: ["esc_preto", "esc_grande", "esc_espinho_ferrao"],
    feridas: ["fer_ferroada_unica"],
    sintomas: ["s_dor_forte", "s_sistemico"],
  },
  "escorpiao-ananteris-exemplo": {
    categoria: "ESCORPIAO",
    regioes: ["centro-oeste", "sudeste", "norte"],
    visuais: ["esc_marrom", "esc_pequeno", "esc_espinho_ferrao"],
    feridas: ["fer_ferroada_unica"],
    sintomas: ["s_dor_leve"],
  },

  "taturana-lonomia-exemplo": {
    categoria: "TATURANA",
    regioes: ["sul", "sudeste"],
    visuais: ["tat_cerdas_verdes_tronco"],
    feridas: ["fer_pontos_ardencia"],
    sintomas: ["s_queimadura", "s_sangramento"],
  },
  "lonomia-achelous-exemplo": {
    categoria: "TATURANA",
    regioes: ["norte"],
    visuais: ["tat_cerdas_verdes_tronco"],
    feridas: ["fer_pontos_ardencia"],
    sintomas: ["s_queimadura", "s_sangramento"],
  },
  "taturana-de-fogo-exemplo": {
    categoria: "TATURANA",
    regioes: ["sudeste", "sul", "nordeste"],
    visuais: ["tat_pelos_algodao"],
    feridas: ["fer_pontos_ardencia"],
    sintomas: ["s_queimadura", "s_inchaco"],
  },
  "taturana-coruja-exemplo": {
    categoria: "TATURANA",
    regioes: ["sudeste", "sul", "centro-oeste"],
    visuais: ["tat_verde_espinhos_ramif"],
    feridas: ["fer_pontos_ardencia"],
    sintomas: ["s_queimadura", "s_coceira"],
  },
  "taturana-da-seringueira-exemplo": {
    categoria: "TATURANA",
    regioes: ["norte"],
    visuais: ["tat_seringal"],
    feridas: ["fer_pontos_ardencia"],
    sintomas: ["s_dor_articular"],
  },
  "taturana-hylesia-exemplo": {
    categoria: "TATURANA",
    regioes: ["norte", "nordeste"],
    visuais: ["tat_pelos_finos_tufos"],
    feridas: ["fer_pontos_ardencia"],
    sintomas: ["s_coceira"],
  },
  "taturana-dirphia-exemplo": {
    categoria: "TATURANA",
    regioes: ["sudeste", "sul", "centro-oeste"],
    visuais: ["tat_escura_espinhos_rigidos"],
    feridas: ["fer_pontos_ardencia"],
    sintomas: ["s_queimadura", "s_inchaco"],
  },

  "caravela-exemplo": {
    categoria: "AGUA_VIVA",
    regioes: ["norte", "nordeste", "sudeste", "sul"],
    visuais: ["av_flutuador_azul"],
    feridas: ["fer_linhas_chicote"],
    sintomas: ["s_queimadura", "s_dor_forte", "s_sistemico"],
  },
  "agua-viva-chrysaora-exemplo": {
    categoria: "AGUA_VIVA",
    regioes: ["sudeste", "sul", "nordeste"],
    visuais: ["av_sino_listrado"],
    feridas: ["fer_linhas_chicote"],
    sintomas: ["s_queimadura", "s_inchaco"],
  },
  "agua-viva-olindias-exemplo": {
    categoria: "AGUA_VIVA",
    regioes: ["sul", "sudeste"],
    visuais: ["av_pequena_pontas_vermelhas"],
    feridas: ["fer_linhas_chicote"],
    sintomas: ["s_dor_forte", "s_inchaco"],
  },
  "agua-viva-vespa-do-mar-exemplo": {
    categoria: "AGUA_VIVA",
    regioes: ["nordeste", "norte"],
    visuais: ["av_cubo"],
    feridas: ["fer_linhas_chicote"],
    sintomas: ["s_dor_forte", "s_queimadura", "s_sistemico"],
  },
  "agua-viva-prato-exemplo": {
    categoria: "AGUA_VIVA",
    regioes: ["sudeste", "sul"],
    visuais: ["av_prato_branco"],
    feridas: ["fer_area_irritada"],
    sintomas: ["s_inchaco"],
  },
  "agua-viva-tamoya-exemplo": {
    categoria: "AGUA_VIVA",
    regioes: ["sudeste", "sul", "nordeste"],
    visuais: ["av_cubo", "av_pequena_pontas_vermelhas"],
    feridas: ["fer_linhas_chicote"],
    sintomas: ["s_dor_forte", "s_queimadura", "s_sistemico"],
  },
  "anemona-do-mar-exemplo": {
    categoria: "AGUA_VIVA",
    regioes: ["sudeste", "sul", "nordeste"],
    visuais: ["av_fixa_rocha"],
    feridas: ["fer_area_irritada"],
    sintomas: ["s_inchaco"],
  },
};

export const CARACTERISTICAS: Record<GrupoTriagem, OpcaoCard[]> = {
  COBRA: [
    { id: "cobra_cabeca_triangular", label: "cabeça triangular", descricao: "cabeça em triângulo, bem separada do corpo" },
    { id: "cobra_chocalho", label: "chocalho na cauda", descricao: "guizo (chocalho) na ponta da cauda" },
    { id: "cobra_aneis_coral", label: "anéis coloridos", descricao: "anéis vermelhos, pretos e brancos ao redor do corpo" },
    { id: "cobra_capuz_preto", label: "capuz preto", descricao: "faixa preta na cabeça, do focinho até os olhos" },
    { id: "cobra_losango_v", label: "desenho em losango", descricao: "manchas em losango ou \"v\" ao longo do dorso" },
    { id: "cobra_corpo_grosso_sela", label: "corpo grosso com selas", descricao: "corpo musculoso com manchas em forma de sela" },
    { id: "cobra_xadrez", label: "padrão xadrez", descricao: "corpo em xadrez preto e amarelo" },
    { id: "cobra_gigante", label: "muito grande (mais de 2 m)", descricao: "serpente muito longa, acima de 2 metros" },
    { id: "cobra_cauda_abacaxi", label: "cauda áspera", descricao: "escamas eriçadas na cauda, como um abacaxi" },
  ],
  ARANHA: [
    { id: "aranha_postura_armada", label: "postura de defesa", descricao: "ergue as pernas dianteiras quando ameaçada" },
    { id: "aranha_violino_marrom", label: "marrom com violino", descricao: "marrom uniforme, com desenho de violino no dorso" },
    { id: "aranha_preta_ampulheta", label: "preta com ampulheta", descricao: "preta brilhante, mancha vermelha em ampulheta na barriga" },
    { id: "aranha_marrom_geometrica", label: "marrom com manchas claras", descricao: "marrom com manchas geométricas claras no abdômen" },
    { id: "aranha_grande_peluda", label: "grande e peluda", descricao: "corpo grande e peludo, vários centímetros" },
    { id: "aranha_prateada_teia", label: "prateada na teia", descricao: "abdômen prateado com listras, no centro de uma teia grande" },
    { id: "aranha_robusta_chao", label: "anda pelo chão", descricao: "corpo robusto e peludo, caça no chão, não faz teia" },
    { id: "aranha_pequena", label: "pequena", descricao: "corpo pequeno, poucos centímetros" },
  ],
  ESCORPIAO: [
    { id: "esc_amarelo", label: "amarelo", descricao: "corpo e pernas amarelos" },
    { id: "esc_marrom", label: "marrom", descricao: "corpo marrom-avermelhado" },
    { id: "esc_preto", label: "escuro / preto", descricao: "corpo escuro, quase preto" },
    { id: "esc_serrilha", label: "serrilha na cauda", descricao: "fileira de grânulos (serrilha) na cauda" },
    { id: "esc_triangulo_dorso", label: "triângulo nas costas", descricao: "triângulo escuro nas costas do cefalotórax" },
    { id: "esc_espinho_ferrao", label: "espinho sob o ferrão", descricao: "espinho visível logo abaixo do ferrão" },
    { id: "esc_sem_espinho", label: "sem espinho no ferrão", descricao: "ferrão sem espinho abaixo" },
    { id: "esc_grande", label: "grande (mais de 7 cm)", descricao: "corpo grande, acima de 7 cm" },
    { id: "esc_pequeno", label: "pequeno (até 4 cm)", descricao: "corpo pequeno, poucos centímetros" },
  ],
  TATURANA: [
    { id: "tat_cerdas_verdes_tronco", label: "verde, agrupada em tronco", descricao: "cerdas verdes, agrupada no tronco de árvores" },
    { id: "tat_pelos_algodao", label: "fofinha como algodão", descricao: "coberta de pelos macios, parece algodão ou pelúcia" },
    { id: "tat_verde_espinhos_ramif", label: "verde com espinhos", descricao: "verde com tufos de espinhos ramificados" },
    { id: "tat_escura_espinhos_rigidos", label: "escura com espinhos rígidos", descricao: "corpo escuro com espinhos rígidos em fileiras" },
    { id: "tat_pelos_finos_tufos", label: "pelos finos escuros", descricao: "pelos finos e escuros dispostos em tufos" },
    { id: "tat_seringal", label: "em seringal (Amazônia)", descricao: "encontrada em seringais da região amazônica" },
  ],
  AGUA_VIVA: [
    { id: "av_flutuador_azul", label: "flutuador azul", descricao: "bexiga azulada boiando, com tentáculos muito longos" },
    { id: "av_cubo", label: "corpo em cubo", descricao: "corpo em formato de cubo, transparente" },
    { id: "av_sino_listrado", label: "sino com listras", descricao: "guarda-chuva translúcido com listras ou pontos escuros" },
    { id: "av_pequena_pontas_vermelhas", label: "pequena, pontas vermelhas", descricao: "pequena e transparente, tentáculos de ponta avermelhada" },
    { id: "av_prato_branco", label: "prato esbranquiçado", descricao: "guarda-chuva grande e branco, em forma de prato" },
    { id: "av_fixa_rocha", label: "presa na rocha", descricao: "presa em rochas, como uma flor — não boia" },
  ],
  GERAL: [
    { id: "cobra_chocalho", label: "chocalho na cauda", descricao: "guizo (chocalho) na ponta da cauda de uma cobra" },
    { id: "cobra_aneis_coral", label: "anéis coloridos", descricao: "cobra com anéis vermelhos, pretos e brancos" },
    { id: "cobra_cabeca_triangular", label: "cabeça triangular", descricao: "cobra de cabeça em triângulo, distinta do corpo" },
    { id: "aranha_postura_armada", label: "aranha em defesa", descricao: "aranha que ergue as pernas dianteiras" },
    { id: "aranha_preta_ampulheta", label: "aranha preta com ampulheta", descricao: "aranha preta com mancha vermelha na barriga" },
    { id: "aranha_violino_marrom", label: "aranha marrom com violino", descricao: "aranha marrom com desenho de violino" },
    { id: "esc_amarelo", label: "escorpião amarelo", descricao: "escorpião de corpo amarelo" },
    { id: "esc_preto", label: "escorpião escuro", descricao: "escorpião de corpo escuro, quase preto" },
    { id: "tat_cerdas_verdes_tronco", label: "lagarta verde em tronco", descricao: "lagarta verde agrupada em tronco de árvore" },
    { id: "tat_pelos_algodao", label: "lagarta felpuda", descricao: "lagarta coberta de pelos macios, como algodão" },
    { id: "av_flutuador_azul", label: "flutuador azul no mar", descricao: "bexiga azulada boiando na água" },
    { id: "av_cubo", label: "água-viva em cubo", descricao: "água-viva de corpo em formato de cubo" },
  ],
};

export const FERIDAS: Record<GrupoTriagem, OpcaoCard[]> = {
  COBRA: [
    { id: "fer_dois_furos", label: "dois furinhos", descricao: "duas marcas separadas, como dois furos (presas)" },
    { id: "fer_fileira_dentes", label: "fileiras de marquinhas", descricao: "várias marcas pequenas em fileira ou arco" },
    { id: "fer_marcas_discretas", label: "marcas discretas", descricao: "marcas pequenas e pouco visíveis" },
  ],
  ARANHA: [
    { id: "fer_dois_pontos", label: "dois pontinhos juntos", descricao: "dois pontinhos bem próximos, quase colados" },
    { id: "fer_necrose_evolui", label: "ferida que escurece", descricao: "mancha que vira ferida escura ao longo dos dias" },
    { id: "fer_pelos_urticantes", label: "irritação por pelos", descricao: "vermelhidão e coceira por pelos, sem furos" },
  ],
  ESCORPIAO: [
    { id: "fer_ferroada_unica", label: "uma ferroada só", descricao: "um único ponto de ferroada, muito dolorido" },
  ],
  TATURANA: [
    { id: "fer_pontos_ardencia", label: "vários pontos ardendo", descricao: "vários pontinhos de ardência onde as cerdas tocaram" },
  ],
  AGUA_VIVA: [
    { id: "fer_linhas_chicote", label: "marcas em chicote", descricao: "riscos avermelhados em linha, como chicotadas" },
    { id: "fer_area_irritada", label: "área avermelhada", descricao: "mancha avermelhada difusa, sem linhas" },
  ],
  GERAL: [
    { id: "fer_dois_furos", label: "dois furinhos", descricao: "duas marcas separadas (típico de cobra peçonhenta)" },
    { id: "fer_fileira_dentes", label: "fileiras de marquinhas", descricao: "várias marcas em fileira (típico de cobra não peçonhenta)" },
    { id: "fer_necrose_evolui", label: "ferida que escurece", descricao: "mancha que vira ferida escura com os dias" },
    { id: "fer_ferroada_unica", label: "uma ferroada só", descricao: "um único ponto muito dolorido (escorpião)" },
    { id: "fer_linhas_chicote", label: "marcas em chicote", descricao: "riscos avermelhados em linha (água-viva)" },
    { id: "fer_pontos_ardencia", label: "vários pontos ardendo", descricao: "vários pontinhos de ardência (lagarta)" },
  ],
};

export const SINTOMAS: Record<GrupoTriagem, OpcaoSintoma[]> = {
  COBRA: [
    { id: "s_dor_forte", label: "dor e inchaço fortes no local" },
    { id: "s_sangramento", label: "sangramento que não para (local, gengiva ou urina)" },
    { id: "s_mancha_roxa", label: "manchas roxas, bolhas ou ferida escura" },
    { id: "s_neuro", label: "pálpebra caída, visão dupla ou dificuldade de engolir" },
    { id: "s_sistemico", label: "mal-estar, suor, vômito ou sonolência" },
    { id: "s_dor_leve", label: "pouca dor no local" },
    { id: "s_so_marca", label: "só a marca da mordida, sem outros sintomas" },
  ],
  ARANHA: [
    { id: "s_dor_forte", label: "dor local muito intensa" },
    { id: "s_caimbra", label: "cãibras, rigidez muscular ou dor que se espalha" },
    { id: "s_ferida_progressiva", label: "ferida que piora ao longo de horas ou dias" },
    { id: "s_mancha_roxa", label: "vermelhidão que vira mancha roxa" },
    { id: "s_sistemico", label: "suor, náusea ou alteração da pressão" },
    { id: "s_coceira", label: "coceira e irritação na pele" },
    { id: "s_dor_leve", label: "dor leve, como picada de inseto" },
  ],
  ESCORPIAO: [
    { id: "s_dor_forte", label: "dor local intensa e imediata" },
    { id: "s_sistemico", label: "suor, vômito ou alteração dos batimentos" },
    { id: "s_neuro", label: "falta de coordenação ou visão turva" },
    { id: "s_dor_leve", label: "dor leve, como picada de abelha" },
  ],
  TATURANA: [
    { id: "s_queimadura", label: "dor em queimação no contato" },
    { id: "s_inchaco", label: "vermelhidão e inchaço no local" },
    { id: "s_sangramento", label: "sangramento (gengiva, urina, pele) horas depois" },
    { id: "s_coceira", label: "coceira intensa e erupção que dura dias" },
    { id: "s_dor_articular", label: "dor ou inchaço nas juntas após contatos repetidos" },
  ],
  AGUA_VIVA: [
    { id: "s_dor_forte", label: "dor forte e imediata" },
    { id: "s_queimadura", label: "queimação com marcas em linha ou chicote" },
    { id: "s_inchaco", label: "vermelhidão e irritação leve" },
    { id: "s_sistemico", label: "mal-estar geral ou reação alérgica" },
  ],
  GERAL: [
    { id: "s_dor_forte", label: "dor local intensa e imediata" },
    { id: "s_dor_leve", label: "pouca dor no local" },
    { id: "s_inchaco", label: "inchaço e vermelhidão no local" },
    { id: "s_sangramento", label: "sangramento que não para" },
    { id: "s_mancha_roxa", label: "manchas roxas ou ferida que piora" },
    { id: "s_neuro", label: "pálpebra caída, visão dupla ou fraqueza" },
    { id: "s_sistemico", label: "suor, vômito ou mal-estar geral" },
    { id: "s_caimbra", label: "cãibras ou rigidez muscular" },
    { id: "s_queimadura", label: "dor em queimação" },
    { id: "s_coceira", label: "coceira e irritação na pele" },
    { id: "s_so_marca", label: "só a marca, sem outros sintomas" },
  ],
};
