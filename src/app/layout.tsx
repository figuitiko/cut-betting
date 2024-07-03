import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { recursive } from "./ui/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ranking La Copa",
  description: "La mejor app para hacer apuestas de la copa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="synthwave">
      <body className={recursive.className}>{children}</body>
    </html>
  );
}
