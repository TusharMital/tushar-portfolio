import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import ParticleField from './ParticleField'
import './Hero.css'

const ROTATING_PHRASES = [
  'shipping things that matter.',
  'systems, web & AI.',
  "even if you aren't one.",
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_PHRASES.length)
        setFade(true)
      }, 300)
    }, 3200)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="top" className="ref-hero" aria-labelledby="hero-heading">
      {/* Background Graphic Treatment with Gradient Mask */}
      <div className="ref-hero__bg-wrapper" aria-hidden="true">
        <ParticleField />
        <div className="ref-hero__gradient-mask" />
      </div>

      <div className="ref-hero__content">
        {/* Status Chip */}
        <div className="ref-hero__status-badge">
          <span className="ref-hero__status-dot">
            <span className="ref-hero__status-ping" />
            <span className="ref-hero__status-core" />
          </span>
          <span className="ref-hero__status-text">
            Available for opportunities · CS @ JECRC
          </span>
        </div>

        {/* Main Headline */}
        <h1 id="hero-heading" className="ref-hero__headline display">
          <span className="ref-hero__line-main">Build at the frontier</span>
          <span className={`ref-hero__line-rotating ${fade ? 'is-visible' : 'is-hidden'}`}>
            {ROTATING_PHRASES[index]}
          </span>
        </h1>

        {/* Subtitle / Bio summary */}
        <p className="ref-hero__subhead">
          Computer Science engineering student at JECRC University with an active interest in
          systems engineering, low-level programming, web development and AI-assisted workflows.
        </p>

        {/* Action Buttons */}
        <div className="ref-hero__actions">
          <a href="#projects" className="ref-hero__btn ref-hero__btn--primary">
            <span>Explore Work</span>
            <ArrowDownRight className="ref-hero__btn-icon" aria-hidden="true" />
          </a>
          <a href="#contact" className="ref-hero__btn ref-hero__btn--secondary">
            <span>Contact Me</span>
            <ArrowUpRight className="ref-hero__btn-icon" aria-hidden="true" />
          </a>
        </div>

        {/* Meta details footer */}
        <div className="ref-hero__meta">
          <div className="ref-hero__meta-item">
            <span className="ref-mono-label">Focus</span>
            <span className="ref-hero__meta-value">Systems &amp; Modern Web</span>
          </div>
          <div className="ref-hero__meta-item">
            <span className="ref-mono-label">Location</span>
            <span className="ref-hero__meta-value">Jaipur, India</span>
          </div>
          <div className="ref-hero__meta-item">
            <span className="ref-mono-label">Institution</span>
            <span className="ref-hero__meta-value">JECRC University '27</span>
          </div>
        </div>
      </div>
    </section>
  )
}
