import { skillGroups } from '../data/skills'
import Section from './Section'
import './Skills.css'

function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      kicker="Practice"
      title="Learning areas"
      headingId="skills-title"
    >
      <p className="skills__intro">
        These are the subjects and tools I am studying and practising now—not
        a list of claimed expertise.
      </p>
      <div className="skills__grid">
        {skillGroups.map((group) => (
          <article className="skills__group" key={group.id}>
            <h3 className="skills__group-title">{group.title}</h3>
            <ul className="skills__list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Skills
