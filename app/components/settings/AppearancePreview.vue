<template>
  <v-card class="appearance-preview" elevation="0">
    <v-card-title class="text-h6 mb-4">
      <v-icon class="me-2">mdi-eye</v-icon>
      {{ t('settings.preview.title') }}
    </v-card-title>

    <v-card-text>
      <!-- Theme Preview -->
      <div class="preview-section">
        <h4 class="text-body-1 font-weight-medium mb-3">{{ t('settings.preview.themePreview') }}</h4>

        <!-- Buttons Preview -->
        <div class="preview-buttons mb-4">
          <v-btn variant="flat" size="small" class="me-2 mb-2">
            {{ t('common.primary') }}
          </v-btn>
          <v-btn variant="outlined" size="small" class="me-2 mb-2">
            {{ t('common.secondary') }}
          </v-btn>
          <v-btn variant="text" size="small" class="me-2 mb-2">
            {{ t('common.text') }}
          </v-btn>
        </div>

        <!-- Cards Preview -->
        <div class="preview-cards mb-4">
          <v-card class="preview-card mb-3" elevation="0">
            <v-card-title class="text-body-2 pa-3 pb-2">{{ t('settings.preview.cardTitle') }}</v-card-title>
            <v-card-text class="pa-3 pt-0">
              <p class="text-body-2 mb-2">{{ t('settings.preview.cardContent') }}</p>
              <div class="d-flex gap-2">
                <v-chip size="small" variant="outlined">{{ t('common.tag') }}</v-chip>
                <v-chip size="small" color="primary">{{ t('common.primary') }}</v-chip>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <!-- Form Elements Preview -->
        <div class="preview-form mb-4">
          <v-text-field
            :label="t('common.email')"
            variant="outlined"
            density="compact"
            class="mb-3"
            hide-details
          />
          <v-select
            :label="t('settings.preview.selectLabel')"
            :items="['Option 1', 'Option 2', 'Option 3']"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>

        <!-- Typography Preview -->
        <div class="preview-typography">
          <h4 class="text-h6 mb-2">{{ t('settings.preview.headline') }}</h4>
          <p class="text-body-1 mb-2">{{ t('settings.preview.bodyText') }}</p>
          <p class="text-body-2 text-medium-emphasis">{{ t('settings.preview.captionText') }}</p>
        </div>
      </div>

      <!-- Color Palette -->
      <v-divider class="my-4" />

      <div class="preview-section">
        <h4 class="text-body-1 font-weight-medium mb-3">{{ t('settings.preview.colorPalette') }}</h4>

        <div class="color-palette">
          <div class="color-item">
            <div class="color-swatch" :style="{ backgroundColor: `rgb(var(--v-theme-primary))` }"></div>
            <span class="text-caption">{{ t('common.primary') }}</span>
          </div>
          <div class="color-item">
            <div class="color-swatch" :style="{ backgroundColor: `rgb(var(--v-theme-secondary))` }"></div>
            <span class="text-caption">{{ t('common.secondary') }}</span>
          </div>
          <div class="color-item">
            <div class="color-swatch" :style="{ backgroundColor: `rgb(var(--v-theme-success))` }"></div>
            <span class="text-caption">{{ t('common.success') }}</span>
          </div>
          <div class="color-item">
            <div class="color-swatch" :style="{ backgroundColor: `rgb(var(--v-theme-error))` }"></div>
            <span class="text-caption">{{ t('common.error') }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.appearance-preview {
  position: sticky;
  top: 24px;
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
  border-radius: 12px;
}

.preview-section {
  margin-bottom: 16px;
}

.preview-buttons {
  display: flex;
  flex-wrap: wrap;
}

.preview-card {
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
}

.color-palette {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid rgba(var(--v-theme-outline-variant), 0.3);
}

@media (max-width: 768px) {
  .appearance-preview {
    position: static;
  }

  .color-palette {
    grid-template-columns: 1fr;
  }
}
</style>

