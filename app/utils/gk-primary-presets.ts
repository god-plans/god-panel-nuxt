/**
 * Maps Pinia `settings.primaryColor` to god-kit semantic tokens (`--gk-color-primary`, …).
 * god-kit ships a single default indigo; presets override these on `document.documentElement`.
 */
import type { Settings } from '~/types/validation'

type Preset = Settings['primaryColor']

type Palette = {
  main: string
  dark: string
  darker: string
  contrastText: string
}

const PALETTES: Record<Exclude<Preset, 'default'>, Palette> = {
  cyan: {
    main: '#078DEE',
    dark: '#0351AB',
    darker: '#012972',
    contrastText: '#FFFFFF',
  },
  purple: {
    main: '#7635dc',
    dark: '#431A9E',
    darker: '#200A69',
    contrastText: '#FFFFFF',
  },
  blue: {
    main: '#0C68E9',
    dark: '#063BA7',
    darker: '#021D6F',
    contrastText: '#FFFFFF',
  },
  orange: {
    main: '#fda92d',
    dark: '#B66816',
    darker: '#793908',
    contrastText: '#1C252E',
  },
  red: {
    main: '#FF3030',
    dark: '#B71833',
    darker: '#7A0930',
    contrastText: '#FFFFFF',
  },
}

const VARS_TO_CLEAR = [
  '--gk-color-primary',
  '--gk-color-primary-hover',
  '--gk-color-primary-active',
  '--gk-color-focus-ring',
  '--gk-color-text-on-primary',
] as const

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m?.[1]) return null
  const n = parseInt(m[1], 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function focusRingFromMain(main: string): string {
  const rgb = hexToRgb(main)
  if (!rgb) return 'rgba(99, 102, 241, 0.45)'
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45)`
}

/**
 * Apply or clear primary palette on the given element (usually `document.documentElement`).
 */
export function applyGkPrimaryPreset(el: HTMLElement | null, preset: Preset): void {
  if (!el) return

  for (const key of VARS_TO_CLEAR) {
    el.style.removeProperty(key)
  }

  if (preset === 'default') return

  const p = PALETTES[preset]
  el.style.setProperty('--gk-color-primary', p.main)
  el.style.setProperty('--gk-color-primary-hover', p.dark)
  el.style.setProperty('--gk-color-primary-active', p.darker)
  el.style.setProperty('--gk-color-focus-ring', focusRingFromMain(p.main))
  el.style.setProperty('--gk-color-text-on-primary', p.contrastText)
}
