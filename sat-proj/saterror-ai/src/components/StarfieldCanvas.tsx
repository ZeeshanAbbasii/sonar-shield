import React, { useEffect, useRef } from 'react'

const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      speed: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      stars.length = 0
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.15 + 0.05
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y -= star.speed

        if (star.y < -10) {
          star.y = canvas.height + 10
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createStars()
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  )
}

export default StarfieldCanvas
