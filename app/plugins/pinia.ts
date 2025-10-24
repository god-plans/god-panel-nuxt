import { useSettingsStore } from '~/stores/settings'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  // Initialize stores on both client and server
  const settingsStore = useSettingsStore()
  const authStore = useAuthStore()

  // Initialize settings store
  if (process.server) {
    // On server, just ensure the store has default values
    settingsStore.initialize()
  }

  // Auth store initialization will be handled by its own logic
})

