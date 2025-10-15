<template>
  <v-tooltip :text="isFullscreen ? 'Exit Full Screen' : 'Full Screen'">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        variant="text"
        size="small"
        class="fullscreen-button"
        @click="toggleFullscreen"
      >
        <v-icon>{{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isFullscreen = ref(false)

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.fullscreen-button {
  position: relative;
}

.fullscreen-button .v-icon {
  transition: all 0.2s ease;
}

.fullscreen-button:hover .v-icon {
  transform: scale(1.1);
}
</style>
