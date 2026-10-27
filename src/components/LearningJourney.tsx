import { Reveal } from './Reveal'
import './LearningJourney.css'

const MILESTONES = [
  {
    step: '01',
    title: 'Joined JECRC University',
    desc: 'B.Tech in Computer Science begins. Where core computer science theory meets terminals, algorithms, programming exercises, and late-night debugging experiments.',
    date: '2023 - Present',
  },
  {
    step: '02',
    title: 'Programming Fundamentals & C/C++',
    desc: 'Deep dive into C, C++ and Python, paying close attention to loops, pointers, memory layout, and how programs execute beneath high-level abstractions.',
    date: 'Foundations',
  },
  {
    step: '03',
    title: 'Python Debugging & Code Quality',
    desc: 'Inspecting errors, checking boundary cases, and using unit tests (unittest, RED → FIX → GREEN workflow) to rigorously evaluate corrections before modifying code.',
    date: 'Coursework',
  },
  {
    step: '04',
    title: 'Operating Systems & Architecture',
    desc: 'Studying concurrency, memory management, virtual memory, process synchronization, CPU scheduling algorithms, and computer architecture fundamentals.',
    date: 'Systems',
  },
  {
    step: '05',
    title: 'Computer Networks & Protocols',
    desc: 'Learning layered network architecture and protocols through Kurose & Ross ("A Top-Down Approach") and Stanford CS144 networking course materials.',
    date: 'Networking',
  },
  {
    step: '06',
    title: 'Foundations of Quantum Computing',
    desc: 'Completed the 40-hour MeitY-funded programme "QT-00 & 01 Foundations of Quantum Computing & Applications", hosted by the Consortium of EICT Academy, MNIT Jaipur — rated "Excellent".',
    date: 'Certified',
  },
]

export default function LearningJourney() {
  return (
    <section id="journey" className="ref-journey-section" aria-labelledby="journey-heading">
      <div className="ref-section-container">
        {/* Section Header with [ 03 / 09 ] Pill */}
        <div className="ref-journey__badge-row">
          <span className="ref-badge">[ 03 / 09 ]</span>
          <span className="ref-mono-label">MY JOURNEY</span>
        </div>

        {/* Section Title & Subtitle */}
        <div className="ref-journey__header">
          <Reveal as="h2" id="journey-heading" className="ref-journey__title display">
            Driven by curiosity, powered by code.
          </Reveal>
          <Reveal delay={100}>
            <p className="ref-journey__subtitle">
              (Six milestones and counting — building foundations that scale.)
            </p>
          </Reveal>
        </div>

        {/* Numbered Milestone Boxes matching reference boxes */}
        <div className="ref-journey__boxes">
          {MILESTONES.map((item, idx) => (
            <Reveal
              key={item.step}
              delay={idx * 60}
              className="ref-journey__box"
            >
              <div className="ref-journey__box-top">
                <span className="ref-journey__box-num">{item.step}</span>
                <span className="ref-journey__box-date">{item.date}</span>
              </div>
              <div className="ref-journey__box-content">
                <h3 className="ref-journey__box-title display">{item.title}</h3>
                <p className="ref-journey__box-desc">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education & Certification Detail Card */}
        <Reveal delay={200} className="ref-journey__cert-card">
          <div className="ref-journey__cert-header">
            <span className="ref-mono-label">// EDUCATION &amp; CERTIFICATION</span>
            <span className="ref-journey__cert-badge">RATED EXCELLENT</span>
          </div>
          <h3 className="ref-journey__cert-title display">
            QT-00 &amp; 01 Foundations of Quantum Computing &amp; Applications
          </h3>
          <div className="ref-journey__cert-grid">
            <div className="ref-journey__cert-col">
              <span className="ref-mono-label">Duration</span>
              <span className="ref-journey__cert-val">40 hours</span>
            </div>
            <div className="ref-journey__cert-col">
              <span className="ref-mono-label">Funding</span>
              <span className="ref-journey__cert-val">MeitY-funded</span>
            </div>
            <div className="ref-journey__cert-col">
              <span className="ref-mono-label">Host</span>
              <span className="ref-journey__cert-val">Consortium of EICT Academy, MNIT Jaipur</span>
            </div>
            <div className="ref-journey__cert-col">
              <span className="ref-mono-label">Grade / Rating</span>
              <span className="ref-journey__cert-val ref-journey__cert-val--highlight">Excellent</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
