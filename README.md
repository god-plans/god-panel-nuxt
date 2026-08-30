# God Panel

A Nuxt 4 admin dashboard starter: authentication, theming (light/dark, 6 accent colours, RTL), i18n, and a small set of layout components built on [god-kit](https://godkit.godplans.org/).

It runs with **no backend** — a demo account is built in — so you can see the whole UI in one command and replace the sample data page by page.

```bash
npm install
npm run dev          # http://localhost:3333
```

Sign in with **`godpanel@test.com`** / **`god123`**, or press **Fill demo credentials** on the login page.

---

## Contents

- [Make it yours in 15 minutes](#make-it-yours-in-15-minutes)
- [Adding a page](#adding-a-page)
- [Connecting your API](#connecting-your-api)
- [Building a page](#building-a-page) — the reusable components
- [Theming](#theming)
- [Translations](#translations)
- [Project layout](#project-layout)
- [Environment variables](#environment-variables)
- [Deploying](#deploying)
- [Upgrading god-kit](#upgrading-god-kit)

---

## Make it yours in 15 minutes

Work top to bottom; each step is independent.

| # | Goal | File |
|---|------|------|
| 1 | Name and favicon | `nuxt.config.ts` → `app.head`, `runtimeConfig.public.appName` |
| 2 | Logo images | `public/logo.png`, `public/full-logo.png`, `god-pure-*.png` — used by `app/components/common/Logo.vue` |
| 3 | Default theme | `defaultSettings` in `app/stores/settings.ts` |
| 4 | Sidebar links | `dashboardNavItems` in `app/utils/routes.ts` |
| 5 | Point at your API | `NUXT_PUBLIC_API_URL`, then `NUXT_PUBLIC_DEMO_MODE=false` |
| 6 | Replace sample data | `app/pages/dashboard/index.vue`, `analytics/index.vue`, `app/composables/useNotifications.ts` |

---

## Adding a page

Three steps, in this order.

**1. Create the page.** Every dashboard page uses the `dashboard` layout and the `auth` middleware:

```vue
<!-- app/pages/dashboard/customers/index.vue -->
<template>
  <div>
    <PageHeader :title="t('pages.customers.title')" :subtitle="t('pages.customers.subtitle')">
      <template #actions>
        <GkButton>{{ t('common.add') }}</GkButton>
      </template>
    </PageHeader>

    <PanelCard :title="t('pages.customers.recent')" padding="lg">
      <EmptyState :title="t('common.noData')" />
    </PanelCard>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GkButton } from 'god-kit/vue'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Customers — God Panel' })
</script>
```

`PageHeader`, `PanelCard`, `EmptyState`, `StatCard` and `AppIcon` need **no import** — components are auto-imported by plain name (`components.pathPrefix: false` in `nuxt.config.ts`). `Gk*` components are imported from `god-kit/vue` as shown.

**2. Add the route and sidebar entry** in `app/utils/routes.ts`:

```ts
export const paths = {
  dashboard: {
    // ...
    customers: '/dashboard/customers',
  },
} as const

export const dashboardNavItems: NavItem[] = [
  // ...
  { key: 'customers', title: 'common.customers', path: paths.dashboard.customers, icon: 'account-group' },
]
```

`title` is an i18n key, not literal text. `icon` is an `AppIcon` name — see [Icons](#icons).

**3. Add the strings** to **both** `i18n/locales/en.json` and `i18n/locales/fa.json`. The two files must have identical keys; a key present in only one falls back to English at runtime.

Breadcrumbs and the active-item highlight follow automatically from `dashboardNavItems`.

---

## Connecting your API

`useApi()` is the entire networking layer — a preconfigured [`$fetch`](https://nuxt.com/docs/api/utils/dollarfetch) that adds the base URL and bearer token, and clears the token on `401`:

```ts
const api = useApi()

const customers = await api<Customer[]>('/customers')
await api('/customers', { method: 'POST', body: form })
```

For page data, prefer `useFetch` so it runs during SSR and is not re-fetched on hydration:

```ts
const { data, pending, error } = await useFetch<Customer[]>('/customers', {
  baseURL: useRuntimeConfig().public.apiUrl,
})
```

### Switching off demo mode

Demo mode is what lets the panel run with no backend. With `NUXT_PUBLIC_DEMO_MODE=false`:

- `godpanel@test.com` stops working; `login()` posts to `POST /auth/login`
- the demo banner disappears from the login page

Your API needs three endpoints:

| Method | Path | Request | Response |
|--------|------|---------|----------|
| `POST` | `/auth/login` | `{ email, password }` | `{ user, accessToken }` |
| `GET` | `/auth/me` | — | `{ user }` |
| `POST` | `/auth/logout` | — | any |

`user` must satisfy `userSchema` in `app/types/validation.ts` (`id`, `displayName`, `email`, `role`, optional `photoURL` / `phoneNumber`). The response is parsed through that schema, so a mismatch fails loudly at the boundary instead of producing `undefined` deep in a component.

The token is stored in an `auth-token` **cookie**, not `localStorage`, so route middleware can read it during SSR and render the right page on the first request.

---

## Building a page

Five components cover most screens. Use them instead of re-styling `div`s, so spacing and surfaces stay consistent.

### `PageHeader`

```vue
<PageHeader title="Customers" subtitle="Everyone who has ordered." kicker="Sales">
  <template #actions><GkButton>Export</GkButton></template>
</PageHeader>
```

### `PanelCard`

The standard surface — one border, one shadow, one radius.

```vue
<PanelCard title="Revenue" icon="chart-line" padding="lg" interactive>
  <template #actions><GkButton variant="ghost" slim>⋯</GkButton></template>
  …
</PanelCard>
```

`padding`: `none` · `sm` · `md` (default) · `lg`. `interactive` adds the hover lift for cards that link somewhere.

### `StatCard`

```vue
<StatCard icon="cart-plus" label="Orders" value="156" tone="success" change="+8.2%" />
```

`tone` colours the icon (`primary` · `success` · `warning` · `danger` · `info`). `changeTone` colours the delta and is separate on purpose — set `change-tone="up"` on a *falling* number when down is the good outcome (bounce rate, error count).

### `EmptyState`

```vue
<EmptyState bordered icon="bell" title="No notifications" description="You're all caught up.">
  <GkButton>Refresh</GkButton>
</EmptyState>
```

### `AppIcon`

```vue
<AppIcon name="chart-line" :size="20" />
```

Takes a short name mapped in `app/utils/app-icon-resolve.ts`, or any Iconify id (`solar:home-2-bold`). Names respect the **linear / solid** setting from the settings drawer. To add an icon, add a line to `LEGACY_TO_ICONIFY` — store the `-bold` variant and the linear swap happens automatically.

### Notifications and toasts

```ts
import { pushGkSnackbar } from 'god-kit/vue'

pushGkSnackbar({ message: 'Saved', variant: 'success' })
```

`GkSnackbarHost` is already mounted in `app.vue`. Header notifications come from `useNotifications()` — replace the body of that composable with your own request and the header needs no changes.

---

## Theming

`app/stores/settings.ts` is the single source of truth. It persists to a **cookie**, so the server renders the user's theme on the first paint — no flash of the wrong colours.

| Setting | Values |
|---------|--------|
| `colorScheme` | `light` · `dark` |
| `direction` | `ltr` · `rtl` |
| `contrast` | `default` · `high` |
| `primaryColor` | `default` · `purple` · `cyan` · `blue` · `orange` · `red` |
| `navLayout` | `vertical` · `mini` · `horizontal` |
| `compactLayout` | `boolean` |
| `fontFamily` | `Inter` · `Roboto` · `Poppins` · `Barlow` · `DM Sans` · `Nunito Sans` |
| `iconStyle` | `linear` · `solid` |

Change the shipped defaults in `defaultSettings`; users override them from the settings drawer (the gear in the header).

### Colours in your own CSS

Use god-kit tokens, never hex values — a hardcoded colour cannot follow the theme switcher:

```css
color: var(--gk-color-on-surface);
background: var(--gk-color-surface);
border: 1px solid var(--gk-color-border);
```

The same tokens are available as Tailwind utilities through god-kit's preset: `bg-gk-surface`, `text-gk-primary`, `border-gk-border`. Panel-level surface helpers (`.panel-card`, `.panel-header-bar`, `.panel-section-title`) live in `app/assets/css/panel-shell.css`.

Tailwind's `dark:` variant is wired to the in-app toggle (`darkMode: ['selector', …]` in `tailwind.config.js`), not to the OS setting.

---

## Translations

`i18n/locales/en.json` and `fa.json`. **The two files must have the same keys.**

Choosing Persian from the header also flips the layout to RTL; the RTL toggle in the settings drawer can override that afterwards. The chosen language is stored in a `lang` cookie and applied during SSR by `app/plugins/i18n.ts`.

Check both files still line up:

```bash
node -e "const f=n=>{const o={},w=(d,p='')=>Object.entries(d).forEach(([k,v])=>typeof v==='object'?w(v,p+k+'.'):o[p+k]=v);w(require('./i18n/locales/'+n+'.json'));return Object.keys(o)};const e=f('en'),a=f('fa');const d=[...e.filter(k=>!a.includes(k)).map(k=>'fa missing '+k),...a.filter(k=>!e.includes(k)).map(k=>'en missing '+k)];console.log(d.length?d.join('\n'):'locales in sync')"
```

When writing RTL-safe CSS use logical properties — `margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start` — rather than `left` / `right`.

---

## Project layout

```
app/
├── app.vue                    # Root: layout, snackbar host, settings drawer
├── error.vue                  # Nuxt error + 404 page (NOT pages/error.vue)
├── assets/css/
│   ├── main.css               # Tailwind entry, base + typography, RTL, scrollbars
│   ├── panel-shell.css        # .panel-* surface helpers
│   └── dashboard-nav.css      # .dn-* sidebar styles
├── components/
│   ├── ui/                    # PageHeader, PanelCard, StatCard, EmptyState, AppIcon
│   ├── common/                # Logo, LogoutConfirmDialog
│   ├── dashboard/             # Sidebar, mobile drawer, header
│   ├── settings/drawer/       # Theme drawer
│   └── theme/                 # Theme settings, language switcher
├── composables/
│   ├── useApi.ts              # $fetch wrapper + auth token cookie
│   ├── useNotifications.ts    # Header notification list
│   └── useDynamicFonts.ts     # Webfont loading
├── layouts/                   # dashboard.vue, auth.vue
├── middleware/                # auth.ts, guest.ts
├── pages/                     # File-based routes
├── plugins/
│   ├── auth.ts                # Restores the session before the first guard
│   ├── god-kit.client.ts      # createGkKit + theme sync
│   ├── i18n.ts                # Locale restore + <html lang/dir>
│   ├── error-handler.client.ts
│   └── ssr-primary-preset.server.ts
├── stores/                    # auth.ts, settings.ts
├── types/validation.ts        # Zod schemas — the only source of shared types
└── utils/                     # routes.ts, app-icon-resolve.ts, gk-primary-presets.ts
```

Components are auto-imported by plain filename, so **filenames must be unique** across `app/components/`.

---

## Environment variables

All optional — the panel runs with none of them.

| Variable | Default | Purpose |
|----------|---------|---------|
| `NUXT_PUBLIC_API_URL` | `http://localhost:4000` | Base URL for `useApi()` |
| `NUXT_PUBLIC_DEMO_MODE` | `true` | `false` disables the demo account |
| `NUXT_PUBLIC_SITE_URL` | — | Canonical site URL |
| `NUXT_PUBLIC_SENTRY_DSN` | — | Enables the reporting hook in `error-handler.client.ts` |
| `NUXT_PUBLIC_GOD_KIT_DOCS` | god-kit docs | Docs link in the sidebar and settings |

```bash
# .env
NUXT_PUBLIC_API_URL=https://api.example.com
NUXT_PUBLIC_DEMO_MODE=false
```

> Leaving `NUXT_PUBLIC_DEMO_MODE=true` in production means anyone can sign in with the demo account. Set it to `false` before you ship.

---

## Deploying

```bash
npm run build     # Node server → .output/  (node .output/server/index.mjs)
npm run generate  # Static site → .output/public/
```

Use `build` — the panel is server-rendered, which is what makes the auth guard and theme work on the first request. `generate` produces a static site where every visitor gets the same pre-rendered HTML.

**Netlify / Vercel:** build `npm run build`, and let the platform's Nuxt preset handle the output; no publish directory to set by hand. **Docker / VPS:** run `node .output/server/index.mjs` behind your reverse proxy.

Set the environment variables above in the platform dashboard, not in a committed `.env`.

---

## Upgrading god-kit

The panel depends on `god-kit@^0.8.9`.

**god-kit 0.8.10 fixes an SSR hydration mismatch** in every teleporting component (`GkMenu`, `GkDialog`, `GkTooltip`, `GkSnackbar`, `GkNavigationDrawer`) and adds a `hint` prop to `GkField`. Until it is published, the browser console shows *"Hydration completed but contains mismatches"* on pages that use those components.

Once `god-kit@0.8.10` is on npm:

```bash
npm install god-kit@^0.8.10
```

`app/pages/dashboard/profile/index.vue` already passes `hint` to a `GkField`; on 0.8.9 the prop is simply ignored.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3333 |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build |
| `npm run generate` | Static site |
| `npm run typecheck` | `vue-tsc` over the app |

---

## License

AGPL-3.0-only — see [LICENSE](./LICENSE).

Built with [Nuxt](https://nuxt.com/), [god-kit](https://godkit.godplans.org/), [Tailwind CSS](https://tailwindcss.com/) and [Pinia](https://pinia.vuejs.org/). Design inspired by [Minimals](https://minimals.cc/).
