// Nuxt composables type declarations for better IDE support
declare global {
  const definePageMeta: typeof import('#app/composables/meta').definePageMeta
  const useHead: typeof import('#app/composables/head').useHead
  const useSeoMeta: typeof import('#app/composables/head').useSeoMeta
  const useServerHead: typeof import('#app/composables/head').useServerHead
  const useServerSeoMeta: typeof import('#app/composables/head').useServerSeoMeta
}

export {}
