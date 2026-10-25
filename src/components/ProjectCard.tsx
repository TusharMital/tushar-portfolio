import { ArrowUpRight } from 'lucide-react'
import { Github } from './Icons'
import type { Project } from '../data/projects'
import ProjectVisual from './ProjectVisual'
import { Reveal } from './Reveal'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const flip = index % 2 === 1
  const caseStudyHref = project.detailsHref || `#/project/${project.id}`

  return (
    <article className={`project-item ${flip ? 'project-item--flipped' : ''}`}>
      {/* Visual illustration box */}
      <Reveal
        className={`project-item__visual-wrapper ${
          flip ? 'project-item__visual-wrapper--flipped' : ''
        }`}
      >
        <div className="project-item__visual-inner">
          <ProjectVisual id={project.id} />
        </div>
        <span className="display project-item__watermark-index" aria-hidden="true">
          {project.index}
        </span>
      </Reveal>

      {/* Project content column */}
      <div
        className={`project-item__content ${
          flip ? 'project-item__content--flipped' : ''
        }`}
      >
        <Reveal className="label-mono project-item__kicker">
          {project.index} — {project.technologies.slice(0, 2).join(' · ')}
        </Reveal>

        <Reveal as="h3" delay={80} className="display project-item__title">
          {project.name}
        </Reveal>

        <Reveal delay={160} className="project-item__desc">
          {project.description}
        </Reveal>

        <Reveal delay={220} className="project-item__tags">
          {project.technologies.map((t) => (
            <span key={t} className="label-mono project-item__tag">
              {t}
            </span>
          ))}
        </Reveal>

        {/* Action buttons */}
        <Reveal delay={280} className="project-item__actions">
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="project-item__btn project-item__btn--source"
              aria-label={`View source code for ${project.name} on GitHub`}
            >
              <Github className="project-item__btn-icon" aria-hidden="true" />
              <span>View Source</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-item__btn project-item__btn--live"
              aria-label={`Launch live project demo for ${project.name}`}
            >
              <span>Launch Project</span>
              <ArrowUpRight className="project-item__btn-icon" aria-hidden="true" />
            </a>
          )}
        </Reveal>

        {/* Case Study footer link */}
        <div className="project-item__footer">
          <p className="label-mono project-item__status-text">
            {project.repositoryUrl
              ? 'Learning project · source available'
              : 'Learning example · no public source'}
          </p>
          <a
            href={caseStudyHref}
            className="project-item__case-study-link"
            aria-label={`Read case study for ${project.name}`}
          >
            <span>Read case study</span>
            <ArrowUpRight className="project-item__link-icon" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
