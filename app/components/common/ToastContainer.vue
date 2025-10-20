<template>
  <Teleport to="body">
    <!-- Toast Container for each position -->
    <div
      v-for="position in positions"
      :key="position"
      :class="['toast-container', `toast-container--${position}`]"
    >
      <TransitionGroup
        name="toast"
        tag="div"
        class="toast-list"
      >
        <ToastItem
          v-for="toast in getToastsByPosition(position)"
          :key="toast.id"
          :toast="toast"
          @dismiss="dismissToast"
          @pause="pauseToast"
          @resume="resumeToast"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Toast } from '~/types'
import { toastService } from '~/services/toast.service'

// Toast positions
const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
] as const

// Reactive toasts from service
const toasts = computed(() => toastService.getToasts())

// Get toasts by position
const getToastsByPosition = (position: string) => {
  return toasts.value.filter(toast => toast.position === position && toast.visible)
}

// Toast event handlers
const dismissToast = (toastId: string) => {
  toastService.dismiss(toastId)
}

const pauseToast = (toastId: string) => {
  toastService.pauseAutoDismiss(toastId)
}

const resumeToast = (toastId: string) => {
  toastService.resumeAutoDismiss(toastId)
}
</script>

<style lang="scss">
.toast-container {
  position: fixed;
  z-index: 9999;
  pointer-events: none;

  &.toast-container--top-left {
    top: 1rem;
    left: 1rem;
  }

  &.toast-container--top-center {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  &.toast-container--top-right {
    top: 1rem;
    right: 1rem;
  }

  &.toast-container--bottom-left {
    bottom: 1rem;
    left: 1rem;
  }

  &.toast-container--bottom-center {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  &.toast-container--bottom-right {
    bottom: 1rem;
    right: 1rem;
  }
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

// Toast transitions
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}

// Responsive adjustments
@media (max-width: 600px) {
  .toast-container {
    &.toast-container--top-left,
    &.toast-container--top-right,
    &.toast-container--bottom-left,
    &.toast-container--bottom-right {
      left: 1rem;
      right: 1rem;
      transform: none;
    }

    &.toast-container--top-center,
    &.toast-container--bottom-center {
      left: 1rem;
      right: 1rem;
      transform: none;
    }
  }
}
</style>
