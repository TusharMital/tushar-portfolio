import type { CSSProperties } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import ParticleField from './ParticleField'
import './Hero.css'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

function Hero() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-heading">
      <ParticleField />
      <div className="hero-section__fade" aria-hidden="true" />

      <div className="hero-section__container">
        {/* Status Chip */}
        <div className="label-mono fade-in hero-section__status" style={d(200)}>
          <span className="hero-section__status-dot">
            <span className="hero-section__status-ping" />
            <span className="hero-section__status-core" />
          </span>
          <span>Building · Learning · Experimenting</span>
        </div>

        {/* Hero Title */}
        <h1 id="hero-heading" className="display hero-name">
          <span className="name-line">
            <span style={d(100)}>Tushar</span>
          </span>
          <span className="name-line hero-section__name-offset">
            <span style={d(260)}>
              <em className="hero-section__initial">M</em>ittal
            </span>
          </span>
        </h1>

        {/* Body Content Grid */}
        <div className="hero-section__body">
          <p className="label-mono fade-in hero-section__role" style={d(700)}>
            Computer Science Undergraduate
            <br />
            Exploring Programming &amp; Systems
            <br />
            Systems Enthusiast
          </p>
          <p className="fade-in hero-section__copy" style={d(850)}>
            I explore how software works beneath the surface—and use code,
            thoughtful prompts and experimentation to turn ideas into working
            applications.
          </p>
          <div className="fade-in hero-section__actions" style={d(1000)}>
            <a href="#projects" className="hero-section__btn hero-section__btn--primary">
              <span>View Projects</span>
              <ArrowDownRight className="hero-section__btn-icon" aria-hidden="true" />
            </a>
            <a href="#contact" className="hero-section__btn hero-section__btn--outline">
              <span>Contact Me</span>
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="fade-in hero-section__footer" style={d(1150)}>
          <div className="hero-section__links">
            <a
              href="https://github.com/TusharMital"
              target="_blank"
              rel="noreferrer"
              className="label-mono link-underline hero-section__social-link"
            >
              <Github className="hero-section__social-icon" aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tushar-mittal-179761364/"
              target="_blank"
              rel="noreferrer"
              className="label-mono link-underline hero-section__social-link"
            >
              <Linkedin className="hero-section__social-icon" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </div>

          <a href="#about" className="label-mono hero-section__scroll" aria-label="Scroll to About section">
            <span>Scroll</span>
            <span className="scroll-cue" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
