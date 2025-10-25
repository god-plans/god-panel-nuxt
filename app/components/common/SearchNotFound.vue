<template>
  <div class="flex items-center justify-center min-h-[400px] sm:min-h-[300px] p-6 sm:p-4">
    <div class="flex flex-col items-center gap-6 sm:gap-5 max-w-md text-center">
      <!-- Illustration/Icon -->
      <div class="opacity-60 animate-bounce">
        <v-icon
          :icon="icon"
          size="120"
          :color="iconColor"
          class="drop-shadow-lg"
        />
      </div>

      <!-- Title and Description -->
      <div class="flex flex-col gap-2">
        <h2 class="text-xl sm:text-lg font-semibold text-on-surface m-0">{{ title }}</h2>
        <p class="text-base sm:text-sm text-on-surface-variant m-0 leading-relaxed">{{ description }}</p>
      </div>

      <!-- Actions -->
      <div v-if="showAction" class="flex gap-3 flex-wrap justify-center sm:flex-col sm:items-stretch sm:gap-2">
        <v-btn
          v-if="actionText && actionHandler"
          :color="actionColor"
          :variant="actionVariant"
          @click="actionHandler"
          class="min-w-[120px] sm:w-full"
        >
          {{ actionText }}
        </v-btn>

        <v-btn
          v-if="secondaryActionText && secondaryActionHandler"
          :color="secondaryActionColor"
          :variant="secondaryActionVariant"
          @click="secondaryActionHandler"
          class="min-w-[120px] sm:w-full"
        >
          {{ secondaryActionText }}
        </v-btn>
      </div>

      <!-- Additional Content Slot -->
      <div v-if="$slots.additional" class="w-full">
        <slot name="additional" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  title?: string
  description?: string
  icon?: string
  iconColor?: string
  showAction?: boolean
  actionText?: string
  actionColor?: string
  actionVariant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  actionHandler?: () => void
  secondaryActionText?: string
  secondaryActionColor?: string
  secondaryActionVariant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  secondaryActionHandler?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No results found',
  description: 'Try adjusting your search or filter criteria.',
  icon: 'mdi-magnify',
  iconColor: 'grey-lighten-1',
  showAction: true,
  actionText: 'Clear filters',
  actionColor: 'primary',
  actionVariant: 'elevated',
  secondaryActionText: 'Go back',
  secondaryActionColor: 'grey',
  secondaryActionVariant: 'text'
})
</script>

