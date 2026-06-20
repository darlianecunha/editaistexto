"use client";

// Extracao de texto de PDF no navegador usando pdfjs-dist.
import * as pdfjsLib from "pdfjs-dist";

// Worker servido por CDN, casando com a versao do pacote.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export async function extrairTextoPdf(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let texto = "";
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const linha = content.items
      .map((it: unknown) => (it as { str?: string }).str || "")
      .join(" ");
    texto += linha + "\n";
  }
  return texto.replace(/[ \t]+/g, " ").trim();
}
