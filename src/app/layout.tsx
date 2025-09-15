import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Portfolio ogison",
  description: "ogisonのポートフォリオサイトです。",
  keywords: [
    "ogison",
    "ポートフォリオ",
    "フルスタック",
    "React",
    "Next.js",
    "TypeScript",
    "8-bit",
    "レトロゲーム",
    "Web開発",
  ],
  authors: [{ name: "ogison" }],
  creator: "ogison",
  publisher: "ogison",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-ogison.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "ogison Portfolio",
    title: "Portfolio ogison",
    description: "ogisonのポートフォリオサイトです。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio ogison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio ogison",
    description: "ogisonのポートフォリオサイトです。",
    images: ["/og-image.png"],
    creator: "@ogison",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "kGf0matDnhBKNGaFptGUpEggZz8BX5vWs4-uz3r6_wE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#e60012" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" />
      </head>
      <body className={`${pressStart2P.variable}`}>{children}</body>
    </html>
  );
}
