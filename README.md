```markdown
# Nuno's Next.js Starter Kit 2.0

A comprehensive Next.js 15 starter kit designed to accelerate the setup process for new web applications. It provides a pre-configured environment with Docker for development, pnpm, TypeScript, Tailwind CSS, shadcn/ui (base), BetterSQLite for local database, and Clerk for authentication.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Technology Stack](#technology-stack)
- [Key Features Added/Configured](#key-features-addedconfigured)
- [Directory Structure](#directory-structure)
- [Local Development Setup](#local-development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server (Local Machine)](#running-the-development-server-local-machine)
  - [Running with Docker (Recommended for Consistent Environment)](#running-with-docker-recommended-for-consistent-environment)
- [Database](#database)
- [Authentication (Clerk)](#authentication-clerk)
  - [Access Control Pages](#access-control-pages)
  - [Route Protection](#route-protection)
- [Code Quality & Formatting](#code-quality--formatting)
- [GitHub Workflow (CI)](#github-workflow-ci)
- [Starting a New Project from this Starter Kit](#starting-a-new-project-from-this-starter-kit)
- [Resources](#resources)

## Project Purpose

This project serves as a robust foundation for building modern web applications using Next.js. It aims to:

- Streamline the initial project setup.
- Provide a pre-configured, Dockerized development environment.
- Integrate essential tools for styling, data management, and authentication.
- Emphasize code quality through linting, formatting, and TypeScript.
- Include a basic CI workflow for GitHub Actions.

This starter kit uses **Clerk** for authentication and **BetterSQLite** (via `better-sqlite3`) for local database management, suitable for rapid development and prototyping before potentially moving to a more complex database православ.

## Technology Stack

### Core & Development Environment

- **Next.js 15**: React framework with App Router.
- **TypeScript**: Typed superset of JavaScript.
- **pnpm**: Fast, disk space-efficient package manager.
- **Docker & Docker Compose**: For containerized development environment.

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui (Base)**: (Assumed, as `components.json` and theme variables are present). Provides a base for theming and UI components. You'll add components via `pnpm dlx shadcn-ui@latest add ...`.
- **next-themes**: For theme management (dark/light mode).
- **lucide-react**: Icon library.

### Database

- **SQLite**: Embedded SQL database engine.
- **better-sqlite3**: Node.js binding for SQLite3.
- **(Future Consideration: Drizzle ORM)**: While `drizzle-kit` and `drizzle-orm` might be in `package.json` from the original starter, this version focuses on `better-sqlite3` for direct SQLite interaction. ORM integration can be a next step.

### Authentication

- **Clerk (@clerk/nextjs)**: User management and authentication platform.

### Code Quality & Formatting

- **ESLint**: JavaScript/TypeScript linter.
  - Configured with `next/core-web-vitals`, `next/typescript`.
  - `eslint-plugin-check-file` for naming conventions.
- **Prettier**: Opinionated code formatter.
  - Configured with `@trivago/prettier-plugin-sort-imports` and `prettier-plugin-tailwindcss`.

### Environment Variables

- **Next.js built-in support for `.env.local` files.** (The original starter mentioned `dotenv`, `dotenv-expand`, `@t3-oss/env-nextjs`, `cross-env`. These might still be in `package.json` but Next.js's native handling is primary for this setup).

## Key Features Added/Configured in this Version

- **Dockerized Development Environment**: Pre-configured `Dockerfile` and `docker-compose.yml` for a consistent development setup using `pnpm`.
- **BetterSQLite Integration**: Setup for local SQLite database using `better-sqlite3`, including automatic database file creation and schema application from `database/schema.sql`.
- **pnpm Setup**: Project configured to use `pnpm` as the package manager.
- **Clerk Authentication Base**: Core Clerk setup for user authentication and route protection via middleware.
- **Path Aliases (`@/*`)**: Configured in `tsconfig.json` and `next.config.mjs` for cleaner imports.
- **Tailwind CSS Theming**: Base theming variables (light/dark mode) set up in `globals.css`, typical of shadcn/ui.

## Directory Structure
```

nuno-starter-kit-2.0/
├── Docker/ # Docker configuration
│ ├── Dockerfile
│ └── docker-compose.yml
├── database/ # Database related files
│ ├── schema.sql # SQL schema definition (run on first DB creation)
│ └── .gitkeep # Ensures a_s_directory is versioned
├── public/ # Static assets
│ └── ...
├── src/ # Main application source code
│ ├── app/ # App Router (pages, layouts, API routes)
│ │ ├── (auth)/ # Route group for auth pages (e.g., sign-in, sign-up provided by Clerk)
│ │ ├── admin/ # Admin-specific routes
│ │ │ └── users/ # Example admin page
│ │ ├── api/
│ │ │ └── admin/ # Admin-specific API routes
│ │ ├── dashboard/ # Example admin dashboard (protected by middleware)
│ │ ├── devi-autenticarti/ # Page for unauthenticated access attempts
│ │ ├── features/ # Example authenticated route
│ │ ├── no-access/ # Page for unauthorized access attempts
│ │ ├── user-dashboard/ # Example user-specific dashboard
│ │ ├── layout.tsx # Root layout
│ │ └── page.tsx # Root page (homepage)
│ ├── components/ # Reusable React components
│ │ ├── navbar.tsx # Example Navbar component
│ │ └── theme-provider.tsx # Component for next-themes
│ │ └── ui/ # Typically for shadcn/ui components (add as needed)
│ ├── lib/ # Utility functions, helpers
│ │ └── db/
│ │ └── index.ts # Database connection utility (BetterSQLite)
│ └── types/ # TypeScript type definitions
├── .dockerignore # Files to ignore for Docker context
├── .env.local.example # Example environment variables (rename to .env.local)
├── .eslintrc.json # ESLint configuration
├── .gitignore # Files ignored by Git
├── .prettierrc.json # Prettier configuration
├── components.json # shadcn/ui configuration (if used)
├── next.config.mjs # Next.js configuration
├── package.json # Project dependencies and scripts
├── pnpm-lock.yaml # pnpm lock file
├── postcss.config.mjs # PostCSS configuration
├── README.md # This file
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration

````

## Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended, as used in Dockerfile)
- [pnpm](https://pnpm.io/installation)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Dockerized development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/nuno80/nuno-starter-kit-2.0.git # Replace with your repo URL
   cd nuno-starter-kit-2.0
````

2. Install dependencies:
   ```bash
   pnpm install
   ```
   bun e npm danno problemi, usa pnpm

### Environment Variables

1. Create a `.env.local` file in the root of the project by copying `.env.local.example` (if you create one) or by creating it manually.
   ```bash
   cp .env.local.example .env.local # If .env.local.example exists
   ```
2. Populate `.env.local` with your Clerk keys and other necessary variables:

   ```env
    # Clerk Environment Variables - Get these from your Clerk Dashboard
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
    CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

    # Optional: Override default Clerk redirect URLs if needed
    # NEXT_PUBLIC_CLERK_SIGN_IN_URL=/custom-sign-in
    # NEXT_PUBLIC_CLERK_SIGN_UP_URL=/custom-sign-up
    # NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/my-dashboard
    # NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/welcome

    # Optional: Application URL
    # NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **Important:** Get your Clerk keys from the [Clerk Dashboard](https://dashboard.clerk.com/).

### Running the Development Server (Local Machine)

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`. The SQLite database file (`starter_default.db`) and `schema.sql` (if present) will be used/created in the `database/` directory.

### Running with Docker (Recommended for Consistent Environment)

This starter kit includes a Docker setup to provide a consistent and isolated development environment.

1.  **Ensure Docker Desktop is running.**

2.  **Navigate to the `Docker/` directory** within your project root:

    ```bash
    cd Docker
    ```

    _(Alternatively, you can run `docker compose` commands from the project root by specifying the path to the compose file, e.g., `docker compose -f Docker/docker-compose.yml ...`)_

3.  **Build the Docker image(s):**
    This step is crucial for the first time or if you've made changes to the `Dockerfile`, `package.json`, or other configuration files copied during the image build process. Using `--no-cache` ensures a clean build, ignoring any previous Docker layer cache.

    ```bash
    docker compose build --no-cache app
    ```

4.  **Run the application using Docker Compose:**
    This will start the service(s) defined in your `docker-compose.yml` (in this case, the `app` service).

    ```bash
    docker compose up
    ```

    Usa questo comando se prevedi una fase di sviluppo molto interattiva.

    - è anche possibile eseguire 'docker compose up -d'. Quando esegui docker compose up -d, Docker Compose avvia i container e poi restituisce immediatamente il controllo al tuo terminale. I container continuano a girare in background.. Richiede un comando separato (docker compose logs -f app) per vedere i log.
    - You will see the application logs directly in your terminal.
    - The application will be available at `http://localhost:3000`.

5.  **Hot Reloading (Live Code Changes):**

    - **Changes to your code in the `src/` directory (and `public/` directory) on your local machine should be visible immediately in your browser at `http://localhost:3000`**, similar to when using `pnpm run dev` directly.
    - This is because the `docker-compose.yml` file is configured to use **volumes** (`- ../src:/app/src` and `- ../public:/app/public`). These volumes map your local `src/` and `public/` directories into the `/app/src/` and `/app/public/` directories inside the running Docker container.
    - When you save a file in `src/` locally, Next.js (running inside the container) detects the change via this mounted volume and triggers its hot-reloading mechanism, updating your browser automatically.
    - **Note:** If hot-reloading seems sluggish or doesn't work reliably on your system, you might need to enable polling by uncommenting `CHOKIDAR_USEPOLLING: "true"` or `WATCHPACK_POLLING: "true"` in the `environment` section of your `docker-compose.yml` file.

6.  **Viewing Logs (if running in detached mode):**
    If you start the containers in detached (background) mode using `docker compose up -d`, you can view and follow the logs with:

    ```bash
    docker compose logs -f app
    ```

7.  **Stopping and Removing the Containers:**
    When you are done working or want to stop the application:

    - If `docker compose up` is running in your terminal, press `Ctrl+C` in that terminal.
    - To stop and remove the containers, network, and volumes defined in `docker-compose.yml` (if you ran in detached mode or from another terminal):
      ```bash
      docker compose down
      ```
      Using `docker compose down -v` will also remove any named volumes anonymous (though we don't explicitly define named volumes for the app code in this setup, it's a good practice for a full cleanup if needed).

8.  **Docker Image Optimization**: For guidance on creating a production-optimized, smaller Docker image from this starter, refer to the [Docker Image Optimization Guide](./guida_ottimizzazione_docker.md).

The `database/` directory from your host machine is also mounted into the container, so your SQLite database will persist across container restarts.

## Database (SQLite via BetterSQLite3)

This starter kit is configured to use **SQLite** as its local database, accessed directly via the `better-sqlite3` library for simplicity and speed in development.

### How the Database is Managed & Initialized:

1.  **Automatic Database File Creation:**

    - When you run the application for the first time (either via `pnpm run dev` locally or using `docker compose up`), a SQLite database file will be **automatically created** if it doesn't already exist.
    - This file is located in the `database/` directory at the root of your project.
    - The default name for the database file is `starter_default.db` (as configured in `src/lib/db/index.ts`).

2.  **Schema Definition (`database/schema.sql`):**

    - A crucial file named `schema.sql` is located in the `database/` directory.
    - **This is where you MUST define your database tables, indexes, and other schema elements using SQL DDL (Data Definition Language) statements.** For example, `CREATE TABLE ...`.

3.  **Automatic Schema Application (on First Run):**

    - Immediately after a **new** database file (e.g., `starter_default.db`) is created (i.e., on the very first run of the application with no existing database file), the application will:
      1.  Look for the `database/schema.sql` file.
      2.  If `schema.sql` exists and contains SQL statements, those statements will be **executed automatically** on the newly created database. This sets up your tables according to your definitions.
      3.  You will see messages in the console logs confirming the database creation and schema application status.
    - If `schema.sql` is not found or is empty, the new database will be created, but no tables will be set up initially. You will see a warning in the console.

4.  **Populating and Using `database/schema.sql` (Your Responsibility):**

    - **To create your database structure:** Open `database/schema.sql` and write your `CREATE TABLE` statements (and any other DDL like `CREATE INDEX`, etc.).
    - **Example `database/schema.sql`:**

      ```sql
      -- database/schema.sql
      CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          user_id TEXT, -- Assuming a link to a user
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
      );
      ```

    - The application will only attempt to apply `schema.sql` to a **brand new database file**. It will not re-apply or modify an existing database using this `schema.sql` file on subsequent runs to prevent accidental data loss.

### Mini-Guide: Setting Up Your Initial Database Schema

1.  **Locate (or Create) `database/schema.sql`**: Ensure this file exists in the `database/` directory.
2.  **Define Your Tables**: Open `database/schema.sql` and write your `CREATE TABLE` SQL statements as shown in the example above.
3.  **Run the Application for the First Time**:

    - Ensure no `database/starter_default.db` file currently exists (delete it if you're re-testing this initial setup).
    - Start the application:
      ```bash
      pnpm run dev
      # OR (if using Docker, from the Docker/ directory)
      # docker compose up
      ```
    - Check the console output. You should see logs indicating that `starter_default.db` was created and that `schema.sql` was applied (if it contained SQL).

4.  **Verify Schema Creation**:
    - Use a SQLite browser tool (e.g., DB Browser for SQLite, DBeaver, VS Code SQLite extension) to open the newly created `database/starter_default.db` file.
    - Inspect its structure to confirm that your tables and columns were created as defined in `schema.sql`.

### Managing Schema Changes (Migrations) - Beyond Initial Setup

- The automatic execution of `schema.sql` is for **initial database setup only**.
- For subsequent changes to your database schema (e.g., adding a new table, altering an existing one) _after_ the database already exists and contains data, you will need to implement a **migration strategy**.
- This starter kit does not include a built-in migration tool for `better-sqlite3`. Common approaches include:
  - Writing individual SQL migration scripts (e.g., `0001_create_users.sql`, `0002_add_bio_to_users.sql`).
  - Using a lightweight migration library compatible with `better-sqlite3` or writing a custom script to manage and apply these migrations.
- This is a more advanced topic typically addressed as your project grows.

This setup ensures that anyone using the starter kit can quickly get a database initialized with a predefined schema by simply populating `database/schema.sql` and running the application.

## Authentication (Clerk)

User authentication is handled by [Clerk](https://clerk.com/).

- Sign-up, sign-in, user profiles, and session management are managed by Clerk components and APIs.
- Ensure your Clerk instance is configured in the [Clerk Dashboard](https://dashboard.clerk.com/) with the correct redirect URLs and any social providers you wish to use.

### Access Control Pages

- `/devi-autenticarti`: Displayed when authentication is required.
- `/no-access`: Displayed when an authenticated user lacks permissions for a route.

### Route Protection

Route protection is implemented via `src/middleware.ts` using `clerkMiddleware`.

- **Public Routes**: (e.g., `/`, `/about`) - Accessible to all.
- **Authenticated Routes**: (e.g., `/features`, `/user-dashboard`) - Require login.
- **Admin Routes**: (e.g., `/dashboard`, `/admin/*`, `/api/admin/*`) - Require login and 'admin' role (defined in user's `publicMetadata.role` on Clerk and checked in `sessionClaims.metadata.role`).
  The `/dashboard` page is an example of an admin-only page.

## Code Quality & Formatting

- **ESLint** and **Prettier** are configured for linting and code formatting.
- **Naming Conventions**: Enforced by `eslint-plugin-check-file` (KEBAB_CASE for files and folders in `src`).
- To format code:
  ```bash
  pnpm run format
  ```
- Linting is typically integrated with your IDE and also run during the CI process.

## GitHub Workflow (CI)

(This section is from the original README, adapt as needed. The example `ci.yaml` uses `npm`, update to `pnpm`.)

A basic CI workflow can be set up using GitHub Actions. Create `.github/workflows/ci.yaml`:

```yaml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4 # Updated to v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4 # Use pnpm setup action
        with:
          version: 8 # Specify pnpm version (or latest)

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20" # Match Dockerfile Node version
          cache: "pnpm"

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      # Optional: Copy .env.example to .env for build process if needed
      # - name: Setup .env file
      #   run: cp .env.local.example .env.local # Or .env if your build needs it

      - name: Typecheck
        run: pnpm tsc --noEmit # Or your typecheck script

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build
```

This workflow will:

- Checkout code.
- Set up Node.js and pnpm.
- Install dependencies.
- Run type checking, linting, and the build process on every push.

## Starting a New Project from this Starter Kit

1. Create a new repository on GitHub (e.g., `my-new-project`). **Do not** initialize it with a README or other files.
2. Clone this starter kit repository (`nuno-starter-kit-2.0`) to your local machine.
3. Navigate into the cloned directory.
4. Remove the existing Git remote:
   ```bash
   git remote remove origin
   ```
5. (Optional, for a clean history in your new project) Remove the `.git` folder and re-initialize Git:
   ```bash
   rm -rf .git
   git init
   git branch -m main
   git add .
   git commit -m "Initial commit from nuno-starter-kit-2.0"
   ```
6. Add your new GitHub repository as the remote:
   ```bash
   git remote add origin <URL_OF_YOUR_NEW_GITHUB_REPO>
   ```
7. Push to your new repository:
   ```bash
   git push -u origin main
   ```
8. Follow the [Local Development Setup](#local-development-setup) steps for your new project.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [BetterSQLite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [pnpm Documentation](https://pnpm.io/motivation)

---

This README provides a comprehensive guide to get started with this Next.js starter kit.

```

**Punti Chiave di Questo README Fuso:**

*   **Nome Progetto Aggiornato:** "Nuno's Next.js Starter Kit 2.0".
*   **Tecnologie Chiave Evidenziate:** Docker, pnpm, BetterSQLite, Clerk sono menzionate chiaramente.
*   **Struttura Directory:** Ho cercato di riflettere la struttura attuale, inclusa `Docker/`, `database/`, e le pagine specifiche come `/user-dashboard`.
*   **Setup:** Istruzioni aggiornate per `pnpm` e per la configurazione di Docker e `.env.local`.
*   **Database:** Spiega l'uso di BetterSQLite e `schema.sql`.
*   **Autenticazione:** Dettagli su Clerk e la protezione delle rotte.
*   **CI Workflow:** Aggiornato l'esempio per usare `pnpm` e azioni GitHub più recenti.
*   **"Starting a New Project":** Istruzioni chiare su come usare questo starter per un nuovo progetto.
*   **Rimozione di Stack Non Più Primario:** Ho rimosso riferimenti dettagliati a Drizzle/Postgres, NextAuth, NextUI, Conform.js dallo stack principale se non sono attivamente configurati e usati in *questa* versione dello starter (anche se potrebbero essere nel `package.json` originale). L'obiettivo è descrivere lo stato *attuale* dello starter. Se vuoi mantenerli come "opzioni facili da integrare", puoi menzionarli in una sezione separata.

```
