<template>
  <div>
    <PageHeader :title="t('settings.profile')" :subtitle="t('pages.profile.subtitle')" />

    <div class="profile">
      <PanelCard padding="lg" class="profile__identity">
        <img :src="auth.user?.photoURL || FALLBACK_AVATAR" :alt="auth.displayName" class="profile__avatar">
        <p class="profile__name">{{ auth.displayName }}</p>
        <p class="profile__email">{{ auth.email }}</p>
        <span class="profile__role">{{ t(`roles.${auth.role}`) }}</span>
      </PanelCard>

      <PanelCard :title="t('pages.profile.accountDetails')" padding="lg">
        <form class="profile__form" @submit.prevent="save">
          <GkField :label="t('pages.profile.displayName')">
            <GkInput v-model="form.displayName" name="displayName" autocomplete="name" />
          </GkField>

          <GkField :label="t('auth.email')" :hint="t('pages.profile.emailHint')">
            <GkInput :model-value="auth.email" name="email" type="email" disabled />
          </GkField>

          <GkField :label="t('pages.profile.phoneNumber')">
            <GkInput v-model="form.phoneNumber" name="phoneNumber" type="tel" autocomplete="tel" />
          </GkField>

          <div class="profile__actions">
            <GkButton type="submit" :loading="saving">{{ t('common.save') }}</GkButton>
            <GkButton type="button" variant="secondary" :disabled="saving" @click="resetForm">
              {{ t('common.cancel') }}
            </GkButton>
          </div>
        </form>
      </PanelCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { GkButton, GkField, GkInput, pushGkSnackbar } from 'god-kit/vue'

const FALLBACK_AVATAR = '/assets/images/avatar.webp'

const { t } = useI18n()
const auth = useAuthStore()

const saving = ref(false)
const form = reactive({
  displayName: auth.user?.displayName ?? '',
  phoneNumber: auth.user?.phoneNumber ?? '',
})

function resetForm() {
  form.displayName = auth.user?.displayName ?? ''
  form.phoneNumber = auth.user?.phoneNumber ?? ''
}

async function save() {
  saving.value = true
  const result = await auth.updateProfile({ ...form })
  saving.value = false

  pushGkSnackbar({
    message: result.success ? t('pages.profile.saved') : result.error,
    variant: result.success ? 'success' : 'danger',
  })
}

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Profile — God Panel' })
</script>

<style scoped>
.profile {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .profile {
    grid-template-columns: minmax(0, 18rem) minmax(0, 1fr);
  }
}

.profile__identity {
  text-align: center;
}

.profile__avatar {
  width: 96px;
  height: 96px;
  margin: 0 auto 1rem;
  border-radius: 999px;
  object-fit: cover;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gk-color-primary) 25%, transparent);
}

.profile__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.profile__email {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--gk-color-on-surface-muted);
}

.profile__role {
  display: inline-block;
  margin-top: 0.875rem;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--gk-color-primary) 12%, transparent);
  color: var(--gk-color-primary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.profile__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.profile__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
