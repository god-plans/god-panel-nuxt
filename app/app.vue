<template>
  <div id="app" :dir="settingsStore.settings.direction">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <GkSnackbarHost />

    <ToastContainer />
    <SettingsDrawer />
  </div>
</template>

<style scoped>
/* Component-specific styles only - global styles moved to main.css */
</style>

<script setup>
import { onErrorCaptured, onMounted, watch } from "vue";
import { useSettingsStore } from "~/stores/settings";
import { useDynamicFonts } from "~/composables/useDynamicFonts";
import ToastContainer from "~/components/common/ToastContainer.vue";
import SettingsDrawer from "~/components/settings/drawer/SettingsDrawer.vue";
import { useI18n } from "vue-i18n";
import { GkSnackbarHost, pushGkSnackbar } from "god-kit/vue";

const { setLocale, locale } = useI18n();

const langFromCookie = useCookie("lang");
if (langFromCookie.value && langFromCookie.value !== locale.value) {
  setLocale(langFromCookie.value);
} else if (!langFromCookie.value) {
  setLocale("en");
  langFromCookie.value = "en";
}

const settingsStore = useSettingsStore();

const { loadFont } = useDynamicFonts();

if (process.client) {
  onMounted(() => {
    loadFont(settingsStore.settings.fontFamily);
  });

  watch(
    () => settingsStore.settings.fontFamily,
    (newFont) => {
      loadFont(newFont);
    },
    { immediate: false }
  );
}

function showGlobalError(message) {
  pushGkSnackbar({
    message,
    variant: "danger",
    timeout: 5000,
  });
}

onErrorCaptured((error) => {
  console.error("Global error:", error);
  showGlobalError("An unexpected error occurred");
});
</script>
