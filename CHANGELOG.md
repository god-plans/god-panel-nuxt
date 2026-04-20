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

## [2.0.0] - earlier

Initial tracked major version. For older history, see the Git log on the repository’s default branch.
