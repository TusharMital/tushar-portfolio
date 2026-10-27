import { Reveal } from './Reveal'
import './About.css'

const SYSTEMS_AREAS = [
  'Programming fundamentals & C/C++ memory models',
  'Operating systems, CPU scheduling & concurrency',
  'Computer architecture & hardware abstraction layers',
  'Linux & WSL2 terminal workflows',
  'Computer networks (CS144 & Top-Down layered protocols)',
]

const AI_WORKFLOWS = [
  'Prompt design, constraint mapping & boundary definition',
  'AI-assisted development with line-by-line diff inspection',
  'Test-driven verification (unittest, red-fix-green)',
  'Architectural documentation & changelog maintenance',
  'Deploying full-stack web applications on modern infrastructure',
]

export default function About() {
  return (
    <section id="about" className="ref-about-section" aria-labelledby="about-heading">
      <div className="ref-section-container">
        {/* Section Header with [ 01 / 09 ] Pill */}
        <div className="ref-about__badge-row">
          <span className="ref-badge">[ 01 / 09 ]</span>
          <span className="ref-mono-label">ABOUT</span>
        </div>

        {/* Main Content Split */}
        <div className="ref-about__grid">
          {/* Left Column: Big Statement */}
          <div className="ref-about__left">
            <Reveal as="h2" id="about-heading" className="ref-about__title display">
              Second-year CS student at{' '}
              <span className="ref-about__highlight">JECRC University</span>,
              curious about what happens beneath the surface.
            </Reveal>
          </div>

          {/* Right Column: Narrative */}
          <div className="ref-about__right">
            <Reveal delay={100}>
              <p className="ref-about__narrative-text">
                I’m Tushar Mittal, a second-year Computer Science undergraduate at
                JECRC University. I’m interested in how software works—from
                programming fundamentals through operating systems, computer
                architecture, and computer networks.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="ref-about__narrative-text">
                My Prompt Engineering and systems coursework explores how modern AI tools can help
                write programs, investigate errors, test behavior, document, and
                deploy software—while preserving rigorous engineering standards.
              </p>
            </Reveal>
            <Reveal delay={300} className="ref-about__quote-box">
              <p className="ref-about__quote-text">
                “I learn by doing the work itself: coursework, coding exercises,
                debugging, documentation, and practical projects. I treat AI as a
                development aid—not a substitute for understanding. Evaluate,
                inspect, test, iterate.”
              </p>
            </Reveal>
          </div>
        </div>

        {/* Two Focus Cards */}
        <div className="ref-about__cards-grid">
          {/* Card 1: Systems */}
          <Reveal delay={150} className="ref-about__card">
            <div className="ref-about__card-header">
              <span className="ref-mono-label">// SYSTEMS &amp; COMPUTING</span>
            </div>
            <h3 className="ref-about__card-title display">
              Systems &amp; Low-Level Computing
            </h3>
            <ul className="ref-about__card-list">
              {SYSTEMS_AREAS.map((item, i) => (
                <li key={item} className="ref-about__card-item">
                  <span className="ref-about__card-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="ref-about__card-label">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Card 2: AI & Prompt Engineering */}
          <Reveal delay={250} className="ref-about__card">
            <div className="ref-about__card-header">
              <span className="ref-mono-label">// AI &amp; WORKFLOWS</span>
            </div>
            <h3 className="ref-about__card-title display">
              Prompt Engineering &amp; AI Workflows
            </h3>
            <ul className="ref-about__card-list">
              {AI_WORKFLOWS.map((item, i) => (
                <li key={item} className="ref-about__card-item">
                  <span className="ref-about__card-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="ref-about__card-label">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
