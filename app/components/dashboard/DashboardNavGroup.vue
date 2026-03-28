<template>
  <li class="dn-nav-group">
    <button
      type="button"
      class="dn-nav-group__trigger"
      :class="{ 'dn-nav-group__trigger--active': groupActive }"
      :aria-expanded="expanded"
      @click="$emit('toggle')"
    >
      <template v-if="mini">
        <div class="dn-nav-group__trigger-inner--rail">
          <span class="dn-nav-item__icon" aria-hidden="true">
            <AppIcon :name="navIconName(item.icon)" :size="20" />
          </span>
          <AppIcon
            :name="expanded ? 'chevron-up' : 'chevron-down'"
            :size="14"
            class="dn-nav-group__chevron shrink-0 opacity-80"
            :class="{ 'dn-nav-group__chevron--expanded': expanded }"
          />
        </div>
      </template>
      <template v-else>
        <span
          class="dn-nav-group__title flex min-w-0 flex-1 items-center gap-2"
          :class="{ 'text-end': isRTL }"
        >
          <span class="dn-nav-item__icon dn-nav-item__icon--sm" aria-hidden="true">
            <AppIcon :name="navIconName(item.icon)" :size="20" />
          </span>
          <span class="min-w-0 truncate">{{ t(item.title) }}</span>
        </span>
        <AppIcon
          :name="expanded ? 'chevron-up' : 'chevron-down'"
          :size="16"
          class="dn-nav-group__chevron shrink-0"
          :class="{ 'dn-nav-group__chevron--expanded': expanded }"
        />
      </template>
    </button>

    <ul
      v-if="expanded && children.length"
      class="dn-nav-sublist"
    >
      <li v-for="child in children" :key="child.key">
        <NuxtLink
          :to="child.path"
          class="dn-nav-subitem"
          :class="{ 'dn-nav-subitem--active': isItemActive(child.path) }"
          :aria-current="isItemActive(child.path) ? 'page' : undefined"
          @click="$emit('navigate')"
        >
          <span class="dn-nav-item__icon dn-nav-item__icon--sm" aria-hidden="true">
            <AppIcon :name="navIconName(child.icon)" :size="18" />
          </span>
          <span
            v-if="showLabels"
            class="min-w-0 flex-1 truncate leading-snug"
            :class="{ 'text-end': isRTL }"
          >
            {{ t(child.title) }}
          </span>
          <span
            v-if="showLabels && child.badge != null && child.badge !== ''"
            class="dn-nav-item__badge shrink-0"
          >
            {{ child.badge }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NavItem } from '~/utils/routes'
import { navIconName } from '~/utils/nav'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

const props = defineProps<{
  item: NavItem
  mini: boolean
  showLabels: boolean
  expanded: boolean
  groupActive: boolean
  isRTL: boolean
  isItemActive: (path: string) => boolean
}>()

const children = computed(() => props.item.children ?? [])

defineEmits<{
  toggle: []
  navigate: []
}>()
</script>
