<template>
  <li>
  <NuxtLink
    :to="item.path"
    class="dn-nav-item"
    :class="{ 'dn-nav-item--active': active }"
    :aria-current="active ? 'page' : undefined"
    @click="$emit('navigate')"
  >
    <span class="dn-nav-item__icon" aria-hidden="true">
      <AppIcon :name="navIconName(item.icon)" :size="iconSize" />
    </span>
    <span
      v-if="showLabels"
      class="dn-nav-item__title"
      :class="{ 'text-end': isRTL }"
    >
      {{ t(item.title) }}
    </span>
    <span
      v-if="showLabels && item.badge != null && item.badge !== ''"
      class="dn-nav-item__badge shrink-0"
    >
      {{ item.badge }}
    </span>
  </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { NavItem } from '~/utils/routes'
import { navIconName } from '~/utils/nav'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

withDefaults(
  defineProps<{
    item: NavItem
    active: boolean
    showLabels: boolean
    isRTL?: boolean
    iconSize?: number
  }>(),
  {
    isRTL: false,
    iconSize: 20,
  }
)

defineEmits<{
  navigate: []
}>()
</script>
