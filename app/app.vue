<template>
  <div id="app" :dir="settingsStore.settings.direction">
    <v-app>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <!-- Global snackbar for notifications -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.message }}
        <template #actions>
          <v-btn
            variant="text"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </div>
</template>

<style>
/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles */
@layer base {
  html {
    font-family: 'Inter', sans-serif;
  }

  body {
    @apply bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100;
  }
}

@layer components {
  /* Custom component styles */
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }

  .card-shadow {
    @apply shadow-lg hover:shadow-xl transition-shadow duration-300;
  }
}

/* RTL Support */
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .v-text-field input,
[dir="rtl"] .v-text-field textarea {
  text-align: right;
}

[dir="rtl"] .v-btn {
  flex-direction: row-reverse;
}

[dir="rtl"] .v-app-bar-nav-icon {
  margin-left: auto;
  margin-right: 0;
}

[dir="rtl"] .v-navigation-drawer {
  transform: translateX(100%);
}

[dir="rtl"] .v-navigation-drawer--open {
  transform: translateX(0);
}

[dir="rtl"] .v-list-item__prepend {
  margin-right: 16px;
  margin-left: 0;
}

[dir="rtl"] .v-list-item__append {
  margin-left: 16px;
  margin-right: 0;
}

[dir="rtl"] .v-chip {
  flex-direction: row-reverse;
}

[dir="rtl"] .v-menu {
  transform-origin: top right;
}

[dir="rtl"] .v-card-actions {
  flex-direction: row-reverse;
}

[dir="rtl"] .v-alert .v-alert__prepend {
  margin-right: 12px;
  margin-left: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}
</style>

<script setup lang="ts">
// Get settings store for RTL support
const settingsStore = useSettingsStore()

// Initialize dynamic fonts
const { loadFont } = useDynamicFonts()

// Load initial font on mount
onMounted(() => {
  loadFont(settingsStore.settings.fontFamily)
})

// Global snackbar state
const snackbar = reactive({
  show: false,
  message: '',
  color: 'info',
  timeout: 5000
})

// Provide snackbar globally
provide('snackbar', snackbar)

// Global error handler
onErrorCaptured((error) => {
  console.error('Global error:', error)
  snackbar.message = 'An unexpected error occurred'
  snackbar.color = 'error'
  snackbar.show = true
})
</script>

<style>
/* Global styles */
html {
  font-family: 'Inter', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

/* RTL Support */
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .v-text-field input {
  text-align: right;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
