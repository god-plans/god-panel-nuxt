<template>
  <div class="nav-options panel-card">
    <div class="nav-options__header">
      <span class="nav-options__title">{{ t('settingsDrawer.nav') }}</span>
      <GkTooltip v-if="tooltip" :text="tooltip" placement="end">
        <template #activator="{ props: tip }">
          <span v-bind="tip" class="nav-options__info inline-flex">
            <AppIcon name="information-outline" :size="14" />
          </span>
        </template>
      </GkTooltip>
    </div>

    <div class="nav-options__content">
      <div v-if="!hideNavLayout" class="nav-option-section">
        <span class="nav-option-section__label">{{ t('settingsDrawer.navLayout') }}</span>
        <div class="nav-option-section__options">
          <LayoutOption
            v-for="layout in options.layouts"
            :key="layout"
            :option="layout"
            :selected="value.layout === layout"
            @click="handleLayoutClick(layout)"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GkTooltip } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import LayoutOption from './LayoutOption.vue'

const { t } = useI18n()

type NavLayout = 'vertical' | 'horizontal' | 'mini'

interface Props {
  value: {
    layout: NavLayout
  }
  options: {
    layouts: NavLayout[]
  }
  hideNavLayout?: boolean
  hideNavColor?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  hideNavLayout: false,
  hideNavColor: false,
  tooltip: 'Dashboard only'
})

const emit = defineEmits<{
  'click-option': [option: { layout?: string }]
}>()

const handleLayoutClick = (layout: NavLayout) => {
  emit('click-option', { layout })
}
</script>

<style scoped>
.nav-options {
  padding: 32px 16px 16px 16px;
  position: relative;
  --item-radius: 12px;
  --item-bg: color-mix(in srgb, var(--gk-color-on-surface) 20%, transparent);
  --item-border-color: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.nav-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-options__title {
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gk-color-on-surface-muted);
  background: color-mix(in srgb, var(--gk-color-primary) 8%, var(--gk-color-surface));
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--panel-hairline);
  display: inline-flex;
  align-items: center;
}

.nav-options__info {
  opacity: 0.65;
  cursor: pointer;
  color: var(--gk-color-on-surface-muted);
  background: color-mix(in srgb, var(--gk-color-on-surface) 6%, transparent);
  border-radius: 50%;
  padding: 4px;
  border: 1px solid var(--panel-hairline);
}

.nav-options__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-option-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-option-section__label {
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  color: color-mix(in srgb, var(--gk-color-on-surface) 70%, transparent);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-option-section__options {
  display: flex;
  gap: 12px;
}
</style>
