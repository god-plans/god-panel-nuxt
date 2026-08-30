/**
 * The panel's single HTTP entry point.
 *
 * `$fetch` is built into Nuxt and works on both server and client, so there is
 * no axios instance, no interceptor stack and no request cache to maintain —
 * this file is the whole networking layer.
 *
 * ```ts
 * const api = useApi()
 * const users = await api<User[]>('/users')
 * await api('/users', { method: 'POST', body: payload })
 * ```
 */
export function useApi() {
  const { apiUrl } = useRuntimeConfig().public
  const token = useAuthToken()

  return $fetch.create({
    baseURL: apiUrl,
    onRequest({ options }) {
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    onResponseError({ response }) {
      // The session is gone — drop the token so route middleware sends the
      // user to /auth/login instead of looping on 401s.
      if (response.status === 401) {
        token.value = null
      }
    },
  })
}

/**
 * The access token, in a cookie rather than `localStorage` so that route
 * middleware can read it during SSR and render the correct page on first paint.
 */
export function useAuthToken() {
  return useCookie<string | null>('auth-token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: !import.meta.dev,
  })
}

/** Pulls a human-readable message out of whatever `$fetch` threw. */
export function apiErrorMessage(error: unknown, fallback: string): string {
  const data = (error as { data?: { message?: string } })?.data
  if (typeof data?.message === 'string' && data.message) return data.message
  if (error instanceof Error && error.message) return error.message
  return fallback
}
