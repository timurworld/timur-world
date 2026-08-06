import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-collector",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Timur World — Character Universe",
  description: "A collectible character universe by Timur, age 9. Explore 100+ original characters, play games, and discover the worlds they live in.",
  metadataBase: new URL("https://timur.world"),
  openGraph: {
    title: "Timur World — Character Universe",
    description: "A collectible character universe by Timur, age 9. Explore original characters and play games!",
    url: "https://timur.world",
    siteName: "Timur World",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Timur World — Characters, Worlds, Games" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timur World — Character Universe",
    description: "A collectible character universe by Timur, age 9.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo2.variable} ${nunitoSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
