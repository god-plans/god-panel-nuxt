import { z } from 'zod'

// Authentication Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// User Schema
export const userSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string().email(),
  photoURL: z.string().optional(),
  phoneNumber: z.string().optional(),
  role: z.enum(['admin', 'user', 'manager'])
})

// Settings Schema
export const settingsSchema = z.object({
  themeMode: z.enum(['light', 'dark', 'auto']),
  themeDirection: z.enum(['ltr', 'rtl']),
  themeColor: z.enum(['default', 'purple', 'cyan', 'blue', 'orange', 'red']),
  themeStretch: z.boolean(),
  themeLayout: z.enum(['vertical', 'horizontal', 'mini']),
  navLayout: z.enum(['vertical', 'horizontal', 'mini']),
  navColor: z.enum(['integrate', 'apparent']),
  compactLayout: z.boolean(),
  fontFamily: z.enum(['Inter', 'Roboto', 'Poppins', 'Barlow'])
})

// Form Types
export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type User = z.infer<typeof userSchema>
export type Settings = z.infer<typeof settingsSchema>
