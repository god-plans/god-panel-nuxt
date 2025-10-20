<template>
  <div
    :class="[
      'toast-item',
      `toast-item--${toast.type}`,
      { 'toast-item--dismissible': toast.dismissible }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="toast-item__content">
      <!-- Icon -->
      <div v-if="toast.icon" class="toast-item__icon">
        <v-icon
          :color="iconColor"
          :class="{ 'animate-spin': toast.type === 'loading' }"
        >
          {{ toast.icon }}
        </v-icon>
      </div>

      <!-- Text Content -->
      <div class="toast-item__text">
        <div v-if="toast.title" class="toast-item__title">
          {{ toast.title }}
        </div>
        <div class="toast-item__message">
          {{ toast.message }}
        </div>
      </div>

      <!-- Action Button -->
      <div v-if="toast.action" class="toast-item__action">
        <v-btn
          size="small"
          variant="text"
          :color="actionColor"
          @click="handleAction"
        >
          {{ toast.action.label }}
        </v-btn>
      </div>

      <!-- Dismiss Button -->
      <div v-if="toast.dismissible" class="toast-item__dismiss">
        <v-btn
          icon
          size="small"
          variant="text"
          @click="handleDismiss"
        >
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Progress Bar -->
    <div
      v-if="toast.showProgress && toast.duration && toast.duration > 0"
      class="toast-item__progress"
    >
      <div
        class="toast-item__progress-bar"
        :style="{ width: progressWidth }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Toast } from '~/types'

// Props
interface Props {
  toast: Toast
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  dismiss: [toastId: string]
  pause: [toastId: string]
  resume: [toastId: string]
}>()

// Reactive state
const progressWidth = ref('100%')
const isHovered = ref(false)

// Computed properties
const iconColor = computed(() => {
  switch (props.toast.type) {
    case 'success': return 'success'
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'info': return 'info'
    case 'loading': return 'primary'
    default: return 'grey'
  }
})

const actionColor = computed(() => {
  switch (props.toast.type) {
    case 'success': return 'success'
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'info': return 'info'
    case 'loading': return 'primary'
    default: return 'primary'
  }
})

// Progress animation
let progressInterval: NodeJS.Timeout | null = null

const startProgress = () => {
  if (!props.toast.duration || props.toast.duration <= 0) return

  const startTime = Date.now()
  const duration = props.toast.duration

  progressInterval = setInterval(() => {
    if (props.toast.paused) return

    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, duration - elapsed)
    const percentage = (remaining / duration) * 100

    progressWidth.value = `${percentage}%`

    if (percentage <= 0) {
      stopProgress()
      emit('dismiss', props.toast.id)
    }
  }, 50)
}

const stopProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

// Lifecycle
onMounted(() => {
  if (props.toast.showProgress && props.toast.duration && props.toast.duration > 0) {
    startProgress()
  }
})

onUnmounted(() => {
  stopProgress()
})

// Event handlers
const handleDismiss = () => {
  emit('dismiss', props.toast.id)
}

const handleAction = () => {
  if (props.toast.action) {
    props.toast.action.handler()
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  if (props.toast.pauseOnHover) {
    emit('pause', props.toast.id)
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  if (props.toast.pauseOnHover) {
    emit('resume', props.toast.id)
  }
}

// Watch for pause changes
watch(() => props.toast.paused, (paused) => {
  if (paused) {
    stopProgress()
  } else if (!isHovered.value) {
    startProgress()
  }
})
</script>

<style scoped lang="scss">
.toast-item {
  pointer-events: auto;
  min-width: 300px;
  max-width: 500px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-outline-variant));
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;

  // Type-specific styles
  &--success {
    border-color: rgb(var(--v-theme-success));
    background: rgb(var(--v-theme-success-container));
  }

  &--error {
    border-color: rgb(var(--v-theme-error));
    background: rgb(var(--v-theme-error-container));
  }

  &--warning {
    border-color: rgb(var(--v-theme-warning));
    background: rgb(var(--v-theme-warning-container));
  }

  &--info {
    border-color: rgb(var(--v-theme-info));
    background: rgb(var(--v-theme-info-container));
  }

  &--loading {
    border-color: rgb(var(--v-theme-primary));
    background: rgb(var(--v-theme-surface));
  }
}

.toast-item__content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  min-height: 3rem;
}

.toast-item__icon {
  flex-shrink: 0;
  margin-top: 0.125rem;

  .animate-spin {
    animation: spin 1s linear infinite;
  }
}

.toast-item__text {
  flex: 1;
  min-width: 0;
}

.toast-item__title {
  font-weight: 600;
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.toast-item__message {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.4;
  word-wrap: break-word;
}

.toast-item__action {
  flex-shrink: 0;
}

.toast-item__dismiss {
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.toast-item__progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.toast-item__progress-bar {
  height: 100%;
  background: currentColor;
  transition: width linear;
  border-radius: 0 0 12px 12px;
}

// Animations
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Hover effects
.toast-item:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

// Dark theme adjustments
.v-theme--dark {
  .toast-item {
    background: rgb(var(--v-theme-surface-variant));
    border-color: rgb(var(--v-theme-outline));
  }

  .toast-item__progress {
    background: rgba(0, 0, 0, 0.2);
  }
}

// Responsive design
@media (max-width: 600px) {
  .toast-item {
    min-width: 280px;
    max-width: calc(100vw - 2rem);
  }

  .toast-item__content {
    padding: 0.875rem;
    gap: 0.625rem;
  }

  .toast-item__message {
    font-size: 0.8125rem;
  }
}
</style>
