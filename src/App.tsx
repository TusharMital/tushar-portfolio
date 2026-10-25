import { useState } from 'react'
import About from './components/About'
import CaseStudyView from './components/CaseStudyView'
import Chatbot from './components/Chatbot'
import Contact from './components/Contact'
import Hero from './components/Hero'
import LearningJourney from './components/LearningJourney'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import PromptWorkflow from './components/PromptWorkflow'
import Skills from './components/Skills'
import { useHashRoute } from './hooks/useHashRoute'
import './App.css'

function App() {
  const { route, projectId, navigateTo } = useHashRoute()
  const [chatOpen, setChatOpen] = useState(false)

  const handleNavigateFromCaseStudy = (targetId: string = 'projects') => {
    navigateTo(`#${targetId}`)
    setTimeout(() => {
      const section = document.getElementById(targetId)
      section?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="page">
      {route === 'case-study' && projectId ? (
        <>
          <a className="skip-link" href="#case-study-heading">
            Skip to case study content
          </a>
          <Navbar
            isCaseStudy={true}
            onNavigateHome={handleNavigateFromCaseStudy}
            onOpenAssistantModal={() => setChatOpen(true)}
          />
          <main id="main" className="page__main">
            <CaseStudyView
              projectId={projectId}
              onBack={() => handleNavigateFromCaseStudy('projects')}
            />
          </main>
          <Chatbot
            isOpenFloating={chatOpen}
            onToggleFloating={setChatOpen}
          />
        </>
      ) : (
        <>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar
            isCaseStudy={false}
            onOpenAssistantModal={() => setChatOpen(true)}
          />
          <main id="main" className="page__main">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <PromptWorkflow />
            <LearningJourney />
            <Chatbot
              isOpenFloating={chatOpen}
              onToggleFloating={setChatOpen}
            />
            <Contact />
          </main>
        </>
      )}
    </div>
  )
}

export default App
