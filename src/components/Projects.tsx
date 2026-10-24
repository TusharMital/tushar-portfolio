import { useMemo, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Section from './Section'
import './Projects.css'

// Extract only verified technologies from the existing source project records
const VERIFIED_TECHNOLOGIES = [
  'All',
  ...Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
]

function Projects() {
  const [query, setQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState('All')

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q)

      const matchesTech =
        selectedTech === 'All' || project.technologies.includes(selectedTech)

      return matchesQuery && matchesTech
    })
  }, [query, selectedTech])

  const isFiltered = query.trim().length > 0 || selectedTech !== 'All'

  const handleClearFilters = () => {
    setQuery('')
    setSelectedTech('All')
  }

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

      {/* Search and Technology Filters */}
      <div className="projects__controls">
        <div
          role="search"
          className="projects__search"
          aria-label="Search projects"
        >
          <label htmlFor="project-search-input" className="visually-hidden">
            Search projects by name or description
          </label>
          <div className="projects__search-box">
            <span className="projects__search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              id="project-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project name or description…"
              className="projects__search-input"
              autoComplete="off"
              spellCheck="false"
            />
            {query ? (
              <button
                type="button"
                className="projects__search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search text"
              >
                ✕
              </button>
            ) : null}
          </div>
        </div>

        {/* Technology Filter Chips */}
        <div
          className="projects__filter-chips"
          role="group"
          aria-label="Filter projects by verified technology"
        >
          {VERIFIED_TECHNOLOGIES.map((tech) => {
            const isSelected = selectedTech === tech
            return (
              <button
                key={tech}
                type="button"
                className={
                  isSelected
                    ? 'projects__chip is-active'
                    : 'projects__chip'
                }
                onClick={() => setSelectedTech(tech)}
                aria-pressed={isSelected}
              >
                {tech}
              </button>
            )
          })}
        </div>

        {/* Status and Reset */}
        <div className="projects__status-bar" aria-live="polite">
          <span className="projects__count">
            Showing {filteredProjects.length} of {projects.length} projects
            {selectedTech !== 'All' ? ` (${selectedTech})` : ''}
          </span>

          {isFiltered ? (
            <button
              type="button"
              className="projects__clear-btn"
              onClick={handleClearFilters}
              aria-label="Clear search and technology filters"
            >
              Reset filters
            </button>
          ) : null}
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="projects__grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div
          className="projects__empty"
          role="region"
          aria-label="No projects matched search and filter criteria"
        >
          <p className="projects__empty-title">No matching projects found</p>
          <p className="projects__empty-copy">
            No projects matched your search
            {query ? ` for "${query}"` : ''}
            {selectedTech !== 'All' ? ` with technology "${selectedTech}"` : ''}.
          </p>
          <button
            type="button"
            className="projects__reset-btn"
            onClick={handleClearFilters}
          >
            Clear all filters
          </button>
        </div>
      )}
    </Section>
  )
}

export default Projects
