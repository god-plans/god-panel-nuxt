<template>
  <div class="toast-demo">
    <div class="toast-demo__header">
      <h1 class="toast-demo__title">Toast Notification System Demo</h1>
      <p class="toast-demo__description">
        Test all types of toast notifications and their features
      </p>
    </div>

    <div class="toast-demo__content">
      <!-- Basic Toast Types -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Basic Toast Types</h2>
        <div class="toast-demo__buttons">
          <button
            class="toast-demo__button toast-demo__button--success"
            @click="showSuccess"
          >
            Success Toast
          </button>
          <button
            class="toast-demo__button toast-demo__button--error"
            @click="showError"
          >
            Error Toast
          </button>
          <button
            class="toast-demo__button toast-demo__button--warning"
            @click="showWarning"
          >
            Warning Toast
          </button>
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showInfo"
          >
            Info Toast
          </button>
          <button
            class="toast-demo__button toast-demo__button--loading"
            @click="showLoading"
          >
            Loading Toast
          </button>
        </div>
      </section>

      <!-- Toast with Title -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Toast with Title</h2>
        <div class="toast-demo__buttons">
          <button
            class="toast-demo__button toast-demo__button--success"
            @click="showSuccessWithTitle"
          >
            Success with Title
          </button>
          <button
            class="toast-demo__button toast-demo__button--error"
            @click="showErrorWithTitle"
          >
            Error with Title
          </button>
        </div>
      </section>

      <!-- Toast with Action -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Toast with Action Button</h2>
        <div class="toast-demo__buttons">
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showToastWithAction"
          >
            Toast with Action
          </button>
          <button
            class="toast-demo__button toast-demo__button--warning"
            @click="showUndoToast"
          >
            Undo Action Toast
          </button>
        </div>
      </section>

      <!-- Persistent Toast -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Persistent Toast</h2>
        <div class="toast-demo__buttons">
          <button
            class="toast-demo__button toast-demo__button--warning"
            @click="showPersistentToast"
          >
            Persistent Toast
          </button>
        </div>
      </section>

      <!-- Promise Toast -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Promise Toast</h2>
        <div class="toast-demo__buttons">
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showPromiseToast"
          >
            Simulate API Call
          </button>
          <button
            class="toast-demo__button toast-demo__button--error"
            @click="showPromiseErrorToast"
          >
            Simulate API Error
          </button>
        </div>
      </section>

      <!-- Position Demo -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Toast Positions</h2>
        <div class="toast-demo__buttons">
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showTopLeftToast"
          >
            Top Left
          </button>
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showTopCenterToast"
          >
            Top Center
          </button>
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showTopRightToast"
          >
            Top Right
          </button>
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showBottomLeftToast"
          >
            Bottom Left
          </button>
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showBottomCenterToast"
          >
            Bottom Center
          </button>
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showBottomRightToast"
          >
            Bottom Right
          </button>
        </div>
      </section>

      <!-- Multiple Toasts -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Multiple Toasts</h2>
        <div class="toast-demo__buttons">
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="showMultipleToasts"
          >
            Show Multiple Toasts
          </button>
          <button
            class="toast-demo__button toast-demo__button--warning"
            @click="clearAllToasts"
          >
            Clear All Toasts
          </button>
        </div>
      </section>

      <!-- Configuration -->
      <section class="toast-demo__section">
        <h2 class="toast-demo__section-title">Configuration</h2>
        <div class="toast-demo__config">
          <div class="toast-demo__config-item">
            <label class="toast-demo__label">Duration (ms):</label>
            <input
              v-model.number="duration"
              type="number"
              class="toast-demo__input"
              min="0"
              max="10000"
              step="500"
            />
          </div>
          <div class="toast-demo__config-item">
            <label class="toast-demo__label">Position:</label>
            <select
              v-model="position"
              class="toast-demo__select"
            >
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>
          <button
            class="toast-demo__button toast-demo__button--info"
            @click="updateToastConfig"
          >
            Update Config
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

// Page meta
definePageMeta({
  title: 'Toast Demo',
  layout: 'dashboard'
})

const { success, error, warning, info, loading, promise, clearAll, updateConfig } = useToast()

// Configuration
const duration = ref(5000)
const position = ref<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('bottom-right')

// Basic toast methods
const showSuccess = () => {
  success('Operation completed successfully!')
}

const showError = () => {
  error('Something went wrong. Please try again.')
}

const showWarning = () => {
  warning('Please check your input before proceeding.')
}

const showInfo = () => {
  info('New feature available in the latest update.')
}

const showLoading = () => {
  const loadingId = loading('Processing your request...')
  
  // Simulate loading
  setTimeout(() => {
    // Remove loading toast and show success
    success('Processing completed!')
  }, 3000)
}

// Toast with title
const showSuccessWithTitle = () => {
  success('Your profile has been updated successfully!', {
    title: 'Profile Updated'
  })
}

const showErrorWithTitle = () => {
  error('Unable to save your changes. Please check your internet connection.', {
    title: 'Save Failed'
  })
}

// Toast with action
const showToastWithAction = () => {
  info('New message received', {
    title: 'Message',
    action: {
      label: 'View',
      onClick: () => {
        success('Opening message...')
      }
    }
  })
}

const showUndoToast = () => {
  warning('Item deleted from your cart', {
    title: 'Cart Updated',
    action: {
      label: 'Undo',
      onClick: () => {
        success('Item restored to cart!')
      }
    }
  })
}

// Persistent toast
const showPersistentToast = () => {
  warning('This is a persistent toast that requires manual dismissal.', {
    title: 'Important Notice',
    persistent: true,
    closable: true
  })
}

// Promise toast
const showPromiseToast = async () => {
  try {
    await promise(
      simulateApiCall(),
      {
        loading: 'Saving your data...',
        success: 'Data saved successfully!',
        error: 'Failed to save data'
      }
    )
  } catch (error) {
    // Error is already handled by the promise toast
  }
}

const showPromiseErrorToast = async () => {
  try {
    await promise(
      simulateApiError(),
      {
        loading: 'Processing request...',
        success: 'Request completed!',
        error: 'Request failed with error'
      }
    )
  } catch (error) {
    // Error is already handled by the promise toast
  }
}

// Position toasts
const showTopLeftToast = () => {
  info('Toast in top-left position', { position: 'top-left' })
}

const showTopCenterToast = () => {
  info('Toast in top-center position', { position: 'top-center' })
}

const showTopRightToast = () => {
  info('Toast in top-right position', { position: 'top-right' })
}

const showBottomLeftToast = () => {
  info('Toast in bottom-left position', { position: 'bottom-left' })
}

const showBottomCenterToast = () => {
  info('Toast in bottom-center position', { position: 'bottom-center' })
}

const showBottomRightToast = () => {
  info('Toast in bottom-right position', { position: 'bottom-right' })
}

// Multiple toasts
const showMultipleToasts = () => {
  success('First toast - Success!')
  setTimeout(() => info('Second toast - Info'), 500)
  setTimeout(() => warning('Third toast - Warning'), 1000)
  setTimeout(() => error('Fourth toast - Error'), 1500)
}

const clearAllToasts = () => {
  clearAll()
}

// Configuration
const updateToastConfig = () => {
  updateConfig({
    duration: duration.value,
    position: position.value
  })
  success('Configuration updated!')
}

// Helper functions
const simulateApiCall = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('API call successful')
    }, 2000)
  })
}

const simulateApiError = (): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('API call failed'))
    }, 2000)
  })
}
</script>

<style scoped>
.toast-demo {
  @apply max-w-4xl mx-auto p-6;
}

.toast-demo__header {
  @apply mb-8 text-center;
}

.toast-demo__title {
  @apply text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2;
}

.toast-demo__description {
  @apply text-gray-600 dark:text-gray-400 text-lg;
}

.toast-demo__content {
  @apply space-y-8;
}

.toast-demo__section {
  @apply bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700;
}

.toast-demo__section-title {
  @apply text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4;
}

.toast-demo__buttons {
  @apply flex flex-wrap gap-3;
}

.toast-demo__button {
  @apply px-4 py-2 rounded-md font-medium text-sm;
  @apply transition-all duration-200 ease-in-out;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.toast-demo__button--success {
  @apply bg-green-600 text-white hover:bg-green-700 focus:ring-green-500;
}

.toast-demo__button--error {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

.toast-demo__button--warning {
  @apply bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500;
}

.toast-demo__button--info {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.toast-demo__button--loading {
  @apply bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500;
}

.toast-demo__config {
  @apply space-y-4;
}

.toast-demo__config-item {
  @apply flex items-center gap-3;
}

.toast-demo__label {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300 min-w-24;
}

.toast-demo__input,
.toast-demo__select {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600;
  @apply rounded-md bg-white dark:bg-gray-700;
  @apply text-gray-900 dark:text-gray-100;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.toast-demo__input {
  @apply w-32;
}

.toast-demo__select {
  @apply w-40;
}

/* Responsive design */
@media (max-width: 640px) {
  .toast-demo {
    @apply p-4;
  }
  
  .toast-demo__buttons {
    @apply flex-col;
  }
  
  .toast-demo__button {
    @apply w-full;
  }
  
  .toast-demo__config-item {
    @apply flex-col items-start;
  }
  
  .toast-demo__input,
  .toast-demo__select {
    @apply w-full;
  }
}
</style>
