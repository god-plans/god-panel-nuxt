<template>
  <GkMenu v-model="menuOpen" placement="bottom-end">
    <template #activator="{ props: activator }">
      <GkButton
        v-bind="activator"
        variant="ghost"
        slim
        :aria-label="t('settings.language')"
      >
        <img :src="current.flag" :alt="current.label" class="language-switcher__flag">
      </GkButton>
    </template>

    <ul class="panel-menu-surface language-switcher__menu" role="menu">
      <li v-for="option in LOCALES" :key="option.code">
        <button
          type="button"
          class="language-switcher__option"
          :class="{ 'language-switcher__option--active': locale === option.code }"
          role="menuitemradio"
          :aria-checked="locale === option.code"
          @click="select(option)"
        >
          <img :src="option.flag" :alt="option.label" class="language-switcher__flag">
          <span>{{ option.label }}</span>
        </button>
      </li>
    </ul>
  </GkMenu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { GkButton, GkMenu } from 'god-kit/vue'

interface LocaleOption {
  code: 'en' | 'fa'
  label: string
  flag: string
  dir: 'ltr' | 'rtl'
}

const LOCALES: LocaleOption[] = [
  { code: 'en', label: 'English (US)', flag: '/assets/icons/us-flag.svg', dir: 'ltr' },
  { code: 'fa', label: 'فارسی (ایران)', flag: '/assets/icons/iran-flag.svg', dir: 'rtl' },
]

const { t, locale, setLocale } = useI18n()
const settings = useSettingsStore()
const menuOpen = ref(false)

const current = computed(() => LOCALES.find((l) => l.code === locale.value) ?? LOCALES[0]!)

async function select(option: LocaleOption) {
  menuOpen.value = false
  if (locale.value === option.code) return

  await setLocale(option.code)
  // Switching to Persian should flip the layout in one action; the RTL toggle
  // in the settings drawer can still override it afterwards.
  settings.updateField('direction', option.dir)
}
</script>

<style scoped>
.language-switcher__flag {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  object-fit: cover;
}

.language-switcher__menu {
  list-style: none;
  min-width: 180px;
  margin: 0;
  padding: 0.25rem;
}

.language-switcher__option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border: 0;
  border-radius: var(--panel-radius-sm);
  background: none;
  color: inherit;
  font-size: 0.875rem;
  text-align: start;
  cursor: pointer;
}

.language-switcher__option:hover {
  background: color-mix(in srgb, var(--gk-color-primary) 8%, transparent);
}

.language-switcher__option--active {
  color: var(--gk-color-primary);
  font-weight: 600;
}
</style>
