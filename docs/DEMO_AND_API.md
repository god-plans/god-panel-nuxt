# Demo mode and API expectations

God Panel Nuxt is a **full UI shell** (layouts, auth flows, settings, navigation) that can run **without a custom backend** for demos. Connecting a **real API** replaces mocks and unlocks live data.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NUXT_PUBLIC_API_URL` | Base URL for Axios (`app/services/api-client.ts`). Default in code is often `http://localhost:4000` when unset in `.env`. |
| `NUXT_PUBLIC_SITE_URL` | Canonical site URL (SEO, links). Optional. |
| `NUXT_PUBLIC_GOD_KIT_DOCS` | Overrides God Kit documentation URL (`nuxt.config` → `runtimeConfig.public.godKitDocumentation`). |
| `ENABLE_MOCK_DATA` | When `true`, some code paths may use mock-friendly behavior (see README / runtime config `enableMockData`). |

## What is demo / placeholder today

- **Dashboard home** (`/dashboard`): sample stat cards and “recent activity” copy are **static examples**, not wired to `dashboard.service` for live aggregates.
- **Analytics** (`/dashboard/analytics`): metrics, traffic chart area, and device breakdown use **in-page demo data**; charts are intentionally not bundled until you add a library and API.
- **Auth**: Login/register call **`auth.service`** against `NUXT_PUBLIC_API_URL`. Without a server implementing those routes, flows fail at the network layer unless you stub or mock.

## Moving to production

1. Implement or deploy an API that matches the contracts expected by **`app/services/auth.service.ts`**, **`app/services/settings.service.ts`**, and **`app/services/api-client.ts`** (interceptors, tokens, errors).
2. Set **`NUXT_PUBLIC_API_URL`** in each environment.
3. Replace placeholder dashboard/analytics sections with composables that fetch real endpoints; code-split heavy chart libraries if needed.
4. Run **`npm run build`** and **`npm run typecheck`** in CI (see `.github/workflows/ci.yml`).

## Settings persistence

Theme and layout preferences are stored in the **browser cookie** (`settings` store) for SSR-friendly hydration. Server-side **user settings** via `settingsService` are separate and require a working API.
