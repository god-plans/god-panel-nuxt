/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./nuxt.config.{js,ts}",
    "./app/**/*.{js,vue,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // Vuetify primary colors integration
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Custom theme colors
        'god-primary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        'god-secondary': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Vuetify theme colors for better integration
        surface: {
          DEFAULT: '#ffffff',
          variant: '#f5f5f5',
        },
        'on-surface': {
          DEFAULT: '#1c1b1f',
          variant: '#49454f',
        },
        'surface-container': {
          DEFAULT: '#f3f4f6',
          low: '#f7f2fa',
          high: '#e6e0e9',
        },
        outline: {
          DEFAULT: '#cac4d0',
          variant: '#ded8e1',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px 0 rgba(0, 0, 0, 0.12)',
        'hard': '0 8px 40px 0 rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [
    // Custom plugins for better Vuetify integration
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.bg-gradient-primary': {
          'background-image': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        '.bg-gradient-secondary': {
          'background-image': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        '.shadow-soft': {
          'box-shadow': '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        },
        '.shadow-medium': {
          'box-shadow': '0 4px 25px 0 rgba(0, 0, 0, 0.12)',
        },
        '.shadow-hard': {
          'box-shadow': '0 8px 40px 0 rgba(0, 0, 0, 0.16)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
  // Safelist for dynamic classes
  safelist: [
    {
      pattern: /^(bg-|text-|border-)(primary|secondary|success|warning|error|info|god-primary|god-secondary|surface|on-surface|surface-container|outline)-(50|100|200|300|400|500|600|700|800|900|950|DEFAULT|variant|low|high)$/,
      variants: ['hover', 'focus', 'active', 'disabled'],
    },
    {
      pattern: /^shadow-(soft|medium|hard)$/,
    },
    {
      pattern: /^bg-gradient-(primary|secondary)$/,
    }
  ],
}
