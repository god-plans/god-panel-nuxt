/**
 * Loads the font chosen in settings and points `--app-font-family` at it —
 * Tailwind's `font-sans` and `main.css` both read that variable.
 *
 * Add a font by adding an entry here and to `settingsSchema.fontFamily`
 * in `app/types/validation.ts`; the settings drawer picks it up automatically.
 */
const FONTS: Record<string, { family: string; url: string }> = {
  'Inter': {
    family: "'Inter', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
  'Roboto': {
    family: "'Roboto', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  },
  'Poppins': {
    family: "'Poppins', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  },
  'Barlow': {
    family: "'Barlow', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap',
  },
  'DM Sans': {
    family: "'DM Sans', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
  },
  'Nunito Sans': {
    family: "'Nunito Sans', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap',
  },
}

/** Stylesheets already added to <head>, so switching back and forth is free. */
const loaded = new Set<string>()

export function useDynamicFonts() {
  /**
   * Applies `name` and injects its stylesheet once. No-ops on the server —
   * the variable is applied on the client before paint by the watcher in `app.vue`.
   */
  function loadFont(name: string) {
    const font = FONTS[name]
    if (!font || !import.meta.client) return

    document.documentElement.style.setProperty('--app-font-family', font.family)

    if (loaded.has(name)) return
    loaded.add(name)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = font.url
    link.onerror = () => {
      loaded.delete(name)
      console.warn(`Could not load the "${name}" webfont; falling back to system fonts.`)
    }
    document.head.appendChild(link)
  }

  /** CSS `font-family` value for a name — used to preview options in the drawer. */
  function fontFamily(name: string) {
    return FONTS[name]?.family ?? name
  }

  return { loadFont, fontFamily, availableFonts: Object.keys(FONTS) }
}
