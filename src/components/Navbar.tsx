import { useEffect, useId, useState } from 'react'
import './Navbar.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
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

  return (
    <header className={open ? 'nav is-open' : 'nav'}>
      <div className="nav__inner">
        <a className="nav__mark" href="#top" onClick={() => setOpen(false)}>
          <span className="nav__initials">TM</span>
          <span className="nav__name">Tushar Mittal</span>
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav__toggle-bars" aria-hidden="true" />
        </button>

        <nav aria-label="Primary">
          <ul className="nav__links" id={menuId}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="nav__link"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
