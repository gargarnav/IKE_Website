import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Varela_Round } from "next/font/google";
import "./globals.scss";

const varela = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inspired Karters",
  description: "Static Next.js website using Sass",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={varela.className}>{children}</body>
    </html>
  );
}