import { z } from 'zod'

// Authentication Schemas
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .toLowerCase(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
})

export const registerSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// User Schema
export const userSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  displayName: z.string().min(1, 'Display name is required'),
  email: z.string().email('Invalid email address'),
  photoURL: z.string().url('Invalid photo URL').optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  role: z.enum(['admin', 'user', 'manager']),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
})

// Settings Schema
export const settingsSchema = z.object({
  colorScheme: z.enum(['light', 'dark']),
  direction: z.enum(['ltr', 'rtl']),
  contrast: z.enum(['default', 'high']),
  primaryColor: z.enum(['default', 'purple', 'cyan', 'blue', 'orange', 'red']),
  navLayout: z.enum(['vertical', 'horizontal', 'mini']),
  navColor: z.enum(['integrate', 'apparent']),
  compactLayout: z.boolean(),
  fontFamily: z.enum(['Inter', 'Roboto', 'Poppins', 'Barlow', 'DM Sans', 'Nunito Sans'])
})

// API Response Schemas
export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().default(true)
  })

export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      page: z.number().min(1),
      limit: z.number().min(1).max(100),
      total: z.number().min(0),
      totalPages: z.number().min(0)
    }),
    message: z.string().optional(),
    success: z.boolean().default(true)
  })

export const errorResponseSchema = z.object({
  message: z.string(),
  errors: z.record(z.string(), z.string()).optional(),
  success: z.boolean()
})

// Product Schema (example for dashboard)
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().optional(),
  image: z.string().url().optional(),
  inStock: z.boolean().default(true),
  createdAt: z.string().datetime().optional()
})

// Order Schema (example for dashboard)
export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0)
  })),
  total: z.number().min(0),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional()
})

// Type Exports
export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type User = z.infer<typeof userSchema>
export type Settings = z.infer<typeof settingsSchema>
export type Product = z.infer<typeof productSchema>
export type Order = z.infer<typeof orderSchema>

// API Response Types
export type ApiResponse<T> = {
  data: T
  message?: string
  success: boolean
}

export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
  success: boolean
}

export type ErrorResponse = z.infer<typeof errorResponseSchema>
