<template>
  <div>
    <PageHeader :title="t('common.one')" :subtitle="t('pages.groups.childDescription')" />
    <PanelCard padding="none">
      <EmptyState
        icon="numeric-5-circle"
        :title="t('pages.groups.emptyTitle')"
        :description="t('pages.groups.emptyDescription')"
      />
    </PanelCard>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Group One — God Panel' })
</script>
