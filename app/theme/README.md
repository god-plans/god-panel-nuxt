# Theme and styling

The dashboard UI uses **[god-kit](https://www.npmjs.com/package/god-kit)** for components and design tokens (`--gk-*`), plus **Tailwind CSS** and app-specific helpers in this folder.

## Layout

- **`styles/utils.js`** — Helpers for applying theme-related classes and `data-gk-theme` / `html.gk-theme-dark` (replaces legacy `data-vuetify-theme` usage).
- **`create-theme.js`**, **`with-settings/`** — Legacy palette and RTL helpers retained for reference; primary runtime theming is handled by god-kit + `app/stores/settings.ts`.

## Nuxt wiring

- **`app/config/gk.config.ts`** — `createGkKit` options (display, locale seed, component defaults).
- **`app/plugins/god-kit.client.ts`** — Installs god-kit, wires i18n, and keeps `useGkTheme()` in sync with the settings store.

Global CSS order is defined in **`nuxt.config.ts`**: `god-kit/tokens.css`, `god-kit/vue.css`, then app styles.
