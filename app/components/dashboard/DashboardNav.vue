<template>
  <GkNavigationDrawer
    permanent
    :rail="mini && !mobile"
    :width="fullNavWidth"
    :rail-width="88"
    :location="isRTL ? 'end' : 'start'"
    :dir="isRTL ? 'rtl' : 'ltr'"
    class="dashboard-nav min-w-0"
    :class="{
      'nav-mini': mini && !mobile,
      'nav-compact': settingsStore.settings.compactLayout,
      'nav-rtl': isRTL,
    }"
  >
    <div v-if="mobile" class="mobile-header">
      <GkButton variant="ghost" slim class="mobile-menu-btn" @click="$emit('open-mobile')">
        <AppIcon name="menu" :size="24" />
      </GkButton>
      <span class="mobile-title">{{ t("common.menu") }}</span>
    </div>

    <div v-else class="nav-header">
      <Logo
        :variant="mini ? 'icon' : 'compact'"
        :size="mini ? 'sm' : 'md'"
        class="logo"
      />
      <div class="flex-1" />
      <GkButton
        variant="ghost"
        slim
        class="toggle-btn"
        :aria-label="mini ? 'Expand navigation' : 'Collapse navigation'"
        @click="$emit('toggle-mini')"
      >
        <AppIcon :name="mini ? 'chevron-right' : 'chevron-left'" :size="20" />
      </GkButton>
    </div>

    <ul class="nav-list list-none p-0 m-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden">
      <template v-for="item in navItems" :key="item.key">
        <li v-if="!item.children">
          <NuxtLink
            :to="item.path"
            class="nav-item flex min-w-0 items-center gap-2 px-3 py-2 mx-2 rounded-lg transition-colors"
            :class="{
              'nav-item-active': isActive(item.path),
              'justify-center': mini && !mobile,
            }"
          >
            <AppIcon :name="item.icon.replace('mdi-', '')" :size="20" />
            <span
              v-if="!mini || mobile"
              class="nav-title min-w-0 flex-1 truncate leading-snug"
              :class="{ 'text-right': isRTL }"
            >
              {{ t(item.title) }}
            </span>
          </NuxtLink>
        </li>

        <li v-else class="nav-group">
          <button
            type="button"
            class="nav-group-header flex w-full min-w-0 items-center gap-2 px-3 py-2 mx-2 rounded-lg border-0 bg-transparent text-left cursor-pointer"
            :class="{
              'nav-group-active': isActive(item.path),
              'nav-group-expanded': expandedGroups[item.key],
              'justify-center': mini && !mobile,
            }"
            @click="toggleGroup(item.key)"
          >
            <div v-if="mini && !mobile" class="nav-group-header-icon flex flex-col items-center gap-1">
              <AppIcon :name="item.icon.replace('mdi-', '')" :size="20" />
              <AppIcon
                :name="expandedGroups[item.key] ? 'chevron-up' : 'chevron-down'"
                :size="16"
                class="expand-icon"
                :class="{ expanded: expandedGroups[item.key] }"
              />
            </div>
            <template v-else>
              <span class="nav-title flex min-w-0 flex-1 items-center gap-2" :class="{ 'text-right': isRTL }">
                <AppIcon class="shrink-0" :name="item.icon.replace('mdi-', '')" :size="16" />
                <span class="min-w-0 truncate">{{ t(item.title) }}</span>
              </span>
              <AppIcon
                :name="expandedGroups[item.key] ? 'chevron-up' : 'chevron-down'"
                :size="16"
                class="expand-icon shrink-0"
                :class="{ expanded: expandedGroups[item.key] }"
              />
            </template>
          </button>

          <ul
            v-if="expandedGroups[item.key]"
            class="nav-sublist list-none p-0 m-0"
          >
            <li v-for="child in item.children" :key="child.key">
              <NuxtLink
                :to="child.path"
                class="nav-subitem flex min-w-0 items-center gap-2 px-3 py-2 mx-2 rounded-md"
                :class="{
                  'nav-subitem-active': isActive(child.path),
                  'justify-center': mini && !mobile,
                }"
              >
                <AppIcon :name="child.icon.replace('mdi-', '')" :size="16" />
                <span
                  v-if="!mini || mobile"
                  class="nav-subtitle min-w-0 flex-1 truncate leading-snug"
                  :class="{
                    'text-right': isRTL,
                  }"
                >
                  {{ t(child.title) }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </li>
      </template>
    </ul>

    <template #append>
      <DashboardNavInfo :mini="mini" :mobile="mobile" />
    </template>
  </GkNavigationDrawer>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { GkButton, GkNavigationDrawer } from "god-kit/vue";
import { dashboardNavItems, isActiveRoute } from "../../utils/routes";
import { useSettingsStore } from "../../stores/settings";
import Logo from "../common/Logo.vue";
import DashboardNavInfo from "./DashboardNavInfo.vue";
import AppIcon from "~/components/ui/AppIcon.vue";

const { t } = useI18n();
const props = defineProps<{ mini?: boolean; mobile?: boolean }>();
defineEmits(["toggle-mini", "open-mobile"]);

const settingsStore = useSettingsStore();
const route = useRoute();

const navItems = ref(dashboardNavItems);
const expandedGroups = ref<Record<string, boolean>>({});
const isRTL = computed(() => settingsStore.settings.direction === "rtl");

const fullNavWidth = computed(() => {
  if (props.mobile) return 300;
  if (props.mini) return 300;
  return settingsStore.settings.compactLayout ? 260 : 300;
});

const isActive = (path: string) => isActiveRoute(route.path, path);

const initializeExpandedGroups = () => {
  navItems.value.forEach((item) => {
    if (item.children) {
      expandedGroups.value[item.key] = item.children.some((child) =>
        isActiveRoute(route.path, child.path)
      );
    }
  });
};

const toggleGroup = (key: string) => {
  expandedGroups.value[key] = !expandedGroups.value[key];
};

watchEffect(initializeExpandedGroups);
</script>

<style scoped>
.dashboard-nav {
  border-right: 1px solid var(--gk-color-border);
  background: var(--gk-color-surface);
}

.dashboard-nav :deep(.gk-navigation-drawer__surface) {
  min-width: 0;
  overflow-x: hidden;
}

.dashboard-nav :deep(.gk-navigation-drawer__content) {
  min-width: 0;
  overflow-x: hidden;
}

.nav-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--gk-color-border);
  min-height: 64px;
}
.toggle-btn {
  margin-left: 8px;
}

