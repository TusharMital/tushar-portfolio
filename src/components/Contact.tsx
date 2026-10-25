import { useState } from 'react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { Reveal, SectionLabel } from './Reveal'
import './Contact.css'

const CURRENT_YEAR = new Date().getFullYear()

const CONTACT_INFO = {
  name: 'Tushar Mittal',
  email: 'tushar.mitt6@gmail.com',
  githubUrl: 'https://github.com/TusharMital',
  linkedinUrl: 'https://www.linkedin.com/in/tushar-mittal-179761364/',
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const handleCopyEmail = async () => {
    try {
      setCopyError(false)
      await navigator.clipboard.writeText(CONTACT_INFO.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError(true)
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="grid-lines contact-section__grid-bg" aria-hidden="true" />

      <div className="contact-section__container">
        <Reveal>
          <SectionLabel n="07">Contact</SectionLabel>
        </Reveal>

        <Reveal as="h2" className="display contact-section__title">
          Curious about what
          <br />
          we can <em className="contact-section__highlight">build?</em>
        </Reveal>

        <div className="contact-section__body">
          <Reveal className="contact-section__intro">
            I’m exploring the intersection of computer science fundamentals,
            thoughtful prompting, and practical software development. Whether you
            have questions about my coursework, want to discuss systems and
            networking topics, or are interested in collaborating, let’s connect.
          </Reveal>

          <div className="contact-section__details">
            {/* Direct Email Address with Copy Button */}
            <Reveal className="contact-section__email-row">
              <a
                href={`mailto:${CONTACT_INFO.email}?subject=Portfolio%20Inquiry%20-%20Tushar%20Mittal`}
                className="display link-underline contact-section__email"
              >
                {CONTACT_INFO.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
                className="contact-section__copy-btn"
                title="Copy address"
              >
                {copied ? (
                  <Check className="contact-section__copy-icon is-copied" aria-hidden="true" />
                ) : (
                  <Copy className="contact-section__copy-icon" aria-hidden="true" />
                )}
              </button>
            </Reveal>

            <p role="status" className="label-mono contact-section__copy-status">
              {copied
                ? 'Email copied to clipboard.'
                : copyError
                ? 'Copy unavailable — use the email link.'
                : ''}
            </p>

            {/* Social Channels List */}
            <Reveal delay={100} className="contact-section__links">
              <a
                href={CONTACT_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-section__link-item group"
              >
                <span className="label-mono contact-section__link-label">GitHub</span>
                <span className="contact-section__link-val">
                  github.com/TusharMital
                  <ArrowUpRight className="contact-section__arrow" aria-hidden="true" />
                </span>
              </a>

              <a
                href={CONTACT_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-section__link-item group"
              >
                <span className="label-mono contact-section__link-label">LinkedIn</span>
                <span className="contact-section__link-val">
                  in/tushar-mittal
                  <ArrowUpRight className="contact-section__arrow" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Lovable Reference Footer */}
      <footer className="site-footer">
        <div className="label-mono site-footer__inner">
          <span>&copy; {CURRENT_YEAR} Tushar Mittal</span>
          <span className="site-footer__badge">
            <span className="site-footer__signal-dot" aria-hidden="true" />
            <span>compiled with curiosity · JECRC University</span>
          </span>
          <div className="site-footer__links">
            <a
              href={CONTACT_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="site-footer__link"
            >
              GitHub
            </a>
            <a
              href={CONTACT_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="site-footer__link"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="site-footer__link"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Contact
