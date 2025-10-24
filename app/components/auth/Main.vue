<template>
  <main class="auth-main">
    <slot />
  </main>
</template>

<script setup lang="ts">
interface Props {
  layoutQuery?: string
}

withDefaults(defineProps<Props>(), {
  layoutQuery: 'md'
})
</script>

<style scoped>
.auth-main {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

@media (min-width: 960px) {
  .auth-main {
    flex-direction: row;
  }
}
</style>
