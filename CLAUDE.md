# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js version

This repo runs **Next.js 16.2.4 with React 19.2.4**. APIs, conventions, and file structure differ from older Next.js versions you may know. Before writing or editing Next.js code (routing, data fetching, dynamic params, server vs client components, etc.), read the relevant guide in [node_modules/next/dist/docs/](node_modules/next/dist/docs/) and heed deprecation notices.

Concrete examples already in use here:

- `searchParams` is a `Promise` and must be `await`ed inside the page component (see [app/scene/page.tsx](app/scene/page.tsx)).
- Tailwind v4 syntax is used in `globals.css` (e.g. `bg-linear-to-b`, not `bg-gradient-to-b`).

## Commands

The package manager is **pnpm** (see [pnpm-lock.yaml](pnpm-lock.yaml), [pnpm-workspace.yaml](pnpm-workspace.yaml)).

- `pnpm dev` — run the Next.js dev server on http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (config: [eslint.config.mjs](eslint.config.mjs), extends `eslint-config-next`)
- `pnpm exec lint-staged` — what the `pre-commit` hook runs (eslint --fix on staged JS/TS)

There is no test runner configured.

### Commit hooks

Husky is enabled ([.husky/pre-commit](.husky/pre-commit), [.husky/commit-msg](.husky/commit-msg)). Commit messages must follow **Conventional Commits** ([commitlint.config.mjs](commitlint.config.mjs) extends `@commitlint/config-conventional`) — e.g. `feat:`, `fix:`, `docs:`. Don't bypass hooks (`--no-verify`) unless explicitly asked.

## Architecture

This is a fullscreen, **keyboard-driven scene player** intended for YouTube stream overlays. There is exactly one scene — the three-monitor display — and no database or API.

### Content

Display content is two typed TS constants:

- [app/lib/homeContent.ts](app/lib/homeContent.ts) — `homeContent`: home page `mainText` / `secondaryText`.
- [app/lib/monitor.ts](app/lib/monitor.ts) — `monitorScene`: the three panels' main text, secondary text, and optional background URL (image or iframe-able site).

Edit these directly to change what the app shows; TypeScript checks the shape on save.

### Routing and the keyboard model

- `/` — [app/page.tsx](app/page.tsx) → [app/components/HomeClient.tsx](app/components/HomeClient.tsx). Picks 3 random wallpapers from [public/homewallpapers/](public/homewallpapers/) (cached in `sessionStorage`), shows the home text, and listens for keys.
- `/scene` — [app/scene/page.tsx](app/scene/page.tsx) renders [app/scene/SceneClient.tsx](app/scene/SceneClient.tsx) with the loaded monitor config. Reads `?reveal=step|all` from search params.

Global keyboard shortcuts (do not break these — they are how the app is operated on stream):

- **A** (on home): enter the scene with all text visible.
- **Shift+A** (on home): enter with `reveal=step`. In step mode, **J** reveals next text, **K** hides last.
- **A** (within a scene): trigger the exit animation and route home.

### Stateful UX details (sessionStorage)

Two `sessionStorage` keys coordinate look-and-feel across navigations — change carefully:

- `home:selected-wallpapers:v1` — keeps the same trio of wallpapers across home re-renders.
- `scene:monitor-animation-sequence:v1` — incremented on every deliberate scene entry from home; `MonitorDisplay` mod-cycles through `animationSets` so consecutive scene entries get visually different transitions.

### Animation system

[app/components/MonitorDisplay.tsx](app/components/MonitorDisplay.tsx) defines `animationSets` (panel entry choreography) and `textRevealVariants` (per-monitor text effects). The CSS classes referenced here (`monitor-enter-*`, `monitor-content-enter/exit`, `text-reveal-*`, `subscribe-fancy`, `home-wallpaper-enter`) are defined in [app/globals.css](app/globals.css). When adding a new animation set, add a class set in `globals.css`, then push a new entry into `animationSets`; the home-side counter will start including it automatically.

### TypeScript / paths

`tsconfig.json` has `strict: true` and `@/*` mapped to `./*` (repo root) — i.e. `import x from "@/app/lib/monitor"`. Most existing imports use relative paths; match the surrounding file's style.

## docs/

[docs/](docs/) contains video planning notes (`video1.md`, `video3.md`, …) used by the human author for YouTube content. They are reference material, not project documentation — don't treat them as architectural source of truth.
