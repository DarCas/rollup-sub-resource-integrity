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
