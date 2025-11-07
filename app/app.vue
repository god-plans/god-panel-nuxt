<template>
  <div id="app" :dir="settingsStore.settings.direction">
    <v-app :theme="settingsStore.settings.colorScheme">
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <!-- Global snackbar for notifications (legacy) -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.message }}
        <template #actions>
          <v-btn variant="text" @click="snackbar.show = false"> Close </v-btn>
        </template>
      </v-snackbar>

      <!-- Toast notification container -->
      <ToastContainer />
      <!-- Settings Drawer -->
      <SettingsDrawer />
    </v-app>
  </div>
</template>

<style scoped>
/* Component-specific styles only - global styles moved to main.css */
</style>

<script setup>
import { reactive, provide, onMounted, onErrorCaptured, watch } from "vue";
import { useSettingsStore } from "~/stores/settings";
import { useDynamicFonts } from "~/composables/useDynamicFonts";
import ToastContainer from "~/components/common/ToastContainer.vue";
import SettingsDrawer from "~/components/settings/drawer/SettingsDrawer.vue";
import { useI18n } from "vue-i18n";
const { t, setLocale, locale } = useI18n();

const langFromCookie = useCookie("lang");
// Prevent unnecessary locale changes during initialization
if (langFromCookie.value && langFromCookie.value !== locale.value) {
  setLocale(langFromCookie.value);
} else if (!langFromCookie.value) {
  setLocale("fa");
  langFromCookie.value = "fa";
}

// Get settings store for RTL support
const settingsStore = useSettingsStore();

// Initialize dynamic fonts
const { loadFont } = useDynamicFonts();

// Load initial font on client side
if (process.client) {
  onMounted(() => {
    loadFont(settingsStore.settings.fontFamily);
  });

  // Watch for font family changes
  watch(
    () => settingsStore.settings.fontFamily,
    (newFont) => {
      loadFont(newFont);
    },
    { immediate: false }
  );
}

// Global snackbar state
const snackbar = reactive({
  show: false,
  message: "",
  color: "info",
  timeout: 5000,
});

// Provide snackbar globally
provide("snackbar", snackbar);

// Global error handler
onErrorCaptured((error) => {
  console.error("Global error:", error);
  snackbar.message = "An unexpected error occurred";
  snackbar.color = "error";
  snackbar.show = true;
});
</script>
