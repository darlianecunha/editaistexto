import { NextRequest, NextResponse } from "next/server";
import { montarSystemPrompt, montarUserPrompt } from "@/lib/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

type Provider = "gemini" | "anthropic" | "openai";

interface Body {
  provider?: Provider;
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

  const provider: Provider =
    body.provider === "anthropic" || body.provider === "openai"
      ? body.provider
      : "gemini";
  const edital = corta((body.edital || "").trim());
  const projeto = corta((body.projeto || "").trim());

  if (!edital || !projeto) {
    return NextResponse.json(
      { error: "Envie o texto do edital e do projeto." },
      { status: 400 }
    );
  }

  // A chave vem somente do servidor (variavel de ambiente na Vercel / .env.local).
  const envKey: Record<Provider, string | undefined> = {
    gemini: process.env.GEMINI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    openai: process.env.OPENAI_API_KEY,
  };
  const envName: Record<Provider, string> = {
    gemini: "GEMINI_API_KEY",
    anthropic: "ANTHROPIC_API_KEY",
    openai: "OPENAI_API_KEY",
  };
  const apiKey = envKey[provider] || "";

  if (!apiKey) {
    return NextResponse.json(
      { error: `${envName[provider]} nao configurada no servidor.` },
      { status: 401 }
    );
  }

  const system = montarSystemPrompt();
  const user = montarUserPrompt({ edital, projeto });

  try {
    if (provider === "gemini") {
      const model = body.model || "gemini-2.0-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const r = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          generationConfig: { maxOutputTokens: 8192, temperature: 0.3 },
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        return NextResponse.json(
          { error: data?.error?.message || "Erro na API Gemini." },
          { status: r.status }
        );
      }
      const texto = (data?.candidates?.[0]?.content?.parts || [])
        .map((p: { text?: string }) => p.text || "")
        .join("\n")
        .trim();
      return NextResponse.json({ resultado: texto, provider, model });
    }

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
    }

    // openai
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
  } catch (e) {
    return NextResponse.json(
      { error: "Falha ao contatar o provedor de IA. Verifique a chave no servidor e a conexao." },
      { status: 500 }
    );
  }
}
