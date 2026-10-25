import { Reveal, SectionLabel } from './Reveal'
import './LearningJourney.css'

const MILESTONES = [
  {
    step: '01',
    title: 'Programming fundamentals',
    desc: 'Practising C, C++ and Python, with attention to loops, data structures and how programs execute beneath high-level abstractions.',
  },
  {
    step: '02',
    title: 'Python debugging & code quality',
    desc: 'Inspecting errors, checking boundary cases and using tests (unittest, RED → FIX → GREEN cycle) to evaluate corrections before modifying code.',
  },
  {
    step: '03',
    title: 'DSA Practice',
    desc: 'Studying core data structures and algorithms, following the Striver A2Z sheet, and practising problem-solving on LeetCode and Codeforces.',
  },
  {
    step: '04',
    title: 'Operating Systems & Architecture',
    desc: 'Studying concurrency, memory management, process synchronization, CPU scheduling, and computer architecture fundamentals.',
  },
  {
    step: '05',
    title: 'Computer Networks',
    desc: 'Learning network architecture and layered protocols through Kurose & Ross ("A Top-Down Approach") and Stanford CS144 networking course materials.',
  },
  {
    step: '06',
    title: 'Quantum Computing',
    desc: 'Completed the 40-hour MeitY-funded programme “QT-00 & 01 Foundations of Quantum Computing & Applications”, hosted by the Consortium of EICT Academy, MNIT Jaipur — rated “Excellent”.',
  },
  {
    step: '07',
    title: 'Linux & WSL2',
    desc: 'Exploring Linux and Ubuntu environments through WSL2 alongside command-line workflows, script automation, and OS concepts.',
  },
  {
    step: '08',
    title: 'Prompt Engineering & AI-assisted development',
    desc: 'Clarifying requirements, inspecting generated code diffs line-by-line, validating behaviour with tests, and documenting architectural decisions.',
  },
]

const COURSE = {
  title: 'QT-00 & 01 Foundations of Quantum Computing & Applications',
  hours: '40 hours',
  funding: 'MeitY-funded',
  host: 'Consortium of EICT Academy, MNIT Jaipur',
  rating: 'Excellent',
}

function LearningJourney() {
  return (
    <section id="journey" className="journey-section" aria-labelledby="journey-heading">
      <div className="journey-section__container">
        <div className="journey-section__grid">
          {/* Left Sticky Column */}
          <div className="journey-section__sticky-col">
            <div className="journey-section__sticky-content">
              <Reveal>
                <SectionLabel n="05">Learning Journey</SectionLabel>
              </Reveal>
              <Reveal as="h2" id="journey-heading" className="display journey-section__title">
                Building the foundations.
              </Reveal>
              <Reveal delay={100} className="journey-section__desc">
                Programming, systems, networking and emerging technologies —
                subjects I am actively studying and practising, not claims of
                instant mastery.
              </Reveal>
            </div>
          </div>

          {/* Right Timeline List */}
          <ol className="journey-section__timeline">
            {MILESTONES.map((m, idx) => (
              <Reveal
                as="li"
                key={m.title}
                delay={idx * 60}
                className="journey-section__item"
              >
                <span className="label-mono journey-section__item-num">
                  {m.step}
                </span>
                <div className="journey-section__item-body">
                  <h3 className="display journey-section__item-title">
                    {m.title}
                  </h3>
                  <p className="journey-section__item-desc">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Education & Certification Detail Card */}
        <div className="journey-section__cert-card">
          <p className="label-mono journey-section__cert-kicker">
            Education &amp; Certification
          </p>
          <h3 className="display journey-section__cert-title">
            {COURSE.title}
          </h3>
          <dl className="journey-section__cert-grid">
            <div>
              <dt className="label-mono journey-section__cert-dt">Duration</dt>
              <dd className="journey-section__cert-dd">{COURSE.hours}</dd>
            </div>
            <div>
              <dt className="label-mono journey-section__cert-dt">Funding</dt>
              <dd className="journey-section__cert-dd">{COURSE.funding}</dd>
            </div>
            <div>
              <dt className="label-mono journey-section__cert-dt">Host</dt>
              <dd className="journey-section__cert-dd">{COURSE.host}</dd>
            </div>
            <div>
              <dt className="label-mono journey-section__cert-dt">Reported rating</dt>
              <dd className="journey-section__cert-dd journey-section__cert-dd--rating">
                {COURSE.rating}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default LearningJourney
