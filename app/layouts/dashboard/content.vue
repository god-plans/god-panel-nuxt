<template>
  <v-container
    class="flex flex-col flex-1 pt-2 pb-8 md:pt-4 md:pb-16 px-6 md:px-10"
    :class="{
      'p-0': disablePadding,
      'px-2 md:px-6': mobile
    }"
    :fluid="!settingsStore.settings.compactLayout"
    :max-width="settingsStore.settings.compactLayout ? maxWidth : undefined"
  >
    <slot />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  maxWidth?: string
  disablePadding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'lg',
  disablePadding: false
})

const settingsStore = useSettingsStore()
const mobile = ref(false)

onMounted(() => {
  const checkMobile = () => {
    mobile.value = window.innerWidth < 960
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>
