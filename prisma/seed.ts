import { PrismaClient, StatusConteudo } from "@prisma/client";
import bcrypt from "bcryptjs";

const AVISO_EXEMPLO =
  "[EXEMPLO/FICTÍCIO] conteúdo gerado pelo seed de desenvolvimento — substituir por revisão real (biólogo/CIATox) antes de publicar de verdade.";

const prisma = new PrismaClient();

const IMAGENS_GUIA: Record<string, string[]> = {
  "jararaca-exemplo": ["/guia/bothrops-jararaca.jpg", "/guia/jararacas-caracteristica-corporal.jpg", "/guia/serpentes-crotalineas-caracteristicas.jpg"],
  "cascavel-exemplo": ["/guia/serpentes-crotalineas-caracteristicas.jpg", "/guia/crotalus-durissus-subespecies.jpg", "/guia/crotalus-durissus-chocalho.jpg"],
  "surucucu-exemplo": ["/guia/lachesis-muta-caracteristicas.jpg", "/guia/lachesis-muta.jpg"],
  "coral-verdadeira-exemplo": ["/guia/micrurus-corallinus.jpg", "/guia/coral-padrao-monadal-triadal.jpg", "/guia/coral-padroes-prancha.jpg"],
  "jararacucu-exemplo": ["/guia/bothrops-jararacussu.jpg", "/guia/jararacas-caracteristica-corporal.jpg"],
  "jiboia-exemplo": ["/guia/jiboia-1.jpg", "/guia/jiboia-2.jpg", "/guia/jiboia-3.jpg", "/guia/jiboia-caracteristica-manchas-sela.png"],
  "caninana-exemplo": ["/guia/caninana-1.jpg", "/guia/caninana-2.jpg", "/guia/caninana-3.jpg", "/guia/caninana-4.jpg"],
  "falsa-coral-exemplo": ["/guia/coral-falsa-1.jpg", "/guia/coral-falsa-2.jpg", "/guia/coral-falsa-3.jpg", "/guia/coral-falsa-4.jpg"],
  "armadeira-exemplo": ["/guia/phoneutria-posicao-defensiva-1.jpg", "/guia/phoneutria-posicao-defensiva-2.jpg", "/guia/phoneutria-caracteristicas.jpg"],
  "aranha-marrom-exemplo": ["/guia/loxosceles-caracteristicas.jpg", "/guia/loxosceles-caracteristicas-2.jpg"],
  "viuva-negra-exemplo": ["/guia/latrodectus-curacaviensis-femea.jpg", "/guia/latrodectus-curacaviensis-habitat.jpg", "/guia/latrodectus-disposicao-olhos.jpg"],
  "viuva-marrom-exemplo": ["/guia/latrodectus-geometricus-femea.jpg", "/guia/latrodectus-geometricus-macho-femea.jpg"],
  "caranguejeira-exemplo": ["/guia/caranguejeira.png", "/guia/pelos-caranguejeira.png", "/guia/caranguejeira-quelice-ras.jpg"],
  "aranha-de-jardim-exemplo": ["/guia/argiope-1.jpg", "/guia/argiope-2.jpg", "/guia/argiope-3.jpg"],
  "aranha-lobo-exemplo": ["/guia/lycosa-1.jpg", "/guia/lycosa-2.png", "/guia/lycosa-3.jpg"],
  "escorpiao-amarelo-exemplo": ["/guia/tityus-serrulatus.jpg", "/guia/tityus-serrulatus-femea.jpg", "/guia/tityus-serrulatus-cauda-detalhe.jpg"],
  "escorpiao-marrom-exemplo": ["/guia/tityus-bahiensis-1.jpg", "/guia/tityus-bahiensis-macho.jpg", "/guia/tityus-bahiensis-dedo-detalhe.jpg"],
  "escorpiao-do-nordeste-exemplo": ["/guia/tityus-stigmurus.jpg", "/guia/tityus-stigmurus-femea.jpg", "/guia/tityus-stigmurus-cauda-detalhe.jpg"],
  "escorpiao-preto-amazonia-exemplo": ["/guia/tityus-obscurus.jpg", "/guia/tityus-obscurus-variacao-1.jpg", "/guia/tityus-obscurus-variacao-2.jpg"],
  "escorpiao-preto-exemplo": ["/guia/bothriurus-sp-2.jpg"],
  "escorpiao-amarelo-amazonia-exemplo": ["/guia/tityus-metuendus.jpg", "/guia/tityus-ferrao-espinho-subaculear.jpg"],
  "escorpiao-ananteris-exemplo": ["/guia/ananteris-sp.jpg", "/guia/escorpiao-morfologia-externa.jpg"],
  "taturana-lonomia-exemplo": ["/guia/lonomia-obliqua-lagarta.jpg", "/guia/lonomia-obliqua-colonia.jpg", "/guia/lonomia-obliqua-manchas-u-v.jpg"],
  "lonomia-achelous-exemplo": ["/guia/lonomia-achelous-lagarta.jpg", "/guia/lonomia-sp-lagarta-1.jpg"],
  "taturana-de-fogo-exemplo": ["/guia/megalopyge-lanata-lagarta.jpg", "/guia/megalopyge-albicollis.jpg"],
  "taturana-coruja-exemplo": ["/guia/automeris-sp-lagarta.jpg"],
  "taturana-da-seringueira-exemplo": ["/guia/premolis-semirufa-pararama.jpg"],
  "taturana-hylesia-exemplo": ["/guia/hylesia-sp-lagarta.jpg", "/guia/hylesia-sp-cerdas.jpg", "/guia/hylesia-mariposa.jpg"],
  "taturana-dirphia-exemplo": ["/guia/dirphia-sp-lagarta.jpg"],
  "caravela-exemplo": ["/guia/caravela-portuguesa.jpg"],
  "agua-viva-chrysaora-exemplo": ["/guia/chrysaora-lactea.jpg"],
  "agua-viva-olindias-exemplo": ["/guia/olindias-sambaquiensis.jpg"],
  "agua-viva-vespa-do-mar-exemplo": ["/guia/cubomedusa-chiropsalmus.jpg"],
  "agua-viva-prato-exemplo": ["/guia/lychnorhiza-1.jpg", "/guia/lychnorhiza-2.jpg"],
  "agua-viva-tamoya-exemplo": ["/guia/tamoya-1.jpg"],
  "anemona-do-mar-exemplo": ["/guia/anemona-do-mar.jpg"],
};

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Defina ADMIN_EMAIL e ADMIN_PASSWORD no .env antes de rodar o seed."
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Usuário administrador pronto: ${user.email} (id: ${user.id})`);
  return user;
}

async function seedAnimais(userId: string) {
  const animais = [
    {
      slug: "jararaca-exemplo",
      nomePopular: "jararaca",
      nomeCientifico: "Bothrops jararaca",
      wikipedia: "Bothrops jararaca",
      categoria: "COBRA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["nordeste", "sudeste", "sul"],
      identificacao: [
        "cabeça triangular, bem distinta do corpo",
        "fosseta loreal entre o olho e a narina",
        "coloração de fundo cinza bastante variável, com manchas em formato de \"v\" invertido ao longo do dorso",
        "faixa escura evidente atrás do olho (pós-ocular)",
      ],
      sintomas:
        "dor e inchaço imediatos no local da picada, podendo evoluir com sangramento e manchas arroxeadas.",
      tempoSintomas: "minutos após a picada",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter o membro atingido elevado e em repouso",
        "oferecer água potável à vítima, se ela conseguir beber",
        "procurar atendimento médico imediatamente",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não cortar o local da picada",
        "não tentar sugar o veneno",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antibotrópico",
    },
    {
      slug: "cascavel-exemplo",
      nomePopular: "cascavel",
      nomeCientifico: "Crotalus durissus",
      wikipedia: "Crotalus durissus",
      categoria: "COBRA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["norte", "centro-oeste", "sudeste", "sul", "nordeste"],
      identificacao: [
        "chocalho (guizo) na ponta da cauda",
        "linha vertebral (dorsal) bem elevada e destacada",
        "corpo com fileira de losangos escuros (marrons ou acinzentados), bordejados de branco ou amarelado",
        "cabeça triangular, bem distinta do corpo, com fosseta loreal",
      ],
      sintomas:
        "diferente de outras cobras, os sintomas gerais costumam se destacar mais que a dor local: mal-estar, sudorese, vômitos, sonolência ou agitação, e alterações na visão (pálpebras caídas) ou na cor da urina.",
      tempoSintomas: "primeiras horas, com predomínio de sintomas gerais sobre a dor no local",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa calma e em repouso",
        "oferecer água potável à vítima, se ela conseguir beber",
        "procurar atendimento médico imediatamente, mesmo com pouca dor local",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não cortar o local da picada",
        "não subestimar o acidente por parecer pouco grave no início",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro anticrotálico",
    },
    {
      slug: "surucucu-exemplo",
      nomePopular: "surucucu",
      nomeCientifico: "Lachesis muta",
      wikipedia: "Lachesis muta",
      categoria: "COBRA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["norte", "nordeste", "sudeste"],
      identificacao: [
        "maior serpente peçonhenta das américas, pode ultrapassar 3 metros e chegar a 3,5 m",
        "fosseta loreal entre o olho e a narina",
        "padrão de losangos escuros com bordas claras",
        "escamas eriçadas nas últimas fileiras da cauda, lembrando a coroa de um abacaxi",
      ],
      sintomas:
        "dor e inchaço local parecidos com o acidente por jararaca, podendo se somar sudorese, náusea e queda de pressão.",
      tempoSintomas: "minutos a poucas horas após a picada",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter o membro atingido elevado e em repouso",
        "oferecer água potável à vítima, se ela conseguir beber",
        "procurar atendimento médico imediatamente",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não cortar o local da picada",
        "não tentar sugar o veneno",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antibotrópico-antilaquético (SABL)",
    },
    {
      slug: "coral-verdadeira-exemplo",
      nomePopular: "coral-verdadeira",
      nomeCientifico: "Micrurus corallinus",
      wikipedia: "Micrurus corallinus",
      categoria: "COBRA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["sudeste", "sul", "nordeste"],
      identificacao: [
        "anéis pretos simples ao redor de todo o corpo, intercalados com anéis vermelhos e brancos (padrão monadal tricolor)",
        "capuz preto na cabeça, do focinho até atrás dos olhos, bordeado por uma faixa branca",
        "sem fosseta loreal",
        "cabeça pequena e pouco distinta do corpo",
      ],
      sintomas:
        "no local da picada os sintomas costumam ser discretos (pouca dor ou inchaço); o risco está nos sintomas neurológicos que podem aparecer depois — pálpebra caída, visão dupla, dificuldade para engolir, fraqueza muscular e, em casos graves, dificuldade para respirar.",
      tempoSintomas:
        "pode começar em menos de 1 hora, mas às vezes demora — a orientação médica é observar por até 24 horas mesmo sem sintomas, sem esperar sentir dor forte para procurar ajuda",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa calma e em repouso",
        "oferecer água potável à vítima, se ela conseguir beber",
        "procurar atendimento médico imediatamente, mesmo sem dor aparente",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não subestimar a picada só porque não dói",
        "não esperar os sintomas aparecerem para buscar ajuda",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antielapídico",
    },
    {
      slug: "armadeira-exemplo",
      nomePopular: "armadeira",
      nomeCientifico: "Phoneutria sp.",
      wikipedia: "Phoneutria nigriventer",
      categoria: "ARANHA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["norte", "centro-oeste", "sudeste", "sul"],
      identificacao: [
        "pernas longas e robustas, envergadura pode passar de 15 cm",
        "cor acastanhada",
        "quando ameaçada, apoia-se nas quatro pernas traseiras e ergue as pernas dianteiras esticadas, em posição de defesa (\"armando-se\")",
        "costuma se abrigar em bananeiras, embaixo de tijolos e madeira empilhada, e dentro de calçados — comum entrar em casas durante o período reprodutivo (abril e maio no sudeste)",
      ],
      sintomas:
        "dor local imediata e muito intensa (uma das picadas mais dolorosas), podendo se espalhar pelo membro; em casos mais graves, sobretudo em crianças, pode causar suor e alteração da pressão.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "compressa morna pode ajudar a aliviar a dor",
        "procurar atendimento médico, especialmente se a dor for muito intensa ou a picada for em criança",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não aplicar gelo diretamente sobre a pele",
        "não ignorar dor intensa que não passa",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antiaracnídico",
    },
    {
      slug: "aranha-marrom-exemplo",
      nomePopular: "aranha-marrom",
      nomeCientifico: "Loxosceles sp.",
      wikipedia: "Loxosceles",
      categoria: "ARANHA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["nordeste", "sudeste", "sul"],
      identificacao: [
        "corpo pequeno, atingindo até 4 cm com as pernas esticadas",
        "cor marrom uniforme, sem listras fortes",
        "desenho característico no dorso do cefalotórax que lembra um violino",
        "seis olhos dispostos em três pares (a maioria das aranhas tem oito)",
        "costuma ficar parada e foge do contato — não é agressiva; acidentes costumam ocorrer ao esmagá-la contra o corpo (na cama ou ao vestir roupas)",
      ],
      sintomas:
        "no início pode doer pouco; nas horas seguintes pode surgir vermelhidão, ferida no local e mal-estar geral.",
      tempoSintomas: "horas após a picada",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "aplicar compressa morna",
        "procurar atendimento médico o quanto antes",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não furar ou espremer a lesão",
        "não aplicar pomadas ou remédios caseiros",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado:
        "soro antiloxoscélico, quando disponível — o soro antiaracnídico trivalente do Butantan (o mesmo usado para a armadeira) também neutraliza veneno de Loxosceles e costuma ser mais disponível na rede.",
    },
    {
      slug: "viuva-negra-exemplo",
      nomePopular: "viúva-negra",
      nomeCientifico: "Latrodectus sp.",
      wikipedia: "Latrodectus",
      categoria: "ARANHA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["norte", "centro-oeste", "nordeste", "sudeste", "sul"],
      identificacao: [
        "corpo pequeno e globoso, cor preta brilhante — fêmeas atingem cerca de 3 cm com as pernas esticadas",
        "muitas vezes com mancha avermelhada em formato de ampulheta na parte de baixo do abdômen",
        "machos bem menores (poucos milímetros), de cor mais clara e inofensivos",
        "teia irregular, pouco organizada",
      ],
      sintomas:
        "dor que pode se espalhar além do local da picada, com cãibras, rigidez muscular, suor e mal-estar geral. acidentes são raros no brasil, mais registrados no nordeste.",
      tempoSintomas: "nas primeiras horas após a picada",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa em repouso",
        "procurar atendimento médico para controle da dor e observação",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não esperar os sintomas piorarem para procurar ajuda",
      ],
      soroIndicado:
        "existe soro específico — soro antilatrodético, produzido no Brasil desde 2001 pelo Instituto Vital Brazil (RJ) — indicado em casos moderados/graves; como os acidentes são raros, o cuidado inicial costuma ser de suporte (analgesia e observação clínica) até a avaliação médica decidir pelo soro.",
    },
    {
      slug: "escorpiao-amarelo-exemplo",
      nomePopular: "escorpião-amarelo",
      nomeCientifico: "Tityus serrulatus",
      wikipedia: "Tityus serrulatus",
      categoria: "ESCORPIAO" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["sudeste", "nordeste", "centro-oeste"],
      identificacao: [
        "de 5 a 7 cm de comprimento",
        "cor amarela, mas com o tronco (dorso) escuro e sem manchas nas pernas e palpos",
        "serrilha (fileira de grânulos) no terceiro e quarto segmentos da cauda",
        "espinho bem visível sob o ferrão",
      ],
      sintomas:
        "dor local intensa e imediata; em casos graves (sobretudo em crianças e idosos) pode causar suor, náusea e alterações no coração.",
      tempoSintomas: "imediato, com possível piora nas primeiras horas",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa calma e em repouso",
        "compressa morna pode ajudar a aliviar a dor",
        "procurar atendimento médico, principalmente se for criança ou idoso",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não aplicar gelo diretamente sobre a pele",
        "não dar bebida alcoólica ou remédios sem orientação médica",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antiescorpiônico",
    },
    {
      slug: "escorpiao-marrom-exemplo",
      nomePopular: "escorpião-marrom",
      nomeCientifico: "Tityus bahiensis",
      wikipedia: "Tityus bahiensis",
      categoria: "ESCORPIAO" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["sudeste", "sul", "centro-oeste"],
      identificacao: [
        "de 5 a 7 cm de comprimento",
        "cor marrom-avermelhada, tronco escuro e sem manchas",
        "pernas e palpos com manchas escuras, mais acentuadas nos palpos",
        "sem serrilha na cauda, diferente do escorpião-amarelo",
        "espinho bem visível sob o ferrão",
      ],
      sintomas:
        "dor local imediata e intensa; sintomas sistêmicos (suor, náusea, alterações no coração) são menos frequentes do que no escorpião-amarelo, mas ainda podem ocorrer.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa calma e em repouso",
        "compressa morna pode ajudar a aliviar a dor",
        "procurar atendimento médico, principalmente se for criança ou idoso",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não aplicar gelo diretamente sobre a pele",
        "não dar bebida alcoólica ou remédios sem orientação médica",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antiescorpiônico",
    },
    {
      slug: "taturana-lonomia-exemplo",
      nomePopular: "taturana",
      nomeCientifico: "Lonomia obliqua",
      wikipedia: "Lonomia obliqua",
      categoria: "TATURANA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["sul", "sudeste"],
      identificacao: [
        "lagarta com cerdas pontiagudas esverdeadas",
        "costuma ficar agrupada em troncos de árvores",
        "se camufla facilmente na casca, difícil de perceber",
      ],
      sintomas:
        "sensação de queimação e vermelhidão no contato; horas depois pode surgir dor de cabeça, náusea e sinais de sangramento (gengivas, urina, pele) por alteração na coagulação do sangue.",
      tempoSintomas:
        "ardor imediato; a alteração na coagulação costuma se instalar entre 1 e 48 horas, e sinais de sangramento costumam aparecer entre 8 e 72 horas após o contato",
      primeirosSocorrosFazer: [
        "lavar o local com água fria ou gelada, sem esfregar (para não fixar mais cerdas na pele)",
        "retirar cerdas visíveis com fita adesiva",
        "procurar atendimento médico mesmo que os sintomas iniciais pareçam leves",
      ],
      primeirosSocorrosNaoFazer: [
        "não esfregar o local do contato",
        "não usar álcool ou produtos caseiros no local",
        "não menosprezar o contato só porque não doeu muito",
      ],
      soroIndicado: "soro antilonômico",
    },
    {
      slug: "jiboia-exemplo",
      nomePopular: "jiboia",
      nomeCientifico: "Boa constrictor",
      wikipedia: "Boa constrictor",
      categoria: "COBRA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["norte", "nordeste", "centro-oeste", "sudeste"],
      identificacao: [
        "corpo grosso e musculoso, sem chocalho na cauda",
        "padrão de manchas em forma de sela ao longo do dorso",
        "mata por constrição — não é peçonhenta",
      ],
      sintomas:
        "não injeta veneno; a mordida de defesa causa só ferimento mecânico — dor local e possíveis marcas de dentes, sem os sintomas de envenenamento das serpentes peçonhentas.",
      tempoSintomas: "imediato, limitado ao ferimento da mordida",
      primeirosSocorrosFazer: [
        "lavar o ferimento com água e sabão",
        "fazer pressão local se houver sangramento",
        "procurar avaliação médica para cuidados com o ferimento e risco de infecção",
      ],
      primeirosSocorrosNaoFazer: [
        "não é preciso soro — evite tratar como acidente peçonhento",
        "não manuseie o animal tentando se vingar ou matá-lo",
      ],
      soroIndicado: "não se aplica — a jiboia não é peçonhenta; o cuidado é só com o ferimento da mordida.",
    },
    {
      slug: "caninana-exemplo",
      nomePopular: "caninana",
      nomeCientifico: "Spilotes pullatus",
      wikipedia: "Spilotes pullatus",
      categoria: "COBRA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["norte", "nordeste", "centro-oeste", "sudeste", "sul"],
      identificacao: [
        "corpo longo e ágil, em padrão xadrez preto e amarelo",
        "muito rápida e agressiva quando encurralada, mas não é peçonhenta",
        "costuma subir em árvores e telhados atrás de ninhos e roedores",
      ],
      sintomas:
        "mordida sem veneno relevante para humanos — pode causar dor local, pequenos sangramentos e, em algumas pessoas, reação alérgica leve à saliva.",
      tempoSintomas: "imediato, limitado ao local da mordida",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "observar sinais de infecção nos dias seguintes",
        "procurar atendimento se o sangramento não parar ou a reação piorar",
      ],
      primeirosSocorrosNaoFazer: [
        "não é preciso soro",
        "não tente capturar ou matar o animal — costuma fugir se não for perseguido",
      ],
      soroIndicado: "não se aplica — a caninana não é peçonhenta.",
    },
    {
      slug: "falsa-coral-exemplo",
      nomePopular: "falsa-coral",
      nomeCientifico: "Erythrolamprus aesculapii",
      wikipedia: "Erythrolamprus aesculapii",
      categoria: "COBRA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["sudeste", "sul", "nordeste", "centro-oeste"],
      identificacao: [
        "anéis coloridos parecidos com os da coral-verdadeira, mas geralmente incompletos na barriga",
        "cabeça bem mais destacada do corpo do que a da coral-verdadeira",
        "difícil de diferenciar da coral-verdadeira só pela cor — na dúvida, trate como se fosse peçonhenta",
      ],
      sintomas:
        "tem baixa importância médica — a mordida costuma causar só um arranhão superficial, sem os sintomas neurológicos da coral-verdadeira.",
      tempoSintomas: "imediato, sem evolução",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "se não tiver certeza da identificação, procurar atendimento médico como precaução",
        "fotografar o animal a distância pode ajudar profissionais a confirmar a espécie depois",
      ],
      primeirosSocorrosNaoFazer: [
        "não tente diferenciar da coral-verdadeira pegando no animal",
        "não ignore o acidente só por parecer uma falsa-coral — a identificação visual é difícil mesmo para especialistas",
      ],
      soroIndicado:
        "não se aplica quando confirmada a espécie — mas por ser facilmente confundida com a coral-verdadeira (peçonhenta), a orientação é sempre buscar avaliação médica.",
    },
    {
      slug: "jararacucu-exemplo",
      nomePopular: "jararacuçu",
      nomeCientifico: "Bothrops jararacussu",
      wikipedia: "Bothrops jararacussu",
      categoria: "COBRA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["nordeste", "sudeste", "sul"],
      identificacao: [
        "uma das maiores jararacas do brasil, corpo robusto que pode ultrapassar 180 cm",
        "cabeça triangular grande e preta no dorso, com fosseta loreal",
        "padrão de \"v\" invertido preto ao longo do dorso, com eventuais ocelos na linha vertebral",
        "faixa negra evidente atrás do olho (pós-ocular)",
      ],
      sintomas:
        "dor e inchaço intensos e de evolução rápida no local, podendo formar bolhas e necrose (morte do tecido) se não tratado a tempo; sangramentos também podem ocorrer.",
      tempoSintomas: "minutos após a picada, com piora rápida do inchaço",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter o membro atingido elevado e em repouso",
        "oferecer água potável à vítima, se ela conseguir beber",
        "procurar atendimento médico com urgência — o soro é mais eficaz quanto antes for aplicado",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não cortar o local da picada",
        "não perder tempo com remédios caseiros",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado:
        "soro antibotrópico — acidentes por jararacuçu costumam ser classificados como graves (serpente maior, mais veneno inoculado), o que já leva ao patamar mais alto de ampolas na tabela por gravidade",
    },
    {
      slug: "caranguejeira-exemplo",
      nomePopular: "caranguejeira",
      nomeCientifico: "Lasiodora parahybana",
      wikipedia: "Lasiodora parahybana",
      categoria: "ARANHA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["nordeste", "norte", "sudeste"],
      identificacao: [
        "grande e peluda, pode passar de 20 cm de envergadura",
        "quelíceras projetadas para a frente, bem visíveis quando a aranha é vista de cima — diferencia das demais aranhas",
        "aparência assustadora, mas costuma ser dócil e evita o confronto",
        "defesa típica (veja a foto): quando ameaçada, raspa com as pernas traseiras e lança no ar as cerdas urticantes do dorso do abdômen; elas penetram na pele causando coceira e podem irritar os olhos",
      ],
      sintomas:
        "a picada (rara) causa dor local leve, comparável a uma picada de abelha; o maior incômodo costuma vir dos pelos urticantes lançados em defesa, que causam coceira e irritação na pele e nos olhos.",
      tempoSintomas: "imediato, geralmente leve e passageiro",
      primeirosSocorrosFazer: [
        "lavar bem o local com água e sabão para remover pelos urticantes",
        "evitar coçar a área atingida",
        "procurar atendimento se a irritação atingir os olhos ou não melhorar",
      ],
      primeirosSocorrosNaoFazer: [
        "não encoste os pelos soltos do animal em outras partes do corpo, principalmente os olhos",
        "não é preciso soro",
      ],
      soroIndicado: "não se aplica — não é considerada de importância médica no brasil.",
    },
    {
      slug: "aranha-de-jardim-exemplo",
      nomePopular: "aranha-de-jardim",
      nomeCientifico: "Argiope argentata",
      wikipedia: "Argiope argentata",
      categoria: "ARANHA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["sudeste", "sul", "centro-oeste", "nordeste"],
      identificacao: [
        "abdômen prateado com listras amarelas e pretas, bem chamativa",
        "constrói teias grandes e organizadas, geralmente em jardins e arbustos",
        "fica parada e visível no centro da teia — não se esconde",
      ],
      sintomas:
        "picada muito rara e considerada sem importância médica — no máximo dor local leve, como uma picada de inseto comum.",
      tempoSintomas: "imediato, leve e passageiro",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão, se houver picada",
        "aplicar compressa morna se doer",
      ],
      primeirosSocorrosNaoFazer: [
        "não é preciso soro",
        "não destrua a teia por medo — essa aranha é benéfica, controla insetos no jardim",
      ],
      soroIndicado: "não se aplica — sem importância médica.",
    },
    {
      slug: "viuva-marrom-exemplo",
      nomePopular: "viúva-marrom",
      nomeCientifico: "Latrodectus geometricus",
      wikipedia: "Latrodectus geometricus",
      categoria: "ARANHA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["norte", "nordeste", "centro-oeste", "sudeste", "sul"],
      identificacao: [
        "corpo pequeno, cor marrom a bege com manchas geométricas mais escuras no abdômen",
        "menos escura que a viúva-negra, mas do mesmo gênero",
        "distribuída por todo o brasil, inclusive dentro de casas — o ambiente urbano favorece grandes populações",
        "costuma armar teia irregular perto de muros, garagens e jardins",
      ],
      sintomas:
        "dor local que pode se espalhar, além de cãibras e rigidez muscular leve; em geral os sintomas são mais brandos que os da viúva-negra.",
      tempoSintomas: "nas primeiras horas após a picada",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa em repouso",
        "procurar atendimento médico para controle da dor, principalmente se os sintomas persistirem",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não subestimar os sintomas achando que é \"só uma aranha pequena\"",
      ],
      soroIndicado:
        "o soro antiaracnídico do Butantan não é indicado para esse gênero (Latrodectus), só para Loxosceles, Phoneutria e Tityus; existe um soro específico para o gênero — soro antilatrodético, produzido no Brasil pelo Instituto Vital Brazil (RJ) — descrito oficialmente para a viúva-negra, cabendo à avaliação médica decidir seu uso também na picada de viúva-marrom; tratamento inicial geralmente de suporte (analgesia e observação clínica).",
    },
    {
      slug: "aranha-lobo-exemplo",
      nomePopular: "aranha-lobo",
      nomeCientifico: "Lycosa erythrognatha",
      wikipedia: "Lycosa erythrognatha",
      categoria: "ARANHA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["sul", "sudeste", "centro-oeste"],
      identificacao: [
        "corpo robusto e peludo, cor acastanhada, não vive em teias",
        "caça andando pelo chão, principalmente à noite",
        "olhos grandes e brilhantes quando iluminados por lanterna à noite",
      ],
      sintomas:
        "picada causa dor e inchaço local leve a moderado, às vezes com vermelhidão — costuma ser confundida com picada de armadeira, mas os sintomas são bem mais brandos.",
      tempoSintomas: "imediato, melhora em poucas horas a 1-2 dias",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "aplicar compressa morna para aliviar a dor",
        "procurar atendimento se a dor for muito intensa ou não melhorar",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não aplicar produtos caseiros no local",
      ],
      soroIndicado: "raramente necessário — tratamento geralmente de suporte para a dor.",
    },
    {
      slug: "escorpiao-do-nordeste-exemplo",
      nomePopular: "escorpião-amarelo-do-nordeste",
      nomeCientifico: "Tityus stigmurus",
      wikipedia: "Tityus stigmurus",
      categoria: "ESCORPIAO" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["nordeste"],
      identificacao: [
        "de 5 a 7 cm de comprimento",
        "cor amarela, inclusive o tronco, com um triângulo escuro na face dorsal do cefalotórax",
        "faixa escura central e duas faixas laterais discretas no dorso do tronco",
        "discreta serrilha no terceiro e quarto segmentos da cauda",
        "muito comum em áreas urbanas do nordeste, inclusive dentro de casas",
        "se prolifera com facilidade em entulho e esgoto",
      ],
      sintomas:
        "dor local intensa e imediata; em crianças e idosos pode evoluir com suor, vômitos e alterações no coração.",
      tempoSintomas: "imediato, com possível piora nas primeiras horas",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa calma e em repouso",
        "compressa morna pode ajudar a aliviar a dor",
        "procurar atendimento médico, principalmente se for criança ou idoso",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não aplicar gelo diretamente sobre a pele",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antiescorpiônico",
    },
    {
      slug: "escorpiao-preto-amazonia-exemplo",
      nomePopular: "escorpião-preto-da-amazônia",
      nomeCientifico: "Tityus obscurus",
      wikipedia: "Tityus obscurus",
      categoria: "ESCORPIAO" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["norte", "centro-oeste"],
      identificacao: [
        "de 8 a 10 cm de comprimento — um dos maiores escorpiões de importância médica no brasil",
        "cor castanho-avermelhada bem escura, quase preta",
        "o macho tem cauda e palpos mais finos e longos que a fêmea",
        "considerado o escorpião mais perigoso da região amazônica",
        "ativo à noite, costuma se esconder sob troncos e folhas",
      ],
      sintomas:
        "dor local intensa; casos graves podem evoluir com alterações neurológicas, como falta de coordenação e visão turva, além dos sintomas gerais (suor, vômitos, alterações no coração).",
      tempoSintomas: "imediato, com possível piora nas primeiras horas",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa calma e em repouso",
        "compressa morna pode ajudar a aliviar a dor",
        "procurar atendimento médico com urgência, principalmente se for criança",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não subestimar o acidente por ser uma região com menos informação disponível sobre a espécie",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antiescorpiônico",
    },
    {
      slug: "escorpiao-preto-exemplo",
      nomePopular: "escorpião-preto",
      nomeCientifico: "Bothriurus bonariensis",
      wikipedia: "Bothriurus bonariensis",
      categoria: "ESCORPIAO" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["sul", "sudeste"],
      identificacao: [
        "de 2,5 a 6 cm de comprimento, corpo mais robusto e pinças grossas",
        "cor variável do amarelo ao preto, sendo o marrom-avermelhado a mais comum",
        "sem espinho sob o ferrão — diferente dos escorpiões do gênero Tityus",
        "não vive em grandes grupos como o escorpião-amarelo",
        "encontrado sob pedras, troncos e em jardins",
      ],
      sintomas:
        "picada causa dor local, semelhante a uma picada de abelha — não é considerado de importância médica no brasil.",
      tempoSintomas: "imediato, melhora em poucas horas",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "aplicar compressa morna ou fria para aliviar a dor",
      ],
      primeirosSocorrosNaoFazer: [
        "não é preciso soro",
        "não é preciso torniquete nem qualquer medida drástica",
      ],
      soroIndicado: "não se aplica — sem importância médica.",
    },
    {
      slug: "escorpiao-amarelo-amazonia-exemplo",
      nomePopular: "escorpião-vermelho-da-amazônia",
      nomeCientifico: "Tityus metuendus",
      wikipedia: "Tityus metuendus",
      categoria: "ESCORPIAO" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["norte"],
      identificacao: [
        "de 7 a 9 cm de comprimento",
        "cor vermelho-escura, quase negra, com manchas discretas no tronco e nas pernas",
        "quarto e quinto segmentos da cauda mais espessos que os demais",
        "espinho bem visível sob o ferrão",
        "comum em áreas de mata e também perto de moradias na região amazônica",
      ],
      sintomas:
        "dor local intensa e imediata; sintomas gerais (suor, náusea) são possíveis, mas menos frequentes do que no escorpião-preto-da-amazônia.",
      tempoSintomas: "imediato, com possível piora nas primeiras horas",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "manter a pessoa calma e em repouso",
        "compressa morna pode ajudar a aliviar a dor",
        "procurar atendimento médico, principalmente se for criança ou idoso",
      ],
      primeirosSocorrosNaoFazer: [
        "não fazer torniquete",
        "não aplicar gelo diretamente sobre a pele",
        "não fazer curativo ou atadura apertada no local",
      ],
      soroIndicado: "soro antiescorpiônico",
    },
    {
      slug: "escorpiao-ananteris-exemplo",
      nomePopular: "escorpião-de-jardim",
      nomeCientifico: "Ananteris balzani",
      wikipedia: "Ananteris balzani",
      categoria: "ESCORPIAO" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["centro-oeste", "sudeste", "norte"],
      identificacao: [
        "de 2 a 4 cm de comprimento, cor variando do amarelo ao marrom-avermelhado, com manchas escuras no tronco",
        "espinho presente sob o ferrão",
        "pouco agressivo e picada rara em humanos",
        "encontrado em serrapilheira (folhas caídas) e jardins",
      ],
      sintomas:
        "picada causa dor local leve, sem sintomas gerais relevantes — não é considerado de importância médica.",
      tempoSintomas: "imediato, leve e passageiro",
      primeirosSocorrosFazer: [
        "lavar o local com água e sabão",
        "aplicar compressa morna se doer",
      ],
      primeirosSocorrosNaoFazer: ["não é preciso soro"],
      soroIndicado: "não se aplica — sem importância médica.",
    },
    {
      slug: "lonomia-achelous-exemplo",
      nomePopular: "taturana-da-amazônia",
      nomeCientifico: "Lonomia achelous",
      wikipedia: "Lonomia achelous",
      categoria: "TATURANA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["norte", "sudeste"],
      identificacao: [
        "lagarta com cerdas esverdeadas, muito parecida com a Lonomia obliqua",
        "também costuma ficar agrupada em troncos de árvores",
        "difícil de perceber pela camuflagem na casca",
      ],
      sintomas:
        "assim como a lonomia obliqua, o contato pode causar alteração grave na coagulação do sangue, com sangramentos horas depois (gengivas, urina, pele).",
      tempoSintomas:
        "ardor imediato; a alteração na coagulação costuma se instalar entre 1 e 48 horas, e sinais de sangramento costumam aparecer entre 8 e 72 horas após o contato",
      primeirosSocorrosFazer: [
        "lavar o local com água fria ou gelada, sem esfregar",
        "retirar cerdas visíveis com fita adesiva",
        "procurar atendimento médico mesmo que os sintomas iniciais pareçam leves",
      ],
      primeirosSocorrosNaoFazer: [
        "não esfregar o local do contato",
        "não menosprezar o contato só porque não doeu muito",
      ],
      soroIndicado:
        "soro antilonômico (o mesmo usado para a Lonomia obliqua) — a bula do Butantan documenta eficácia comprovada só contra L. obliqua, sem mencionar L. achelous; procure atendimento médico com urgência de qualquer forma.",
    },
    {
      slug: "taturana-de-fogo-exemplo",
      nomePopular: "taturana-de-fogo",
      nomeCientifico: "Megalopyge sp.",
      wikipedia: "Megalopyge opercularis",
      categoria: "TATURANA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["sudeste", "sul", "nordeste"],
      identificacao: [
        "coberta por pelos longos e macios, parece um pequeno chumaço de algodão ou pelúcia",
        "cor que varia de amarelo a marrom-avermelhado",
        "aparência inofensiva, mas esconde cerdas urticantes sob os pelos macios",
      ],
      sintomas:
        "dor em queimação intensa e imediata ao toque, com vermelhidão e inchaço no local — pode ser mais dolorida do que parece pela aparência fofa da lagarta.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "retirar cerdas visíveis com fita adesiva",
        "lavar o local com água fria ou gelada, sem esfregar",
        "aplicar compressa fria para aliviar a dor",
      ],
      primeirosSocorrosNaoFazer: [
        "não esfregar o local do contato",
        "não tocar na lagarta mesmo que pareça macia e fofa",
      ],
      soroIndicado:
        "não há soro específico — tratamento de suporte para a dor; procure atendimento se os sintomas forem muito intensos.",
    },
    {
      slug: "taturana-coruja-exemplo",
      nomePopular: "taturana-coruja",
      nomeCientifico: "Automeris sp.",
      wikipedia: "Automeris io",
      categoria: "TATURANA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["sudeste", "sul", "centro-oeste"],
      identificacao: [
        "corpo verde com tufos de espinhos ramificados nas laterais",
        "dá origem a uma mariposa adulta com desenhos de \"olhos\" grandes nas asas (daí o nome)",
        "vive em grupos nas folhas de várias árvores frutíferas e ornamentais",
      ],
      sintomas:
        "contato com os espinhos causa dor em queimação, vermelhidão e coceira no local, geralmente sem sintomas gerais.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "retirar cerdas visíveis com fita adesiva",
        "lavar o local com água fria ou gelada, sem esfregar",
        "aplicar compressa fria para aliviar a dor",
      ],
      primeirosSocorrosNaoFazer: ["não esfregar o local do contato"],
      soroIndicado: "não há soro específico — tratamento de suporte para a dor.",
    },
    {
      slug: "taturana-da-seringueira-exemplo",
      nomePopular: "taturana-da-seringueira",
      nomeCientifico: "Premolis semirufa",
      wikipedia: "Premolis semirufa",
      categoria: "TATURANA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["norte"],
      identificacao: [
        "encontrada principalmente em seringais (plantações de árvores de borracha) na região amazônica",
        "cerdas finas que se soltam facilmente e penetram na pele",
        "contato repetido ao longo do tempo é mais preocupante do que um contato isolado",
      ],
      sintomas:
        "contatos repetidos podem causar uma doença ocupacional chamada pararamose — inflamação crônica e progressiva nas articulações que pode evoluir para deformações nas mãos e dedos.",
      tempoSintomas: "efeito cumulativo — sintomas articulares podem aparecer após contatos repetidos ao longo de meses",
      primeirosSocorrosFazer: [
        "retirar cerdas visíveis com fita adesiva após cada contato",
        "lavar o local com água fria ou gelada, sem esfregar",
        "procurar atendimento médico se notar dor ou inchaço persistente nas articulações",
      ],
      primeirosSocorrosNaoFazer: [
        "não esfregar o local do contato",
        "não ignorar contatos repetidos achando que não fazem diferença",
      ],
      soroIndicado:
        "não há soro específico — o cuidado principal é evitar contatos repetidos e buscar avaliação médica em caso de sintomas articulares.",
    },
    {
      slug: "taturana-hylesia-exemplo",
      nomePopular: "taturana-arrepiada",
      nomeCientifico: "Hylesia sp.",
      wikipedia: "Hylesia metabus",
      categoria: "TATURANA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["norte", "sudeste", "sul"],
      identificacao: [
        "corpo coberto por pelos finos e escuros dispostos em tufos",
        "a mariposa adulta também solta pelos urticantes do abdômen, mesmo sem ser tocada",
        "costuma aparecer em grande quantidade perto de luzes à noite",
      ],
      sintomas:
        "contato com os pelos causa coceira intensa e erupção na pele, podendo durar dias; contato com os olhos pode causar irritação importante.",
      tempoSintomas:
        "minutos a horas após o contato; a coceira e a erupção costumam durar de 7 a 14 dias",
      primeirosSocorrosFazer: [
        "retirar pelos visíveis com fita adesiva",
        "lavar bem o local com água fria ou gelada e sabão",
        "procurar atendimento se a coceira for muito intensa ou atingir os olhos",
      ],
      primeirosSocorrosNaoFazer: [
        "não coçar a área atingida",
        "não sacudir roupas ou toalhas que tiveram contato com o inseto perto do rosto",
      ],
      soroIndicado: "não há soro específico — tratamento de suporte para a irritação na pele.",
    },
    {
      slug: "taturana-dirphia-exemplo",
      nomePopular: "taturana-de-espinho",
      nomeCientifico: "Dirphia sp.",
      wikipedia: "Dirphia",
      categoria: "TATURANA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["sudeste", "sul", "centro-oeste"],
      identificacao: [
        "corpo escuro com fileiras de espinhos ramificados bem visíveis",
        "costuma viver agrupada em troncos e galhos",
        "espinhos rígidos e resistentes, diferente dos pelos macios da taturana-de-fogo",
      ],
      sintomas:
        "contato com os espinhos causa dor em queimação imediata, vermelhidão e inchaço local, geralmente sem sintomas gerais.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "retirar espinhos visíveis com fita adesiva",
        "lavar o local com água fria ou gelada, sem esfregar",
        "aplicar compressa fria para aliviar a dor",
      ],
      primeirosSocorrosNaoFazer: ["não esfregar o local do contato"],
      soroIndicado: "não há soro específico — tratamento de suporte para a dor.",
    },
    {
      slug: "caravela-exemplo",
      nomePopular: "caravela",
      nomeCientifico: "Physalia physalis",
      wikipedia: "Physalia physalis",
      categoria: "AGUA_VIVA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["norte", "nordeste", "sudeste", "sul"],
      identificacao: [
        "flutuador azulado ou arroxeado em forma de bexiga na superfície da água",
        "longos tentáculos que podem passar de 10 metros, mesmo com o flutuador pequeno",
        "pode picar mesmo depois de encalhada morta na areia — não tocar",
        "provoca acidentes que podem ser graves, principalmente nas regiões norte e nordeste do brasil",
      ],
      sintomas:
        "dor em queimação forte e imediata, com marcas avermelhadas em linha na pele; em casos mais intensos pode causar mal-estar geral e reação alérgica.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "sair da água; use compressas geladas de água do mar (ou gelo em saco fechado, envolto em pano) para aliviar a dor",
        "remover os tentáculos com uma pinça, cartão ou lâmina — nunca com a mão desprotegida",
        "aplicar vinagre sobre os tentáculos aderidos à pele para ajudar a desativá-los",
        "procurar atendimento médico se a dor for muito intensa ou surgirem sinais de reação alérgica",
      ],
      primeirosSocorrosNaoFazer: [
        "não use água doce, urina ou gelo em contato direto com a pele no local",
        "não esfregue a área atingida",
        "não faça curativo no local",
      ],
      soroIndicado: "não há soro específico — tratamento de suporte para a dor e observação de reações alérgicas.",
    },
    {
      slug: "agua-viva-chrysaora-exemplo",
      nomePopular: "água-viva",
      nomeCientifico: "Chrysaora lactea",
      wikipedia: "Chrysaora lactea",
      categoria: "AGUA_VIVA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["sudeste", "sul"],
      identificacao: [
        "guarda-chuva (sino) translúcido com listras ou pontos escuros",
        "tentáculos longos e finos, mais numerosos que os braços orais",
        "provoca surtos de picadas na região sul, principalmente durante o veraneio",
      ],
      sintomas:
        "queimação e vermelhidão no local do contato com os tentáculos, podendo formar pequenas marcas na pele.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "lavar o local com água do mar",
        "remover tentáculos com pinça ou cartão",
        "aplicar vinagre no local para ajudar a neutralizar a queimação",
      ],
      primeirosSocorrosNaoFazer: [
        "não usar água doce",
        "não esfregar o local com areia ou toalha",
      ],
      soroIndicado: "não há soro específico — tratamento de suporte para a dor local.",
    },
    {
      slug: "agua-viva-olindias-exemplo",
      nomePopular: "água-viva-do-mar",
      nomeCientifico: "Olindias sambaquiensis",
      wikipedia: "Olindias sambaquiensis",
      categoria: "AGUA_VIVA" as const,
      nivelUrgencia: "MEDIA" as const,
      regioes: ["sul"],
      identificacao: [
        "corpo pequeno e quase transparente, difícil de ver na água",
        "tentáculos finos com pontas avermelhadas",
        "picadas costumam aumentar em certas épocas do ano no litoral sul",
      ],
      sintomas:
        "dor intensa e imediata, desproporcional ao tamanho pequeno do animal, com vermelhidão marcante no local.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "lavar o local com água do mar",
        "remover tentáculos com pinça ou cartão",
        "aplicar vinagre no local",
      ],
      primeirosSocorrosNaoFazer: [
        "não usar água doce",
        "não subestimar a dor achando que um animal pequeno não pode doer tanto",
      ],
      soroIndicado: "não há soro específico — tratamento de suporte para a dor local.",
    },
    {
      slug: "agua-viva-vespa-do-mar-exemplo",
      nomePopular: "vespa-do-mar",
      nomeCientifico: "Chiropsalmus quadrumanus",
      wikipedia: "Chiropsalmus quadrumanus",
      categoria: "AGUA_VIVA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["nordeste", "norte", "sudeste"],
      identificacao: [
        "corpo em formato de cubo (água-viva-caixa), quase transparente",
        "quatro grupos de tentáculos, um em cada canto do corpo",
        "considerada uma das águas-vivas mais perigosas do litoral brasileiro",
      ],
      sintomas:
        "dor muito intensa e imediata, com marcas avermelhadas em relevo na pele; casos graves podem apresentar reação alérgica importante.",
      tempoSintomas: "imediato",
      primeirosSocorrosFazer: [
        "sair da água e lavar o local com água do mar",
        "remover tentáculos com pinça ou cartão",
        "aplicar vinagre sobre a área atingida",
        "procurar atendimento médico com urgência, principalmente se a dor for muito intensa",
      ],
      primeirosSocorrosNaoFazer: [
        "não usar água doce",
        "não demorar para buscar atendimento por ser uma espécie de maior risco",
      ],
      soroIndicado: "não há soro amplamente disponível no brasil — tratamento de suporte e observação médica próxima.",
    },
    {
      slug: "agua-viva-prato-exemplo",
      nomePopular: "água-viva-prato",
      nomeCientifico: "Lychnorhiza lucerna",
      wikipedia: "Lychnorhiza lucerna",
      categoria: "AGUA_VIVA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["sudeste", "sul"],
      identificacao: [
        "guarda-chuva grande e esbranquiçado, em formato de prato",
        "braços orais curtos, sem tentáculos longos como outras espécies",
        "costuma aparecer em grande quantidade após certas correntes marítimas",
      ],
      sintomas:
        "contato costuma causar irritação leve na pele — é uma das águas-vivas menos urticantes do litoral brasileiro.",
      tempoSintomas: "imediato, leve e passageiro",
      primeirosSocorrosFazer: [
        "lavar o local com água do mar",
        "aplicar vinagre se houver irritação",
      ],
      primeirosSocorrosNaoFazer: ["não usar água doce"],
      soroIndicado: "não se aplica — baixa urticância, sem importância médica relevante.",
    },
    {
      slug: "agua-viva-tamoya-exemplo",
      nomePopular: "água-viva-cubo",
      nomeCientifico: "Tamoya haplonema",
      wikipedia: "Tamoya haplonema",
      categoria: "AGUA_VIVA" as const,
      nivelUrgencia: "ALTA" as const,
      regioes: ["sudeste", "sul", "nordeste"],
      identificacao: [
        "guarda-chuva em formato de cubo, transparente com tons rosados ou avermelhados",
        "quatro tentáculos longos, um em cada canto do corpo",
        "junto com a vespa-do-mar, é uma das duas espécies de água-viva-cubo responsáveis pelos acidentes mais graves no litoral brasileiro",
      ],
      sintomas:
        "dor local muito intensa e imediata, com marcas avermelhadas em forma de chicotada; casos mais graves podem ter sintomas gerais e reação alérgica.",
      tempoSintomas: "imediato, com possível piora nos minutos seguintes",
      primeirosSocorrosFazer: [
        "sair da água e lavar o local com água do mar (nunca água doce)",
        "remover os tentáculos com uma pinça, cartão ou palito — nunca com a mão desprotegida",
        "aplicar vinagre sobre a área atingida",
        "procurar atendimento médico imediatamente, principalmente se a dor for muito intensa",
      ],
      primeirosSocorrosNaoFazer: [
        "não usar água doce, álcool, gelo ou urina no local",
        "não esfregar a área atingida",
        "não remover os tentáculos com a mão desprotegida",
      ],
      soroIndicado: "não há soro específico — tratamento de suporte para a dor e observação médica próxima.",
    },
    {
      slug: "anemona-do-mar-exemplo",
      nomePopular: "anêmona-do-mar",
      nomeCientifico: "Bunodosoma caissarum",
      wikipedia: "Bunodosoma caissarum",
      categoria: "AGUA_VIVA" as const,
      nivelUrgencia: "BAIXA" as const,
      regioes: ["sudeste", "sul", "nordeste"],
      identificacao: [
        "corpo cilíndrico fixo em rochas, parecendo uma flor ou uma bolota quando fechada",
        "coroa de tentáculos curtos ao redor da boca central",
        "muito comum em costões rochosos na maré baixa — não é uma água-viva, mas outro tipo de cnidário urticante",
      ],
      sintomas: "contato causa irritação e ardência local leve a moderada, geralmente sem sintomas gerais.",
      tempoSintomas: "imediato, leve e passageiro",
      primeirosSocorrosFazer: [
        "lavar o local com água do mar",
        "aplicar vinagre se houver irritação",
      ],
      primeirosSocorrosNaoFazer: ["não usar água doce", "não tocar o animal com a mão desprotegida"],
      soroIndicado: "não se aplica — baixa urticância, sem importância médica relevante.",
    },
  ];

  for (const animalDef of animais) {
    const { wikipedia, ...dados } = animalDef;
    void wikipedia;
    const imagens = IMAGENS_GUIA[dados.slug] ?? [];

    const animal = await prisma.animal.upsert({
      where: { slug: dados.slug },
      update: {
        ...dados,
        imagens,
      },
      create: {
        ...dados,
        imagens,
        status: StatusConteudo.PUBLICADO,
        fonteConsultor: AVISO_EXEMPLO,
        revisadoPor: "seed de desenvolvimento",
        revisadoEm: new Date(),
        publicadoEm: new Date(),
        criadoPorId: userId,
        atualizadoPorId: userId,
        historico: {
          create: {
            tipoEntidade: "ANIMAL",
            statusNovo: StatusConteudo.PUBLICADO,
            observacao:
              "Ficha de exemplo criada pelo seed de desenvolvimento, já publicada para fins de teste (fluxo normal de revisão não se aplica aqui).",
            alteradoPorId: userId,
          },
        },
      },
    });
    console.log(
      `Animal de exemplo pronto: ${animal.nomePopular} (${animal.slug})${
        animal.imagens.length > 0
          ? ` — ${animal.imagens.length} imagem(ns)`
          : " — sem imagem (busca na Wikipédia falhou e sem foto local)"
      }`
    );
  }
}

async function seedPrevencao(userId: string) {
  const dicas = [
    {
      ambiente: "CASA" as const,
      icone: "casa",
      dicas: [
        "sacuda sapatos, roupas e roupas de cama antes de usar — escorpiões e aranhas se escondem neles",
        "não mate os predadores naturais: gambás (saruês), corujas, lagartixas, sapos e galinhas ajudam a controlar escorpiões e aranhas",
        "afaste camas e berços uns 10 cm da parede e não deixe roupa de cama encostando no chão",
        "use telas nos ralos do banheiro, da pia e do tanque",
        "mantenha o lixo fechado — ele atrai baratas, principal alimento dos escorpiões",
        "vede frestas embaixo de portas e ao redor de ralos",
        "evite acumular entulho, lenha ou lixo encostado na parede",
        "use luvas ao mexer em pilhas de material, caixas ou jardim",
      ],
    },
    {
      ambiente: "MATA_TRILHA" as const,
      icone: "montanha",
      dicas: [
        "use botas fechadas e calças compridas",
        "evite colocar as mãos em buracos, troncos ou frestas sem olhar antes",
        "prefira trilhas conhecidas e caminhar à luz do dia",
        "não coloque as mãos ou os pés em buracos, cupinzeiros, montes de pedra ou troncos podres",
        "mantenha limpa uma faixa de 1 a 2 metros junto a muros, cercas e beiras de terreno",
      ],
    },
    {
      ambiente: "RIOS_LAGOS" as const,
      icone: "gota",
      dicas: [
        "evite nadar em áreas com relatos recentes de acidentes",
        "não toque em animais aquáticos desconhecidos, mesmo parados",
        "pergunte a moradores ou guias locais sobre riscos conhecidos da região",
        "use calçado fechado ao entrar na água e ao caminhar na margem",
      ],
    },
    {
      ambiente: "PRAIA" as const,
      icone: "sol",
      dicas: [
        "arraste os pés na areia rasa ao entrar no mar, em vez de pisar direto",
        "não toque em águas-vivas ou animais encalhados na areia, mesmo parecendo mortos",
        "observe bandeiras e avisos da guarda-vidas sobre presença de águas-vivas",
        "não esfregue areia nem água doce sobre a queimadura de água-viva — piora a dor",
      ],
    },
  ];

  for (const dados of dicas) {
    const existente = await prisma.dicaPrevencao.findFirst({
      where: { ambiente: dados.ambiente },
    });

    if (existente) {
      const dica = await prisma.dicaPrevencao.update({
        where: { id: existente.id },
        data: {
          dicas: dados.dicas,
          icone: dados.icone,
        },
      });
      console.log(`Dica de prevenção atualizada: ${dica.ambiente.toLowerCase()}`);
      continue;
    }

    const dica = await prisma.dicaPrevencao.create({
      data: {
        ...dados,
        status: StatusConteudo.PUBLICADO,
        fonteConsultor: AVISO_EXEMPLO,
        revisadoPor: "seed de desenvolvimento",
        revisadoEm: new Date(),
        publicadoEm: new Date(),
        criadoPorId: userId,
        atualizadoPorId: userId,
        historico: {
          create: {
            tipoEntidade: "PREVENCAO",
            statusNovo: StatusConteudo.PUBLICADO,
            observacao:
              "Dica de exemplo criada pelo seed de desenvolvimento, já publicada para fins de teste (fluxo normal de revisão não se aplica aqui).",
            alteradoPorId: userId,
          },
        },
      },
    });
    console.log(`Dica de prevenção pronta: ${dica.ambiente.toLowerCase()}`);
  }
}

async function main() {
  const admin = await seedAdmin();
  await seedAnimais(admin.id);
  await seedPrevencao(admin.id);
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });