# Next Start

A basic Next.js starter.

- [Next Start](#next-start)
- [setup new github project](#setup-new-github-project)
  - [Creazione Repository GitHub](#creazione-repository-github)
  - [Connessione del Progetto a GitHub](#connessione-del-progetto-a-github)
  - [file di configurazione per GitHub Actions 'ci.yaml'.](#file-di-configurazione-per-github-actions-ciyaml)
  - [Stack](#stack)
  - [Branches](#branches)
  - [Setup](#setup)
  - [Resources](#resources)
  - [script prettier](#script-prettier)
  - [.prettierrc.json](#prettierrcjson)
  - [.eslintrc.json](#eslintrcjson)

# setup new github project

Trattandosi di uno starter kit ogni volta che inizi un nuovo progetto DEVI creare una nuova repository in github!

## Creazione Repository GitHub

1. Accedi al tuo account GitHub
2. Clicca su "New repository"
3. Inserisci lo stesso nome utilizzato per l'app T3
4. NON aggiungere README, .gitignore o license (verranno creati dal template)
5. Clicca "Create repository"

## Connessione del Progetto a GitHub

Prima, vai nella directory dell'app Next.js.

```bash
cd nome-app
```

Verifica che sei nella directory corretta (dovrebbe mostrare il percorso che termina con /drive-tutorial):

```bash
pwd
```

Se c'è già una cartella .git, rimuovila per sicurezza con il seguente comando:

```bash
rm -rf .git
```

## file di configurazione per GitHub Actions 'ci.yaml'.

Crea una cartella ".github/workflow" all'interno della cartella principale del progetto (ex. drive-tutorial) e crea al suo interno un file 'ci.yaml'.
Questo workflow serve a:
Verificare automaticamente la qualità del codice ad ogni push
Assicurare che il codice compili correttamente
Controllare errori di sintassi e stile
Garantire che tutti i file di configurazione necessari siano presenti:

```bash

name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install Dependencies
        run: npm install -g pnpm && pnpm install

      - name: Copy .env.example files
        shell: bash
        run: find . -type f -name ".env.example" -exec sh -c 'cp "$1" "${1%.*}"' _ {} \;

      - name: Typecheck
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

```

Inizializza il nuovo repository e aggiungi i file:

```bash

git init
git add .
git commit -m "Initial commit"

#Collega il repository remoto e fai il push:

git remote add origin https://github.com/nuno80/next-start-nuno.git
//serve solo per il primo collegamento a github

git branch -M main
git push -u origin main
```

## Stack

- Linting / Code Style
  - [eslint](https://www.npmjs.com/package/eslint)
    - [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
      - [ESLint | Next.js](https://nextjs.org/docs/app/building-your-application/configuring/eslint#prettier)
    - [eslint-plugin-check-file](https://www.nvpmjs.com/package/eslint-plugin-check-file)
      - [Bulletproof React Guide](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-standards.md#file-naming-conventions)
    - [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n)
  - [prettier](https://www.npmjs.com/package/prettier)
    - [@trivago/prettier-plugin-sort-imports](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports)
    - [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss)
      - [Automatic Class Sorting](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)
- Environment Variables
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [dotenv-expand](https://www.npmjs.com/package/dotenv-expand)
  - [@t3-oss/env-nextjs](https://www.npmjs.com/package/@t3-oss/env-nextjs)
    - [Documentation](https://env.t3.gg/docs/nextjs)
  - [cross-env](https://www.npmjs.com/package/cross-env)
- Styles / UI
  - [tailwindcss](https://www.npmjs.com/package/tailwindcss)
  - [@nextui-org/react](https://www.npmjs.com/package/@nextui-org/react)
    - [NextUI](https://nextui.org/docs/guide/introduction)
  - [next-themes](https://www.npmjs.com/package/next-themes)
  - [@tabler/icons-react](https://www.npmjs.com/package/@tabler/icons-react)
    - [Tabler Icon Search](https://tabler.io/icons)
- Validation
  - [zod](https://www.npmjs.com/package/zod)
  - [@conform-to/zod](https://www.npmjs.com/package/@conform-to/zod)
    - [Conform | Next.js](https://conform.guide/integration/nextjs)
  - [drizzle-zod](https://www.npmjs.com/package/drizzle-zod)
    - [Drizzle Zod Docs](https://orm.drizzle.team/docs/zod)
- Forms
  - [@conform-to/react](https://www.npmjs.com/package/@conform-to/react)
- Database
  - [drizzle-orm](https://www.npmjs.com/package/drizzle-orm)
  - [postgres](https://www.npmjs.com/package/postgres)
  - [drizzle-kit](https://www.npmjs.com/package/drizzle-kit)
- Authentication
  - [next-auth](https://www.npmjs.com/package/next-auth)
  - [@auth/drizzle-adapter](https://www.npmjs.com/package/@auth/drizzle-adapter)
    - [Auth.js Drizzle Adapter Documentation](https://authjs.dev/getting-started/adapters/drizzle)

## Branches

The main branch contains the entire setup. The following branches build on each other from top to bottom:

- [base](https://github.com/w3cj/next-start/tree/base)
  - eslint / prettier settings
- [nextui](https://github.com/w3cj/next-start/tree/nextui)
  - layout / styles
  - dark / light theme toggle
- [typesafe-env](https://github.com/w3cj/next-start/tree/typesafe-env)
  - typesafe environment variables
- [next-auth](https://github.com/w3cj/next-start/tree/next-auth)
  - google oauth with no database
- [drizzle](https://github.com/w3cj/next-start/tree/drizzle) / [main](https://github.com/w3cj/next-start)
  - basic drizzle schema with users / accounts / sessions

## Setup

1. Install dependencies:

```sh
pnpm install
```

2. Copy the `.env` file:

```sh
cp .env.example .env
```

3. Update the following values in the `.env` file:

```sh
NEXTAUTH_SECRET=your-value-here
GOOGLE_CLIENT_ID=your-value-here
GOOGLE_CLIENT_SECRET=your-value-here
```

4. Start the database:

```sh
docker compose up
```

5. Migrate the database:

```sh
pnpm run db:migrate
```

Per applicare le modifiche il DB docker deve essere running!

6. Start the app:

```sh
pnpm run dev
```

## Resources

- [Next.js Discord FAQs](https://nextjs-faq.com/)
- ["Module not found" error on deployment but build works fine locally](https://nextjs-faq.com/module-not-found-due-to-case-sensitivity)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

## script prettier

All'interno del file packege.json è stata inserita la seguente linea:
"scripts": {
"format": "prettier src/ --write",

Se esegui:

```sh
npm run format
```

Tutto ciò che dentro la cartella src verrà formattato correttamente!

## .prettierrc.json

Non potendo inserire commenti in un file JSON li ho inseriti di seguito.

```sh
{
  "semi": true, // Aggiunge un punto e virgola (;) alla fine di ogni istruzione.
  "singleQuote": false, // Utilizza apici doppi (") per le stringhe sostituendi (').
  "tabWidth": 2, // Utilizza 2 spazi per l'indentazione.
  "trailingComma": "es5", // Aggiunge virgole finali solo dove sono valide in ES5 (oggetti e array).
  "importOrder": [ // Definisce l'ordine delle importazioni per mantenere il codice ordinato nel seguente ordine:
    "^(react|next?/?([a-zA-Z/]*))$", // 1°: tutto ciò che è riferito a React e Next.js è ordinato per primo
    "<THIRD_PARTY_MODULES>",         // 2°: Librerie di terze parti (installate tramite npm/yarn).
    "^@/(.*)$",                      // 3°: Importazioni assolute che iniziano con @/

    Immagina di avere un componente molto annidato, tipo: src/components/forms/inputs/special/MySpecialInput.tsx. Se da questo componente vuoi importare un'utility che si trova in src/utils/myUtil.ts, con i percorsi relativi dovresti scrivere:
    import myUtil from '../../../../utils/myUtil';
    Use code with caution.
    JavaScript
    Questo è brutto, difficile da leggere, e fragile (se sposti il componente, devi aggiornare tutti i percorsi relativi).
    Importazioni assolute come soluzione: Con le importazioni assolute, invece, puoi scrivere semplicemente:
    import myUtil from '@/utils/myUtil';

    "^[./]"                         // 4°: Importazioni relative che iniziano con ./ o ../
  ],
  "importOrderSeparation": true, // Inserisce una riga vuota tra i gruppi di importazioni.
  "importOrderSortSpecifiers": true, // Ordina alfabeticamente gli identificatori all'interno di ogni importazione.
  "plugins": [ // Plugin di Prettier.
    "@trivago/prettier-plugin-sort-imports", // Gestisce l'ordinamento delle importazioni.
    "prettier-plugin-tailwindcss"            // Ordina le classi Tailwind CSS.
  ]
}

```

## .eslintrc.json

naming convenctions:
Tutti i file .ts e .tsx devono essere in KEBAB_CASE (es. mio-componente.tsx).
Tutte le cartelle dentro src/ (esclusi i file nascosti) devono essere in KEBAB_CASE.

```sh
{
  "extends": ["next/core-web-vitals", "next", "prettier"],
  // Aggiunge configurazioni di base:
  // - next/core-web-vitals: Regole per le Core Web Vitals di Next.js.
  // - next/typescript:     Regole specifiche per TypeScript in Next.js.
  // - prettier:             Disabilita regole ESLint che potrebbero entrare in conflitto con Prettier.

  "plugins": ["check-file", "n"],
  // Plugin aggiuntivi:
  // - check-file: Regole per la convenzione dei nomi di file e cartelle.
  // - n:          Regole relative a Node.js (ex 'node').

  // Regole personalizzate, servono a dare maggior ordine al codice:
  "rules": {
    "prefer-arrow-callback": ["error"],
    // Richiede l'uso di arrow function come callback.

    "prefer-template": ["error"],
    // Richiede l'uso di template literal invece della concatenazione di stringhe.

    "semi": ["error"],
    // Richiede i punti e virgola alla fine delle istruzioni.

    "quotes": ["error", "double"],
    // Richiede l'uso di apici doppi per le stringhe.

    "n/no-process-env": ["error"],
    // Impedisce l'uso diretto di process.env (si dovrebbero usare le variabili d'ambiente di Next.js).

    "check-file/filename-naming-convention": [
      "error",
      {
        // Tutti i file .ts e .tsx devono essere in KEBAB_CASE (es. mio-componente.tsx).
        "**/*.{ts,tsx}": "KEBAB_CASE"
      },
      {
        // Ignora le estensioni intermedie (es. in file come mio-file.test.tsx, considera solo .tsx).
        "ignoreMiddleExtensions": true
      }
    ],

    // Regole per la convenzione dei nomi di cartelle:
    "check-file/folder-naming-convention": [
      "error",
      {
        // Tutte le cartelle dentro src/ (esclusi i file nascosti) devono essere in KEBAB_CASE.
        "src/**/!^[.*": "KEBAB_CASE"
      }
    ]
  }
}

Tutti i gli errori vengono salvati in automatico ad ogni salvataggio oppure con:
shift + alt + . per eslint auto fix, ovvero applicare le regole di cui sopra in automatico!

```
