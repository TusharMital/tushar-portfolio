import { useState } from 'react'
import About from './components/About'
import CaseStudyView from './components/CaseStudyView'
import Chatbot from './components/Chatbot'
import Contact from './components/Contact'
import Curiosity from './components/Curiosity'
import FinalNameReveal from './components/FinalNameReveal'
import Hero from './components/Hero'
import LearningJourney from './components/LearningJourney'
import Navbar from './components/Navbar'
import Philosophy from './components/Philosophy'
import Principles from './components/Principles'
import Projects from './components/Projects'
import Skills from './components/Skills'
import TechMarquee from './components/TechMarquee'
import { useHashRoute } from './hooks/useHashRoute'
import './App.css'

function App() {
  const { route, projectId, navigateTo } = useHashRoute()
  const [chatOpen, setChatOpen] = useState(false)

  const handleReturnToProjects = () => {
    navigateTo('#projects')
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
            onOpenAssistantModal={() => setChatOpen(true)}
          />
          <main id="main" className="page__main">
            <CaseStudyView
              projectId={projectId}
              onBack={handleReturnToProjects}
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
            {/* HERO */}
            <Hero />

            {/* TECHNOLOGY MARQUEE */}
            <TechMarquee />

            {/* 01 / ABOUT */}
            <About />

            {/* 02 / SKILLS */}
            <Skills />

            {/* 03 / MY JOURNEY */}
            <LearningJourney />

            {/* 04 / PROJECTS */}
            <Projects />

            {/* 06 / PHILOSOPHY: HOW I WORK */}
            <Philosophy />

            {/* 07 / PRINCIPLES: 17 NUMBERED RULES */}
            <Principles />

            {/* 08 / THE CURIOSITY */}
            <Curiosity />

            {/* 09 / CONTACT */}
            <Contact />

            {/* 10 / FINAL NAME REVEAL & CLOSING SCENE */}
            <FinalNameReveal />

            {/* AI Assistant Drawer & Modal */}
            <Chatbot
              isOpenFloating={chatOpen}
              onToggleFloating={setChatOpen}
            />
          </main>
        </>
      )}
    </div>
  )
}

export default App
