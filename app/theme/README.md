# Theme and styling

The dashboard UI uses **[god-kit](https://www.npmjs.com/package/god-kit)** for components and design tokens (`--gk-*`), plus **Tailwind CSS** and app-specific helpers in this folder.

## Layout

- **`styles/utils.js`** — Helpers for applying theme-related classes and `data-gk-theme` / `html.gk-theme-dark` (replaces legacy `data-vuetify-theme` usage).
- **`create-theme.js`**, **`with-settings/`** — Legacy palette and RTL helpers retained for reference; primary runtime theming is handled by god-kit + `app/stores/settings.ts`.

## Nuxt wiring

- **`app/config/gk.config.ts`** — `createGkKit` options (display, locale seed, component defaults).
- **`app/plugins/god-kit.client.ts`** — Installs god-kit and keeps **`useGkTheme()`** and **`@nuxtjs/color-mode`** aligned with **`useSettingsStore().settings.colorScheme`** (Pinia is the source of truth after hydration).
- **`app/plugins/ssr-primary-preset.server.ts`** — Injects primary palette CSS variables on SSR for first paint (matches `applyGkPrimaryPreset` on the client).
- **`app/plugins/i18n-direction.client.ts`** — Syncs `document.documentElement` `dir` / `lang` with settings + i18n locale.

Global CSS order is defined in **`nuxt.config.ts`**: `god-kit/tokens.css`, `god-kit/vue.css`, then app styles. Shared surfaces use **`.gk-card` / `.gk-panel`** helpers in `assets/css/main.css`.

### Notifications

Transient messages use **god-kit** only: mount **`GkSnackbarHost`** once in `app.vue` and call **`pushGkSnackbar`** from `god-kit/vue` (or **`useToast()`**, which delegates to the same queue).
