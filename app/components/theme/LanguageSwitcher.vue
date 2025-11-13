<script setup>
import { useLocale } from "vuetify";

// Import SVG icons
const usFlagIcon = "/assets/icons/us-flag.svg";
const iranFlagIcon = "/assets/icons/iran-flag.svg";

const { t, setLocale, locale } = useI18n();
const langFromCookie = useCookie("lang");
const { current } = useLocale();

function changeLocale(locale) {
  current.value = locale;
}

// watch
watch(
  () => locale,
  (newVal, oldVal) => {
    // Only update Vuetify locale when i18n locale actually changes
    if (newVal !== oldVal) {
      changeLocale(newVal);
    }
  },
  { immediate: false }
);

function set(lang) {
  // Prevent unnecessary updates if already set
  if (locale.value !== lang) {
    setLocale(lang);
    langFromCookie.value = lang;
  }
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        type="button"
        icon
        class="flex items-center justify-center"
        v-bind="props"
      >
        <div v-if="locale === 'en'" class="flex items-center gap-x-2">
          <img :src="usFlagIcon" alt="US Flag" class="w-5 h-5" />
        </div>
        <div v-else class="flex items-center gap-x-2">
          <img :src="iranFlagIcon" alt="Iran Flag" class="w-5 h-5" />
        </div>

      </v-btn>
    </template>
    <section
      class="flex flex-col justify-start items-start gap-2 sm:gap-4 bg-white dark:!bg-gray-900 p-4 rounded-xl mt-3 border-1 border-solid border-neutral-100 dark:!border-neutral-400"
    >
      <button class="flex items-center gap-x-1" @click="set('en')">
        <img :src="usFlagIcon" alt="US Flag" class="w-5 h-5" />
        <p>English (US)</p>
      </button>
      <button @click="set('fa')" class="flex items-center gap-x-1">
        <img :src="iranFlagIcon" alt="Iran Flag" class="w-5 h-5" />
        <p>Farsi (IR)</p>
      </button>
    </section>
  </v-menu>
</template>

<style></style>
