# Repo Doctor

Repo Doctor is a modern web application for demonstrating repository health analysis. It gives developers, students and technical reviewers an explainable score across documentation, security, architecture, testing, automation, maintainability and portfolio readiness.

The current version ships a polished demo scan experience and a clean technical foundation for real repository analysis rules.

## Stack

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Prisma
- PostgreSQL
- Docker and Docker Compose
- npm workspaces

## Current Features

- Light, responsive and accessible Repo Doctor homepage.
- Interactive demo scan with staged progress.
- Animated Repository Health Score.
- Category dashboard rendered from typed data.
- Filterable findings rendered from a TypeScript array.
- Recommended fixes rendered from a TypeScript array.
- Mock report exports for JSON and Markdown.
- Initial Prisma schema for repositories, scans, findings and category scores.
- Modular `packages/core` foundation for future analysis rules.

## Project Structure

```txt
apps/web/
  app/
  components/
  lib/
  types/

packages/core/
  src/
    rules/
    index.ts
    scoring.ts
    types.ts

prisma/
  schema.prisma
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The web app runs at:

```txt
http://localhost:3000
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Prisma

Generate the Prisma client:

```bash
npm run prisma:generate
```

Run a development migration after PostgreSQL is available:

```bash
npm run prisma:migrate
```

## Docker

Build and run the web app with PostgreSQL:

```bash
docker compose up --build
```

The app will be available at `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env` for local database configuration:

```bash
DATABASE_URL="postgresql://repo_doctor:repo_doctor@localhost:5432/repo_doctor?schema=public"
NEXT_PUBLIC_APP_NAME="Repo Doctor"
```

## Roadmap

- Implement filesystem-based repository scanning.
- Add rule packs for documentation, security, architecture, tests and CI/CD.
- Persist scan results through Prisma and PostgreSQL.
- Add repository URL import and background scan jobs.
- Add richer report formats and reviewer-oriented summaries.
- Add automated test coverage for scoring and rules.

## Purpose

Repo Doctor is designed to help teams understand what weakens a repository before it is released publicly, submitted for academic review or assessed in a technical process. It does not replace professional security audits or dedicated SAST tools; it provides an initial, explainable quality signal and a practical improvement plan.

## License

MIT
