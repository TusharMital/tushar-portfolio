import { useEffect, useState } from 'react'
import { caseStudies } from '../data/caseStudies'

export type RouteState =
  | { route: 'home'; projectId: null }
  | { route: 'case-study'; projectId: string }

function parseHash(): RouteState {
  if (typeof window === 'undefined') {
    return { route: 'home', projectId: null }
  }

  const hash = window.location.hash
  // Matches #/project/some-id or #/projects/some-id
  const match = hash.match(/^#\/(?:project|projects)\/([a-zA-Z0-9_-]+)/)
  if (match && match[1] && caseStudies[match[1]]) {
    return { route: 'case-study', projectId: match[1] }
  }

  return { route: 'home', projectId: null }
}

export function useHashRoute() {
  const [routeState, setRouteState] = useState<RouteState>(parseHash)

  useEffect(() => {
    const handleHashChange = () => {
      setRouteState(parseHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [])

  useEffect(() => {
    if (routeState.route === 'case-study') {
      const study = caseStudies[routeState.projectId]
      if (study) {
        document.title = `${study.name} — Case Study · Tushar Mittal`
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.title = 'Tushar Mittal — Computer Science Portfolio'
    }
  }, [routeState])

  const navigateTo = (targetHash: string) => {
    window.location.hash = targetHash
  }

  return { ...routeState, navigateTo }
}
