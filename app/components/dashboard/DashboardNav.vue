<template>
  <GkNavigationDrawer
    permanent
    :rail="mini"
    :width="fullNavWidth"
    :rail-width="88"
    location="start"
    :dir="isRTL ? 'rtl' : 'ltr'"
    class="dashboard-nav dn-nav min-w-0"
    :class="{
      'dn-nav--mini': mini,
      'nav-mini': mini,
      'nav-compact': settingsStore.settings.compactLayout,
      'nav-rtl': isRTL,
    }"
  >
    <DashboardNavBrand :mini="mini" @toggle-mini="$emit('toggle-mini')" />

    <ul
      class="dn-nav-list list-none p-0 m-0 flex min-h-0 min-w-0 flex-col overflow-x-hidden"
    >
      <template v-for="item in navItems" :key="item.key">
        <DashboardNavItemLink
          v-if="!item.children"
          :item="item"
          :active="isItemActive(item.path)"
          :show-labels="showLabels"
          :is-r-t-l="isRTL"
        />
        <DashboardNavGroup
          v-else
          :item="item"
          :mini="Boolean(mini)"
          :show-labels="showLabels"
          :expanded="!!expandedGroups[item.key]"
          :group-active="isItemActive(item.path)"
          :is-r-t-l="isRTL"
          :is-item-active="isItemActive"
          @toggle="() => toggleGroup(item.key)"
        />
      </template>
    </ul>

    <template #append>
      <DashboardNavInfo :mini="mini" :mobile="false" />
    </template>
  </GkNavigationDrawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GkNavigationDrawer } from 'god-kit/vue'
import { useSettingsStore } from '~/stores/settings'
import { useDashboardNavMenu } from '~/composables/useDashboardNavMenu'
import DashboardNavBrand from '~/components/dashboard/DashboardNavBrand.vue'
import DashboardNavItemLink from '~/components/dashboard/DashboardNavItemLink.vue'
import DashboardNavGroup from '~/components/dashboard/DashboardNavGroup.vue'
import DashboardNavInfo from '~/components/dashboard/DashboardNavInfo.vue'

const props = withDefaults(defineProps<{ mini?: boolean }>(), { mini: false })
defineEmits<{ 'toggle-mini': [] }>()

const settingsStore = useSettingsStore()
const { navItems, expandedGroups, toggleGroup, isItemActive } =
  useDashboardNavMenu()

const isRTL = computed(() => settingsStore.settings.direction === 'rtl')
const showLabels = computed(() => !props.mini)

const fullNavWidth = computed(() => {
  if (props.mini) return 300
  return settingsStore.settings.compactLayout ? 260 : 300
})
</script>

<style scoped>
.dashboard-nav {
  border-right: 1px solid var(--gk-color-border);
  background: var(--gk-color-surface);
}

.dashboard-nav :deep(.gk-navigation-drawer__surface) {
  min-width: 0;
  overflow-x: hidden;
  min-height: 100vh;
  min-height: 100dvh;
  height: auto;
}

.dashboard-nav :deep(.gk-navigation-drawer__content) {
  min-width: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.dashboard-nav :deep(.gk-navigation-drawer__append) {
  flex-shrink: 0;
  margin-top: auto;
}

@media (max-width: 959px) {
  .dashboard-nav {
    position: absolute;
    z-index: 1000;
  }
}
</style>
