# Avaliador de Projetos x Editais

Aplicativo web que avalia a aderencia de um projeto de pesquisa a um ou mais editais e sugere melhorias. As recomendacoes sao fundamentadas em uma base de expertise embutida sobre sustentabilidade portuaria, descarbonizacao maritima, indicadores ambientais e ODS (sintese de 29 artigos de referencia).

## Como funciona

1. Voce envia o PDF do projeto e um ou mais PDFs de edital.
2. O texto e extraido no proprio navegador (pdfjs-dist).
3. O texto vai para a rota `/api/analyze`, que chama a IA (Anthropic Claude ou OpenAI GPT) com um prompt de especialista mais a base de literatura.
4. O app devolve uma avaliacao estruturada: nota de aderencia, checklist de requisitos, lacunas, sugestoes priorizadas e alinhamento com ODS.

## Configuracao da chave de IA

Duas opcoes:

- Colar a chave diretamente no app (campo "Chave de API"). Ela fica apenas no navegador e e enviada a propria rota do app.
- Definir como variavel de ambiente na Vercel e deixar o campo vazio:
  - `ANTHROPIC_API_KEY` para Claude
  - `OPENAI_API_KEY` para GPT

## Rodar localmente

Pre requisito: Node.js 18.18 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Avaliador de projetos x editais"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/avaliador-projetos-editais.git
git push -u origin main
```

## Publicar na Vercel

1. Acesse vercel.com e clique em **Add New > Project**.
2. Importe o repositorio do GitHub.
3. Framework: **Next.js** (detectado automaticamente). Nao precisa mudar nada no build.
4. (Opcional) Em **Settings > Environment Variables**, adicione `ANTHROPIC_API_KEY` ou `OPENAI_API_KEY`.
5. Clique em **Deploy**.

## Personalizar a base de conhecimento

Edite `lib/knowledge.ts` para adicionar, remover ou ajustar os resumos dos artigos de referencia. O perfil de especialista e a estrutura do relatorio ficam em `lib/prompt.ts`.

## Observacoes

- PDFs digitalizados como imagem (sem camada de texto) nao podem ser lidos. Use PDFs com texto selecionavel ou aplique OCR antes.
- Textos muito longos sao truncados em ~120 mil caracteres por documento para caber no contexto do modelo.
- Idioma da interface e das avaliacoes: portugues do Brasil.
