<template>
  <div
    class="dn-brand"
    :class="{
      'dn-brand--mini': mini,
      'dn-brand--logo-only': !showToggle,
    }"
  >
    <Logo
      :variant="mini ? 'icon' : 'compact'"
      :size="mini ? 'sm' : 'md'"
      class="dn-brand__logo"
    />
    <template v-if="showToggle">
      <div class="dn-brand__spacer" aria-hidden="true" />
      <GkButton
        variant="ghost"
        slim
        class="dn-brand__toggle"
        :aria-label="mini ? expandLabel : collapseLabel"
        @click="$emit('toggle-mini')"
      >
        <AppIcon :name="mini ? 'chevron-right' : 'chevron-left'" :size="20" />
      </GkButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import { GkButton } from 'god-kit/vue'
import Logo from '~/components/common/Logo.vue'
import AppIcon from '~/components/ui/AppIcon.vue'

withDefaults(
  defineProps<{
    mini?: boolean
    /** When false, only the logo is shown (e.g. mobile drawer). */
    showToggle?: boolean
    expandLabel?: string
    collapseLabel?: string
  }>(),
  {
    mini: false,
    showToggle: true,
    expandLabel: 'Expand navigation',
    collapseLabel: 'Collapse navigation',
  }
)

defineEmits<{
  'toggle-mini': []
}>()
</script>

<style scoped>
.dn-brand {
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0.875rem 1rem;
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--gk-color-primary) 5%, var(--gk-color-surface)) 0%,
    var(--gk-color-surface) 48%
  );
}

.dn-brand::after {
  content: '';
  position: absolute;
  inset-inline: 1rem;
  bottom: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--gk-color-primary) 35%, transparent) 20%,
    color-mix(in srgb, var(--gk-color-primary) 20%, transparent) 80%,
    transparent
  );
  pointer-events: none;
  opacity: 0.9;
}

.dn-brand__spacer {
  flex: 1 1 auto;
}

.dn-brand__toggle {
  border-radius: 999px !important;
  color: var(--gk-color-on-surface-muted) !important;
}

.dn-brand__toggle:hover {
  color: var(--gk-color-primary) !important;
  background: color-mix(in srgb, var(--gk-color-primary) 10%, transparent) !important;
}

.dn-brand--mini {
  justify-content: flex-start;
  padding-inline: 0.75rem;
  gap: 0.35rem;
  min-height: 60px;
}

.dn-brand--mini .dn-brand__spacer {
  display: none;
}

.dn-brand--logo-only {
  justify-content: center;
  background: var(--gk-color-surface);
}

.dn-brand--logo-only::after {
  opacity: 0.65;
}
</style>
