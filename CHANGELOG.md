# Changelog

All notable changes to **God Panel Nuxt** are documented in this file. Versions follow the package version in `package.json`.

## [3.0.0] - 2026-08-30

A cleanup release. Roughly 6,000 lines of unused scaffolding were removed and the
remaining code was reworked around the parts that were actually broken.

### Fixed

- **Route guards did nothing.** `middleware/auth.ts` checked `!authStore.loading`, but `loading` was initialised to `true` and never cleared on the demo path, so protected routes never redirected. Session restore now happens once in `plugins/auth.ts` before the first guard runs, and the middleware is a plain boolean check.
- **The dashboard was not server-rendered.** `MotionLazy` wrapped the whole shell behind `v-if="isVisible"` with `isVisible` starting `false`, so SSR emitted an empty shell and content only appeared after hydration. Removed in favour of a CSS route transition.
- **`pages/error.vue` was never used.** Nuxt reads `app/error.vue`; a file under `pages/` is just a route named `/error`. Moved, so 404s and unhandled errors now render the panel's own page.
- **Two `main.css` files.** `assets/css/main.css` (repo root) held the better typography scale but sat outside `srcDir`, so Nuxt loaded the thinner `app/assets/css/main.css` and `.text-h1` … `.text-body-2` were undefined. Merged into one file.
- **Tailwind `dark:` followed the OS, not the app.** No `darkMode` strategy was set, so `dark:` utilities used `prefers-color-scheme` and ignored the in-app toggle. Now `darkMode: ['selector', ':is(.dark, [data-gk-theme="dark"]) &']`.
- **Header links 404'd.** The user menu pointed at `/dashboard/profile` and `/dashboard/notifications`; neither page existed. Both are now real pages.
- **Breadcrumbs rendered raw keys.** They looked up `routes.*` but the locale files only defined `pages.routes.*`, so nested pages showed `routes.profile`.
- **Two sidebar items highlighted at once.** `isActiveRoute` used a plain prefix test, so `/dashboard` matched every dashboard route. It now resolves the longest matching nav path.
- **The mobile sidebar overlapped the page.** The desktop drawer was hidden with a `<style scoped>` rule, but `GkNavigationDrawer` forwards `class` to an inner element that carries no scope id, so the rule never matched. Moved to `assets/css/dashboard-nav.css`.
- **Persian never applied on the server.** `setLocale()` ran in `app.vue` setup, too late to affect SSR output, so a Persian user got an English first paint. Now restored in `plugins/i18n.ts`.
- **Demo credentials read as garbled text** — `demoCredentialsWith` / `demoCredentials` rendered as "with password *email* Use *password*".
- **`npm run lint`** invoked ESLint with no ESLint dependency and no config. Script removed.
- Tailwind was emitted twice (module default stylesheet + `main.css`); `tailwindcss.cssPath` now names the real entry.
- 8 keys were missing from `fa.json`; both locales are now key-for-key identical.

### Removed

- `app/theme/` — 54 files of Material UI theme objects (`.jsx`) left over from a Next.js port, referenced by nothing.
- `app/services/` — a 391-line axios client with its own cache and retry queue, plus five services and a repository base class. No component imported any of it. Replaced by `useApi()`, a ~50-line `$fetch` wrapper.
- `app/mock/`, `app/config/index.ts`, `app/constants/api.ts`, `app/utils/{api,helpers,nav}.ts`, `app/types/index.ts` (a second, conflicting `Settings` type), `app/types/nuxt.d.ts`.
- Unused composables: `useApi` (old), `useBoolean`, `useLocalStorage`, `useErrorHandler`.
- Unused components: `AppBar`, `AppFooter`, `LoadingScreen`, `SearchNotFound`, `ErrorBoundary`, `PageErrorBoundary`, `MotionLazy`, `ProgressBar`, `Blank`.
- `pages/dashboard/toast-demo.vue` (525 lines) and its sidebar entry.
- `plugins/axios.ts`, `plugins/pinia.ts`, `plugins/logger.client.ts`, and `services/logger.service.ts`.
- Docs: `DESIGN_IMPROVEMENTS.md`, `THEME_IMPLEMENTATION.md`, `DEPLOYMENT.md` (documented a `netlify.toml` and `deploy-netlify.sh` that do not exist), `docs/`, `public/migration-guide.html`, and three `README.md` files inside `app/`.
- Dependencies: `axios`, `date-fns`, `clsx`, `tailwind-merge`, `sass`, `sass-embedded`.

### Added

- **`PageHeader`, `PanelCard`, `StatCard`, `EmptyState`** — the page-building components, replacing markup that was copy-pasted across pages.
- **Profile** (`/dashboard/profile`) and **Notifications** (`/dashboard/notifications`) pages.
- **`useApi()`** — `$fetch` with base URL, bearer token and 401 handling; **`useAuthToken()`**; **`apiErrorMessage()`**.
- **`useNotifications()`** — header notifications, previously hardcoded inside `DashboardHeader.vue`.
- **Flat component auto-import** (`components.pathPrefix: false`) — `<PanelCard />` anywhere, no import line.
- **god-kit's Tailwind preset**, replacing ~150 lines of hardcoded palettes that could not follow the theme.
- Password visibility toggle on the login page (previously commented out), and `?redirect=` support so users return to the page they were sent away from.
- `NUXT_PUBLIC_DEMO_MODE` to switch the demo account off.

### Changed

- **Auth tokens moved from `localStorage` to a cookie**, so middleware can read them during SSR.
- Settings cookie parsing is lenient — an unknown or stale key degrades to the default instead of discarding every saved preference.
- `process.client` / `process.server` / `process.dev` → `import.meta.*` (49 occurrences).
- `error-handler.client.ts` reduced from 361 lines of severity enums, session ids and `console.warn` monkey-patching to ~35 lines.
- The header is now sticky, and its notification/user menus were rebuilt with real markup instead of nested utility-class strings.
- Font definitions live only in `useDynamicFonts`; the list was previously duplicated in three files.

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
