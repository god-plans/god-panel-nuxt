/**
 * Rebuilds the session before the first route guard runs, so `auth` / `guest`
 * middleware always see a settled `isAuthenticated` and never flash the wrong
 * page. Runs on server and client because the token lives in a cookie.
 *
 * No `enforce: 'pre'` — that would order this ahead of the Pinia module plugin
 * and `useAuthStore()` would have no active Pinia instance. Plain ordering is
 * enough: every plugin resolves before the first middleware.
 */
export default defineNuxtPlugin({
  name: 'auth',
  async setup() {
    await useAuthStore().restore()
  },
})
