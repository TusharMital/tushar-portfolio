import Section from './Section'
import './About.css'

function About() {
  return (
    <Section
      id="about"
      index="02"
      kicker="Profile"
      title="About me"
      headingId="about-title"
    >
      <div className="about__grid">
        <div className="about__copy">
          <p>
            I’m Tushar Mittal, a second-year Computer Science undergraduate at
            JECRC University. I’m interested in how software works—from
            programming fundamentals through operating systems, computer
            architecture and computer networks.
          </p>
          <p>
            I learn by doing the work itself: coursework, coding exercises,
            debugging, documentation and small practical projects. That same
            habit carries into prompt engineering and AI-assisted development,
            where I design prompts, review generated code, then test and refine
            what comes back.
          </p>
        </div>
        <blockquote className="about__note">
          I completed the 40-hour MeitY-funded course “QT-00 &amp; 01
          Foundations of Quantum Computing &amp; Applications”, hosted by the
          Consortium of EICT Academy, MNIT Jaipur, with a rating of “Excellent”.
          <cite>Coursework, 40 hours</cite>
        </blockquote>
      </div>
    </Section>
  )
}

export default About
