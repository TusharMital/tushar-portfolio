import { Reveal, SectionLabel } from './Reveal'
import './About.css'

const INTERESTS = [
  'Programming fundamentals & debugging',
  'Operating systems & computer architecture',
  'Linux, networking & protocols',
  'Data structures & algorithms',
  'Quantum computing',
]

const COURSEWORK = [
  'Prompt design & refinement',
  'AI-assisted coding',
  'Debugging & testing',
  'Code review & documentation',
  'Building & deploying web apps',
]

function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-section__container">
        <Reveal>
          <SectionLabel n="01">About</SectionLabel>
        </Reveal>

        <div className="about-section__header-grid">
          <Reveal as="h2" className="display about-section__title">
            Second-year CS student at{' '}
            <em className="about-section__highlight">JECRC University</em>,
            curious about what happens{' '}
            <span className="text-outline">beneath</span> the surface.
          </Reveal>

          <div className="about-section__narrative">
            <Reveal delay={100}>
              <p className="about-section__p">
                I’m Tushar Mittal, a second-year Computer Science undergraduate at
                JECRC University. I’m interested in how software works—from
                programming fundamentals through operating systems, computer
                architecture and computer networks.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="about-section__p">
                My Prompt Engineering coursework explores how AI tools can help
                write programs, investigate errors, test behaviour, document and
                deploy software.
              </p>
            </Reveal>
            <Reveal
              delay={300}
              className="about-section__quote"
            >
              <p>
                I learn by doing the work itself: coursework, coding exercises,
                debugging, documentation and practical projects. I treat AI as a
                development aid—not a substitute for understanding. Evaluate,
                inspect, test, iterate.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Two Focus Cards */}
        <div className="about-section__cards-grid">
          {/* Broader CS Interests */}
          <Reveal delay={100} className="about-section__card">
            <div className="label-mono about-section__card-tag about-section__card-tag--primary">
              // fundamentals
            </div>
            <h3 className="display about-section__card-title">
              Broader CS interests
            </h3>
            <ul className="about-section__card-list">
              {INTERESTS.map((item, i) => (
                <li key={item} className="about-section__card-item">
                  <span className="label-mono about-section__card-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="about-section__card-text">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Prompt Engineering Coursework */}
          <Reveal delay={250} className="about-section__card">
            <div className="label-mono about-section__card-tag about-section__card-tag--signal">
              // coursework
            </div>
            <h3 className="display about-section__card-title">
              Prompt Engineering coursework
            </h3>
            <ul className="about-section__card-list">
              {COURSEWORK.map((item, i) => (
                <li key={item} className="about-section__card-item">
                  <span className="label-mono about-section__card-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="about-section__card-text">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
