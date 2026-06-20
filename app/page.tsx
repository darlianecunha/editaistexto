"use client";

import { useRef, useState } from "react";
import { extrairTextoPdf } from "@/lib/pdf";
import { markdownToHtml } from "@/lib/markdown";

interface Arquivo {
  nome: string;
  texto: string;
}

export default function Home() {
  const [provider, setProvider] = useState<"anthropic" | "openai">("anthropic");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [projeto, setProjeto] = useState<Arquivo | null>(null);
  const [editais, setEditais] = useState<Arquivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [extraindo, setExtraindo] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState("");

  const projetoRef = useRef<HTMLInputElement>(null);
  const editalRef = useRef<HTMLInputElement>(null);

  async function lerArquivos(files: FileList | null): Promise<Arquivo[]> {
    if (!files) return [];
    const arr: Arquivo[] = [];
    for (const f of Array.from(files)) {
      if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) continue;
      setExtraindo(`Lendo ${f.name}...`);
      try {
        const texto = await extrairTextoPdf(f);
        arr.push({ nome: f.name, texto });
      } catch {
        setErro(`Nao consegui ler ${f.name}. O PDF pode ser uma imagem digitalizada.`);
      }
    }
    setExtraindo("");
    return arr;
  }

  async function onProjeto(files: FileList | null) {
    setErro("");
    const arr = await lerArquivos(files);
    if (arr[0]) setProjeto(arr[0]);
  }

  async function onEditais(files: FileList | null) {
    setErro("");
    const arr = await lerArquivos(files);
    setEditais((prev) => [...prev, ...arr]);
  }

  async function avaliar() {
    setErro("");
    setResultado("");
    if (!projeto) return setErro("Envie o PDF do projeto.");
    if (editais.length === 0) return setErro("Envie ao menos um PDF de edital.");

    const editalTexto = editais
      .map((e) => `===== EDITAL: ${e.nome} =====\n${e.texto}`)
      .join("\n\n");

    setLoading(true);
    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          provider,
          apiKey: apiKey || undefined,
          model: model || undefined,
          edital: editalTexto,
          projeto: projeto.texto,
        }),
      });
      const data = await r.json();
      if (!r.ok) setErro(data.error || "Erro na avaliacao.");
      else setResultado(data.resultado);
    } catch {
      setErro("Falha de rede ao avaliar.");
    } finally {
      setLoading(false);
    }
  }

  function baixar() {
    const blob = new Blob([resultado], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "avaliacao-projeto.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container">
      <header>
        <h1>Avaliador de Projetos x Editais</h1>
        <p>
          Compara seu projeto com o edital e sugere melhorias, com base de
          expertise em sustentabilidade portuaria, descarbonizacao maritima e ODS.
        </p>
      </header>

      <div className="card">
        <h2>1. Configuracao da IA</h2>
        <div className="row">
          <div>
            <label>Provedor</label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as "anthropic" | "openai")}
            >
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="openai">OpenAI (GPT)</option>
            </select>
          </div>
          <div>
            <label>Modelo (opcional)</label>
            <input
              type="text"
              placeholder={provider === "anthropic" ? "claude-sonnet-4-6" : "gpt-4o"}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Chave de API</label>
          <input
            type="password"
            placeholder="Cole sua chave (fica apenas no seu navegador)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="hint">
            A chave e enviada apenas para a propria API do app, que repassa ao
            provedor. Tambem e possivel configurar a chave como variavel de
            ambiente na Vercel e deixar este campo vazio.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>2. Projeto (1 PDF)</h2>
        <div className="dropzone" onClick={() => projetoRef.current?.click()}>
          <strong>Clique para selecionar</strong> o PDF do projeto
          <small>O texto e extraido no seu navegador.</small>
        </div>
        <input
          ref={projetoRef}
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => onProjeto(e.target.files)}
        />
        {projeto && (
          <ul className="filelist">
            <li>
              <span>{projeto.nome} ({Math.round(projeto.texto.length / 1000)} mil caracteres)</span>
              <button onClick={() => setProjeto(null)}>x</button>
            </li>
          </ul>
        )}
      </div>

      <div className="card">
        <h2>3. Edital(is) (um ou varios PDFs)</h2>
        <div className="dropzone" onClick={() => editalRef.current?.click()}>
          <strong>Clique para selecionar</strong> um ou mais PDFs de edital
          <small>Pode adicionar varios; serao combinados na analise.</small>
        </div>
        <input
          ref={editalRef}
          type="file"
          accept="application/pdf"
          multiple
          hidden
          onChange={(e) => onEditais(e.target.files)}
        />
        {editais.length > 0 && (
          <ul className="filelist">
            {editais.map((e, idx) => (
              <li key={idx}>
                <span>{e.nome} ({Math.round(e.texto.length / 1000)} mil caracteres)</span>
                <button onClick={() => setEditais((p) => p.filter((_, i) => i !== idx))}>x</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {extraindo && <p className="hint">{extraindo}</p>}
      {erro && <div className="error">{erro}</div>}

      <div className="card">
        <button className="primary" onClick={avaliar} disabled={loading || !!extraindo}>
          {loading ? (
            <>
              <span className="spinner" /> Avaliando...
            </>
          ) : (
            "Avaliar projeto"
          )}
        </button>
      </div>

      {resultado && (
        <>
          <div className="toolbar">
            <button onClick={baixar}>Baixar (.md)</button>
            <button onClick={() => navigator.clipboard.writeText(resultado)}>
              Copiar texto
            </button>
          </div>
          <div
            className="result"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(resultado) }}
          />
        </>
      )}
    </div>
  );
}
