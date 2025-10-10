import 'vuetify/styles'
import { createVuetifyInstance } from '~/theme/vuetify-config'

export default defineNuxtPlugin((nuxtApp) => {
  // Get settings from the store
  const settingsStore = useSettingsStore()

  // Create Vuetify instance using our configuration
  const vuetify = createVuetifyInstance(settingsStore.settings)

  // Use Vuetify in the Vue app
  nuxtApp.vueApp.use(vuetify)
})
