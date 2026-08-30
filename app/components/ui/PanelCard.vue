<template>
  <component
    :is="as"
    class="panel-card"
    :class="[
      { 'panel-card--interactive': interactive },
      paddingClass,
    ]"
  >
    <header v-if="title || $slots.header" class="panel-card__header">
      <slot name="header">
        <h2 class="panel-card__title">
          <AppIcon v-if="icon" :name="icon" :size="20" class="panel-card__icon" />
          {{ title }}
        </h2>
      </slot>
      <div v-if="$slots.actions" class="panel-card__actions">
        <slot name="actions" />
      </div>
    </header>

    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '~/components/ui/AppIcon.vue'

/**
 * The panel's standard surface: one border, one shadow, one radius, theme-aware
 * through `--gk-*` tokens. Reach for this instead of writing `class="panel-card p-6"`
 * so every card in the app stays visually identical.
 */
const props = withDefaults(
  defineProps<{
    title?: string
    /** `AppIcon` name shown before the title. */
    icon?: string
    /** Adds the hover lift — use for cards that link somewhere. */
    interactive?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
    /** Rendered element; `section` and `article` are the usual alternatives. */
    as?: string
  }>(),
  { padding: 'md', as: 'div' }
)

const paddingClass = computed(() => `panel-card--pad-${props.padding}`)
</script>

<style scoped>
.panel-card--pad-none {
  padding: 0;
}
.panel-card--pad-sm {
  padding: 1rem;
}
.panel-card--pad-md {
  padding: 1.25rem;
}
.panel-card--pad-lg {
  padding: 1.5rem;
}

.panel-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.panel-card__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--gk-color-on-surface);
}

.panel-card__icon {
  color: var(--gk-color-primary);
}

.panel-card__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
