import About from './components/About'
import CaseStudyView from './components/CaseStudyView'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import PromptWorkflow from './components/PromptWorkflow'
import Skills from './components/Skills'
import { useHashRoute } from './hooks/useHashRoute'
import './App.css'

function App() {
  const { route, projectId, navigateTo } = useHashRoute()

  const handleReturnToProjects = () => {
    navigateTo('#projects')
    // Smoothly scroll to the projects section if needed
    setTimeout(() => {
      const section = document.getElementById('projects')
      section?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="page" id="top">
      {route === 'case-study' && projectId ? (
        <>
          <a className="skip-link" href="#case-study-heading">
            Skip to case study content
          </a>
          <Navbar
            isCaseStudy={true}
            onNavigateHome={handleReturnToProjects}
          />
          <main id="main" className="page__main">
            <CaseStudyView
              projectId={projectId}
              onBack={handleReturnToProjects}
            />
          </main>
        </>
      ) : (
        <>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar isCaseStudy={false} />
          <main id="main" className="page__main">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <PromptWorkflow />
          </main>
        </>
      )}
    </div>
  )
}

export default App
