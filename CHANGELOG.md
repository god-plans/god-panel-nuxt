# Changelog

All notable changes to **God Panel Nuxt** are documented in this file. Versions follow the package version in `package.json`.

## [2.1.0] - 2026-04-20

### Added

- **Icons:** [Solar](https://icon-sets.iconify.design/solar/) via [`@nuxt/icon`](https://github.com/nuxt/icon), with [`@iconify-json/solar`](https://www.npmjs.com/package/@iconify-json/solar) and [`@iconify-json/simple-icons`](https://www.npmjs.com/package/@iconify-json/simple-icons) for brand marks. Legacy MDI-style names are mapped in `app/utils/app-icon-resolve.ts`.
- **Settings — icon style:** `iconStyle` in app settings (`linear` | `solid`), persisted with other preferences. **Linear** uses Solar `*-linear` glyphs; **solid** uses `*-bold`. Default is **linear**. Controlled from the settings drawer, **Theme settings** on `/dashboard/settings`, and validated in `app/types/validation.ts`.
- **God Kit documentation:** Sidebar nav item and footer help links to [God Kit docs](https://godkit.godplans.org/). `package.json` field `godKitDocumentation` and `runtimeConfig.public.godKitDocumentation` (override with `NUXT_PUBLIC_GOD_KIT_DOCS`). Settings info panel lists Solar icon option and a resources link to God Kit.
- **Changelog:** This file.

### Changed

- **`AppIcon`:** Renders Iconify SVGs through Nuxt Icon instead of the Material Design Icons webfont.
- **Navigation:** External doc links use `<a target="_blank" rel="noopener noreferrer">` where appropriate (`DashboardNavItemLink`).

### Removed

- **`@mdi/font`** and **`@mdi/js`** (replaced by the Iconify workflow above).

### Tooling and documentation

- **TypeScript:** `npm run typecheck` with `@types/node`, `typescript.tsConfig.compilerOptions.types`, **`vue-router` ^5** (Nuxt 4.4), **`nuxt` ^4.4.2**, **`typescript`** devDependency.
- **Dependencies:** `god-kit` pinned to **`^0.8.1`** (replaces `latest`).
- **Nuxt Icon:** `icon.serverBundle.externalizeIconsJson` **`false`** for SSR hosts without JSON imports.
- **Docs:** README dev URL **3333**; [docs/DEMO_AND_API.md](./docs/DEMO_AND_API.md); [DESIGN_IMPROVEMENTS.md](./DESIGN_IMPROVEMENTS.md) aligned with Solar / Iconify.
- **CI:** [.github/workflows/ci.yml](.github/workflows/ci.yml) — `npm ci`, `typecheck`, `build` on push/PR to `main`, `dev`, `master`.

## [2.0.0] - earlier

Initial tracked major version. For older history, see the Git log on the repository’s default branch.
