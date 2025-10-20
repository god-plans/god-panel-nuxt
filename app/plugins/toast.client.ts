import ToastContainer from '~/components/common/ToastContainer.vue'
import { toastService } from '~/services/toast.service'

export default defineNuxtPlugin((nuxtApp) => {
  // Add toast container to the app
  nuxtApp.vueApp.component('ToastContainer', ToastContainer)

  // Provide toast service globally
  return {
    provide: {
      toast: toastService
    }
  }
})
