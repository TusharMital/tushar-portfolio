import { useEffect, useId, useState } from 'react'
import { applyTheme, getInitialTheme, type Theme } from '../utils/theme'
import './Navbar.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#workflow', label: 'Workflow' },
]

type NavbarProps = {
  isCaseStudy?: boolean
  onNavigateHome?: () => void
}

function Navbar({ isCaseStudy = false, onNavigateHome }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const menuId = useId()

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  const handleLinkClick = (href: string) => {
    setOpen(false)
    if (isCaseStudy && onNavigateHome) {
      onNavigateHome()
      // Let home render, then scroll to section
      setTimeout(() => {
        const target = document.querySelector(href)
        target?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <header className={open ? 'nav is-open' : 'nav'}>
      <div className="nav__inner">
        <a
          className="nav__mark"
          href={isCaseStudy ? '#/' : '#top'}
          onClick={(e) => {
            if (isCaseStudy && onNavigateHome) {
              e.preventDefault()
              onNavigateHome()
            }
            setOpen(false)
          }}
        >
          <span className="nav__initials">TM</span>
          <span className="nav__name">Tushar Mittal</span>
        </a>

        <div className="nav__actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="nav__theme-btn"
            onClick={handleToggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
            title={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
            aria-pressed={theme === 'light'}
          >
            {theme === 'dark' ? (
              <svg
                className="nav__theme-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                className="nav__theme-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="nav__theme-text">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav__toggle-bars" aria-hidden="true" />
          </button>

          {/* Navigation Links */}
          <nav aria-label="Primary">
            <ul className="nav__links" id={menuId}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className="nav__link"
                    href={isCaseStudy ? `#/${link.href}` : link.href}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
