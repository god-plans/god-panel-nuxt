<template>
  <Icon
    :name="iconifyName"
    :size="size"
    class="app-icon"
    :class="{ 'app-icon--spin': showSpin }"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveAppIconifyIcon, appIconNormalizedKey } from '~/utils/app-icon-resolve'

const props = withDefaults(
  defineProps<{
    /** Legacy MDI-style name (`bell`, `mdi-bell`) or full Iconify id (`solar:home-2-bold`) */
    name: string
    size?: number | string
    /** Force rotation (e.g. loading) */
    spin?: boolean
  }>(),
  { spin: false }
)

const iconifyName = computed(() => resolveAppIconifyIcon(props.name))

const showSpin = computed(
  () => props.spin || appIconNormalizedKey(props.name) === 'loading'
)
</script>

<style scoped>
.app-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  color: inherit;
}

.app-icon--spin {
  animation: app-icon-spin 0.85s linear infinite;
}

@keyframes app-icon-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
