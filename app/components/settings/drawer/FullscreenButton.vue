<template>
  <GkTooltip :text="isFullscreen ? 'Exit Full Screen' : 'Full Screen'">
    <template #activator="{ props: tip }">
      <GkButton v-bind="tip" variant="ghost" slim @click="toggle">
        <AppIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" :size="20" />
      </GkButton>
    </template>
  </GkTooltip>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { GkButton, GkTooltip } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'

const isFullscreen = ref(false)

function sync() {
  isFullscreen.value = !!document.fullscreenElement
}

async function toggle() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
  } catch {
    /* ignore */
  }
  sync()
}

onMounted(() => {
  sync()
  document.addEventListener('fullscreenchange', sync)
})
onUnmounted(() => {
  document.removeEventListener('fullscreenchange', sync)
})
</script>
