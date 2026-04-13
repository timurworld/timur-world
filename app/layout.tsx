import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Timur World — Kids Design Studio",
  description: "Characters, worlds, and games by Timur, age 9. Play Brainrot Clicker, explore original characters, and download free backgrounds!",
  metadataBase: new URL("https://timur.world"),
  openGraph: {
    title: "Timur World — Kids Design Studio",
    description: "Characters, worlds, and games by Timur, age 9. Play Brainrot Clicker and explore original brainrot characters!",
    url: "https://timur.world",
    siteName: "Timur World",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Timur World — Characters, Worlds, Games",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timur World — Kids Design Studio",
    description: "Characters, worlds, and games by Timur, age 9. Play Brainrot Clicker!",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
