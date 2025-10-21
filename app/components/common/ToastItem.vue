<template>
  <div
    class="toast-item"
    :class="[
      `toast-item--${toast.type}`,
      { 'toast-item--closable': toast.closable }
    ]"
    @click="handleClick"
  >
    <div class="toast-item__content">
      <!-- Icon -->
      <div class="toast-item__icon">
        <Icon
          :name="iconName"
          :class="`toast-item__icon--${toast.type}`"
        />
      </div>

      <!-- Content -->
      <div class="toast-item__body">
        <div
          v-if="toast.title"
          class="toast-item__title"
        >
          {{ toast.title }}
        </div>
        <div
          v-if="toast.description"
          class="toast-item__description"
        >
          {{ toast.description }}
        </div>
      </div>

      <!-- Action Button -->
      <div
        v-if="toast.action"
        class="toast-item__action"
      >
        <button
          class="toast-item__action-button"
          @click.stop="toast.action?.onClick"
        >
          {{ toast.action.label }}
        </button>
      </div>

      <!-- Close Button -->
      <button
        v-if="toast.closable"
        class="toast-item__close"
        @click.stop="$emit('close', toast.id)"
      >
        <Icon name="mdi-close" />
      </button>
    </div>

    <!-- Progress Bar -->
    <div
      v-if="!toast.persistent && toast.duration > 0"
      class="toast-item__progress"
    >
      <div
        class="toast-item__progress-bar"
        :style="{ animationDuration: `${toast.duration}ms` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Toast } from '~/composables/useToast'

interface Props {
  toast: Toast
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: [id: string]
}>()

const iconName = computed(() => {
  const icons = {
    success: 'mdi-check-circle',
    error: 'mdi-alert-circle',
    warning: 'mdi-alert',
    info: 'mdi-information',
    loading: 'mdi-loading'
  }
  return icons[props.toast.type]
})

const handleClick = () => {
  // Auto-close on click unless persistent
  if (!props.toast.persistent) {
    emit('close', props.toast.id)
  }
}
</script>

<style scoped>
.toast-item {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700;
  @apply min-w-80 max-w-96 pointer-events-auto;
  @apply transition-all duration-300 ease-in-out;
  position: relative;
  overflow: hidden;
}

.toast-item:hover {
  @apply shadow-xl transform scale-105;
}

.toast-item--success {
  @apply border-l-4 border-l-green-500;
}

.toast-item--error {
  @apply border-l-4 border-l-red-500;
}

.toast-item--warning {
  @apply border-l-4 border-l-yellow-500;
}

.toast-item--info {
  @apply border-l-4 border-l-blue-500;
}

.toast-item--loading {
  @apply border-l-4 border-l-purple-500;
}

.toast-item__content {
  @apply flex items-start p-4 gap-3;
}

.toast-item__icon {
  @apply flex-shrink-0 mt-0.5;
}

.toast-item__icon--success {
  @apply text-green-500;
}

.toast-item__icon--error {
  @apply text-red-500;
}

.toast-item__icon--warning {
  @apply text-yellow-500;
}

.toast-item__icon--info {
  @apply text-blue-500;
}

.toast-item__icon--loading {
  @apply text-purple-500;
}

.toast-item__body {
  @apply flex-1 min-w-0;
}

.toast-item__title {
  @apply font-semibold text-gray-900 dark:text-gray-100 text-sm;
  @apply mb-1;
}

.toast-item__description {
  @apply text-gray-600 dark:text-gray-300 text-sm;
  @apply leading-relaxed;
}

.toast-item__action {
  @apply flex-shrink-0;
}

.toast-item__action-button {
  @apply px-3 py-1 text-xs font-medium;
  @apply bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300;
  @apply rounded-md hover:bg-gray-200 dark:hover:bg-gray-600;
  @apply transition-colors duration-200;
}

.toast-item__close {
  @apply flex-shrink-0 p-1;
  @apply text-gray-400 hover:text-gray-600 dark:hover:text-gray-200;
  @apply transition-colors duration-200;
  @apply rounded-md hover:bg-gray-100 dark:hover:bg-gray-700;
}

.toast-item__progress {
  @apply absolute bottom-0 left-0 right-0 h-1;
  @apply bg-gray-200 dark:bg-gray-700;
}

.toast-item__progress-bar {
  @apply h-full bg-gray-400 dark:bg-gray-500;
  animation: progress linear forwards;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Loading animation */
.toast-item--loading .toast-item__icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive design */
@media (max-width: 640px) {
  .toast-item {
    @apply min-w-0 max-w-full mx-2;
  }
  
  .toast-item__content {
    @apply p-3 gap-2;
  }
  
  .toast-item__title {
    @apply text-xs;
  }
  
  .toast-item__description {
    @apply text-xs;
  }
}
</style>