<template>
  <div class="empty-state" :class="{ 'empty-state--bordered': bordered }">
    <AppIcon :name="icon" :size="iconSize" class="empty-state__icon" />
    <p class="empty-state__title">{{ title }}</p>
    <p v-if="description" class="empty-state__description">{{ description }}</p>
    <div v-if="$slots.default" class="empty-state__actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'

/**
 * Placeholder for "nothing here yet", "no results", and unbuilt sections.
 * Always give it a `title` that says what is missing, and put the action that
 * fixes it in the default slot.
 */
withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: string
    iconSize?: number
    /** Dashed outline — use when it fills a card or a chart slot. */
    bordered?: boolean
  }>(),
  { icon: 'file-question', iconSize: 56, bordered: false }
)
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.empty-state--bordered {
  border: 1px dashed var(--gk-color-border);
  border-radius: var(--panel-radius-md);
  background: color-mix(in srgb, var(--gk-color-border) 8%, transparent);
}

.empty-state__icon {
  color: var(--gk-color-on-surface-muted);
  opacity: 0.5;
}

.empty-state__title {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
}

.empty-state__description {
  margin: 0;
  max-width: 32rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--gk-color-on-surface-muted);
}

.empty-state__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
</style>