.nav-list {
  padding: 8px 0;
}
.nav-item,
.nav-group-header {
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--gk-color-on-surface);
  text-decoration: none;
  min-height: 2.5rem;
  box-sizing: border-box;
}
[dir="rtl"] .nav-item,
[dir="rtl"] .nav-group-header {
  direction: rtl;
  margin: 2px 0;
}
.nav-item:hover,
.nav-group-header:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.nav-item-active,
.nav-group-active {
  background: color-mix(in srgb, var(--gk-color-primary) 15%, transparent);
  color: var(--gk-color-primary);
}
.nav-item-active:hover,
.nav-group-active:hover {
  background: color-mix(in srgb, var(--gk-color-primary) 20%, transparent);
}

.nav-sublist {
  padding-left: 16px;
  margin-top: 4px;
}
.nav-subitem {
  border-radius: 6px;
  min-height: 2.25rem;
  box-sizing: border-box;
  transition: all 0.2s ease;
  color: var(--gk-color-on-surface);
  text-decoration: none;
}
.nav-subitem:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 6%, transparent);
}
.nav-subitem-active {
  background: color-mix(in srgb, var(--gk-color-primary) 12%, transparent);
  color: var(--gk-color-primary);
}
.nav-subtitle {
  font-size: 0.85rem;
  font-weight: 500;
}
[dir="rtl"] .nav-subtitle {
  direction: rtl;
}

.nav-mini .nav-header {
  justify-content: center;
}
.nav-mini .nav-item,
.nav-mini .nav-group-header {
  justify-content: center;
  min-height: unset;
  padding: 12px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.nav-mini .nav-title {
  display: none;
}

.nav-rtl .nav-sublist {
  padding-left: 8px;
  padding-right: 16px;
}
.nav-rtl .expand-icon {
  transform: rotate(180deg);
}

.mobile-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--gk-color-border);
}
.mobile-menu-btn {
  margin-right: 12px;
}
.mobile-title {
  font-weight: 600;
}

@media (max-width: 959px) {
  .dashboard-nav {
    position: absolute;
    z-index: 1000;
  }
}
</style>
