import Hero from './components/Hero'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <div className="page" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="page__main">
        <Hero />
      </main>
    </div>
  )
}

export default App
