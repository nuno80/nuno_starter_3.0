// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/theme-provider";
// Importa il modulo db SOLO per i suoi side effects (esecuzione del codice di inizializzazione)
import "@/lib/db/index";

import "./globals.css";

// Assicurati che il percorso sia corretto (db/index o solo db se index è implicito)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fantavega App",
  description: "Fantacalcio Auction System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Log per indicare che RootLayout sta renderizzando sul server.
  // I log specifici della creazione del DB dovrebbero venire da db/index.ts
  console.log(
    "[RootLayout Check] RootLayout is rendering on the server. DB initialization logs should appear if this is the first run and DB module was imported."
  );

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
