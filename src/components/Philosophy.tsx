import { useState } from 'react'
import { Reveal } from './Reveal'
import './Philosophy.css'

type Phase = {
  id: string
  num: string
  name: string
  summary: string
  detail: string
  actionItem: string
}

const PHASES: Phase[] = [
  {
    id: 'explore',
    num: '01',
    name: 'Explore & Understand',
    summary: 'Identify the task, requirements, constraints, and runtime boundaries.',
    detail:
      'Map the problem space, operating system environment, memory requirements, and dependency boundaries before drafting code. Determine what is strictly needed versus out of scope.',
    actionItem: 'Catalog explicit constraints and verified requirements before writing a single line.',
  },
  {
    id: 'build',
    num: '02',
    name: 'Define & Build',
    summary: 'Specify expected behavior, interface contracts, and boundary conditions.',
    detail:
      'Formulate concrete input/output contracts, identify potential failure modes (e.g. empty arrays, boundary indices, off-by-one errors, division by zero), and establish clear verification checks.',
    actionItem: 'Ambiguous specifications produce subtle semantic bugs in generated and hand-written code.',
  },
  {
    id: 'ship',
    num: '03',
    name: 'Inspect, Test & Ship',
    summary: 'Review diffs line-by-line, run automated tests, and deploy working applications.',
    detail:
      'Audit code changes with scrutiny. Run test suites (unittest, type checkers, linters) and trace variable states manually when semantic logic fails.',
    actionItem: 'Code is an unverified proposal until validated by tests or step-by-step tracing.',
  },
  {
    id: 'iterate',
    num: '04',
    name: 'Refine & Document',
    summary: 'Isolate root causes before patching, validate results, and document findings.',
    detail:
      'When tests reveal discrepancies, isolate the root cause instead of applying blind patches. Refine the logic with targeted context, verify the final patch, and record learning outcomes.',
    actionItem: 'Diagnose root causes before re-prompting or patching, and document architectural decisions.',
  },
]

export default function Philosophy() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="philosophy" className="ref-philosophy-section" aria-labelledby="philosophy-heading">
      <div className="ref-section-container">
        {/* Section Header with [ 06 / 09 ] Pill */}
        <div className="ref-philosophy__badge-row">
          <span className="ref-badge">[ 06 / 09 ]</span>
          <span className="ref-mono-label">PHILOSOPHY</span>
        </div>

        {/* Section Title & Subtitle */}
        <div className="ref-philosophy__header">
          <Reveal as="h2" id="philosophy-heading" className="ref-philosophy__title display">
            How I Work
          </Reveal>
          <Reveal delay={100}>
            <p className="ref-philosophy__subtitle">
              Learn by building. Every project is an opportunity to grow — evaluate, inspect, test, iterate.
            </p>
          </Reveal>
        </div>

        {/* 4 Phases Grid */}
        <div className="ref-philosophy__tabs">
          {PHASES.map((phase, idx) => {
            const isActive = activeTab === idx
            return (
              <button
                key={phase.id}
                type="button"
                className={`ref-philosophy__tab-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className="ref-philosophy__tab-num">Phase {phase.num}</span>
                <span className="ref-philosophy__tab-name">{phase.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active Phase Display Card */}
        <Reveal delay={150} className="ref-philosophy__card">
          <div className="ref-philosophy__card-top">
            <span className="ref-badge">Phase {PHASES[activeTab].num}</span>
            <span className="ref-mono-label">{PHASES[activeTab].name}</span>
          </div>
          <h3 className="ref-philosophy__card-summary display">
            {PHASES[activeTab].summary}
          </h3>
          <p className="ref-philosophy__card-detail">
            {PHASES[activeTab].detail}
          </p>
          <div className="ref-philosophy__card-takeaway">
            <span className="ref-mono-label">// CORE TENET</span>
            <p className="ref-philosophy__takeaway-text">
              {PHASES[activeTab].actionItem}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
