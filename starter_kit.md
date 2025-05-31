# Starter Kit Analysis

This document provides an analysis of the provided Next.js starter kit, detailing its purpose and the technologies used.

## Project Purpose

This project serves as a comprehensive starter kit for building modern web applications using Next.js. It is designed to accelerate the setup process for new projects by providing a pre-configured environment with essential tools and libraries for development, styling, data management, and authentication. The kit emphasizes code quality through integrated linting and formatting tools and includes a continuous integration workflow to ensure code consistency and correctness. Based on the code analysis, the project utilizes Clerk for authentication and a SQLite database with Drizzle ORM for data management.

## Technology Stack

The starter kit is built upon a robust set of technologies, primarily focused on the JavaScript/TypeScript ecosystem. The key technologies and libraries included are:

### Core Framework

- **Next.js**: A React framework for building server-side rendered and statically generated web applications. The project is configured to use the `src` directory for application code.

### Language

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code maintainability and catching errors early.

### Styling and UI

- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **NextUI**: A React UI library for building beautiful and modern user interfaces.
- **next-themes**: A library for managing themes (like dark mode) in Next.js applications.
- **@tabler/icons-react**: A set of high-quality, customizable SVG icons for React.
- **lucide-react**: A collection of beautiful and customizable React components for icons.

### Code Quality and Formatting

- **ESLint**: A pluggable linting utility for JavaScript and JSX.
- **prettier**: An opinionated code formatter.
- **eslint-config-prettier**: Turns off ESLint rules that might conflict with Prettier.
- **@trivago/prettier-plugin-sort-imports**: A Prettier plugin for sorting import statements.
- **prettier-plugin-tailwindcss**: A Prettier plugin for automatically sorting Tailwind CSS classes.
- **eslint-plugin-check-file**: An ESLint plugin for enforcing file and folder naming conventions.
- **eslint-plugin-n**: An ESLint plugin with rules related to Node.js.

### Environment Variables

This section describes the tools used for managing environment variables, which are crucial for configuring the application based on the environment (e.g., development, production) without hardcoding sensitive information.

- **dotenv**: This library is used to load environment variables from a `.env` file into `process.env`. This allows you to define configuration variables in a file and access them within your application.
- **dotenv-expand**: This library enhances `dotenv` by allowing for variable expansion within the `.env` file. This means you can reference other variables defined in the same `.env` file (e.g., `DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/mydb"`).
- **@t3-oss/env-nextjs**: This library provides a typesafe approach to environment variables specifically for Next.js applications. It allows you to define a schema for your environment variables using Zod, ensuring that the necessary variables are present and have the correct type at build time and runtime. This prevents common errors caused by missing or incorrectly typed environment variables.
- **cross-env**: This utility is used to set environment variables across different operating system platforms. It provides a consistent way to set variables in your `package.json` scripts, ensuring that your commands work correctly regardless of the user's operating system.

Together, these tools provide a robust and typesafe system for managing environment variables in the project.

### Validation

- **zod**: A TypeScript-first schema declaration and validation library.
- **@conform-to/zod**: Integration between Conform and Zod for form validation.
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation.

### Forms

- **@conform-to/react**: A React hook for form management and validation.

### Database

- **SQLite**: A self-contained, high-reliability, embedded, full-featured, public-domain SQL database engine.
- **better-sqlite3**: A simple, fast, and reliable Node.js binding for SQLite3.
- **drizzle-orm**: A modern TypeScript ORM for relational databases, used here with SQLite.
- **drizzle-kit**: A CLI companion for Drizzle ORM for managing database migrations.

### Authentication

- **Clerk**: A complete user management platform, handling authentication, user profiles, and authorization. The project uses `@clerk/nextjs` for integration with Next.js.

#### Access Control Pages

The starter kit includes dedicated pages to handle different access control scenarios:

- **/devi-autenticarti**: This page is displayed when an unauthenticated user attempts to access a route that requires authentication. It informs the user that they need to log in to view the content.
- **/no-access**: This page is displayed when an authenticated user attempts to access a route for which they do not have the necessary permissions or roles. It indicates that the user is logged in but lacks the authorization to access the requested resource.

#### Route Protection

The starter kit implements route protection using Clerk middleware (`src/middleware.tsx`). This middleware defines different access levels for various routes:

- **Public Routes**: Accessible to everyone (e.g., `/`, `/about`, `/pricing`).
- **Authenticated Routes**: Require the user to be logged in (e.g., `/features`). Unauthenticated users are redirected to `/devi-autenticarti`.
- **Admin Routes**: Require the user to be logged in AND have the 'admin' role in their session claims (e.g., `/dashboard`). Users who are not authenticated or do not have the 'admin' role are redirected to `/no-access`. It is important to note that the existing `/dashboard` page is exclusively for administrators. If a dashboard for regular users is required, a separate page (e.g., `/user-dashboard`) should be created and protected accordingly.

This middleware ensures that users are automatically redirected to the appropriate access control page if they do not meet the requirements for a specific route.

This starter kit provides a solid foundation with these technologies, enabling developers to quickly build scalable and maintainable web applications, with a focus on Clerk for authentication and SQLite with Drizzle ORM for data persistence, and robust route protection.

## Directory Structure

The project follows a standard Next.js structure with a `src` directory. The key directories and files are organized as follows:

```
starter_kit/
├── src/ # Contains the main application source code
│   ├── app/ # App Router directory for pages, layouts, and API routes
│   │   ├── about/ # Route segment for the About page
│   │   ├── admin/ # Route segment for admin-related pages
│   │   │   └── users/ # Route segment for admin user management page
│   │   ├── api/ # Route segment for API routes
│   │   │   └── admin/ # API routes for admin functionalities
│   │   │       ├── get-users/ # API route to get user list (admin only)
│   │   │       └── set-user-role/ # API route to set user roles (admin only)
│   │   ├── dashboard/ # Route segment for the admin dashboard page
│   │   ├── devi-autenticarti/ # Page displayed when authentication is required
│   │   ├── features/ # Route segment for the Features page
│   │   ├── no-access/ # Page displayed when user lacks permissions
│   │   └── pricing/ # Route segment for the Pricing page
│   ├── components/ # Reusable React components
│   │   └── ui/ # UI components (likely from a library like shadcn/ui or NextUI)
│   ├── hooks/ # Custom React hooks
│   ├── lib/ # Utility functions, database connection, and other helper code
│   └── types/ # TypeScript type definitions
├── .eslintrc.json # ESLint configuration file for code linting
├── .gitignore # Specifies intentionally untracked files that Git should ignore
├── .prettierrc.json # Prettier configuration file for code formatting
├── components.json # Configuration for UI components (likely shadcn/ui)
├── next.config.mjs # Next.js configuration file
├── package.json # Project dependencies and scripts
├── pnpm-lock.yaml # Lock file for pnpm package manager
├── postcss.config.mjs # PostCSS configuration file (used by Tailwind CSS)
├── README.md # Project README file
├── tailwind.config.ts # Tailwind CSS configuration file
└── tsconfig.json # TypeScript configuration file
```
