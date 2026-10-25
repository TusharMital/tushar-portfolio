import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowUpRight, ArrowRight, ArrowUp } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'
import { projects } from '../data/projects'
import { SectionLabel } from './Reveal'
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [projectId])

  if (!study) {
    return (
      <div className="cs-error">
        <h2 className="display cs-error__title">Case study not found</h2>
        <p className="cs-error__desc">The requested project case study could not be located.</p>
        <button type="button" className="cs-btn cs-btn--primary" onClick={onBack}>
          <ArrowLeft className="cs-btn__icon" aria-hidden="true" />
          <span>Return to Projects</span>
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
    <article className="cs-view" aria-labelledby="case-study-heading">
      <div className="cs-view__container">
        {/* Top Navigation Bar */}
        <div className="cs-view__nav">
          <button
            type="button"
            className="cs-view__back-btn label-mono"
            onClick={onBack}
            aria-label="Return to projects section"
          >
            <ArrowLeft className="cs-view__back-icon" aria-hidden="true" />
            <span>Return to Projects</span>
          </button>
          <span className="label-mono cs-view__crumb">
            Projects / {study.index}
          </span>
        </div>

        {/* Case Study Header */}
        <header className="cs-view__header">
          <SectionLabel n={study.index}>Case Study</SectionLabel>

          <h1
            id="case-study-heading"
            className="display cs-view__title"
            tabIndex={-1}
            ref={headingRef}
          >
            {study.name}
          </h1>

          <p className="cs-view__subtitle">{study.subtitle}</p>

          <div className="cs-view__tags" aria-label="Verified technologies">
            {study.technologies.map((tech) => (
              <span key={tech} className="label-mono cs-view__tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="cs-view__links">
            {study.repositoryUrl && (
              <a
                href={study.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="cs-btn cs-btn--outline"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="cs-btn__icon" aria-hidden="true" />
              </a>
            )}

            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="cs-btn cs-btn--primary"
              >
                <span>Live Demonstration</span>
                <ArrowUpRight className="cs-btn__icon" aria-hidden="true" />
              </a>
            )}

            {!study.repositoryUrl && !study.liveUrl && (
              <span className="label-mono cs-view__standalone-badge">
                Standalone Case Study (No external repo/demo link)
              </span>
            )}
          </div>
        </header>

        {/* Main Content Sections */}
        <div className="cs-view__body">
          {/* Section 1: Overview & Objective */}
          <section className="cs-view__section" aria-labelledby="cs-overview">
            <h2 id="cs-overview" className="display cs-view__section-title">
              1. Overview &amp; Objective
            </h2>
            <div className="cs-view__text">
              <p>{study.overview}</p>
            </div>
          </section>

          {/* Section 2: Problem or Task */}
          <section className="cs-view__section" aria-labelledby="cs-problem">
            <h2 id="cs-problem" className="display cs-view__section-title">
              2. Problem &amp; Task
            </h2>
            <div className="cs-view__text">
              <p>{study.problem}</p>
            </div>
          </section>

          {/* Section 3: Approach & Implementation */}
          <section className="cs-view__section" aria-labelledby="cs-approach">
            <h2 id="cs-approach" className="display cs-view__section-title">
              3. Approach &amp; Implementation
            </h2>
            <div className="cs-view__text">
              <p>{study.approach}</p>
            </div>
          </section>

          {/* Section 4: Verified Technologies */}
          <section className="cs-view__section" aria-labelledby="cs-tech">
            <h2 id="cs-tech" className="display cs-view__section-title">
              4. Verified Technologies
            </h2>
            <div className="cs-view__text">
              <p>
                The following technologies were verified directly from project
                source code and configuration:
              </p>
              <ul className="cs-view__tech-list">
                {study.technologies.map((tech) => (
                  <li key={tech} className="cs-view__tech-item">
                    <span className="cs-view__tech-bullet" aria-hidden="true" />
                    <strong>{tech}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 5: Important Code Decisions */}
          <section className="cs-view__section" aria-labelledby="cs-decisions">
            <h2 id="cs-decisions" className="display cs-view__section-title">
              5. Important Code Decisions
            </h2>
            <div className="cs-view__decisions">
              {study.codeDecisions.map((decision) => (
                <div key={decision.title} className="cs-view__decision-card">
                  <h3 className="display cs-view__decision-title">{decision.title}</h3>
                  <p className="cs-view__decision-copy">
                    {decision.explanation}
                  </p>
                  {decision.codeSnippet && (
                    <pre
                      className="cs-view__code-block"
                      tabIndex={0}
                      aria-label={`Code snippet for ${decision.title}`}
                    >
                      <code>{decision.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Testing & Validation */}
          <section className="cs-view__section" aria-labelledby="cs-testing">
            <h2 id="cs-testing" className="display cs-view__section-title">
              6. Testing &amp; Validation
            </h2>
            <div className="cs-view__text">
              <p>{study.testingAndValidation}</p>
            </div>
          </section>

          {/* Section 7: Challenges & Solutions */}
          <section className="cs-view__section" aria-labelledby="cs-challenges">
            <h2 id="cs-challenges" className="display cs-view__section-title">
              7. Challenges &amp; Solutions
            </h2>
            <div className="cs-view__text">
              <p>{study.challengesAndSolutions}</p>
            </div>
          </section>

          {/* Section 8: Learning Outcomes */}
          <section className="cs-view__section" aria-labelledby="cs-outcomes">
            <h2 id="cs-outcomes" className="display cs-view__section-title">
              8. Learning Outcomes
            </h2>
            <ul className="cs-view__outcomes-list">
              {study.learningOutcomes.map((outcome) => (
                <li key={outcome} className="cs-view__outcome-item">
                  <span className="cs-view__outcome-icon" aria-hidden="true">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 9: Limitations & Evidence Disclosure */}
          {study.limitations && (
            <section className="cs-view__section" aria-labelledby="cs-limits">
              <h2 id="cs-limits" className="display cs-view__section-title">
                9. Limitations &amp; Scope
              </h2>
              <div className="cs-view__callout">
                <p>{study.limitations}</p>
              </div>
            </section>
          )}
        </div>

        {/* Bottom Sequential Browsing Navigation */}
        <footer className="cs-view__footer">
          <div className="cs-view__footer-nav">
            {prevProject ? (
              <a
                href={`#/project/${prevProject.id}`}
                className="cs-view__footer-link cs-view__footer-link--prev"
              >
                <span className="label-mono cs-view__footer-dir">
                  <ArrowLeft className="cs-view__footer-icon" aria-hidden="true" />
                  Previous Case Study
                </span>
                <span className="display cs-view__footer-name">
                  {prevProject.name}
                </span>
              </a>
            ) : (
              <div />
            )}

            <button
              type="button"
              className="cs-btn cs-btn--outline cs-view__back-center"
              onClick={onBack}
            >
              <ArrowUp className="cs-btn__icon" aria-hidden="true" />
              <span>Back to Projects</span>
            </button>

            {nextProject ? (
              <a
                href={`#/project/${nextProject.id}`}
                className="cs-view__footer-link cs-view__footer-link--next"
              >
                <span className="label-mono cs-view__footer-dir">
                  Next Case Study
                  <ArrowRight className="cs-view__footer-icon" aria-hidden="true" />
                </span>
                <span className="display cs-view__footer-name">
                  {nextProject.name}
                </span>
              </a>
            ) : (
              <div />
            )}
          </div>
        </footer>
      </div>
    </article>
  )
}

export default CaseStudyView
