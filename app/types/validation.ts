import { z } from 'zod'

/**
 * Runtime shapes for everything that crosses a trust boundary: form input,
 * API responses, and the settings cookie. Add your own schemas here and infer
 * the TypeScript type from them so the two can never drift apart.
 */

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const userSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  email: z.string().email(),
  photoURL: z.string().optional(),
  phoneNumber: z.string().optional(),
  role: z.enum(['admin', 'manager', 'user']),
})

export const settingsSchema = z.object({
  colorScheme: z.enum(['light', 'dark']),
  direction: z.enum(['ltr', 'rtl']),
  contrast: z.enum(['default', 'high']),
  primaryColor: z.enum(['default', 'purple', 'cyan', 'blue', 'orange', 'red']),
  navLayout: z.enum(['vertical', 'horizontal', 'mini']),
  compactLayout: z.boolean(),
  fontFamily: z.enum(['Inter', 'Roboto', 'Poppins', 'Barlow', 'DM Sans', 'Nunito Sans']),
  /** App icons: Solar linear (outline) vs solid (filled) */
  iconStyle: z.enum(['linear', 'solid']),
})

/** Cookies written by an older build may be missing keys — parse leniently, then merge over defaults. */
export const partialSettingsSchema = settingsSchema.partial()

export type LoginForm = z.infer<typeof loginSchema>
export type User = z.infer<typeof userSchema>
export type Settings = z.infer<typeof settingsSchema>
