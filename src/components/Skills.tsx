import { skillGroups } from '../data/skills'
import { Reveal, SectionLabel } from './Reveal'
import './Skills.css'

function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-heading">
      <div className="skills-section__container">
        <Reveal>
          <SectionLabel n="02">Skills &amp; current learning</SectionLabel>
        </Reveal>

        <Reveal as="h2" className="display skills-section__title">
          What I work with{' '}
          <span className="skills-section__title-muted">
            — and keep learning.
          </span>
        </Reveal>

        <div className="skills-section__grid">
          {skillGroups.map((g, gi) => (
            <Reveal
              key={g.id}
              delay={gi * 80}
              className="skills-section__row"
            >
              <div className="label-mono skills-section__group-title">
                {g.title}
              </div>
              <ul className="skills-section__items">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="display skills-section__item"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
