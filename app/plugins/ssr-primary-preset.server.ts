import { getGkPrimaryPresetCssText } from '~/utils/gk-primary-presets'

/**
 * Injects primary palette CSS variables during SSR so first paint matches the saved preset
 * (mirrors `applyGkPrimaryPreset` in `god-kit.client.ts` on the client).
 */
export default defineNuxtPlugin(() => {
  const settings = useSettingsStore()
  const css = getGkPrimaryPresetCssText(settings.settings.primaryColor)
  if (!css) return

  useHead({
    style: [
      {
        key: 'gk-ssr-primary-preset',
        innerHTML: `:root { ${css} }`,
      },
    ],
  })
})
