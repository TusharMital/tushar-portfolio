import { useEffect, useRef } from 'react'
import { caseStudies } from '../data/caseStudies'
import { projects } from '../data/projects'
import './CaseStudyView.css'

type CaseStudyViewProps = {
  projectId: string
  onBack: () => void
}

function CaseStudyView({ projectId, onBack }: CaseStudyViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const study = caseStudies[projectId]

  useEffect(() => {
    headingRef.current?.focus()
  }, [projectId])

  if (!study) {
    return (
      <div className="case-study-error">
        <h2>Case study not found</h2>
        <p>The requested project case study could not be located.</p>
        <button type="button" className="case-study__back-btn" onClick={onBack}>
          ← Return to Projects
        </button>
      </div>
    )
  }

  // Find next and previous projects for sequential browsing
  const currentIndex = projects.findIndex((p) => p.id === projectId)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null

  return (
    <article className="case-study" aria-labelledby="case-study-heading">
      {/* Top Navigation Bar */}
      <div className="case-study__nav">
        <button
          type="button"
          className="case-study__back-btn"
          onClick={onBack}
          aria-label="Return to projects section"
        >
          <span aria-hidden="true">←</span>
          <span>Return to Projects</span>
        </button>
        <span className="case-study__nav-crumb">
          Projects / {study.index}
        </span>
      </div>

      {/* Header */}
      <header className="case-study__header">
        <div className="case-study__meta">
          <span className="case-study__index">{study.index}</span>
          <span className="case-study__rule" aria-hidden="true" />
          <span className="case-study__kicker">Case Study</span>
        </div>

        <h1
          id="case-study-heading"
          className="case-study__title"
          tabIndex={-1}
          ref={headingRef}
        >
          {study.name}
        </h1>

        <p className="case-study__subtitle">{study.subtitle}</p>

        <div className="case-study__tags" aria-label="Verified technologies">
          {study.technologies.map((tech) => (
            <span key={tech} className="case-study__tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="case-study__links">
          {study.repositoryUrl ? (
            <a
              href={study.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="case-study__link"
            >
              <span>GitHub Repository</span>
              <span aria-hidden="true"> ↗</span>
            </a>
          ) : null}

          {study.liveUrl ? (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="case-study__link case-study__link--primary"
            >
              <span>Live Demonstration</span>
              <span aria-hidden="true"> ↗</span>
            </a>
          ) : null}

          {!study.repositoryUrl && !study.liveUrl ? (
            <span className="case-study__unverified-badge">
              Standalone Case Study (No external repo/demo link)
            </span>
          ) : null}
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="case-study__body">
        {/* Section 1: Overview & Objective */}
        <section className="case-study__section" aria-labelledby="cs-overview">
          <h2 id="cs-overview" className="case-study__section-title">
            1. Overview &amp; Objective
          </h2>
          <div className="case-study__text">
            <p>{study.overview}</p>
          </div>
        </section>

        {/* Section 2: Problem or Task */}
        <section className="case-study__section" aria-labelledby="cs-problem">
          <h2 id="cs-problem" className="case-study__section-title">
            2. Problem &amp; Task
          </h2>
          <div className="case-study__text">
            <p>{study.problem}</p>
          </div>
        </section>

        {/* Section 3: Approach & Implementation */}
        <section className="case-study__section" aria-labelledby="cs-approach">
          <h2 id="cs-approach" className="case-study__section-title">
            3. Approach &amp; Implementation
          </h2>
          <div className="case-study__text">
            <p>{study.approach}</p>
          </div>
        </section>

        {/* Section 4: Verified Technologies */}
        <section className="case-study__section" aria-labelledby="cs-tech">
          <h2 id="cs-tech" className="case-study__section-title">
            4. Verified Technologies
          </h2>
          <div className="case-study__text">
            <p>
              The following technologies were verified directly from project
              source code and configuration:
            </p>
            <ul className="case-study__list">
              {study.technologies.map((tech) => (
                <li key={tech}>
                  <strong>{tech}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: Important Code Decisions */}
        <section className="case-study__section" aria-labelledby="cs-decisions">
          <h2 id="cs-decisions" className="case-study__section-title">
            5. Important Code Decisions
          </h2>
          <div className="case-study__decisions">
            {study.codeDecisions.map((decision) => (
              <div key={decision.title} className="case-study__decision-card">
                <h3 className="case-study__decision-title">{decision.title}</h3>
                <p className="case-study__decision-copy">
                  {decision.explanation}
                </p>
                {decision.codeSnippet ? (
                  <pre
                    className="case-study__code-block"
                    tabIndex={0}
                    aria-label={`Code snippet for ${decision.title}`}
                  >
                    <code>{decision.codeSnippet}</code>
                  </pre>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Testing & Validation */}
        <section className="case-study__section" aria-labelledby="cs-testing">
          <h2 id="cs-testing" className="case-study__section-title">
            6. Testing &amp; Validation
          </h2>
          <div className="case-study__text">
            <p>{study.testingAndValidation}</p>
          </div>
        </section>

        {/* Section 7: Challenges & Solutions */}
        <section className="case-study__section" aria-labelledby="cs-challenges">
          <h2 id="cs-challenges" className="case-study__section-title">
            7. Challenges &amp; Solutions
          </h2>
          <div className="case-study__text">
            <p>{study.challengesAndSolutions}</p>
          </div>
        </section>

        {/* Section 8: Learning Outcomes */}
        <section className="case-study__section" aria-labelledby="cs-outcomes">
          <h2 id="cs-outcomes" className="case-study__section-title">
            8. Learning Outcomes
          </h2>
          <ul className="case-study__list case-study__list--outcomes">
            {study.learningOutcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>

        {/* Section 9: Limitations & Evidence Disclosure */}
        {study.limitations ? (
          <section className="case-study__section" aria-labelledby="cs-limits">
            <h2 id="cs-limits" className="case-study__section-title">
              9. Limitations &amp; Scope
            </h2>
            <div className="case-study__callout">
              <p>{study.limitations}</p>
            </div>
          </section>
        ) : null}
      </div>

      {/* Bottom Navigation */}
      <footer className="case-study__footer">
        <div className="case-study__footer-nav">
          {prevProject ? (
            <a
              href={`#/project/${prevProject.id}`}
              className="case-study__footer-link case-study__footer-link--prev"
            >
              <span className="case-study__footer-dir">Previous Case Study</span>
              <span className="case-study__footer-name">
                ← {prevProject.name}
              </span>
            </a>
          ) : <span />}

          <button
            type="button"
            className="case-study__back-btn"
            onClick={onBack}
          >
            ↑ Back to Projects
          </button>

          {nextProject ? (
            <a
              href={`#/project/${nextProject.id}`}
              className="case-study__footer-link case-study__footer-link--next"
            >
              <span className="case-study__footer-dir">Next Case Study</span>
              <span className="case-study__footer-name">
                {nextProject.name} →
              </span>
            </a>
          ) : <span />}
        </div>
      </footer>
    </article>
  )
}

export default CaseStudyView
