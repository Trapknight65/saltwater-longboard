import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/layout/GrainOverlay";
import AmbientSound from "@/components/layout/AmbientSound";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inês Bispo | Saltwater Longboard",
  description: "Inês Bispo - New Album 'Saltwater Longboard' coming Spring 2026. Indie Folk from the Portuguese Coast.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌊</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GrainOverlay />
        <AmbientSound />
        {children}
      </body>
    </html>
  );
}
