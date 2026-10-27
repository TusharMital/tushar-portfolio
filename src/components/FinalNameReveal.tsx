import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import './FinalNameReveal.css'

const FIRST_NAME = 'TUSHAR'
const LAST_NAME = 'MITTAL'

const CURRENT_YEAR = new Date().getFullYear()

export default function FinalNameReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="closing"
      ref={containerRef}
      className={`final-reveal-section ${revealed ? 'is-revealed' : ''}`}
      aria-labelledby="final-name-heading"
    >
      <div className="final-reveal__ambient-glow" aria-hidden="true" />

      <div className="ref-section-container final-reveal__container">
        {/* Eyebrow Label */}
        <div className="final-reveal__eyebrow">
          <span className="ref-badge">FINAL REVEAL</span>
          <span className="ref-mono-label">COMPUTER SCIENCE &amp; SYSTEMS BUILDER</span>
        </div>

        {/* Oversized Staggered Name Reveal */}
        <h2 id="final-name-heading" className="final-reveal__name display">
          {/* First Name */}
          <span className="final-reveal__word" aria-label={FIRST_NAME}>
            {FIRST_NAME.split('').map((char, i) => (
              <span key={`first-${i}`} className="final-reveal__char-box">
                <span
                  className="final-reveal__char"
                  style={{ transitionDelay: `${i * 45}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>

          <span className="final-reveal__space" aria-hidden="true"> </span>

          {/* Last Name */}
          <span className="final-reveal__word" aria-label={LAST_NAME}>
            {LAST_NAME.split('').map((char, i) => (
              <span key={`last-${i}`} className="final-reveal__char-box">
                <span
                  className="final-reveal__char"
                  style={{ transitionDelay: `${(FIRST_NAME.length + i) * 45}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        </h2>

        {/* Closing Narrative & Signoff */}
        <div className="final-reveal__closing-content">
          <p className="final-reveal__closing-summary">
            Computer Science Undergraduate · JECRC University '27
          </p>
          <p className="final-reveal__closing-sub">
            Building software with mathematical rigor, test-driven validation, and an unyielding curiosity for what happens beneath the surface.
          </p>
        </div>

        {/* Interactive Action Hub */}
        <div className="final-reveal__actions">
          <a
            href="mailto:tushar.mitt6@gmail.com?subject=Hello%20Tushar"
            className="final-reveal__btn final-reveal__btn--primary"
          >
            <Mail className="final-reveal__btn-icon" aria-hidden="true" />
            <span>Get in Touch</span>
          </a>
          <a
            href="https://github.com/TusharMital"
            target="_blank"
            rel="noreferrer"
            className="final-reveal__btn final-reveal__btn--secondary"
          >
            <Github className="final-reveal__btn-icon" aria-hidden="true" />
            <span>GitHub</span>
            <ArrowUpRight className="final-reveal__arrow-icon" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/tushar-mittal-179761364/"
            target="_blank"
            rel="noreferrer"
            className="final-reveal__btn final-reveal__btn--secondary"
          >
            <Linkedin className="final-reveal__btn-icon" aria-hidden="true" />
            <span>LinkedIn</span>
            <ArrowUpRight className="final-reveal__arrow-icon" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={handleScrollToTop}
            className="final-reveal__btn final-reveal__btn--top"
            aria-label="Back to top"
            title="Return to top of page"
          >
            <ArrowUp className="final-reveal__btn-icon" aria-hidden="true" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="final-reveal__footer-bar">
          <span className="ref-mono-label">
            &copy; {CURRENT_YEAR} TUSHAR MITTAL · ALL RIGHTS RESERVED
          </span>
          <span className="ref-mono-label">
            VERIFIED LOCAL CONTENT · CRAFTED FOR IMPACT
          </span>
        </div>
      </div>
    </section>
  )
}
