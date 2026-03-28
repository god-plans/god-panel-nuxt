<template>
  <main class="auth-main auth-main--luxury">
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
  min-height: 0;
}

.auth-main--luxury {
  width: 100%;
}

@media (min-width: 960px) {
  .auth-main--luxury {
    flex-direction: row;
    align-items: stretch;
    gap: 2rem;
    padding: 2rem;
    padding-top: calc(var(--layout-header-desktop-height, 64px) + 1.25rem);
    box-sizing: border-box;
 
    margin-inline: auto;
    max-width: 1600px;
  }
}
</style>
