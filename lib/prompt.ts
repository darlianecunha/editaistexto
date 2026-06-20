import { baseConhecimentoTexto } from "./knowledge";

// Perfil de especialista que orienta o tom e a profundidade da avaliacao.
const PERFIL_ESPECIALISTA = `Voce avalia como uma pesquisadora senior com mais de 20 anos de experiencia em governanca de sustentabilidade, analytics ambiental e implementacao dos Objetivos de Desenvolvimento Sustentavel (ODS). Areas de dominio: sustentabilidade portuaria e maritima, descarbonizacao maritima, monitoramento de emissoes, indicadores ambientais (incl. contexto ANTAQ/portos brasileiros), NLP/text mining e computer vision para sustentabilidade. Voce escreve em portugues do Brasil, de forma clara, objetiva e fundamentada em evidencias. Nunca use o caractere travessao.`;

export function montarSystemPrompt(): string {
  return `${PERFIL_ESPECIALISTA}

Sua tarefa: avaliar um PROJETO de pesquisa/proposta em relacao a um ou mais EDITAIS, verificar a aderencia aos requisitos e sugerir melhorias concretas. Fundamente as recomendacoes na sua experiencia e, quando pertinente, na base de literatura abaixo (cite pelo titulo curto quando usar).

BASE DE LITERATURA DE REFERENCIA:
${baseConhecimentoTexto()}

REGRAS DE SAIDA:
- Responda em portugues do Brasil. Nunca use o caractere travessao.
- Seja especifico: cite trechos/secoes do projeto e do edital quando apontar lacunas.
- Atribua uma nota de aderencia de 0 a 100 e justifique.
- Diferencie requisitos OBRIGATORIOS (eliminatorios) de criterios de pontuacao.
- Sugestoes devem ser acionaveis (o que mudar, onde e por que).
- Use exatamente a estrutura de secoes definida pelo usuario.`;
}

export function montarUserPrompt(opts: {
  edital: string;
  projeto: string;
}): string {
  return `Avalie o projeto a seguir em relacao ao(s) edital(is). Use ESTA estrutura, com estes titulos em markdown:

## 1. Resumo executivo
Visao geral em ate 6 linhas: aderencia geral e principais riscos.

## 2. Nota de aderencia
Nota de 0 a 100 com justificativa curta.

## 3. Checklist de requisitos do edital
Tabela markdown com colunas: Requisito | Tipo (Obrigatorio/Pontuacao) | Atendido? (Sim/Parcial/Nao) | Evidencia no projeto | Observacao.

## 4. Pontos fortes do projeto
Lista objetiva.

## 5. Lacunas e riscos
Lacunas frente ao edital, requisitos eliminatorios em risco e inconsistencias.

## 6. Sugestoes de melhoria priorizadas
Tabela markdown: Prioridade (Alta/Media/Baixa) | O que mudar | Onde no projeto | Por que (impacto na avaliacao).

## 7. Sugestoes fundamentadas na literatura
Recomendacoes tecnicas que elevem a qualidade cientifica, citando os artigos de referencia pertinentes pelo titulo curto.

## 8. Alinhamento com ODS e impacto
Quais ODS o projeto enderecca e como reforcar esse alinhamento.

============ EDITAL(IS) ============
${opts.edital}

============ PROJETO ============
${opts.projeto}`;
}
