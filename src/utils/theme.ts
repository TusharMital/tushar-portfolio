export type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'theme_preference'

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    const saved = localStorage.getItem('theme') || localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
  } catch (err) {
    console.warn('Could not read theme from localStorage', err)
  }

  return 'dark'
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return

  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.classList.toggle('light', theme === 'light')

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    localStorage.setItem('theme', theme)
  } catch (err) {
    console.warn('Could not persist theme to localStorage', err)
  }
}
