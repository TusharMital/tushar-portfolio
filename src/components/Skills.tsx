import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'
import './Skills.css'

const SKILL_ITEMS = [
  { name: 'C & C++', category: 'Systems' },
  { name: 'Python', category: 'Language' },
  { name: 'Data Structures & Algorithms', category: 'Problem Solving' },
  { name: 'Operating Systems', category: 'Systems' },
  { name: 'Computer Architecture', category: 'Hardware' },
  { name: 'Linux / WSL2', category: 'Environment' },
  { name: 'Computer Networks (CS144)', category: 'Protocols' },
  { name: 'React 19 & TypeScript', category: 'Frontend' },
  { name: 'Modern Web (HTML / CSS / Vite)', category: 'Web' },
  { name: 'Prompt Engineering & AI Workflows', category: 'AI Tools' },
  { name: 'Quantum Computing (MeitY/MNIT)', category: 'Emerging' },
  { name: 'Git & GitHub Workflows', category: 'Tooling' },
]

export default function Skills() {
  return (
    <section id="skills" className="ref-skills-section" aria-labelledby="skills-heading">
      <div className="ref-section-container">
        {/* Section Header with [ 02 / 09 ] Pill */}
        <div className="ref-skills__badge-row">
          <span className="ref-badge">[ 02 / 09 ]</span>
          <span className="ref-mono-label">SKILLS</span>
        </div>

        {/* Section Title & Description Grid */}
        <div className="ref-skills__header-grid">
          <div>
            <Reveal as="h2" id="skills-heading" className="ref-skills__title display">
              Technical toolkit.
            </Reveal>
            <Reveal delay={100}>
              <p className="ref-skills__desc">
                A growing arsenal focused on systems engineering, programming, web development,
                and AI-assisted building with a solid foundation in computer science. Learn by building;
                every project is an opportunity to grow.
              </p>
            </Reveal>
          </div>

          <div className="ref-skills__cta-wrapper">
            <Reveal delay={150}>
              <a
                href="https://github.com/TusharMital"
                target="_blank"
                rel="noreferrer"
                className="ref-skills__github-btn"
              >
                <span>VIEW GITHUB</span>
                <ArrowUpRight className="ref-skills__btn-arrow" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Interactive Skills Grid */}
        <div className="ref-skills__grid">
          {SKILL_ITEMS.map((item, idx) => (
            <Reveal
              key={item.name}
              delay={idx * 40}
              className="ref-skills__item"
            >
              <div className="ref-skills__item-inner">
                <span className="ref-skills__item-cat">{item.category}</span>
                <h3 className="ref-skills__item-name">{item.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
