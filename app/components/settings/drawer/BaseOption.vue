<template>
  <button
    type="button"
    :class="{ 'base-option--selected': selected }"
    class="base-option"
    @click="handleClick"
  >
    <div class="base-option__top">
      <img
        :src="`/assets/icons/setting/ic-${icon}.svg`"
        :alt="label"
        class="base-option__icon"
      >
      <v-switch
        :model-value="selected"
        readonly
        hide-details
        density="compact"
        color="default"
        class="base-option__switch"
      />
    </div>

    <div class="base-option__bottom">
      <span class="base-option__label">{{ label }}</span>
      <v-tooltip v-if="tooltip" location="top">
        <template #activator="{ props }">
          <v-icon v-bind="props" size="16" class="base-option__info">
            mdi-information-outline
          </v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  label: string
  selected?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.base-option {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  background: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.base-option:hover {
  background: rgba(var(--v-theme-on-surface), 0.08);
}

.base-option--selected {
  background: rgba(var(--v-theme-on-surface), 0.08);
}

.base-option__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.base-option__icon {
  width: 24px;
  height: 24px;
  opacity: 0.7;
}

.base-option__switch {
  margin-right: -12px;
}

.base-option__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.base-option__label {
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  color: rgb(var(--v-theme-on-surface));
  transition: color 0.2s ease;
}

.base-option__info {
  opacity: 0.6;
  cursor: help;
  color: rgb(var(--v-theme-on-surface));
}
</style>
