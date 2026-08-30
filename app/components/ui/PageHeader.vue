<template>
  <div class="page-header">
    <div class="page-header__text">
      <p v-if="kicker" class="panel-kicker">{{ kicker }}</p>
      <h1 class="panel-section-title">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p v-if="subtitle || $slots.subtitle" class="panel-section-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </div>

    <div v-if="$slots.actions" class="page-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Title block at the top of a page. Use it on every page so headings, spacing
 * and the actions row stay identical everywhere.
 *
 * ```vue
 * <PageHeader :title="t('pages.users.title')" :subtitle="t('pages.users.subtitle')">
 *   <template #actions><GkButton>Add user</GkButton></template>
 * </PageHeader>
 * ```
 */
defineProps<{
  title?: string
  subtitle?: string
  /** Small uppercase label above the title, e.g. a section or breadcrumb hint. */
  kicker?: string
}>()
</script>

<style scoped>
.page-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.page-header__text {
  min-width: 0;
}

.page-header__text > * + * {
  margin-top: 0.375rem;
}

.page-header__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
</style>
