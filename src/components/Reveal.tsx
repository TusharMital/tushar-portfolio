import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type CSSProperties,
  type ComponentPropsWithoutRef,
} from 'react'

type RevealProps<T extends ElementType = 'div'> = {
  as?: T
  delay?: number
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Reveal<T extends ElementType = 'div'>({
  as,
  delay = 0,
  className = '',
  children,
  style,
  ...rest
}: RevealProps<T>) {
  const Tag = as || 'div'
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as any}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ '--d': `${delay}ms`, ...(style as CSSProperties) } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SectionLabel({
  n,
  children,
}: {
  n: string
  children: ReactNode
}) {
  return (
    <div className="section-label">
      <span className="section-label__index">{n}</span>
      <span className="section-label__line" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export default Reveal
