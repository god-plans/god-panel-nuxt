<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        icon
        variant="text"
        size="small"
        v-bind="props"
      >
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLocale(locale.code)"
        :class="{ 'v-list-item--active': locale.code === currentLocale }"
      >
        <v-list-item-title>{{ locale.name }}</v-list-item-title>
        <v-list-item-action v-if="locale.code === currentLocale">
          <v-icon>mdi-check</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { $i18n } = useNuxtApp()
const localeCookie = useCookie('locale', { default: () => 'en' })

const currentLocale = computed(() => $i18n.locale.value)

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'fa', name: 'فارسی' }
]

const switchLocale = async (locale: string) => {
  // Update i18n locale
  $i18n.locale.value = locale

  // Save to cookie for persistence
  localeCookie.value = locale

  // Direction, lang attributes, and settings are handled automatically by the i18n-direction plugin
}
</script>
