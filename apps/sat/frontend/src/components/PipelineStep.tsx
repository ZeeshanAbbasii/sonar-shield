import React from 'react'

const PipelineStep = ({ 
  icon, 
  title, 
  children, 
  delay, 
  isActive 
}: { 
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  delay: number
  isActive: boolean 
}) => {
  return (
    <div
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`,
        border: isActive ? '2px solid var(--cyan)' : '1px solid var(--border)',
        borderRadius: '12px',
        padding: '20px',
        background: 'var(--card)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px solid var(--green)',
            borderRadius: '12px',
            animation: 'glow 2s ease-in-out infinite',
            pointerEvents: 'none'
          }}
        />
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ fontSize: '24px' }}>
          {icon}
        </div>
        <h3 style={{ 
          margin: 0, 
          color: 'var(--text)', 
          fontSize: '16px',
          fontWeight: '600'
        }}>
          {title}
        </h3>
      </div>
      
      <div style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.5' }}>
        {children}
      </div>
    </div>
  )
}

export default PipelineStep
