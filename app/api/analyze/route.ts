import { NextRequest, NextResponse } from "next/server";
import { montarSystemPrompt, montarUserPrompt } from "@/lib/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

interface Body {
  provider?: "anthropic" | "openai";
  model?: string;
  edital?: string;
  projeto?: string;
}

const MAX_CHARS = 120_000; // protege contra estouro de contexto

function corta(t: string): string {
  if (!t) return "";
  return t.length > MAX_CHARS ? t.slice(0, MAX_CHARS) + "\n[...texto truncado...]" : t;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisicao invalida." }, { status: 400 });
  }

  const provider = body.provider === "openai" ? "openai" : "anthropic";
  const edital = corta((body.edital || "").trim());
  const projeto = corta((body.projeto || "").trim());

  if (!edital || !projeto) {
    return NextResponse.json(
      { error: "Envie o texto do edital e do projeto." },
      { status: 400 }
    );
  }

  // A chave vem somente do servidor (variavel de ambiente na Vercel).
  const apiKey =
    (provider === "anthropic"
      ? process.env.ANTHROPIC_API_KEY
      : process.env.OPENAI_API_KEY) || "";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          provider === "anthropic"
            ? "ANTHROPIC_API_KEY nao configurada no servidor."
            : "OPENAI_API_KEY nao configurada no servidor.",
      },
      { status: 401 }
    );
  }

  const system = montarSystemPrompt();
  const user = montarUserPrompt({ edital, projeto });

  try {
    if (provider === "anthropic") {
      const model = body.model || "claude-sonnet-4-6";
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 8000,
          system,
          messages: [{ role: "user", content: user }],
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        return NextResponse.json(
          { error: data?.error?.message || "Erro na API Anthropic." },
          { status: r.status }
        );
      }
      const texto = (data.content || [])
        .map((b: { text?: string }) => b.text || "")
        .join("\n")
        .trim();
      return NextResponse.json({ resultado: texto, provider, model });
    } else {
      const model = body.model || "gpt-4o";
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 8000,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        return NextResponse.json(
          { error: data?.error?.message || "Erro na API OpenAI." },
          { status: r.status }
        );
      }
      const texto = data?.choices?.[0]?.message?.content?.trim() || "";
      return NextResponse.json({ resultado: texto, provider, model });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Falha ao contatar o provedor de IA. Verifique a chave no servidor e a conexao." },
      { status: 500 }
    );
  }
}
