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
  title: "Inspired Karters Electric | BITS Pilani",
  description: "Official website of Inspired Karters Electric (IKE), the premier formula student EV racing team from BITS Pilani.",
  keywords: "Inspired Karters, BITS Pilani, Formula Student, Racing Team, Engineering, EV, Formula EV, Electric Vehicle, IKE",
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={varela.className}>{children}</body>
    </html>
  );
}