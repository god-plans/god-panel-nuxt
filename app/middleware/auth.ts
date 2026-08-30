/**
 * Protects dashboard routes. `restore()` has already settled by the time this
 * runs (see `plugins/auth.ts`), so the check is a plain boolean — no loading
 * flag to race against.
 */
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  if (auth.isAuthenticated) return

  return navigateTo({
    path: '/auth/login',
    // Send the user back where they were headed once they sign in.
    query: to.fullPath === '/' ? undefined : { redirect: to.fullPath },
  })
})
