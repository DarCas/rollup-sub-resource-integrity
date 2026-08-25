# AGENTS.md

Single-file Rollup/Vite plugin (`@darcas/rollup-sub-resource-integrity`) that injects SRI `integrity` (and `crossorigin="anonymous"` when missing) attributes into emitted HTML during `generateBundle`. Zero runtime dependencies since v2.0.0.

## Commands

```bash
npm run build     # rm -rf dist && tsc && terser minify -> dist/index.min.js
npm run deploy    # build + npm publish --access public
npm test          # vitest run (unit tests + real Vite build integration test)
```

- Verify changes with `npx tsc --noEmit` and `npm test`.
- No lint/format tooling configured; follow `.editorconfig` (4-space indent for TS, 2-space for JSON, trailing commas when multiline).

## Release flow

Publishing is automated: pushing a `v*` tag triggers `.github/workflows/publish.yml`, which runs `npm run deploy`. To release: bump `version` in `package.json`, commit, tag `vX.Y.Z`, push the tag.

## Gotchas

- `package-lock.json` is gitignored — CI uses `npm install`, never `npm ci`.
- `dist/` is a build artifact (gitignored); `package.json` `main`/`types` point at `dist/index.min.js` / `dist/index.d.ts`, so a stale `dist` breaks local consumers — always rebuild after editing `src/index.ts`.
- Zero runtime dependencies; `rollup` is a peerDependency, its types are imported type-only (provided transitively by the `vite` devDependency). The plugin return type is Vite's `Plugin` because `apply`/`enforce` are Vite-specific options.
- HTML rewriting uses a targeted regex over `<script src>` / `<link rel="stylesheet|preload|modulepreload">` tags — no DOM parser. External URIs (`http(s):`, protocol-relative, `data:`) and resources missing from the bundle are silently skipped.
- Resources are hashed from the in-memory bundle (`chunk.code` / `asset.source`), never from disk; the hook is `generateBundle`, not `writeBundle` (mutating the bundle in `writeBundle` would not affect written files).
- URI resolution: root-relative (`/assets/x.js`) maps to bundle keys directly; relative URIs resolve against the emitting HTML file's directory via `path.posix`; query strings/hashes are stripped.

## Website (landing) — separate build

The repo also hosts a marketing/landing site under `website/` (React 19 + Vite 7 + TS, custom CSS, no UI libs), deployed to GitHub Pages at `https://sri.os.darcas.app/` via `.github/workflows/pages.yml` (trigger: push on `master` touching `website/**`, artifact upload + `deploy-pages`). Runtime is a Vite SPA prerendered to static HTML for crawlers/SEO.

- Build: `cd website && npm run build` → `tsc --noEmit && vite build && node scripts/prerender.mjs` (injects `renderToString(<App/>)` into `dist/index.html` `#root`). Output lands in `website/dist/` (do NOT confuse with the plugin's `dist/`).
- SEO on-page: `website/index.html` holds `<title>`, meta description/robots, canonical, Open Graph + Twitter cards, and a JSON-LD `@graph` (WebSite + Organization → `https://casertano.name/#organization` + SoftwareApplication). `website/public/` holds `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `og.png` (1200×630), `favicon.svg`, plus the `CNAME` file copied into `dist/` by CI.
- The site runs the plugin itself: `SubResourceIntegrity()` in `website/vite.config.ts` and the plugin is a devDependency (`@darcas/rollup-sub-resource-integrity`). Any plugin change must be rebuilt + republished to npm before the website picks it up.
- Lighthouse baseline (local, desktop): Perf 99, A11y 100, Best Practices 100, SEO 100.
