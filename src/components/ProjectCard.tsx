import type { Project } from '../data/projects'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__index">
        <span>{project.index}</span>
        {project.repositoryUrl || project.liveUrl ? null : (
          <span className="project-card__status">Case study</span>
        )}
      </div>
      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__copy">{project.description}</p>
      {project.technologies.length > 0 ? (
        <ul className="project-card__tags">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      ) : null}
      <div className="project-card__links">
        {project.repositoryUrl ? (
          <a
            className="project-card__link"
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            Repository
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            className="project-card__link"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live demo
          </a>
        ) : null}
        {project.detailsHref ? (
          <a className="project-card__link" href={project.detailsHref}>
            View details
          </a>
        ) : (
          <span className="project-card__pending">Details forthcoming</span>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
