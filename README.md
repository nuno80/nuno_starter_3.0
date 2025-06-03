# Nuno's Next.js Starter Kit 2.0

A comprehensive Next.js 15 starter kit designed to accelerate the setup process for new web applications. It provides a pre-configured environment with Docker for development, pnpm, TypeScript, Tailwind CSS, shadcn/ui (base), BetterSQLite for local database, and Clerk for authentication.

---

## 🚀 Quickstart Guide

1. **Clone & Install:**

   ```bash
   git clone https://github.com/nuno80/nuno-starter-kit-2.0.git my-new-app # Replace with your repo URL if different
   cd my-new-app
   pnpm install
   pnpm add -D tsx # Ensure tsx is available for DB scripts
   ```

2. **Environment Variables:**
   Copy `.env.local.example` to `.env.local` (if `example` file exists, otherwise create `.env.local` manually).

   ```bash
   # cp .env.local.example .env.local
   ```

   Fill in your Clerk keys in `.env.local`:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY
   CLERK_SECRET_KEY=sk_test_YOUR_KEY
   ```

3. **Initialize Database:**
   Define your initial table structure in `database/schema.sql`, then run:

   ```bash
   pnpm run db:migrate
   ```

4. **Run Development Server:**

   - With Docker (Recommended for a consistent environment)\*\*
     First, ensure Docker Desktop is running. Then, from your project root directory:

     ```bash
     # Navigate into the Docker directory
     cd Docker

     # Build the Docker image (run this for the first time, or after Dockerfile/config changes)
     docker compose build --no-cache app

     # Start the application using Docker Compose
     docker compose up
     ```

     The application will be available at `http://localhost:3000`. (See the "Running with Docker" section below for more details on detached mode and logs).

## Table of Contents

