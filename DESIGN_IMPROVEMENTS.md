# Settings panel design notes

Historical notes for the **settings drawer** and related UI. For **icons**, the app uses **[Solar](https://icon-sets.iconify.design/solar/)** (and **Simple Icons** for brands) through **`@nuxt/icon`**, with legacy name mapping in [`app/utils/app-icon-resolve.ts`](app/utils/app-icon-resolve.ts). See [`CHANGELOG.md`](CHANGELOG.md) for release-level changes.

## Layout and components

### BaseOption

- Icon and switch in the top section; label and tooltip below
- Padding and spacing (e.g. 16px padding, gap between sections)
- Border radius and selected / hover states aligned with god-kit tokens

### PresetsOptions, FontOptions, NavOptions

- Pill-style section titles
- Grid layouts for presets and fonts
- **NavOptions:** layout choices with visual previews (`LayoutOption`)

### LayoutOption

- Visual preview for vertical, horizontal, and mini navigation layouts

### SettingsDrawer

- Header with reset / close actions
- Scrollable body; themed scrollbar where styled
- Grid of quick toggles (theme, contrast, RTL, compact, icon style, etc.)

## Design tokens (reference)

Title badges and surfaces often use:

- **Borders:** `color-mix(in srgb, var(--gk-color-on-surface) 12%, transparent)`
- **Surfaces:** `color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent)`
- **Radius:** `var(--gk-radius-md)` / `var(--gk-radius-lg)` where applicable

## Component file map

| Area        | Main files under `app/components/settings/drawer/` |
|------------|-----------------------------------------------------|
| Drawer     | `SettingsDrawer.vue`                                |
| Options    | `BaseOption.vue`, `PresetsOptions.vue`, `FontOptions.vue`, `NavOptions.vue`, `LayoutOption.vue` |
| Chrome     | `FullscreenButton.vue`                              |

For **global theme** behavior (god-kit sync, SSR presets), see [`README.md`](README.md) and `app/plugins/god-kit.client.ts`.
