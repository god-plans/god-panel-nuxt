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
      <div class="dn-brand__spacer" />
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
  padding: 16px;
  border-bottom: 1px solid var(--gk-color-border);
  box-sizing: border-box;
}

.dn-brand__spacer {
  flex: 1 1 auto;
}

.dn-brand--mini {
  justify-content: flex-start;
  padding-inline: 12px;
  gap: 8px;
}

.dn-brand--mini .dn-brand__spacer {
  display: none;
}

.dn-brand--logo-only {
  justify-content: center;
}
</style>