- [Quickstart Guide](#-quickstart-guide)
- [Project Purpose](#project-purpose)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Directory Structure](#directory-structure)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables-1)
  - [Database Management](#database-management)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [Authentication (Clerk)](#authentication-clerk)
- [Code Quality & Formatting](#code-quality--formatting)
- [GitHub Workflow (CI)](#github-workflow-ci)
- [Using as a Starter for New Projects](#using-as-a-starter-for-new-projects)
- [Resources](#resources)

## Project Purpose

This project serves as a robust foundation for building modern web applications using Next.js. It aims to:

- Streamline initial project setup.
- Provide a pre-configured, Dockerized development environment.
- Integrate essential tools for styling, data management, and authentication.
- Emphasize code quality through linting, formatting, and TypeScript.
- Include a basic CI workflow for GitHub Actions.

This starter kit uses **Clerk** for authentication and **BetterSQLite** (via `better-sqlite3`) for local database management.

## Technology Stack

### Core & Development

- **Next.js 15** (App Router)
- **TypeScript**
- **pnpm**
- **Docker & Docker Compose**

### Styling & UI

- **Tailwind CSS**
- **shadcn/ui (Base)** (Setup for theming, add components via `pnpm dlx shadcn-ui@latest add ...`)
- **next-themes** (Dark/Light mode)
- **lucide-react** (Icons)

### Database

- **SQLite** (via `better-sqlite3`)

### Authentication

- **Clerk** (`@clerk/nextjs`)

### Code Quality

- **ESLint** (with `next/core-web-vitals`, `next/typescript`)
- **Prettier** (with import sorting and Tailwind class sorting)
- `eslint-plugin-check-file` (Naming conventions)

_(Note: The original starter kit from which this was derived included other libraries like NextUI, Drizzle, NextAuth, etc. This version has been streamlined to focus on the stack listed above. You can integrate other tools as needed.)_

## Key Features

- Dockerized Development Environment.
- BetterSQLite Integration with manual schema migration.
- pnpm for package management.
- Clerk Authentication base setup.
- Path Aliases (`@/*`) configured.
- Tailwind CSS Theming base.

## Directory Structure

```

nuno-starter-kit-2.0/
├── Docker/ # Docker configuration (Dockerfile, docker-compose.yml)
├── database/ # Database files (schema.sql, .gitkeep; .db file is gitignored)
├── public/ # Static assets
├── src/ # Application source code
│ ├── app/ # Next.js App Router
│ ├── components/ # Reusable React components (ui/ for shadcn)
│ ├── lib/ # Core libraries (db connection in lib/db/index.ts)
│ ├── db/ # Database scripts (migrate.ts, reset.ts, utils.ts)
│ └── types/ # TypeScript definitions
├── .dockerignore
├── .env.local.example # Example environment variables
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── components.json # shadcn/ui config
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json

```

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (be sure to update to v20.x to be aligned with Dockerfile)
- [pnpm](https://pnpm.io/installation)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nuno80/nuno-starter-kit-2.0.git my-app
   cd my-app
   ```

2. **Choose Your Development Approach:**

   - **Option A: Docker-Only Development (Recommended for consistency)**
     If you plan to develop exclusively within the Docker environment, you **do not need to run `pnpm install` on your local machine (WSL).** Docker will handle dependency installation. Proceed to "Environment Variables" and then to the "Running with Docker" section. The database migration script will also be run inside the Docker container.

   - **Option B: Local Development (or Hybrid with Docker)**
     If you want to run `pnpm run dev` directly on your local machine (WSL) or need local `node_modules` for IDE tooling:

     1. **Align Your Local Node.js Version (v20.x Recommended):**
        (Mantieni le istruzioni per nvm e il warning sul lockfile come prima)

        ```bash
        # Example using nvm:
        nvm install 20
        nvm use 20
        ```

     2. **Install Dependencies Locally:**

        ```bash
        pnpm install
        pnpm add -D tsx # Ensures tsx is available for local DB scripts
        ```

        ⚠️ **Warning:** Ensure your local Node.js version matches the project's target (v20.x) to keep `pnpm-lock.yaml` consistent with the Docker environment. If you use a different Node version and regenerate `pnpm-lock.yaml`, it might cause issues with the Docker build

3. **Set up Environment Variables:**

   1. Create a `.env.local` file in the project root (you can copy `.env.local.example` if it exists).
   2. Add your Clerk keys:

      ```env
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
      CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY
      # Optional: NEXT_PUBLIC_APP_URL=http://localhost:3000
      # Optional: Clerk redirect URLs (can also be set in Clerk Dashboard)
      ```

      Get keys from the [Clerk Dashboard](https://dashboard.clerk.com/).

4. **Initialize the Database Schema:**

   - **If using Docker-Only Development:** You will run the migration script _inside_ the Docker container after it's up and running for the first time:

     ```bash
     # After 'docker compose up -d'
     docker compose exec app pnpm run db:migrate
     ```

   - **If using Local Development:**

     ```bash
     pnpm run db:migrate
     ```

### Database Management

This starter uses SQLite via `better-sqlite3`. The schema is defined in `database/schema.sql` and applied using pnpm scripts.

1. **Database File (`database/starter_default.db`):**

   - Created in the `database/` directory when you run `pnpm run db:migrate` or when the app first connects (if the schema was already applied).
   - This file is gitignored and should not be committed.

2. **Schema Definition (`database/schema.sql`):**

   - Define your `CREATE TABLE IF NOT EXISTS ...`, `CREATE INDEX IF NOT EXISTS ...`, etc., SQL statements here.

3. **Managing Your Schema (Development Workflow):**

   - **`pnpm run db:migrate` (Initialize or Apply Non-Destructive Schema Updates):**
     - **Use For:** Initial database setup; adding new tables/indexes to `schema.sql` (using `IF NOT EXISTS`).
     - **How it Works:** Executes the entire `database/schema.sql` file.
   - **`pnpm run db:reset` (Wipe and Recreate Database from Schema):**
     - **Use For:** Major schema changes, starting fresh with an empty DB, or troubleshooting.
     - **Warning:** This command **deletes all data** in your local `starter_default.db`.
     - **How it Works:** Deletes the current `.db` file, then re-applies `schema.sql` via the migration logic.

4. **Initial Setup Steps:**

   1. Define your initial table structure in `database/schema.sql`.
   2. Run: `pnpm run db:migrate`
   3. Verify table creation using a SQLite browser.

5. **Making Schema Changes Later:**

   - **Additive (new tables/indexes with `IF NOT EXISTS`):** Update `schema.sql`, run `pnpm run db:migrate`.
   - **Destructive/Complex (ALTER, DROP):** Update `schema.sql`, then run `pnpm run db:reset` (this wipes local data). For production or data preservation, a versioned migration system is needed (see "Advanced Migrations").

6. **Advanced Migrations (Future Consideration):**
   The current `db:migrate` is basic. For evolving a database with data, a versioned migration system (individual SQL files, managed by a tool or custom script) is recommended.

### Running Locally

```bash
pnpm run dev
```

Access at `http://localhost:3000`. Ensure you've run `pnpm run db:migrate` at least once.

### Running with Docker

(Recommended for a consistent environment)

1. **Ensure Docker Desktop is running.**
2. Navigate to the `Docker/` directory: `cd Docker`
3. **Build image (first time or after Dockerfile/config changes):**

   ```bash
   docker compose build --no-cache app
   ```

4. **Run containers:**

   ```bash
   docker compose up
   ```

   (For detached mode, use `docker compose up -d`. View logs with `docker compose logs -f app`.)
   Access at `http://localhost:3000`.

5. **Hot Reloading:** Code changes in `src/` and `public/` on your local machine should reflect immediately in the browser due to Docker volume mounts. If not, try uncommenting `WATCHPACK_POLLING: "true"` in `docker-compose.yml`.

6. **Stopping Containers:** Press `Ctrl+C` in the terminal running `docker compose up`, or run `docker compose down` (use `docker compose down -v` for full cleanup including anonymous volumes).

7. **Production Optimization:** Refer to [`guida_ottimizzazione_docker.md`](./guida_ottimizzazione_docker.md) for creating smaller production images.

## Authentication (Clerk)

(Questa sezione sembra già buona, la lascio com'era nel tuo file)
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

(Questa sezione sembra già buona)

- **ESLint** and **Prettier** are configured for linting and code formatting.
- **Naming Conventions**: Enforced by `eslint-plugin-check-file` (KEBAB_CASE for files and folders in `src`).
- To format code:

  ```bash
  pnpm run format
  ```

- Linting is typically integrated with your IDE and also run during the CI process.

## GitHub Workflow (CI)

(Questa sezione sembra già buona e aggiornata per pnpm)
A basic CI workflow can be set up using GitHub Actions. Create `.github/workflows/ci.yaml`:

```yaml
name: CI
# ... (contenuto YAML come l'avevi, è corretto per pnpm)
# ... (assicurati che node-version in setup-node sia '18' o '20' per coerenza col Dockerfile)
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8 # Or your target pnpm version

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20" # Match your project's Node.js version (e.g., from Dockerfile)
          cache: "pnpm"

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm tsc --noEmit # Or your specific typecheck script

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm run build
```

## Using as a Starter for New Projects

(Questa sezione sembra già buona)

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

8. Follow the [Development Setup](#development-setup) steps for your new project.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)

- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [BetterSQLite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [pnpm Documentation](https://pnpm.io/motivation)

```

```
