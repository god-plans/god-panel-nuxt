<template>
  <v-dialog
    v-model="showDialog"
    max-width="400"
    persistent
  >
    <v-card class="logout-dialog">
      <v-card-title class="text-center">
        <v-icon size="48" color="warning" class="mb-2">mdi-logout</v-icon>
        <div class="text-h6 font-weight-bold">Confirm Logout</div>
      </v-card-title>

      <v-card-text class="text-center">
        <p class="text-body-1 mb-4">
          Are you sure you want to log out of your account?
        </p>
        <p class="text-body-2 text-medium-emphasis">
          You will need to sign in again to access your dashboard.
        </p>
      </v-card-text>

      <v-card-actions class="justify-center gap-2 pa-4">
        <v-btn
          variant="outlined"
          size="large"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          size="large"
          @click="confirm"
          :loading="loading"
        >
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

// Computed property for v-model
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

.text-center {
  text-align: center !important;
}

.gap-2 {
  gap: 8px;
}
</style>
