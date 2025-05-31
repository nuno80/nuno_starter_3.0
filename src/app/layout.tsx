// src/app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Corretto: GeistSans e GeistMono sono variabili, non funzioni qui

import "./globals.css";

// Importa il modulo db per forzare l'inizializzazione al primo caricamento
import { db } from '@/lib/db'; // Assicurati che l'alias @ sia configurato o usa il percorso relativo

const geistSans = Geist({ // Questa è la chiamata corretta se Geist è una funzione che ritorna config
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({ // Questa è la chiamata corretta se Geist_Mono è una funzione
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fantacalcio Auction Platform", // Aggiornato titolo
  description: "A sophisticated fantasy football auction platform.", // Aggiornata descrizione
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Log per confermare l'inizializzazione del DB
  // Questa riga farà sì che il modulo src/lib/db/index.ts venga eseguito
  if (db && db.open) {
    console.log('[RootLayout] Database connection is open.');
    try {
      // Esegui una semplice query di test
      const result = db.prepare('SELECT sqlite_version() as version').get() as { version: string };
      console.log('[RootLayout] SQLite Version from DB:', result.version);
    } catch (e: any) { // Aggiunto 'any' per il tipo dell'errore per semplicità nel log
      console.error('[RootLayout] Test query in RootLayout failed:', e.message);
    }
  } else {
    // Questo blocco non dovrebbe essere raggiunto se db/index.ts lancia un errore in caso di fallimento della connessione
    console.error('[RootLayout] Database connection is NOT open or db module failed to initialize. Check db/index.ts logs.');
  }

  return (
    // Ho rimosso ClerkProvider da qui perché nello starter kit è già presente e funzionante
    // Se il tuo starter kit lo mette qui, lascialo. Se lo mette più in alto nell'albero, va bene.
    // L'importante è che ClerkProvider wrappi la tua applicazione una sola volta al livello corretto.
    // Per lo starter kit che hai descritto, ClerkProvider è di solito qui.
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          style={{ isolation: "isolate" }} // style={{ isolation: "isolate" }} è insolito, assicurati sia voluto
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