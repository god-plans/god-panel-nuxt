<template>
  <GkDialog v-model="showDialog" :persistent="true" :max-width="400">
    <div class="logout-dialog text-center">
      <AppIcon name="logout" :size="48" class="text-[var(--gk-color-warning)] mb-2" />
      <h2 class="text-lg font-bold mb-2">{{ t('auth.logoutConfirmTitle') }}</h2>
      <p class="text-base mb-4">
        {{ t('auth.logoutConfirmMessage') }}
      </p>
      <p class="text-sm opacity-80 mb-6">
        {{ t('auth.logoutConfirmNote') }}
      </p>
      <div class="flex justify-center gap-2 flex-wrap">
        <GkButton variant="secondary" @click="cancel">
          {{ t('common.cancel') }}
        </GkButton>
        <GkButton variant="danger" :loading="loading" @click="confirm">
          {{ t('common.logout') }}
        </GkButton>
      </div>
    </div>
  </GkDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GkButton, GkDialog } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

interface Props {
  modelValue: boolean
}

interface Emits {
  'update:modelValue': [value: boolean]
  'confirm': []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const loading = ref(false)

const showDialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const cancel = () => {
  showDialog.value = false
}

const confirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.logout-dialog {
  border-radius: 16px;
}
</style>
