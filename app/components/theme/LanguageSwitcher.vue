<script setup>
import { useLocale } from "vuetify";

const { t, setLocale, locale } = useI18n();
const langFromCookie = useCookie("lang");
const { current } = useLocale();

function changeLocale(locale) {
  current.value = locale;
}

const props = defineProps({
  showLang: {
    type: Boolean,
    default: true,
  },
});

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
    // Clear any reload flags before setting new locale
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("locale_reload_triggered");
    }

    setLocale(lang);
    langFromCookie.value = lang;
  }
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <button type="button" class="flex items-center gap-x-2" v-bind="props">
        <div v-if="locale === 'en'" class="flex items-center gap-x-2">
          <p v-if="showLang" class="text-sm dark:!text-white lg:block hidden">
            English (US)
          </p>
        </div>
        <div v-else class="flex items-center gap-x-2">
          <p v-if="showLang" class="text-sm dark:!text-white lg:block hidden">
            Farsi (IR)
          </p>
        </div>
        <Icon
          v-if="showLang"
          name="tabler:chevron-down"
          class="h-5 w-5 lg:!block !hidden"
        />
      </button>
    </template>
    <section
      class="flex flex-col justify-start items-start gap-2 bg-white dark:!bg-gray-900 p-4 rounded-lg mt-3 border-1 border-solid border-neutral-100 dark:!border-neutral-400"
    >
      <button
        class="flex items-center gap-x-1 text-black dark:!text-white"
        @click="set('en')"
      >
        <p>English (US)</p>
      </button>
      <button
        @click="set('fa')"
        class="flex items-center gap-x-1 text-black dark:!text-white"
      >
        <p>Farsi (IR)</p>
      </button>
    </section>
  </v-menu>
</template>

<style></style>
