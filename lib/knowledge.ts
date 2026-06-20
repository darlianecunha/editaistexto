// Base de conhecimento embutida: sintese dos artigos de referencia da pasta.
// Usada para fundamentar a avaliacao com a literatura de sustentabilidade
// portuaria, descarbonizacao maritima e ODS.

export interface Referencia {
  titulo: string;
  fonte: string;
  ano: number;
  contribuicao: string;
}

export const baseConhecimento: Referencia[] = [
  {
    titulo: "Green Marine: An environmental program to establish sustainability in marine transportation",
    fonte: "Marine Pollution Bulletin",
    ano: 2016,
    contribuicao:
      "Framework de certificacao ambiental voluntaria com autoavaliacao anual em escala 1-5, verificacao independente e transparencia publica de indicadores de desempenho ambiental (ex.: emissoes atmosfericas).",
  },
  {
    titulo: "Securing a port's future through Circular Economy: Port of Gavle",
    fonte: "Marine Pollution Bulletin",
    ano: 2018,
    contribuicao:
      "Economia circular aplicada a portos (dragagem, reuso de sedimentos na construcao de cais) para conciliar viabilidade economica e pressao ambiental.",
  },
  {
    titulo: "Diverging pathways to port sustainability: how social processes shape transition work",
    fonte: "Technological Forecasting & Social Change",
    ano: 2021,
    contribuicao:
      "Portos seguem trajetorias distintas de transicao a sustentabilidade moldadas por processos sociais (expectativas, aprendizado, redes); nao ha caminho unico.",
  },
  {
    titulo: "Insights on the environmental management system of the European port sector",
    fonte: "Science of the Total Environment",
    ano: 2022,
    contribuicao:
      "Tendencias de gestao ambiental nos portos europeus (ESPO): mudanca climatica subiu a 2a prioridade; residuos, eficiencia energetica e consumo de agua sao os temas mais monitorados; crescimento de servicos verdes (LNG, OPS, tarifas diferenciadas).",
  },
  {
    titulo: "Circular economy, degrowth and green growth as pathways for SDG research",
    fonte: "Ecological Economics",
    ano: 2021,
    contribuicao:
      "Analise bibliometrica global ligando economia circular, decrescimento e crescimento verde aos ODS; agenda futura de pesquisa em desenvolvimento sustentavel.",
  },
  {
    titulo: "Corporate sustainability in Canadian and US maritime ports",
    fonte: "Journal of Cleaner Production",
    ano: 2019,
    contribuicao:
      "Survey com executivos portuarios: percepcoes, estrategias, motivadores e barreiras a adocao de sustentabilidade corporativa em portos.",
  },
  {
    titulo: "The process of selecting and prioritising corporate sustainability issues: insights for the SDGs",
    fonte: "Journal of Cleaner Production",
    ano: 2019,
    contribuicao:
      "Como o setor privado prioriza e operacionaliza ODS no nivel da firma; cada organizacao interpreta e prioriza metas conforme seu contexto.",
  },
  {
    titulo: "The SDGs and corporate sustainability performance: mapping, extent and determinants",
    fonte: "Journal of Cleaner Production",
    ano: 2021,
    contribuicao:
      "Mapeamento ODS-metas com scores ESG; alguns ODS sao mais relevantes ao setor empresarial; empresas maiores, lucrativas e menos alavancadas tendem a melhor desempenho.",
  },
  {
    titulo: "Role of sustainability in global seaports",
    fonte: "Ocean and Coastal Management",
    ano: 2021,
    contribuicao:
      "Comparacao de 36 portos (America do Norte, Europa, Asia-Pacifico) com 25 indicadores predefinidos para avaliar iniciativas e escala de sustentabilidade.",
  },
  {
    titulo: "Harmonizing sustainability assessment in seaports: a common framework for environmental indicators",
    fonte: "Ocean and Coastal Management",
    ano: 2021,
    contribuicao:
      "Framework comum de indicadores de desempenho ambiental para benchmarking entre portos (caso Porto de Aveiro).",
  },
  {
    titulo: "Trends in port decarbonisation research: are we reinventing the wheel?",
    fonte: "Current Opinion in Environmental Sustainability",
    ano: 2024,
    contribuicao:
      "Revisao sistemica da pesquisa em descarbonizacao portuaria; quatro clusters tematicos, lacunas criticas e agenda futura para evitar redundancia.",
  },
  {
    titulo: "Biomass sea-based supply chains and secondary ports in the era of decarbonization",
    fonte: "Energies",
    ano: 2021,
    contribuicao:
      "Papel dos portos secundarios nas cadeias de biomassa marinha para aumentar a fatia de renovaveis rumo a neutralidade climatica de 2050 da UE.",
  },
  {
    titulo: "Analysis of energy conservation by roof shade installations in refrigerated container areas",
    fonte: "Journal of Cleaner Production",
    ano: 2022,
    contribuicao:
      "Medida pratica de eficiencia energetica (sombreamento de contêineres reefer) avaliada por CFD e analise economica; reduz a lacuna pesquisa-aplicacao.",
  },
  {
    titulo: "Multi-objective optimization of a hydrogen hub for the decarbonization of a port industrial area",
    fonte: "Journal of Marine Science and Engineering",
    ano: 2022,
    contribuicao:
      "Otimizacao multiobjetivo de hub de hidrogenio verde (eletrolisador PEM + PV) em area portuaria industrial; custo nivelado de hidrogenio ambiental e tecnoeconomico.",
  },
  {
    titulo: "Unveiling the sensitivity analysis of port carbon footprint: Valencia Port case study",
    fonte: "Journal of Marine Science and Engineering",
    ano: 2023,
    contribuicao:
      "Analise de sensibilidade orientada a dados para reduzir emissoes portuarias via cenarios alternativos de geracao de energia e renovaveis rumo a neutralidade.",
  },
  {
    titulo: "The port authority as system builder in cross-border regionalization (Port Esbjerg, North Sea wind)",
    fonte: "Maritime Transport Research",
    ano: 2023,
    contribuicao:
      "Autoridades portuarias como 'construtoras de sistema' em sistemas de inovacao transfronteiricos para energia eolica offshore e descarbonizacao europeia.",
  },
  {
    titulo: "Future pathways for decarbonization and energy efficiency of ports as sustainable energy hubs",
    fonte: "Journal of Cleaner Production",
    ano: 2023,
    contribuicao:
      "Modelo de simulacao dinamica para converter portos em hubs de energia com poligeracao renovavel, combustiveis alternativos (hidrogenio, biometano) e redes termicas.",
  },
  {
    titulo: "Digitalization for port decarbonization (Clean Tyne project, Port of Tyne)",
    fonte: "IEEE Electrification Magazine",
    ano: 2023,
    contribuicao:
      "Evidencia quantitativa do papel da digitalizacao e tecnologias de energia renovavel na descarbonizacao de processos-chave do porto.",
  },
  {
    titulo: "Inventory routing for ammonia supply in German ports",
    fonte: "Energies",
    ano: 2022,
    contribuicao:
      "Logistica de combustiveis alternativos (amonia) em portos para meta IMO de reducao de 50% de GEE ate 2050; roteirizacao de estoque.",
  },
  {
    titulo: "Adaptation of existing vessels in accordance with decarbonization requirements (Mediterranean port)",
    fonte: "Journal of Marine Science and Engineering",
    ano: 2023,
    contribuicao:
      "Retrofit fotovoltaico de navios para reduzir GEE e melhorar eficiencia energetica; modelagem com simulador IHOGA.",
  },
  {
    titulo: "Urban regeneration and soft mobility: the Rimini Canal Port (FRAMESPORT)",
    fonte: "Sustainability",
    ano: 2022,
    contribuicao:
      "Regeneracao urbana portuaria com mobilidade suave, analise SWOT e co-design participativo de stakeholders rumo as metas de descarbonizacao europeias.",
  },
  {
    titulo: "Green energy transformation of ports through a Distribution System Operator (Proteus Plan, HEDNO)",
    fonte: "IEEE Electrification Magazine",
    ano: 2022,
    contribuicao:
      "Visao do operador de distribuicao para apoiar a eletrificacao e descarbonizacao mais rapida do setor maritimo.",
  },
  {
    titulo: "Blockchain-powered incentive system for JIT arrival operations and decarbonization",
    fonte: "Sustainability",
    ano: 2023,
    contribuicao:
      "Sistema de incentivos via blockchain para chegada Just-in-Time, reduzindo tempo de espera e emissoes; perfilamento de desempenho de navios.",
  },
  {
    titulo: "Ports' role in shipping decarbonisation: a common port incentive scheme for GHG reduction",
    fonte: "Cleaner Logistics and Supply Chain",
    ano: 2022,
    contribuicao:
      "Analise de esquemas de incentivo portuario para reduzir GEE da navegacao (IMO 2023, EU Climate Law); esquemas atuais ainda onerosos e de baixa adesao.",
  },
  {
    titulo: "Seaports participation in enhancing the Sustainable Development Goals",
    fonte: "Journal of Cleaner Production",
    ano: 2022,
    contribuicao:
      "Framework que conecta iniciativas de sustentabilidade portuaria aos ODS, estendendo indicadores UNSDG e GRI a partir de divulgacoes de portos europeus.",
  },
  {
    titulo: "New environmental performance baseline for inland ports (EFIP/PORTOPIA)",
    fonte: "Environmental Science & Policy",
    ano: 2016,
    contribuicao:
      "Linha de base e benchmark de desempenho ambiental para portos interiores europeus.",
  },
  {
    titulo: "Tools for evaluating environmental performance at Brazilian public ports",
    fonte: "Marine Pollution Bulletin",
    ano: 2017,
    contribuicao:
      "Diagnostico de metricas ambientais em portos publicos brasileiros e proposta de sistema de indicadores (contexto ANTAQ); fatores economicos costumam ser omitidos.",
  },
  {
    titulo: "Port environmental management: innovations in a Brazilian public port (Rio Grande)",
    fonte: "RAI Revista de Administracao e Inovacao (USP)",
    ano: 2016,
    contribuicao:
      "Inovacoes em gestao ambiental no Porto de Rio Grande sob o Manual de Oslo, relacionadas aos requisitos de avaliacao da ANTAQ.",
  },
  {
    titulo: "Analyzing sustainability literature in maritime studies with text mining",
    fonte: "Sustainability",
    ano: 2018,
    contribuicao:
      "Revisao por text mining da literatura de sustentabilidade em estudos maritimos (1993-2017); campo em crescimento, porem fragmentado.",
  },
];

// Versao compacta para injetar no prompt do sistema.
export function baseConhecimentoTexto(): string {
  return baseConhecimento
    .map(
      (r, i) =>
        `${i + 1}. ${r.titulo} (${r.fonte}, ${r.ano}). ${r.contribuicao}`
    )
    .join("\n");
}
