<template>
  <div>
    <PageHeader :title="t('pages.settings.title')" :subtitle="t('pages.settings.subtitle')" />

    <div class="settings">
      <ThemeSettings />

      <PanelCard :title="t('pages.settings.aboutThemeSystem')" icon="information" padding="lg">
        <section class="settings__section">
          <h3 class="settings__heading">{{ t('pages.settings.themeFeatures') }}</h3>
          <ul class="settings__list">
            <li>{{ t('pages.settings.lightDarkMode') }}</li>
            <li>{{ t('pages.settings.rtlLtrSupport') }}</li>
            <li>{{ t('pages.settings.primaryColors') }}</li>
            <li>{{ t('pages.settings.layoutOptions') }}</li>
            <li>{{ t('pages.settings.fontCustomization') }}</li>
            <li>{{ t('pages.settings.highContrast') }}</li>
            <li>{{ t('pages.settings.solarIconStyle') }}</li>
          </ul>
        </section>

        <div class="panel-divider settings__divider" role="separator" />

        <section class="settings__section">
          <h3 class="settings__heading">{{ t('pages.settings.resources') }}</h3>
          <p class="settings__text">
            {{ t('pages.settings.godKitDocsBlurb') }}
            <a
              :href="docsUrl"
              class="settings__link"
              target="_blank"
              rel="noopener noreferrer"
            >{{ t('pages.settings.godKitDocsLink') }}</a>
          </p>
        </section>

        <div class="panel-divider settings__divider" role="separator" />

        <section class="settings__section">
          <h3 class="settings__heading">{{ t('pages.settings.colorPalette') }}</h3>
          <p class="settings__text">{{ t('pages.settings.colorPaletteDesc') }}</p>
        </section>

        <div class="panel-divider settings__divider" role="separator" />

        <section class="settings__section">
          <h3 class="settings__heading">{{ t('pages.settings.typography') }}</h3>
          <p class="settings__text">{{ t('pages.settings.typographyDesc') }}</p>
        </section>
      </PanelCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ThemeSettings from '~/components/theme/ThemeSettings.vue'

const { t } = useI18n()
const docsUrl = useRuntimeConfig().public.godKitDocumentation

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Settings — God Panel' })
</script>

<style scoped>
.settings {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (min-width: 900px) {
  .settings {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.settings__section + .settings__section {
  margin-top: 1rem;
}

.settings__heading {
  margin: 0 0 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
}

.settings__list {
  margin: 0;
  padding-inline-start: 1.25rem;
  color: var(--gk-color-on-surface-muted);
}

.settings__list li + li {
  margin-top: 0.25rem;
}

.settings__text {
  margin: 0;
  line-height: 1.6;
  color: var(--gk-color-on-surface-muted);
}

.settings__divider {
  margin-block: 1rem;
}

.settings__link {
  color: var(--gk-color-primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
