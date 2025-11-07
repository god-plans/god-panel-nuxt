<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!mobile"
    :temporary="mobile"
    :mini="mini && !mobile"
    :width="getNavWidth()"
    :location="isRTL ? 'right' : 'left'"
    class="dashboard-nav"
    :class="{
      'nav-mini': mini && !mobile,
      'nav-compact': settingsStore.settings.compactLayout,
      'nav-rtl': isRTL,
    }"
  >
    <!-- Header -->
    <div v-if="mobile" class="mobile-header">
      <v-btn icon @click="$emit('open-mobile')" class="mobile-menu-btn">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <span class="mobile-title">{{ t("common.menu") }}</span>
    </div>

    <div v-else class="nav-header">
      <Logo
        :variant="mini ? 'icon' : 'compact'"
        :size="mini ? 'sm' : 'md'"
        class="logo"
      />
      <v-spacer v-if="!mini" />
      <v-btn
        icon
        @click="$emit('toggle-mini')"
        :size="mini ? 'small' : 'medium'"
        class="toggle-btn"
      >
        <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
      </v-btn>
    </div>

    <!-- Navigation Items -->
    <v-list class="nav-list" density="compact">
      <template v-for="item in navItems" :key="item.key">
        <!-- Normal link -->
        <v-list-item
          v-if="!item.children"
          :to="item.path"
          class="nav-item"
          :class="{ 'nav-item-active': isActive(item.path) }"
        >
          <v-list-item-title
            class="nav-title d-flex align-center gap-2"
            :class="{
              'text-right': isRTL,
              'justify-start': mini && !mobile,
            }"
          >
            <v-icon size="20">{{ item.icon }}</v-icon>
            <div v-if="!mini || mobile">
              {{ t(item.title) }}
            </div>
          </v-list-item-title>
        </v-list-item>

        <!-- Group with children -->
        <template v-else>
          <!-- Expanded normal version -->
          <div class="nav-group">
            <v-list-item
              class="nav-group-header"
              :class="{
                'nav-group-active': isActive(item.path),
                'nav-group-expanded': expandedGroups[item.key],
              }"
              @click="toggleGroup(item.key)"
            >
              <div v-if="mini" class="nav-group-header-icon">
                <v-icon size="20">{{ item.icon }}</v-icon>
                <v-icon
                  size="16"
                  class="expand-icon"
                  :class="{ expanded: expandedGroups[item.key] }"
                >
                  {{
                    expandedGroups[item.key]
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}
                </v-icon>
              </div>

              <v-list-item-title
                class="nav-title"
                :class="{ 'text-right': isRTL }"
              >
                <div class="flex align-center gap-2 justify-between">
                  <div class="d-flex align-center gap-2">
                    <v-icon size="16" v-if="!mini">{{ item.icon }}</v-icon>

                    <div v-if="!mini || mobile">
                      {{ t(item.title) }}
                    </div>
                  </div>

                  <div class="d-flex align-center gap-2">
                    <v-icon
                      size="16"
                      class="expand-icon"
                      :class="{ expanded: expandedGroups[item.key] }"
                    >
                      {{
                        expandedGroups[item.key]
                          ? "mdi-chevron-up"
                          : "mdi-chevron-down"
                      }}
                    </v-icon>
                  </div>
                </div>
              </v-list-item-title>
            </v-list-item>

            <!-- Sub Items -->
            <v-list
              v-if="expandedGroups[item.key]"
              class="nav-sublist"
              density="compact"
            >
              <v-list-item
                v-for="child in item.children"
                :key="child.key"
                :to="child.path"
                class="nav-subitem"
                :class="{ 'nav-subitem-active': isActive(child.path) }"
              >
                <v-list-item-title
                  class="nav-subtitle d-flex align-center gap-2"
                  :class="{
                    'text-right': isRTL,
                    'justify-center': mini && !mobile,
                  }"
                >
                  <v-icon size="16">{{ child.icon }}</v-icon>
                  <div v-if="!mini || mobile">
                    {{ t(child.title) }}
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </template>
      </template>
    </v-list>

    <!-- Footer -->
    <template #append>
      <DashboardNavInfo :mini="mini" :mobile="mobile" />
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { dashboardNavItems, isActiveRoute } from "../../utils/routes";
import { useSettingsStore } from "../../stores/settings";
import Logo from "../common/Logo.vue";
import DashboardNavInfo from "./DashboardNavInfo.vue";

