import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  id: string
  index: string
  kicker: string
  title: string
  headingId: string
  children: ReactNode
}

function Section({
  id,
  index,
  kicker,
  title,
  headingId,
  children,
}: SectionProps) {
  return (
    <section className="section" id={id} aria-labelledby={headingId}>
      <div className="section__meta">
        <span className="section__index">{index}</span>
        <span className="section__rule" aria-hidden="true" />
        <span>{kicker}</span>
      </div>
      <h2 id={headingId} className="section__title">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default Section
