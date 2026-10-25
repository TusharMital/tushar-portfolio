import { useEffect, useRef, useState } from 'react'
import { Reveal, SectionLabel } from './Reveal'
import './PromptWorkflow.css'

type WorkflowStage = {
  step: string
  name: string
  summary: string
  description: string
  actionItem: string
}

const STAGES: WorkflowStage[] = [
  {
    step: '01',
    name: 'UNDERSTAND',
    summary: 'Identify the task, requirements, constraints and intended user.',
    description:
      'Map the problem space, runtime environment, and dependency boundaries before drafting any prompt. Determine what is strictly needed versus out of scope.',
    actionItem:
      'Catalog explicit constraints and verified requirements before writing a single prompt.',
  },
  {
    step: '02',
    name: 'DEFINE',
    summary: 'Specify expected behaviour, acceptance criteria and edge cases.',
    description:
      'Formulate concrete input/output contracts, identify potential failure modes (e.g. empty arrays, boundary indices, division by zero), and establish clear verification checks.',
    actionItem:
      'Ambiguous specifications produce subtle semantic bugs in generated code.',
  },
  {
    step: '03',
    name: 'PROMPT',
    summary: 'Write a clear, structured prompt with context and boundaries.',
    description:
      'Provide relevant local context, state explicit interface contracts, enforce positive and negative constraints, and request minimal, auditable changes.',
    actionItem:
      'Structure prompts with boundaries and verifiable criteria rather than broad requests.',
  },
  {
    step: '04',
    name: 'INSPECT & TEST',
    summary: 'Review generated code, execute tests, inspect results and investigate failures.',
    description:
      'Audit code diffs line by line. Run automated test suites (e.g. unittest, type checkers, linters) and trace variable states manually when semantic logic fails.',
    actionItem:
      'Generated code is an unverified proposal until validated by tests or step-by-step tracing.',
  },
  {
    step: '05',
    name: 'REFINE & DOCUMENT',
    summary: 'Improve the prompt or implementation, validate results and document the work.',
    description:
      'When tests reveal discrepancies, isolate the root cause before patching. Refine the prompt with targeted context, verify the final patch, and record learning outcomes.',
    actionItem:
      'Diagnose root causes before re-prompting and document architectural decisions.',
  },
]

function PromptWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (vh * 0.75 - rect.top) / (rect.height + vh * 0.1)
      setProgress(Math.max(0, Math.min(1, p)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeIdx = Math.floor(progress * STAGES.length - 0.001)

  return (
    <section id="workflow" className="workflow-section" aria-labelledby="workflow-heading">
      <div className="workflow-section__container">
        <Reveal>
          <SectionLabel n="04">Prompt Engineering</SectionLabel>
        </Reveal>

        <div className="workflow-section__header">
          <Reveal as="h2" id="workflow-heading" className="display workflow-section__title">
            From prompt to{' '}
            <em className="workflow-section__highlight">working</em> software.
          </Reveal>
          <Reveal delay={120} className="workflow-section__intro">
            A structured five-stage learning cycle for AI-assisted development.
            This framework represents how I approach prompting, auditing generated
            code and catching semantic bugs—practised as a learning habit rather
            than a claim that every past project followed these exact steps identically.
          </Reveal>
        </div>

        {/* Interactive Progress Timeline */}
        <div ref={containerRef} className="workflow-timeline">
          {/* Vertical progress bar on mobile */}
          <div className="workflow-timeline__line-mobile" aria-hidden="true">
            <div
              className="workflow-timeline__line-fill"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {/* Horizontal progress bar on desktop */}
          <div className="workflow-timeline__line-desktop" aria-hidden="true">
            <div
              className="workflow-timeline__line-fill"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>

          {/* 5 Stage Cards */}
          <ol className="workflow-timeline__grid">
            {STAGES.map((stage, idx) => {
              const isActive = idx <= activeIdx
              return (
                <li key={stage.step} className="workflow-timeline__step">
                  <span
                    className={`workflow-timeline__node ${
                      isActive ? 'is-active' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <span className="workflow-timeline__node-dot" />
                  </span>

                  <div className="workflow-timeline__card">
                    <div className="label-mono workflow-timeline__step-num">
                      Step {stage.step}
                    </div>
                    <h3 className="display workflow-timeline__step-title">
                      {stage.name}
                    </h3>
                    <p className="workflow-timeline__step-summary">
                      {stage.summary}
                    </p>
                    <p className="workflow-timeline__step-desc">
                      {stage.description}
                    </p>
                    <div className="workflow-timeline__action">
                      <span className="label-mono workflow-timeline__action-tag">
                        Key habit:
                      </span>{' '}
                      {stage.actionItem}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default PromptWorkflow
