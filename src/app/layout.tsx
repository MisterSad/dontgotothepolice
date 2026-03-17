import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dontgotothepolice.orangecyberdefense.com"),
  title: "Don't Go to the Police - L'Escape Game Cyber",
  description: "Vivez une cyberattaque de l'intérieur. 5 niveaux, 5 réflexes. Inspiré de faits réels.",
  openGraph: {
    title: "Don't Go to the Police - L'Escape Game Cyber",
    description: "Vivez une cyberattaque de l'intérieur. 5 niveaux, 5 réflexes. Inspiré de faits réels.",
    images: [{ url: "/og-image.jpg" }]
  }
};

import AudioPlayer from "@/components/AudioPlayer";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-grain scanline`}
      >
        <LanguageProvider>
          <AudioPlayer src="/audio/ambient.mp3" />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
