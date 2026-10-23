import './Hero.css'

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__meta">
        <span className="hero__index">01</span>
        <span className="hero__rule" aria-hidden="true" />
        <span>Portfolio</span>
      </div>

      <h1 id="hero-title" className="hero__title">
        <span className="hero__title-line">Tushar</span>
        <span className="hero__title-line hero__title-line--offset">Mittal</span>
      </h1>

      <div className="hero__body">
        <p className="hero__role">
          Computer Science Undergraduate · Prompt Engineering Learner
        </p>
        <p className="hero__copy">
          I explore how software works beneath the surface—and use code,
          thoughtful prompts and experimentation to turn ideas into working
          applications.
        </p>
      </div>

      <div className="hero__footer">
        <span className="hero__rule" aria-hidden="true" />
        <span className="hero__scroll">
          <span className="hero__scroll-mark" aria-hidden="true" />
          Scroll
        </span>
      </div>
    </section>
  )
}

export default Hero
