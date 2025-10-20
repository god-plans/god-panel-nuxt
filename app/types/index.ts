// User and Authentication Types
export interface User {
  id: string
  displayName: string
  email: string
  photoURL?: string
  phoneNumber?: string
  role: 'admin' | 'user' | 'manager'
  accessToken?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  authenticated: boolean
}

// Settings Types
export interface Settings {
  themeMode: 'light' | 'dark' | 'auto'
  themeDirection: 'ltr' | 'rtl'
  themeColor: 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red'
  themeStretch: boolean
  themeLayout: 'vertical' | 'horizontal' | 'mini'
  navLayout: 'vertical' | 'horizontal' | 'mini'
  navColor: 'integrate' | 'apparent'
  compactLayout: boolean
  fontFamily: 'Inter' | 'Roboto' | 'Poppins' | 'Barlow'
}

// Navigation Types
export interface NavItem {
  title: string
  path: string
  icon?: string
  children?: NavItem[]
  badge?: string | number
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  firstName: string
  lastName: string
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  totalProducts: number
}

// Toast Notification Types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  message: string
  title?: string
  icon?: string
  duration?: number
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  dismissible: boolean
  pauseOnHover: boolean
  showProgress: boolean
  action?: {
    label: string
    handler: () => void
  }
  createdAt: Date
  visible: boolean
  paused?: boolean
}

export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading'
  message: string
  title?: string
  icon?: string
  duration?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  dismissible?: boolean
  pauseOnHover?: boolean
  showProgress?: boolean
  action?: {
    label: string
    handler: () => void
  }
}

// Common Types
export type ThemeMode = 'light' | 'dark' | 'auto'
export type ThemeLayout = 'vertical' | 'horizontal' | 'mini'
export type ThemeDirection = 'ltr' | 'rtl'
