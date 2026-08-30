import { defineStore } from 'pinia'
import { userSchema, type LoginForm, type User } from '~/types/validation'

/**
 * Demo account for the starter. It exists so the panel runs with no backend at
 * all; delete `DEMO_USER` and set `NUXT_PUBLIC_DEMO_MODE=false` once your API
 * is wired up and `login()` will talk only to `NUXT_PUBLIC_API_URL`.
 */
const DEMO_CREDENTIALS = { email: 'godpanel@test.com', password: 'god123' }

const DEMO_USER: User = {
  id: 'demo-user-1',
  displayName: 'Demo User',
  email: DEMO_CREDENTIALS.email,
  photoURL: '/assets/images/avatar.webp',
  phoneNumber: '+1 234 567 890',
  role: 'admin',
}

export type AuthResult = { success: true } | { success: false; error: string }

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  /** False until `restore()` has settled, so guards never redirect mid-check. */
  const ready = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const role = computed(() => user.value?.role ?? 'user')
  const isAdmin = computed(() => role.value === 'admin')
  const displayName = computed(() => user.value?.displayName ?? '')
  const email = computed(() => user.value?.email ?? '')

  const token = useAuthToken()
  const isDemoMode = () => useRuntimeConfig().public.demoMode

  function startDemoSession() {
    user.value = DEMO_USER
    token.value = 'demo-token'
  }

  /**
   * Rebuilds the session from the token cookie. Runs once, from the auth
   * plugin, before the first route guard fires.
   */
  async function restore() {
    if (ready.value) return
    try {
      if (!token.value) return

      if (isDemoMode() && token.value === 'demo-token') {
        user.value = DEMO_USER
        return
      }

      const data = await useApi()<{ user: unknown }>('/auth/me')
      user.value = userSchema.parse(data.user)
    } catch (error) {
      console.warn('Could not restore session:', error)
      user.value = null
      token.value = null
    } finally {
      ready.value = true
    }
  }

  async function login(credentials: LoginForm): Promise<AuthResult> {
    if (
      isDemoMode() &&
      credentials.email === DEMO_CREDENTIALS.email &&
      credentials.password === DEMO_CREDENTIALS.password
    ) {
      startDemoSession()
      return { success: true }
    }

    try {
      const data = await useApi()<{ user: unknown; accessToken: string }>('/auth/login', {
        method: 'POST',
        body: credentials,
      })

      token.value = data.accessToken
      user.value = userSchema.parse(data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error: apiErrorMessage(error, 'Login failed. Please try again.') }
    }
  }

  async function logout() {
    const wasDemo = token.value === 'demo-token'
    // Clear locally first: the user asked to leave, so the UI should not wait
    // on — or be blocked by — an API that may be unreachable.
    user.value = null
    token.value = null

    if (wasDemo || !isDemoMode()) {
      try {
        await useApi()('/auth/logout', { method: 'POST' })
      } catch {
        // A failed server-side invalidation must not keep the user signed in.
      }
    }
  }

  async function updateProfile(updates: Partial<User>): Promise<AuthResult> {
    try {
      if (isDemoMode() && token.value === 'demo-token') {
        user.value = { ...user.value!, ...updates }
        return { success: true }
      }

      const data = await useApi()<{ user: unknown }>('/auth/profile', {
        method: 'PATCH',
        body: updates,
      })
      user.value = userSchema.parse(data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error: apiErrorMessage(error, 'Profile update failed.') }
    }
  }

  return {
    user,
    ready,
    isAuthenticated,
    role,
    isAdmin,
    displayName,
    email,
    demoCredentials: DEMO_CREDENTIALS,
    restore,
    login,
    logout,
    updateProfile,
  }
})
