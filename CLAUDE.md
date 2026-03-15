# CLAUDE.md — AI Assistant Guide for site-refine-v01

## Project Overview

This is the personal academic portfolio website for **Maël Rolland**, an independent researcher specializing in cryptocurrency political economy. The project is a bilingual (English/French) static website with a thin React/Vite shell as a router, while the actual content pages are plain HTML files in `public/`.

The project was bootstrapped via [Lovable](https://lovable.dev/projects/bc307623-8eb9-44cf-b305-e67eecfefc83) and uses Vite + React + TypeScript + Tailwind CSS + shadcn-ui.

---

## Development Commands

```bash
npm run dev        # Start dev server at http://localhost:8080
npm run build      # Production build → dist/
npm run build:dev  # Development-mode build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

The dev server binds to `::` (IPv6 dual-stack) on port **8080**. Both `npm` and `bun` are supported (`bun.lockb` is present alongside `package-lock.json`); `npm` is primary.

---

## Architecture

### Hybrid Static + React Architecture

This project uses an unusual architecture: **React is only a thin routing shell**. The real content is served from standalone HTML files in `public/`, embedded via `<iframe>` in React pages.

```
React App (src/)
  └── Routes → Page components
        ├── Index.tsx     →  <iframe src="/index.html">
        ├── Crisis.tsx    →  <iframe src="/crisis.html">
        └── CrisisFr.tsx  →  <iframe src="/crisis-fr.html">

public/
  ├── index.html, index-fr.html             ← main portfolio pages
  ├── crisis.html, crisis-fr.html           ← Bitcoin/Ethereum vulnerability timelines
  ├── curriculum.html, curriculum-fr.html
  ├── these.html, these-fr.html
  ├── talks.html, talks-fr.html
  ├── contact.html, contact-fr.html
  ├── collaborate.html, collaborate-fr.html
  ├── rare-pepe.html, rare-pepe-fr.html
  ├── atelier.html
  ├── soutenance.html, soutenance-fr.html
  ├── soutenance-edition.html, soutenance-edition-fr.html
  ├── 404.html, 404-fr.html
  ├── sitemap.html, plan-du-site.html
  ├── sitemap.xml
  ├── style.css                              ← global styles for all HTML pages
  └── assets/
      ├── img/    ← avatars, event photos
      ├── icons/  ← social media, theme, UI icons
      └── pdf/    ← CV, thesis chapters, presentations
```

**Key implication**: Most content work happens in `public/*.html` and `public/style.css`, not in `src/`.

### React Source Structure

```
src/
├── App.tsx           # Root: providers (QueryClient, Tooltip), BrowserRouter, Routes
├── App.css           # App-specific styles
├── main.tsx          # ReactDOM.createRoot entry point
├── index.css         # Global Tailwind directives + CSS custom properties (theming)
├── vite-env.d.ts     # Vite environment type declarations
├── pages/
│   ├── Index.tsx     # Iframe wrapper → /index.html
│   ├── Crisis.tsx    # Iframe wrapper → /crisis.html
│   ├── CrisisFr.tsx  # Iframe wrapper → /crisis-fr.html
│   └── NotFound.tsx  # 404 catch-all (inline React component)
├── components/
│   └── ui/           # 49 shadcn-ui components (do not modify these manually)
├── hooks/
│   ├── use-mobile.tsx   # useIsMobile() — detects viewport < 768px
│   └── use-toast.ts     # useToast() — shadcn toast integration
└── lib/
    └── utils.ts      # cn() — clsx + tailwind-merge class utility
```

---

## Adding New Pages

### Adding a new HTML content page

1. Create `public/my-page.html` (copy an existing page as a template for consistent styling)
2. Link `style.css` in the `<head>`: `<link rel="stylesheet" href="style.css">`
3. Create `src/pages/MyPage.tsx`:

```tsx
const MyPage = () => (
  <iframe
    src="/my-page.html"
    style={{ width: '100%', height: '100vh', border: 'none', margin: 0, padding: 0, overflow: 'hidden' }}
    title="Page Title"
    onError={() => console.error('Failed to load my-page.html')}
    onLoad={() => console.log('my-page.html loaded successfully')}
  />
);
export default MyPage;
```

4. Register the route in `src/App.tsx` **above** the `*` catch-all:

```tsx
<Route path="/my-page" element={<MyPage />} />
```

5. Create the French counterpart `public/my-page-fr.html` and add a `/my-page-fr` route.

### Adding a new React-native page (without iframe)

For interactive content that needs React, skip the iframe and write JSX directly in the page component. Use shadcn-ui components from `@/components/ui/`.

---

## Styling Conventions

### Two Separate Style Systems

There are **two distinct styling contexts** in this project:

1. **React app** (`src/index.css`) — Tailwind CSS with CSS custom properties for theming (HSL-based color tokens: `--primary`, `--secondary`, `--background`, etc.). Use Tailwind utility classes and `cn()` for merging.

2. **Public HTML pages** (`public/style.css`) — Plain CSS / CSS custom properties, **no Tailwind**. This is a large file (11,000+ lines). Edits here affect all HTML pages globally. The file uses the "Press Start 2P" retro pixel font and a dark-red/gold color scheme.

### Class Name Utility

Always use `cn()` from `@/lib/utils` for conditional or merged class names in React components:

```tsx
import { cn } from "@/lib/utils";
<div className={cn("base-class", condition && "conditional-class", className)} />
```

### Tailwind Dark Mode

Dark mode is class-based (`class` strategy). Toggle by adding/removing `dark` class on the root `<html>` element. Use `next-themes` if implementing a theme toggle.

### Design Tokens (React layer)

All colors in `src/index.css` are defined as HSL CSS custom properties:

```css
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;
/* etc. */
```

Tailwind references these via `hsl(var(--token-name))` in `tailwind.config.ts`.

---

## Routing

Routes are defined in `src/App.tsx`. The app is wrapped with `QueryClientProvider`, `TooltipProvider`, `Toaster`, and `Sonner` at the root level.

| URL | React Page | Loaded Content |
|-----|-----------|----------------|
| `/` | `Index.tsx` | `/public/index.html` |
| `/crisis` | `Crisis.tsx` | `/public/crisis.html` |
| `/crisis-fr` | `CrisisFr.tsx` | `/public/crisis-fr.html` |
| `/*` | `NotFound.tsx` | Inline React 404 page |

**Important**: Place all new `<Route>` entries **above** the catch-all `<Route path="*">`. The comment `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}` in `App.tsx` marks the correct insertion point.

---

## Bilingual Support

The site is fully bilingual. Convention:

- English: `page.html` / route `/page`
- French: `page-fr.html` / route `/page-fr`

All new pages should have a corresponding French version. Navigation links between language variants are handled in-page within the HTML files (not in the React layer). The French sitemap is `plan-du-site.html`.

---

## Public Assets

`public/` contains all static content served directly:

- **HTML pages** (~25 files) — the primary content of the website
- **`style.css`** — global stylesheet for all HTML pages
- **`assets/img/`** — avatars (`avatar-*.jpg`), event photos (JPEG/PNG)
- **`assets/icons/`** — social media icons (Bluesky, Discord, Farcaster, Github, etc.), theme icons (Sun.jpg, Moon.jpg), topic/UI icons
- **`assets/pdf/`** — CV, thesis chapters, credentials, presentation slides
- **`manifest.json`** — PWA manifest
- **`sitemap.xml`** — SEO sitemap
- **`update-swarm-urls.sh`** — utility shell script (do not modify without understanding its purpose)

When referencing assets from public HTML files, use relative paths (e.g., `assets/img/avatar.jpg`). From React components, paths are relative to `public/` root (e.g., `/assets/img/avatar.jpg`).

---

## Key Dependencies

| Dependency | Purpose |
|-----------|---------|
| `react` + `react-dom` v18 | UI framework |
| `react-router-dom` v6 | Client-side routing |
| `@tanstack/react-query` v5 | Server state management (available but not actively used) |
| `shadcn-ui` (via Radix UI) | 49 accessible UI components |
| `tailwindcss` v3 | Utility-first CSS for React layer |
| `react-hook-form` + `zod` | Form handling + validation |
| `lucide-react` | Icon library |
| `recharts` | Charts (available, not yet used) |
| `sonner` | Toast notifications |
| `next-themes` | Theme toggling support |
| `lovable-tagger` | Dev-only component tagging for Lovable platform |
| `@vitejs/plugin-react-swc` | Vite plugin using SWC for fast compilation |

---

## TypeScript Configuration

- Path alias `@/*` maps to `./src/*` — always use this for imports within `src/`
- **Strict mode is OFF** — `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters` are all disabled
- Target: ES2020, Module: ESNext, `moduleResolution: "bundler"`
- JSX transform: `react-jsx` (no need to import React in every file)
- JS files are allowed (`allowJs: true`)

---

## shadcn-ui Components

The `src/components/ui/` directory contains 49 pre-built shadcn-ui components. **Do not manually edit these files.** To add new shadcn-ui components, use the CLI:

```bash
npx shadcn-ui@latest add <component-name>
```

Import them with the `@/components/ui/` alias:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

The `components.json` config file at the project root controls shadcn-ui CLI behavior (style: `default`, base color: `slate`, CSS variables enabled).

---

## Build Configuration

`vite.config.ts` key settings:
- Dev server host: `::` (IPv6 dual-stack, accessible at `localhost:8080`)
- React plugin: `@vitejs/plugin-react-swc` (SWC compiler for fast HMR)
- `lovable-tagger` plugin active in development mode only
- Path alias: `@` → `./src`

`tailwind.config.ts` key settings:
- `darkMode: ["class"]` — class-based dark mode
- Content scan: `./src/**/*.{ts,tsx}` (React layer only; public HTML uses its own CSS)
- `tailwindcss-animate` plugin for accordion and other animations
- Responsive 2xl breakpoint at 1400px

---

## No Tests

There is no test framework configured in this project. There are no test files, no Vitest/Jest setup, and no test scripts. Do not attempt to run tests.

---

## No CI/CD

There is no `.github/` directory or GitHub Actions configuration. The project is deployed via the [Lovable platform](https://lovable.dev). Deployment happens automatically when changes are pushed to the main branch.

---

## Common Pitfalls

- **Editing content**: Content changes almost always go in `public/*.html` or `public/style.css`, not in `src/`.
- **Adding routes**: New React routes must be added in `src/App.tsx` above the `*` catch-all.
- **Iframe sizing**: Iframe pages use `height: 100vh` — ensure the HTML page's body has no default margin to prevent scrollbars.
- **Style conflicts**: The React layer and the iframe content are in separate DOM contexts — styles do not bleed between them.
- **Asset paths**: Static assets are under `public/assets/img/`, `public/assets/icons/`, and `public/assets/pdf/` — not directly in `public/images/` or `public/`.
- **Bilingual pages**: Every new page needs an English and French version. Add both routes.
- **style.css scope**: Edits to `public/style.css` affect all HTML pages globally — be careful with changes.
- **shadcn-ui edits**: Never manually edit files in `src/components/ui/`; use the CLI instead.
