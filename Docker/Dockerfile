# Dockerfile (per SVILUPPO)

# Fase 1: Builder
# Usiamo node:20-alpine come base per entrambe le fasi per coerenza
FROM node:20-alpine AS builder

# Imposta la directory di lavoro
WORKDIR /app

# Abilita Corepack per gestire pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Copia package.json e pnpm-lock.yaml per installare le dipendenze
# Questo sfrutta la cache di Docker se questi file non cambiano
COPY package.json pnpm-lock.yaml ./

# Installa le dipendenze di sistema necessarie per la compilazione di moduli nativi
# come better-sqlite3
RUN apk add --no-cache libc6-compat python3 make g++

# Installa tutte le dipendenze (incluse devDependencies per il build)
RUN pnpm install --frozen-lockfile

# Copia il resto del codice sorgente dell'applicazione
# Questo include src/, public/, next.config.mjs, tsconfig.json, ecc.
COPY . .

# Esegui il build di Next.js (questo popola .next)
# Anche se per 'pnpm run dev' non servirebbe un build di produzione,
# alcune configurazioni o tipi potrebbero essere generati qui.
# Per un Dockerfile di SVILUPPO PURO, questa riga potrebbe essere omessa
# se 'pnpm run dev' gestisce tutto al volo.
# Tuttavia, averla non fa male e pre-compila alcune cose.
RUN pnpm run build


# Fase 2: Runtime per Sviluppo
FROM node:20-alpine

WORKDIR /app

# Imposta l'ambiente a 'development'
ENV NODE_ENV development

# Abilita Corepack e pnpm (se si intende usare comandi pnpm qui,
# altrimenti non strettamente necessario se copiamo tutto da builder)
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Copia package.json e pnpm-lock.yaml
# Anche se copiamo node_modules, avere questi file può essere utile
# per eseguire comandi pnpm nel container se necessario.
COPY package.json pnpm-lock.yaml ./

# Copia le node_modules complete dalla fase builder
# Questo è cruciale per avere un ambiente di sviluppo funzionante
# con tutti i binding nativi compilati correttamente.
COPY --from=builder /app/node_modules ./node_modules

# Copia l'intera applicazione buildata e il codice sorgente dalla fase builder.
# Per lo sviluppo con hot-reloading, vogliamo il codice sorgente.
# I volumi montati da docker-compose.yml sovrascriveranno /app/src,
# ma avere una copia base nell'immagine è una buona pratica.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src 
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json
# Copia altri file di configurazione root se necessario (es. .eslintrc.json, postcss.config.mjs, ecc.)
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts


# Aggiungi le dipendenze di sistema di runtime necessarie
RUN apk add --no-cache libc6-compat

# Espone la porta
EXPOSE 3000

# Comando per avviare l'applicazione in modalità sviluppo
# Usiamo il formato JSON array per CMD, che è più robusto.
# Assicurati che non ci siano caratteri strani o virgolette "intelligenti".
CMD ["pnpm", "run", "dev"]