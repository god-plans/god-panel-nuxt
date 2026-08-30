import godKitPreset from 'god-kit/tailwind/preset'

/**
 * god-kit's preset exposes every `--gk-*` design token as a Tailwind colour, so
 * `bg-gk-surface` / `text-gk-primary` follow the active theme automatically.
 * That is why there are no hardcoded palettes here — a hex value in this file
 * would not react to the theme switcher.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  presets: [godKitPreset],

  content: ['./app/**/*.{js,ts,vue}', './nuxt.config.ts'],

  /**
   * Both selectors matter: `@nuxtjs/color-mode` writes `.dark` on <html> and
   * god-kit writes `data-gk-theme`. Without this, `dark:` utilities would
   * follow the OS setting and ignore the in-app theme toggle.
   */
  darkMode: ['selector', ':is(.dark, [data-gk-theme="dark"]) &'],

  theme: {
    extend: {
      fontFamily: {
        // `--app-font-family` is set by `useDynamicFonts` from the settings store.
        sans: ['var(--app-font-family, Inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
}
