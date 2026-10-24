import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Section from './Section'
import './Projects.css'

function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      kicker="Work"
      title="Selected projects"
      headingId="projects-title"
    >
      <p className="section__lede">
        Coursework, debugging studies and small applications I have built while
        learning how software is written, tested and revised.
      </p>
      <div className="projects__grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

export default Projects
