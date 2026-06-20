# Avaliador de Projetos x Editais

Aplicativo web que avalia a aderencia de um projeto de pesquisa a um ou mais editais e sugere melhorias. As recomendacoes sao fundamentadas em uma base de expertise embutida sobre sustentabilidade portuaria, descarbonizacao maritima, indicadores ambientais e ODS (sintese de 29 artigos de referencia).

## Como funciona

1. Voce envia o PDF do projeto e um ou mais PDFs de edital.
2. O texto e extraido no proprio navegador (pdfjs-dist).
3. O texto vai para a rota `/api/analyze`, que chama a IA (Anthropic Claude ou OpenAI GPT) com um prompt de especialista mais a base de literatura.
4. O app devolve uma avaliacao estruturada: nota de aderencia, checklist de requisitos, lacunas, sugestoes priorizadas e alinhamento com ODS.

## Chave de IA (somente no servidor)

A chave de API NAO e digitada no app. Ela e configurada como variavel de ambiente.
Provedores suportados:

- `GEMINI_API_KEY` para o Google Gemini (tem nivel GRATUITO, recomendado). Chave em https://aistudio.google.com/apikey
- `ANTHROPIC_API_KEY` para o Claude (pago, via console.anthropic.com)
- `OPENAI_API_KEY` para o GPT (pago, via platform.openai.com)

Na interface voce apenas escolhe o provedor cuja chave foi configurada (Gemini e o padrao).

Observacao: assinaturas de chat (Claude Pro/Max, ChatGPT Plus) NAO incluem acesso a API. A API e cobrada a parte. Por isso o Gemini gratuito e a opcao sem custo.

### Onde configurar

- Vercel: Settings > Environment Variables > adicione `GEMINI_API_KEY` e faca o redeploy.
- Local: crie um arquivo `.env.local` na raiz com `GEMINI_API_KEY=sua_chave`.

## Rodar localmente

Pre requisito: Node.js 18.18 ou superior.

```bash
npm install
echo "GEMINI_API_KEY=sua_chave" > .env.local
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

As pastas `node_modules` e `.next` ja estao no `.gitignore` e nao vao para o repositorio.

## Publicar na Vercel

1. Acesse vercel.com e clique em **Add New > Project**.
2. Importe o repositorio do GitHub.
3. Framework: **Next.js** (detectado automaticamente).
4. Em **Settings > Environment Variables**, adicione `GEMINI_API_KEY` (gratuito).
5. Clique em **Deploy**.

## Personalizar a base de conhecimento

Edite `lib/knowledge.ts` para ajustar os resumos dos artigos de referencia. O perfil de especialista e a estrutura do relatorio ficam em `lib/prompt.ts`.

## Observacoes

- PDFs digitalizados como imagem (sem camada de texto) nao podem ser lidos. Use PDFs com texto selecionavel ou aplique OCR antes.
- Textos muito longos sao truncados em ~120 mil caracteres por documento.
- Idioma da interface e das avaliacoes: portugues do Brasil.
