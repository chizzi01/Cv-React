# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo-style layout. The actual React app lives in `projects/myCv-React/`. All development work happens there.

```
Cv-React/
└── projects/myCv-React/   ← React app (work here)
    ├── src/
    │   ├── App.jsx         ← Single-page app root, all sections defined here
    │   ├── App.css
    │   ├── main.jsx
    │   └── components/     ← UI components
    └── package.json
```

## Commands

All commands must be run from `projects/myCv-React/`:

```bash
cd projects/myCv-React

npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint (0 warnings allowed)
npm run deploy     # Build + deploy to GitHub Pages via gh-pages
```

## Architecture

**Single-page CV/portfolio** — `App.jsx` is the entire application. There is no routing; navigation is anchor-based (`#section-id`). Sections are rendered sequentially in one long page:

- `#avatar-section` — profile photo and title
- `#estudios-section` — education with animated progress bars
- `#aptitudes-section` — soft skills
- `#experiencia-section` — work experience cards
- `#devtools-section` — tech stack icons
- `#proyectos-section` — portfolio project cards
- `#contacto-section` — contact form (uses [formsubmit.co](https://formsubmit.co))

**Scroll-based visibility**: `App.jsx` uses `IntersectionObserver` for each section to trigger CSS entrance animations and track `seccionActual` (active nav section). Each section has a corresponding `isVisible` state and `ref`.

**Language support**: Stored in `localStorage` key `'language'` (`'es'` or `'en'`). Navbar reads this at module load time (not reactive — requires page reload to change).

**Styling**: Mix of `App.css` / `index.css` global styles and MUI component overrides. MUI theme is defined inline in `App.jsx`. Responsive breakpoint at 768px (`isMobile`).

**UI library**: MUI v5 (`@mui/material`, `@mui/joy`, `@mui/icons-material`) + `styled-components` + `@emotion`.

**Deployment**: GitHub Actions (`.github/workflows/workflowPages`) auto-deploys to GitHub Pages on push to `main`. Vite `base` is set to the full GitHub Pages URL in `vite.config.js`.

## Key Conventions

- Components use **named exports** (e.g., `export function Avatar()`). Imports in `App.jsx` use PascalCase even when filenames are lowercase.
- No state management library — all state lives in `App.jsx` and is passed as props.
- No tests are configured.
- `console.log` calls exist in production code (e.g., navbar); this is expected.
