<script setup lang="ts">
import { ref } from "vue";
import { GkButton, GkMenu } from "god-kit/vue";

const usFlagIcon = "/assets/icons/us-flag.svg";
const iranFlagIcon = "/assets/icons/iran-flag.svg";

const { setLocale, locale } = useI18n();
const langFromCookie = useCookie("lang");

const menuOpen = ref(false);

function set(lang: "en" | "fa") {
  if (locale.value !== lang) {
    setLocale(lang);
    langFromCookie.value = lang;
  }
  menuOpen.value = false;
}
</script>

<template>
  <GkMenu v-model="menuOpen" placement="bottom-end">
    <template #activator="{ props: act }">
      <GkButton v-bind="act" variant="ghost" slim class="flex items-center justify-center">
        <div v-if="locale === 'en'" class="flex items-center gap-x-2">
          <img :src="usFlagIcon" alt="US Flag" class="w-5 h-5" />
        </div>
        <div v-else class="flex items-center gap-x-2">
          <img :src="iranFlagIcon" alt="Iran Flag" class="w-5 h-5" />
        </div>
      </GkButton>
    </template>
    <section
      class="flex flex-col justify-start items-start gap-2 sm:gap-4 bg-[var(--gk-color-surface)] p-4 rounded-xl border border-[var(--gk-color-border)] text-[var(--gk-color-on-surface)]"
    >
      <button type="button" class="flex items-center gap-x-1 w-full text-left" @click="set('en')">
        <img :src="usFlagIcon" alt="US Flag" class="w-5 h-5" />
        <span>English (US)</span>
      </button>
      <button type="button" class="flex items-center gap-x-1 w-full text-left" @click="set('fa')">
        <img :src="iranFlagIcon" alt="Iran Flag" class="w-5 h-5" />
        <span>Farsi (IR)</span>
      </button>
    </section>
  </GkMenu>
</template>
