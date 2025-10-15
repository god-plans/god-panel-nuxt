import { ref, watch } from 'vue'

export interface FontDefinition {
  name: string
  family: string
  url?: string
  weights?: string[]
}

const FONT_DEFINITIONS: Record<string, FontDefinition> = {
  'Inter': {
    name: 'Inter',
    family: 'Inter, sans-serif',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    weights: ['400', '500', '600', '700']
  },
  'Roboto': {
    name: 'Roboto',
    family: 'Roboto, sans-serif',
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
    weights: ['400', '500', '700']
  },
  'Poppins': {
    name: 'Poppins',
    family: 'Poppins, sans-serif',
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
    weights: ['400', '500', '600', '700']
  },
  'Barlow': {
    name: 'Barlow',
    family: 'Barlow, sans-serif',
    url: 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap',
    weights: ['400', '500', '600', '700']
  },
  'DM Sans': {
    name: 'DM Sans',
    family: 'DM Sans, sans-serif',
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
    weights: ['400', '500', '700']
  },
  'Nunito Sans': {
    name: 'Nunito Sans',
    family: 'Nunito Sans, sans-serif',
    url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap',
    weights: ['400', '600', '700']
  }
}

// Track loaded fonts to avoid duplicate loading
const loadedFonts = ref<Set<string>>(new Set())

export function useDynamicFonts() {
  const settingsStore = useSettingsStore()

  // Load a font dynamically
  const loadFont = async (fontName: string): Promise<void> => {
    const fontDef = FONT_DEFINITIONS[fontName]

    if (!fontDef || loadedFonts.value.has(fontName)) {
      return
    }

    // Only load fonts on client side
    if (process.client) {
      try {
        if (fontDef.url) {
          // Load Google Font
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = fontDef.url
          link.onload = () => {
            loadedFonts.value.add(fontName)
            applyFont(fontName)
          }
          link.onerror = () => {
            console.warn(`Failed to load font: ${fontName}`)
          }
          document.head.appendChild(link)
        } else {
          // Fallback for system fonts
          loadedFonts.value.add(fontName)
          applyFont(fontName)
        }
      } catch (error) {
        console.warn(`Error loading font ${fontName}:`, error)
      }
    } else {
      // On server side, just mark as loaded for hydration consistency
      loadedFonts.value.add(fontName)
    }
  }

  // Apply font to the document
  const applyFont = (fontName: string): void => {
    const fontDef = FONT_DEFINITIONS[fontName]
    if (!fontDef) return

    // Only apply fonts on client side
    if (process.client) {
      // Apply to document root
      document.documentElement.style.setProperty('--font-family', fontDef.family)

      // Apply to body
      document.body.style.fontFamily = fontDef.family

      // Update CSS custom property for components
      const root = document.documentElement
      root.style.setProperty('--v-theme-font-family', fontDef.family)
    }
  }

  // Get font definition
  const getFontDefinition = (fontName: string): FontDefinition | undefined => {
    return FONT_DEFINITIONS[fontName]
  }

  // Get all available fonts
  const getAvailableFonts = (): string[] => {
    return Object.keys(FONT_DEFINITIONS)
  }

  // Watch for font changes and load them (only on client side)
  if (process.client) {
    watch(
      () => settingsStore.settings.fontFamily,
      (newFont) => {
        if (newFont) {
          loadFont(newFont)
        }
      },
      { immediate: true }
    )
  }

  return {
    loadFont,
    applyFont,
    getFontDefinition,
    getAvailableFonts,
    loadedFonts: readonly(loadedFonts)
  }
}
