import React from 'react'
import './TechMarquee.css'

type TechItem = {
  name: string
  category: string
  svg?: React.ReactNode
}

const TECHNOLOGIES: TechItem[] = [
  { name: 'Python', category: 'Language' },
  { name: 'C / C++', category: 'Systems' },
  { name: 'React 19', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Linux / WSL2', category: 'OS & Systems' },
  { name: 'Git & GitHub', category: 'Version Control' },
  { name: 'Docker', category: 'Containers' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Jupyter', category: 'Data & Notebooks' },
  { name: 'Computer Networks', category: 'Protocols' },
  { name: 'Prompt Engineering', category: 'AI Workflows' },
  { name: 'Quantum Computing', category: 'MeitY / MNIT' },
]

export default function TechMarquee() {
  // Duplicate array 3 times to ensure 100% gapless continuous marquee
  const loopItems = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES]

  return (
    <section className="tech-marquee-section" aria-label="Technology Stack Marquee">
      <div className="tech-marquee__header">
        <span className="ref-mono-label">TECH STACK</span>
      </div>

      <div className="tech-marquee__track-container" tabIndex={0} aria-label="Continuously moving technology stack strip">
        <div className="tech-marquee__track">
          {loopItems.map((tech, idx) => (
            <div key={`${tech.name}-${idx}`} className="tech-marquee__item">
              <span className="tech-marquee__dot" aria-hidden="true" />
              <span className="tech-marquee__name">{tech.name}</span>
              <span className="tech-marquee__cat">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
