import React, { useState, useEffect } from 'react'

const MetricCard = ({ 
  value, 
  label, 
  suffix = '', 
  prefix = '' 
}: { 
  value: number
  label: string
  suffix?: string
  prefix?: string
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, value)
      setDisplayValue(current)
      
      if (step >= steps) {
        clearInterval(timer)
        setIsAnimating(false)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`
    } else if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`
    } else if (val < 0.01 && val > 0) {
      return val.toExponential(2)
    } else if (Number.isInteger(val)) {
      return Math.round(val).toString()
    } else {
      return val.toFixed(2)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          color: 'var(--cyan)',
          marginBottom: '8px',
          animation: isAnimating ? 'countUp 0.3s ease-out' : 'none'
        }}
      >
        {prefix}{formatValue(displayValue)}{suffix}
      </div>
      <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
        {label}
      </div>
    </div>
  )
}

export default MetricCard
