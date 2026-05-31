import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Varela_Round } from "next/font/google";
import "./globals.css";

const varela = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ike-taupe.vercel.app"),
  title: "Inspired Karters Electric | BITS Pilani",
  description: "Official website of Inspired Karters Electric (IKE), the premier formula student EV racing team from BITS Pilani.",
  keywords: "Inspired Karters, BITS Pilani, Formula Student, Racing Team, Engineering, EV, Formula EV, Electric Vehicle, IKE",
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
  openGraph: {
    title: "Inspired Karters Electric | BITS Pilani",
    description: "Official website of Inspired Karters Electric (IKE), the premier formula student EV racing team from BITS Pilani.",
    url: "https://ike-taupe.vercel.app",
    siteName: "Inspired Karters",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Inspired Karters Electric Team",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={varela.className}>{children}</body>
    </html>
  );
}