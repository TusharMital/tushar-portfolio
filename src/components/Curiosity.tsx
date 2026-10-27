import { Reveal } from './Reveal'
import './Curiosity.css'

export default function Curiosity() {
  return (
    <section id="curiosity" className="ref-curiosity-section" aria-labelledby="curiosity-heading">
      <div className="ref-section-container">
        {/* Section Header with [ 08 / 09 ] Pill */}
        <div className="ref-curiosity__badge-row">
          <span className="ref-badge">[ 08 / 09 ]</span>
          <span className="ref-mono-label">THE CURIOSITY</span>
        </div>

        {/* Headline */}
        <div className="ref-curiosity__header">
          <Reveal as="h2" id="curiosity-heading" className="ref-curiosity__title display">
            How software works beneath the surface.
          </Reveal>
        </div>

        {/* Frosted Blur Card */}
        <Reveal delay={100} className="ref-curiosity__card-wrapper">
          <div className="ref-curiosity__glow" aria-hidden="true" />
          <div className="ref-curiosity__card">
            <p className="ref-curiosity__paragraph">
              It started with a single question: what really happens between the lines of high-level code and the underlying silicon?
            </p>
            <p className="ref-curiosity__paragraph">
              That curiosity led to C and C++ programs, terminal workflows in Linux/WSL2, memory inspection, operating system concurrency models, and network packet analysis.
            </p>
            <p className="ref-curiosity__paragraph">
              Today I channel that drive into computer science studies at JECRC University — balancing programming rigor, systems architecture, practical web development, and AI-assisted engineering workflows.
            </p>
            <p className="ref-curiosity__paragraph">
              The frontier is building software that is reliable, fast, and verifiable — and I'm building toward it one commit, one test, and one system at a time.
            </p>

            <div className="ref-curiosity__footer-strip">
              <span className="ref-mono-label">CORE STACK:</span>
              <span className="ref-curiosity__stack-text">
                C/C++, Python, React, TypeScript, Linux, WSL2, Computer Networks &amp; Curiosity.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
