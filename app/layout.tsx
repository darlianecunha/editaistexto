import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avaliador de Projetos x Editais",
  description:
    "Avalia a aderencia de projetos a editais com base de expertise em sustentabilidade portuaria e ODS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
