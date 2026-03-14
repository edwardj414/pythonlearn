// src/components/SnakeCursor.jsx
import { useEffect, useRef } from 'react'

const EMERALD_RGB = '16, 185, 129' // #10b981
const AMBER_RGB = '245, 158, 11'   // #f59e0b

export default function SnakeCursor() {
  const canvasRef = useRef(null)

  // Physics states
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const dot = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  // Animation states
  const isHovering = useRef(false)
  const hoverProgress = useRef(0) // 0 = normal, 1 = hovered
  const rotation = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Handle High-DPI displays for ultra-crisp rendering
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        isHovering.current = true
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        isHovering.current = false
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    // Linear interpolation helper
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // 1. Calculate Physics
      // The dot follows almost instantly
      dot.current.x = lerp(dot.current.x, mouse.current.x, 0.6)
      dot.current.y = lerp(dot.current.y, mouse.current.y, 0.6)

      // The ring follows with a smooth, heavy spring delay
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15)

      // Smoothly animate the hover transition (0 to 1)
      hoverProgress.current = lerp(
        hoverProgress.current,
        isHovering.current ? 1 : 0,
        0.15
      )

      // Slow constant rotation for the ring
      rotation.current += 0.01

      // 2. Render Inner Dot
      ctx.beginPath()
      ctx.arc(dot.current.x, dot.current.y, 2.5, 0, Math.PI * 2)
      // Blend color from Emerald to Amber based on hover
      ctx.fillStyle = hoverProgress.current > 0.5
        ? `rgba(${AMBER_RGB}, 1)`
        : `rgba(${EMERALD_RGB}, 1)`
      ctx.shadowBlur = 8
      ctx.shadowColor = hoverProgress.current > 0.5
        ? `rgba(${AMBER_RGB}, 0.6)`
        : `rgba(${EMERALD_RGB}, 0.6)`
      ctx.fill()

      // Reset shadow for outer geometry to save performance
      ctx.shadowBlur = 0

      // 3. Render Outer Geometry (Ring morphing into Brackets)
      const size = lerp(12, 18, hoverProgress.current)
      const opacity = lerp(0.4, 0.8, hoverProgress.current)

      ctx.save()
      ctx.translate(ring.current.x, ring.current.y)

      if (hoverProgress.current < 0.01) {
        // STATE A: Default Dashed Tech Ring
        ctx.rotate(rotation.current)
        ctx.strokeStyle = `rgba(${EMERALD_RGB}, ${opacity})`
        ctx.lineWidth = 1
        ctx.setLineDash([8, 6])
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.stroke()
      }
      else if (hoverProgress.current > 0.99) {
        // STATE B: Fully Hovered Targeting Brackets [ ]
        ctx.strokeStyle = `rgba(${AMBER_RGB}, ${opacity})`
        ctx.lineWidth = 1.5
        const len = 6 // Length of the bracket arms

        ctx.beginPath()
        // Top Left
        ctx.moveTo(-size, -size + len); ctx.lineTo(-size, -size); ctx.lineTo(-size + len, -size);
        // Top Right
        ctx.moveTo(size - len, -size); ctx.lineTo(size, -size); ctx.lineTo(size, -size + len);
        // Bottom Right
        ctx.moveTo(size, size - len); ctx.lineTo(size, size); ctx.lineTo(size - len, size);
        // Bottom Left
        ctx.moveTo(-size + len, size); ctx.lineTo(-size, size); ctx.lineTo(-size, size - len);
        ctx.stroke()
      }
      else {
        // STATE C: Transitioning (Crossfade)
        // Draw fading out ring
        ctx.rotate(rotation.current)
        ctx.strokeStyle = `rgba(${EMERALD_RGB}, ${0.4 * (1 - hoverProgress.current)})`
        ctx.lineWidth = 1
        ctx.setLineDash([8, 6])
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.stroke()

        // Draw fading in brackets
        ctx.rotate(-rotation.current) // un-rotate for brackets
        ctx.strokeStyle = `rgba(${AMBER_RGB}, ${0.8 * hoverProgress.current})`
        ctx.lineWidth = 1.5
        const len = 6
        ctx.beginPath()
        ctx.moveTo(-size, -size + len); ctx.lineTo(-size, -size); ctx.lineTo(-size + len, -size);
        ctx.moveTo(size - len, -size); ctx.lineTo(size, -size); ctx.lineTo(size, -size + len);
        ctx.moveTo(size, size - len); ctx.lineTo(size, size); ctx.lineTo(size - len, size);
        ctx.moveTo(-size + len, size); ctx.lineTo(-size, size); ctx.lineTo(-size, size - len);
        ctx.stroke()
      }

      ctx.restore()

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  )
}