import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import { Reveal, SectionLabel } from './Reveal'
import './Projects.css'

const CATEGORIES = [
  'All',
  'Python',
  'Web Development',
  'Debugging',
  'Prompt Engineering',
]

function Projects() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q))

      let matchesCategory = true
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Python') {
          matchesCategory = project.technologies.includes('Python')
        } else if (selectedCategory === 'Web Development') {
          matchesCategory =
            project.technologies.includes('HTML') ||
            project.technologies.includes('JavaScript') ||
            project.technologies.includes('React') ||
            project.technologies.includes('CSS') ||
            project.technologies.includes('TypeScript')
        } else if (selectedCategory === 'Debugging') {
          matchesCategory =
            project.id === 'python-debugging' ||
            project.id === 'cursor-bug-fix' ||
            project.technologies.includes('unittest')
        } else if (selectedCategory === 'Prompt Engineering') {
          // All projects are part of prompt engineering and AI coursework
          matchesCategory = true
        }
      }

      return matchesQuery && matchesCategory
    })
  }, [query, selectedCategory])

  const isFiltered = query.trim().length > 0 || selectedCategory !== 'All'

  const handleClearFilters = () => {
    setQuery('')
    setSelectedCategory('All')
  }

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-heading">
      <div className="projects-section__container">
        <Reveal>
          <SectionLabel n="03">Projects</SectionLabel>
        </Reveal>

        {/* Section Header with Search & Filter */}
        <div className="projects-section__header">
          <Reveal as="h2" id="projects-heading" className="display projects-section__title">
            Projects<span className="projects-section__title-dot">.</span>
          </Reveal>

          <Reveal delay={100} className="projects-section__controls">
            {/* Search Bar */}
            <div className="projects-section__search-box" role="search">
              <label htmlFor="project-search-input" className="visually-hidden">
                Search projects by name, technology or keyword
              </label>
              <Search className="projects-section__search-icon" aria-hidden="true" />
              <input
                id="project-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, tech or keyword…"
                className="projects-section__search-input"
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <button
                  type="button"
                  className="projects-section__clear-search"
                  onClick={() => setQuery('')}
                  aria-label="Clear search query"
                >
                  <X className="projects-section__clear-icon" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div
              className="projects-section__chips"
              role="group"
              aria-label="Filter projects by category"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`label-mono projects-section__chip ${
                      isSelected ? 'is-active' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isSelected}
                  >
                    {cat}
                  </button>
                )
              })}

              {isFiltered && (
                <button
                  type="button"
                  className="label-mono projects-section__reset-chip"
                  onClick={handleClearFilters}
                  aria-label="Reset all project filters"
                >
                  <X className="projects-section__reset-icon" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Results Counter */}
            <p className="label-mono projects-section__counter" aria-live="polite">
              {filteredProjects.length} of {projects.length} projects
            </p>
          </Reveal>
        </div>

        {/* Projects Stream */}
        <div className="projects-section__stream">
          {filteredProjects.length === 0 ? (
            <div className="projects-section__empty">
              <p className="display projects-section__empty-title">
                Nothing matches that yet.
              </p>
              <p className="projects-section__empty-desc">
                Try searching for “python”, “javascript” or “debugging”.
              </p>
              <button
                type="button"
                className="projects-section__empty-btn"
                onClick={handleClearFilters}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects
