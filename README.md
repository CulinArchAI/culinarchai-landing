# CulinArchAI — Public Website

> A system. A structure. A new language of taste.

This repository contains the public website foundation for **CulinArchAI**, a research-led culinary intelligence platform.

The current release is intentionally focused on:

- public positioning,
- the working platform architecture,
- evidence and methodology principles,
- research direction,
- phased development language,
- accessible and performance-conscious presentation.

It does **not** expose internal datasets, authenticated tools, unfinished APIs, or unsupported scale claims.

## Technology

- Next.js 14 App Router
- React 18
- TypeScript
- CSS design tokens and responsive layouts
- Canvas-based hero identity study
- Vercel deployment

## Project structure

```text
app/
├── api/health/route.ts   # GET /api/health
├── globals.css           # Culinary Atlas visual system
├── icon.svg              # App icon
├── layout.tsx            # Metadata, fonts, and root layout
├── page.tsx              # Public homepage
├── robots.ts             # Environment-aware crawler policy
└── sitemap.ts            # Initial sitemap
components/
├── hero-canvas.tsx       # Reduced-motion-aware identity animation
└── site-header.tsx       # Responsive navigation
```

## Local development

Requirements:

- Node.js 18.17 or later
- npm

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run format:check
```

## Deployment policy

- Work should be developed on feature branches.
- Pull requests should receive a Vercel preview before merge.
- Preview and development deployments are configured as `noindex` through the metadata and robots routes.
- Production uses `https://culinarch.ai` as its canonical origin.

## Content governance

Before public release, confirm:

1. the definitions and maturity states of ArcOS, Culinary Intelligence, Culinary Archaeology, and ArchSense;
2. the public contact address;
3. all capability and data claims;
4. source, provenance, and licensing language;
5. the initial research publication set.

## Health check

`GET /api/health`

```json
{
  "ok": true,
  "service": "culinarchai",
  "timestamp": "2026-07-01T00:00:00.000Z"
}
```

## License

Private project. All rights reserved © CulinArchAI.
