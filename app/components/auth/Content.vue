<template>
  <div class="auth-content">
    <div class="auth-content-inner">
      <slot />
    </div>
  </div>
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
.auth-content {
  padding: 16px 24px;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.auth-content-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: var(--layout-auth-content-width, 520px);
  
  box-sizing: border-box;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .auth-content {
    padding: 0;
    padding-top: 0;
    align-items: stretch;
    justify-content: center;
    flex: 1 1 auto;
  }

  .auth-content-inner {
    padding: 2.25rem 2rem;
    max-width: min(var(--layout-auth-content-width, 520px), 100%);
  }
}
</style>
