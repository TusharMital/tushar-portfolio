import { useEffect, useRef } from 'react'

/** A lattice of points that bends away from the cursor. Pauses when off-screen. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      running = true,
      t = 0
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let color = '0.955 0.012 85'

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      color =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--particle')
          .trim() || color
    }

    const draw = () => {
      t += 0.006
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      ctx.clearRect(0, 0, w, h)
      const gap = w < 640 ? 34 : 42
      const scroll = window.scrollY * 0.15
      for (let y = gap / 2; y < h + gap; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const wave = Math.sin(x * 0.012 + t * 2) * Math.cos(y * 0.01 + t) * 6
          let px = x,
            py = y + wave - (scroll % gap)
          const dx = px - mouse.x,
            dy = py - mouse.y
          const dist = Math.hypot(dx, dy)
          const r = 160
          let a = 0.12 + (Math.sin(x * 0.03 + y * 0.02 + t * 3) + 1) * 0.06
          if (dist < r) {
            const f = (1 - dist / r) ** 2
            px += (dx / (dist || 1)) * f * 26
            py += (dy / (dist || 1)) * f * 26
            a += f * 0.6
          }
          ctx.fillStyle = `oklch(${color} / ${a})`
          ctx.fillRect(px, py, 1.5, 1.5)
        }
      }
      if (running && !reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
    }
    const io = new IntersectionObserver(([e]) => {
      running = !!e?.isIntersecting
      cancelAnimationFrame(raf)
      if (running) draw()
    })
    const mo = new MutationObserver(() => {
      resize()
      if (reduce) draw()
    })

    resize()
    draw()
    io.observe(canvas)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default ParticleField
