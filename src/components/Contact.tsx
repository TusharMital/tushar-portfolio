import { useState } from 'react'
import { ArrowUpRight, Copy, Check, ChevronDown } from 'lucide-react'
import { Reveal } from './Reveal'
import './Contact.css'

const CURRENT_YEAR = new Date().getFullYear()

const CONTACT_INFO = {
  name: 'Tushar Mittal',
  email: 'tushar.mitt6@gmail.com',
  githubUrl: 'https://github.com/TusharMital',
  linkedinUrl: 'https://www.linkedin.com/in/tushar-mittal-179761364/',
}

const FAQS = [
  {
    num: '001',
    question: 'What do you work on?',
    answer:
      'Core computer science fundamentals, low-level programming in C & C++, web applications in React 19 & TypeScript, operating systems internals, and test-driven debugging.',
  },
  {
    num: '002',
    question: 'Where are you based?',
    answer:
      'JECRC University, Jaipur, Rajasthan, India — open to remote engineering collaborations, internships, and open-source contributions.',
  },
  {
    num: '003',
    question: 'Open to collaborate?',
    answer:
      'Always — especially on systems programming, debugging challenges, developer tooling, web apps, or interesting computer science problems.',
  },
  {
    num: '004',
    question: 'Best way to reach you?',
    answer:
      'Email tushar.mitt6@gmail.com, connect on GitHub @TusharMital, or message via LinkedIn in/tushar-mittal.',
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // fallback
    }
  }

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx))
  }

  return (
    <section id="contact" className="ref-contact-section" aria-labelledby="contact-heading">
      <div className="ref-section-container">
        {/* Section Header with [ 09 / 09 ] Pill */}
        <div className="ref-contact__badge-row">
          <span className="ref-badge">[ 09 / 09 ]</span>
          <span className="ref-mono-label">CONTACT</span>
        </div>

        {/* Section Title */}
        <div className="ref-contact__header">
          <Reveal as="h2" id="contact-heading" className="ref-contact__title display">
            Let's connect.
          </Reveal>
          <Reveal delay={80}>
            <p className="ref-contact__subtitle">I'm listening.</p>
          </Reveal>
        </div>

        {/* Two-Column Grid: Details Left vs FAQ Right */}
        <div className="ref-contact__grid">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="ref-contact__left">
            <Reveal className="ref-contact__intro-box">
              <p className="ref-contact__intro-text">
                I’m exploring the intersection of computer science fundamentals,
                low-level systems, and practical software development. Whether you
                have questions about my coursework, want to discuss systems topics,
                or are interested in collaborating, let’s build.
              </p>
            </Reveal>

            {/* Email Row with Copy Button */}
            <Reveal delay={120} className="ref-contact__email-card">
              <div className="ref-contact__email-info">
                <span className="ref-mono-label">DIRECT INBOX</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=Portfolio%20Inquiry%20-%20Tushar%20Mittal`}
                  className="ref-contact__email-link display"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="ref-contact__copy-btn"
                aria-label="Copy email address to clipboard"
                title="Copy address"
              >
                {copied ? (
                  <Check className="ref-contact__copy-icon is-copied" aria-hidden="true" />
                ) : (
                  <Copy className="ref-contact__copy-icon" aria-hidden="true" />
                )}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </Reveal>

            {/* Social Channels */}
            <div className="ref-contact__channels">
              <Reveal delay={180}>
                <a
                  href={CONTACT_INFO.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ref-contact__channel-link"
                >
                  <span className="ref-mono-label">GITHUB</span>
                  <span className="ref-contact__channel-val">
                    github.com/TusharMital
                    <ArrowUpRight className="ref-contact__arrow" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>

              <Reveal delay={240}>
                <a
                  href={CONTACT_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ref-contact__channel-link"
                >
                  <span className="ref-mono-label">LINKEDIN</span>
                  <span className="ref-contact__channel-val">
                    in/tushar-mittal
                    <ArrowUpRight className="ref-contact__arrow" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            </div>

            {/* Send a Message CTA Button */}
            <Reveal delay={280}>
              <a
                href={`mailto:${CONTACT_INFO.email}?subject=Collaboration%20Inquiry`}
                className="ref-contact__send-btn"
              >
                <span>SEND A MESSAGE</span>
                <ArrowUpRight className="ref-contact__arrow" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Right Column: FAQ Accordion matching reference 001-004 */}
          <div className="ref-contact__right">
            <span className="ref-mono-label ref-contact__faq-heading">FREQUENTLY ASKED</span>
            <div className="ref-contact__faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <Reveal
                    key={faq.num}
                    delay={idx * 60}
                    className={`ref-contact__faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="ref-contact__faq-trigger"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="ref-contact__faq-title-wrap">
                        <span className="ref-contact__faq-num">{faq.num}</span>
                        <h3 className="ref-contact__faq-question">{faq.question}</h3>
                      </div>
                      <ChevronDown className="ref-contact__faq-chevron" aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div className="ref-contact__faq-answer-wrap">
                        <p className="ref-contact__faq-answer">{faq.answer}</p>
                      </div>
                    )}
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>

        {/* Reference Signature Signoff: WHERE DO I SIGN? HERE */}
        <Reveal delay={200} className="ref-contact__signoff">
          <div className="ref-contact__signoff-text display">
            WHERE DO I SIGN?{' '}
            <a
              href={`mailto:${CONTACT_INFO.email}?subject=Hello%20Tushar`}
              className="ref-contact__signoff-here"
            >
              HERE
            </a>
          </div>
        </Reveal>

        {/* Minimalist Reference Footer Bottom */}
        <footer className="ref-site-footer">
          <div className="ref-site-footer__inner">
            <span className="ref-mono-label">
              &copy; {CURRENT_YEAR} TUSHAR MITTAL · JECRC UNIVERSITY
            </span>
            <div className="ref-site-footer__links">
              <a
                href={CONTACT_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="ref-site-footer__link"
              >
                GITHUB
              </a>
              <a
                href={CONTACT_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="ref-site-footer__link"
              >
                LINKEDIN
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="ref-site-footer__link"
              >
                EMAIL
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
