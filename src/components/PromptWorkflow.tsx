import Section from './Section'
import './PromptWorkflow.css'

type WorkflowStage = {
  step: string
  name: string
  summary: string
  description: string
  actionItem: string
}

const stages: WorkflowStage[] = [
  {
    step: '01',
    name: 'UNDERSTAND',
    summary: 'Identify the task, requirements, constraints and intended user.',
    description:
      'Map the problem space, runtime environment, and dependency boundaries before drafting any prompt. Determine what is strictly needed versus out of scope.',
    actionItem:
      'Core discipline: Catalog explicit constraints and verified requirements before writing a single prompt.',
  },
  {
    step: '02',
    name: 'DEFINE',
    summary: 'Specify expected behaviour, acceptance criteria and edge cases.',
    description:
      'Formulate concrete input/output contracts, identify potential failure modes (e.g. empty arrays, boundary indices, division by zero), and establish clear verification checks.',
    actionItem:
      'Core discipline: Ambiguous specifications produce subtle semantic bugs in generated code.',
  },
  {
    step: '03',
    name: 'PROMPT',
    summary: 'Write a clear, structured prompt with context and boundaries.',
    description:
      'Provide relevant local context, state explicit interface contracts, enforce positive and negative constraints, and request minimal, auditable changes.',
    actionItem:
      'Core discipline: Structure prompts with boundaries and verifiable criteria rather than broad requests.',
  },
  {
    step: '04',
    name: 'INSPECT & TEST',
    summary: 'Review generated code, execute tests where available, inspect results and investigate failures.',
    description:
      'Audit code diffs line by line. Run automated test suites (e.g. unittest, type checkers, linters) and trace variable states manually when semantic logic fails.',
    actionItem:
      'Core discipline: Generated code is an unverified proposal until validated by tests or step-by-step tracing.',
  },
  {
    step: '05',
    name: 'REFINE & DOCUMENT',
    summary: 'Improve the prompt or implementation, validate results and document the work.',
    description:
      'When tests reveal discrepancies, isolate the root cause before patching. Refine the prompt with targeted context, verify the final patch, and record learning outcomes.',
    actionItem:
      'Core discipline: Diagnose root causes before re-prompting and document architectural decisions.',
  },
]

function PromptWorkflow() {
  return (
    <Section
      id="workflow"
      index="05"
      kicker="Process"
      title="Prompt engineering workflow"
      headingId="workflow-title"
    >
      <p className="section__lede">
        A structured five-stage learning cycle for AI-assisted development.
        This framework represents how I approach prompting, auditing generated
        code and catching semantic bugs—practised as a learning discipline
        rather than a claim that every past project followed these exact steps.
      </p>

      <div className="workflow__grid">
        {stages.map((stage) => (
          <article className="workflow__card" key={stage.step}>
            <div className="workflow__card-header">
              <span className="workflow__card-step">{stage.step}</span>
              <h3 className="workflow__card-name">{stage.name}</h3>
            </div>
            <p className="workflow__card-summary">{stage.summary}</p>
            <p className="workflow__card-copy">{stage.description}</p>
            <div className="workflow__card-action">
              <span>{stage.actionItem}</span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default PromptWorkflow
