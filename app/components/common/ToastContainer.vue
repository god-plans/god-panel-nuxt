<template>
  <Teleport to="body">
    <div
      v-if="toasts.length > 0"
      class="toast-container"
      :class="[`toast-container--${position}`]"
    >
      <TransitionGroup
        name="toast"
        tag="div"
        class="toast-list"
      >
        <ToastItem
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          @close="removeToast"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from '~/composables/useToast'
import ToastItem from './ToastItem.vue'

const { toasts, removeToast } = useToast()

const position = computed(() => {
  // Use the position from the most recent toast, or default to bottom-right
  return toasts.value[toasts.value.length - 1]?.position || 'bottom-right'
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
}

.toast-container--top-left {
  top: 1rem;
  left: 1rem;
}

.toast-container--top-center {
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.toast-container--top-right {
  top: 1rem;
  right: 1rem;
}

.toast-container--bottom-left {
  bottom: 1rem;
  left: 1rem;
}

.toast-container--bottom-center {
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.toast-container--bottom-right {
  bottom: 1rem;
  right: 1rem;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .toast-container {
    left: 1rem !important;
    right: 1rem !important;
    transform: none !important;
  }
  
  .toast-enter-from,
  .toast-leave-to {
    transform: translateY(100%);
  }
}
</style>