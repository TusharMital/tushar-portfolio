import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun, MessageSquare } from 'lucide-react'
import { applyTheme, getInitialTheme, type Theme } from '../utils/theme'
import './Navbar.css'

const NAV_ITEMS = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Learning Journey' },
  { id: 'workflow', label: 'Prompt Engineering' },
  { id: 'assistant', label: 'AI Assistant' },
  { id: 'contact', label: 'Contact' },
]

type NavbarProps = {
  isCaseStudy?: boolean
  onNavigateHome?: () => void
  onOpenAssistantModal?: () => void
}

function Navbar({
  isCaseStudy = false,
  onNavigateHome,
  onOpenAssistantModal,
}: NavbarProps) {
  const [active, setActive] = useState('top')
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (isCaseStudy) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) io.observe(el)
    })

    return () => io.disconnect()
  }, [isCaseStudy])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  const handleLinkClick = (id: string) => {
    setOpen(false)
    if (isCaseStudy && onNavigateHome) {
      onNavigateHome()
      setTimeout(() => {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  const handleAskClick = () => {
    if (onOpenAssistantModal) {
      onOpenAssistantModal()
    } else {
      handleLinkClick('assistant')
      const el = document.getElementById('assistant')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        {/* Brand Logo */}
        <a
          href={isCaseStudy ? '#/' : '#top'}
          className="site-nav__brand display"
          onClick={(e) => {
            if (isCaseStudy && onNavigateHome) {
              e.preventDefault()
              onNavigateHome()
            }
            setOpen(false)
          }}
          aria-label="Tushar Mittal Portfolio Home"
        >
          TM<span className="site-nav__dot">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="site-nav__desktop" aria-label="Main">
          <ul className="site-nav__links">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id && !isCaseStudy
              const href = isCaseStudy ? `#/${item.id}` : `#${item.id}`
              return (
                <li key={item.id}>
                  <a
                    href={href}
                    className={`site-nav__link ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleLinkClick(item.id)}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="site-nav__actions">
          {/* Ask Button */}
          <button
            type="button"
            className="site-nav__ask-btn label-mono"
            onClick={handleAskClick}
            aria-label="Ask portfolio assistant"
          >
            <MessageSquare className="site-nav__icon" aria-hidden="true" />
            <span>Ask</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="site-nav__btn site-nav__btn--theme"
            onClick={toggleTheme}
            aria-label={
              theme === 'light'
                ? 'Switch to dark theme'
                : 'Switch to light theme'
            }
            title={theme === 'light' ? 'Dark theme' : 'Light theme'}
          >
            {theme === 'light' ? (
              <Moon className="site-nav__icon" aria-hidden="true" />
            ) : (
              <Sun className="site-nav__icon" aria-hidden="true" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="site-nav__btn site-nav__btn--menu"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open navigation menu'}
          >
            {open ? (
              <X className="site-nav__icon" aria-hidden="true" />
            ) : (
              <Menu className="site-nav__icon" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Navigation */}
      {open && (
        <div className="site-nav__mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          <div className="site-nav__mobile-content">
            <div className="site-nav__mobile-header">
              <span className="display site-nav__mobile-title">Tushar Mittal</span>
              <button
                type="button"
                className="site-nav__btn"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="site-nav__icon" aria-hidden="true" />
              </button>
            </div>
            <ul className="site-nav__mobile-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={isCaseStudy ? `#/${item.id}` : `#${item.id}`}
                    className="site-nav__mobile-link"
                    onClick={() => handleLinkClick(item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
