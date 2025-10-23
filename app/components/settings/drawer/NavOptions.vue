<template>
  <div class="nav-options">
    <div class="nav-options__header">
      <span class="nav-options__title">{{ t('settingsDrawer.nav') }}</span>
      <v-tooltip location="right" v-if="tooltip">
        <template #activator="{ props: tooltipProps }">
          <v-icon v-bind="tooltipProps" size="14" class="nav-options__info">
            mdi-information-outline
          </v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
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
import LayoutOption from './LayoutOption.vue'

const { t } = useI18n()

interface Props {
  value: {
    layout: string
  }
  options: {
    layouts: string[]
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

const handleLayoutClick = (layout: string) => {
  emit('click-option', { layout })
}
</script>

<style scoped>
.nav-options {
  padding: 32px 16px 16px 16px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 16px;
  position: relative;
  --item-radius: 12px;
  --item-bg: rgba(var(--v-theme-on-surface), 0.2);
  --item-border-color: rgba(var(--v-theme-on-surface), 0.08);
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
  font-size: 13px;
  font-weight: 600;
  line-height: 22px;
  color: rgb(var(--v-theme-background));
  background: rgb(var(--v-theme-on-surface));
  padding: 0 10px;
  border-radius: 22px;
  display: inline-flex;
  align-items: center;
}

.nav-options__info {
  opacity: 0.48;
  cursor: pointer;
  color: rgb(var(--v-theme-background));
  background: rgb(var(--v-theme-on-surface));
  border-radius: 50%;
  padding: 4px;
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
  color: rgba(var(--v-theme-on-surface), 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-option-section__options {
  display: flex;
  gap: 12px;
}
</style>
