# CulinArch.AI — Landing Page

> A system. A structure. A new language of taste. We're not here to share recipes.

## Overview

This is the official landing page for **CulinArch.AI** — an AI-powered culinary intelligence platform. The page features an interactive canvas animation that transforms binary rain into the brand name, reflecting the project's core concept of structured data becoming something meaningful.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Next.js](https://nextjs.org/) | 14.2.5 | React framework (App Router) |
| [React](https://react.dev/) | 18.3.1 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5.4 | Type safety |
| [ESLint](https://eslint.org/) | ^8.57 | Code linting |
| [Prettier](https://prettier.io/) | ^3.3 | Code formatting |

## Project Structure

```
culinarchai-landing/
├── app/
│   ├── page.tsx           # Main landing page with canvas animation
│   ├── globals.css        # Global dark-theme styles
│   └── (api)/
│       └── health/
│           └── route.ts   # Health check endpoint → GET /api/health
├── public/
│   └── robots.txt         # SEO crawler configuration
├── .eslintrc.json         # ESLint rules
├── .prettierrc            # Prettier formatting config
├── .gitignore             # Git ignore rules
├── next.config.js         # Next.js + security headers config
├── tsconfig.json          # TypeScript config (strict mode)
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd culinarchai-landing

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |

## API Endpoints

### `GET /api/health`

Returns service health status. Useful for uptime monitoring and deployment checks.

**Response:**
```json
{
  "ok": true,
  "ts": "2026-03-01T00:00:00.000Z",
  "service": "culinarchai"
}
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

For other platforms, build and serve the output:

```bash
npm run build
npm run start
```

### Environment Variables

No environment variables are required for the base landing page. Create a `.env.local` file for any future additions:

```bash
cp .env.example .env.local
```

## Security

The application is configured with the following HTTP security headers (via `next.config.js`):

- **X-Content-Type-Options** — Prevents MIME type sniffing
- **X-Frame-Options** — Blocks clickjacking via iframes
- **X-XSS-Protection** — Legacy XSS filter (modern browsers ignore, kept for compatibility)
- **Referrer-Policy** — Controls referrer information
- **Permissions-Policy** — Restricts access to browser APIs
- **Content-Security-Policy** — Restricts resource loading origins

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run format:check` before committing
4. Open a pull request with a clear description

## License

Private — All rights reserved © CulinArch.AI