const { t } = useI18n();
const props = defineProps<{ mini?: boolean; mobile?: boolean }>();
const emit = defineEmits(["toggle-mini", "open-mobile"]);

const settingsStore = useSettingsStore();
const route = useRoute();

const navItems = ref(dashboardNavItems);
const drawer = ref(!props.mobile);
const expandedGroups = ref<Record<string, boolean>>({});
const isRTL = computed(() => settingsStore.settings.direction === "rtl");

const getNavWidth = () => {
  if (props.mobile) return 300;
  if (props.mini) return 88;
  return settingsStore.settings.compactLayout ? 260 : 300;
};

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
  border-right: 1px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface));
}

/* HEADER */
.nav-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
  min-height: 64px;
}
.toggle-btn {
  margin-left: 8px;
}

/* LIST BASE */
.nav-list {
  padding: 8px 0;
}
.nav-item,
.nav-group-header {
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}
[dir="rtl"] .nav-item,
[dir="rtl"] .nav-group-header {
  direction: rtl;
  margin: 2px 0;
}
.nav-item:hover,
.nav-group-header:hover {
  background: rgba(var(--v-theme-on-surface-rgb), 0.08);
}

/* ACTIVE STATES */
.nav-item-active,
.nav-group-active {
  background: rgba(var(--v-theme-primary-rgb), 0.12);
  color: rgb(var(--v-theme-primary));
}
.nav-item-active:hover,
.nav-group-active:hover {
  background: rgba(var(--v-theme-primary-rgb), 0.16);
}
.nav-item-active .v-icon,
.nav-group-active .v-icon {
  color: rgb(var(--v-theme-primary)) !important;
}

/* SUBLIST */
.nav-sublist {
  padding-left: 16px;
  margin-top: 4px;
}
.nav-subitem {
  border-radius: 6px;
  min-height: 36px;
  transition: all 0.2s ease;
}
.nav-subitem:hover {
  background: rgba(var(--v-theme-on-surface-rgb), 0.06);
}
.nav-subitem-active {
  background: rgba(var(--v-theme-primary-rgb), 0.1);
  color: rgb(var(--v-theme-primary));
}
.nav-subtitle {
  font-size: 0.85rem;
  font-weight: 500;
}
[dir="rtl"] .nav-subtitle {
  direction: rtl;
}

/* MINI MODE */
.nav-mini .nav-header {
  justify-content: center;
}
.nav-mini .nav-item,
.nav-mini .nav-group-header {
  justify-content: center;
  padding: 12px;
  width: 100% !important;
}
.nav-mini .nav-title {
  display: none;
}

/* MINI DROPDOWN TOOLTIP */
.mini-submenu {
  padding: 8px 0;
}
.mini-submenu-title {
  font-weight: 600;
  font-size: 0.85rem;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface-rgb), 0.1);
  display: flex;
  align-items: center;
}
.mini-subitem {
  border-radius: 6px;
  margin: 2px 4px;
}
.mini-subitem:hover {
  background: rgba(var(--v-theme-on-surface-rgb), 0.06);
}

/* RTL Support */
.nav-rtl .nav-sublist {
  padding-left: 8px;
  padding-right: 16px;
}
.nav-rtl .expand-icon {
  transform: rotate(180deg);
}

/* MOBILE HEADER */
.mobile-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
}
.mobile-menu-btn {
  margin-right: 12px;
}
.mobile-title {
  font-weight: 600;
}

/* FOOTER */
.nav-footer {
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
  padding: 8px 0;
}

/* RESPONSIVE */
@media (max-width: 959px) {
  .dashboard-nav {
    position: absolute;
    z-index: 1000;
  }
}

</style>
