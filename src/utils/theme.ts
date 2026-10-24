export type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'theme_preference'

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
  } catch (err) {
    // Gracefully handle storage errors (e.g. private browsing or security sandbox)
    console.warn('Could not read theme from localStorage', err)
  }

  // Dark is the specified default
  return 'dark'
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return

  document.documentElement.setAttribute('data-theme', theme)

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (err) {
    console.warn('Could not persist theme to localStorage', err)
  }
}
