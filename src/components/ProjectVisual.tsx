/** Purpose-built abstract visuals from Lovable reference. Illustrations of algorithmic logic. */
export function ProjectVisual({ id }: { id: string }) {
  if (id === 'python-programs-collection' || id === 'python-programs') {
    const fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    return (
      <div className="grid-lines project-visual project-visual--fib">
        <span className="label-mono project-visual__caption">
          a, b = b, a + b
        </span>
        <div className="project-visual__fib-bars">
          {fib.map((n, i) => (
            <div key={i} className="project-visual__fib-col">
              <span className="label-mono">{n}</span>
              <div
                className="project-visual__fib-bar"
                style={{
                  height: `${8 + n * 5}px`,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'interactive-quiz' || id === 'quiz-app') {
    return (
      <div className="grid-lines project-visual project-visual--quiz">
        <div className="label-mono" style={{ color: 'var(--muted-foreground)' }}>
          Q 03 / 05
        </div>
        <div className="display project-visual__quiz-title">
          What makes a useful test?
        </div>
        <div className="project-visual__quiz-options">
          {['A', 'B', 'C', 'D'].map((l, i) => (
            <div
              key={l}
              className={`project-visual__quiz-option ${
                i === 1 ? 'is-correct' : ''
              }`}
            >
              <span className="label-mono">{l}</span>
              <span
                className="project-visual__quiz-bar"
                style={{ width: `${40 + i * 14}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (
    id === 'python-debugging' ||
    id === 'debugging' ||
    id === 'cursor-bug-fix' ||
    id === 'cursor-debugging'
  ) {
    const isCursor = id === 'cursor-bug-fix' || id === 'cursor-debugging'
    return (
      <div className="grid-lines project-visual project-visual--debug">
        <p className="label-mono" style={{ color: 'var(--primary)' }}>
          {isCursor ? 'Running total' : 'Boundary checks'}
        </p>
        <p className="display project-visual__debug-mid">
          {isCursor ? '10 + 20 + 30 + 40 + 50' : 'Reproduce. Correct. Verify.'}
        </p>
        <div className="project-visual__debug-bottom">
          <p className="display project-visual__debug-highlight">
            {isCursor ? '150' : 'RED → GREEN'}
          </p>
          <p className="project-visual__debug-sub">
            {isCursor
              ? 'Accumulate values, don’t overwrite the total.'
              : 'Average · pass boundary · grade ordering'}
          </p>
        </div>
      </div>
    )
  }

  // Book Reading List Application
  const books = [
    { h: 78, s: 'Finished' },
    { h: 92, s: 'Reading' },
    { h: 64, s: 'Want' },
    { h: 86, s: 'Finished' },
    { h: 70, s: 'Want' },
    { h: 96, s: 'Reading' },
  ]

  return (
    <div className="grid-lines project-visual project-visual--books">
      <div className="project-visual__books-row">
        {books.map((b, i) => (
          <div
            key={i}
            className={`project-visual__book project-visual__book--${b.s.toLowerCase()}`}
            style={{ height: `${b.h}%`, transitionDelay: `${i * 50}ms` }}
          >
            <span className="label-mono project-visual__book-tag">
              {b.s}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectVisual
