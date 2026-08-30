<template>
  <div id="app" :dir="settings.settings.direction">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <GkSnackbarHost />
    <SettingsDrawer />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { GkSnackbarHost } from 'god-kit/vue'
import SettingsDrawer from '~/components/settings/drawer/SettingsDrawer.vue'

// Language restore and <html lang/dir> live in `plugins/i18n.ts` — they have to
// run before render, which a component's setup is too late for.
const settings = useSettingsStore()
const { loadFont } = useDynamicFonts()

if (import.meta.client) {
  watch(
    () => settings.settings.fontFamily,
    (font) => loadFont(font),
    { immediate: true }
  )
}
</script>
