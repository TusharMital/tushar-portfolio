import { Reveal } from './Reveal'
import './Principles.css'

type Principle = {
  num: string
  title: string
  desc: string
}

const PRINCIPLES: Principle[] = [
  { num: '001', title: 'BUILD IN PUBLIC.', desc: 'Share code, notes, and milestones openly. Progress happens through transparent iteration.' },
  { num: '002', title: 'READ THE PAPERS & RFCs.', desc: 'Understand specifications and primary sources before adopting abstractions blindly.' },
  { num: '003', title: 'SHIP WORKING CODE.', desc: 'Ideas matter, but working systems in production are the ground truth of engineering.' },
  { num: '004', title: 'STAY CURIOUS.', desc: 'Ask what happens beneath the compilers, runtimes, kernels, and network sockets.' },
  { num: '005', title: "IF YOU CAN'T BE FIRST, BE THOROUGH.", desc: 'Edge cases, boundary handling, and clear documentation distinguish lasting software.' },
  { num: '006', title: 'DEBUG UNTIL IT WORKS.', desc: 'Isolate root causes with tests and step-by-step tracing rather than applying blind patches.' },
  { num: '007', title: 'SKILLS COMPOUND WITH EVERY COMMIT.', desc: 'Consistency over intensity. Daily practice builds deep intuitive mastery over time.' },
  { num: '008', title: 'OVER-DELIVER ON EVERY PROJECT.', desc: 'Exceed the minimum requirements with automated tests, crisp docs, and clean structure.' },
  { num: '009', title: 'GROW BY TACKLING HARD PROBLEMS.', desc: 'Embrace systems programming, concurrency, and low-level topics that stretch your capabilities.' },
  { num: '010', title: 'QUESTION ASSUMPTIONS. ALWAYS.', desc: 'Validate premises against requirements, metrics, and empirical test behavior.' },
  { num: '011', title: 'CRITIQUE WITH CONSTRUCTIVE FIXES.', desc: 'Identifying problems is only half the job; always pair criticism with concrete solutions.' },
  { num: '012', title: 'USE WHAT YOU BUILD.', desc: 'Dogfood your own tools, scripts, and utilities to uncover user friction firsthand.' },
  { num: '013', title: 'SERIOUS CODE. HUMBLE ENGINEER.', desc: 'Write software with utmost rigor while staying receptive to feedback and new perspectives.' },
  { num: '014', title: "BUILD TOOLS YOU'D TRUST YOURSELF.", desc: 'Maintain uncompromising standards for reliability, security, and correctness.' },
  { num: '015', title: 'UNDERSTAND THE ABSTRACTIONS.', desc: 'Know how memory is allocated, how packets traverse routes, and how processors execute instructions.' },
  { num: '016', title: 'DOCUMENT BETTER THAN YOU THINK YOU NEED TO.', desc: 'Clear changelogs and architectural decision records save days of debugging in the future.' },
  { num: '017', title: 'INTERESTED PEOPLE STAY INTERESTING.', desc: 'Cultivate deep passion for craft, lifelong learning, and the thrill of creation.' },
]

export default function Principles() {
  return (
    <section id="principles" className="ref-principles-section" aria-labelledby="principles-heading">
      <div className="ref-section-container">
        {/* Section Header with [ 07 / 09 ] Pill */}
        <div className="ref-principles__badge-row">
          <span className="ref-badge">[ 07 / 09 ]</span>
          <span className="ref-mono-label">PRINCIPLES</span>
        </div>

        {/* Giant Display Headline */}
        <div className="ref-principles__header">
          <Reveal as="h2" id="principles-heading" className="ref-principles__giant-title display">
            PRINCIPLES
          </Reveal>
          <Reveal delay={100}>
            <p className="ref-principles__subtitle">
              Principles I work by — borrowed from builders, researchers, and the open-source community.
            </p>
          </Reveal>
        </div>

        {/* 17 Principles Grid */}
        <div className="ref-principles__grid">
          {PRINCIPLES.map((item, idx) => (
            <Reveal
              key={item.num}
              delay={Math.min(idx * 30, 400)}
              className="ref-principles__card"
            >
              <div className="ref-principles__card-num">{item.num}.</div>
              <h3 className="ref-principles__card-title display">{item.title}</h3>
              <p className="ref-principles__card-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
