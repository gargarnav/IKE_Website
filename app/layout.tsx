import "./globals.scss";
import { Varela_Round } from "next/font/google";

const varela = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Inspired Karters",
  description: "Static Next.js website using Sass",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={varela.className}>
      <body>{children}</body>
    </html>
  );
}
