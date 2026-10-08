import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../utils/api'
import { Satellite, Loader } from 'lucide-react'

const Navbar = () => {
  const [healthStatus, setHealthStatus] = useState<'checking' | 'connected' | 'failed'>('checking')
  const [parameters, setParameters] = useState<number | null>(null)
  const location = useLocation()

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.health()
        if (response.data.status === 'ok' && response.data.model_loaded) {
          setHealthStatus('connected')
          setParameters(response.data.parameters)
        } else {
          setHealthStatus('failed')
        }
      } catch (error) {
        setHealthStatus('failed')
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusDisplay = () => {
    switch (healthStatus) {
      case 'connected':
        return (
          <>
            <span className="dot dot-green" />
            Model Active
          </>
        )
      case 'failed':
        return (
          <>
            <span className="dot dot-red" />
            Backend Offline
          </>
        )
      case 'checking':
        return (
          <>
            <span className="dot dot-gray" />
            Connecting
          </>
        )
      default:
        return null
    }
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a
          href="http://localhost:3003/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'var(--text)',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s',
            border: '1px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Portal
        </a>
        <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Satellite size={24} color="var(--cyan)" />
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'white'
          }}>
            Sonar Shield
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            color: location.pathname === '/' ? 'var(--cyan)' : 'var(--text)',
            textDecoration: 'none',
            fontWeight: location.pathname === '/' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          Home
        </Link>
        <Link
          to="/demo"
          style={{
            color: location.pathname === '/demo' ? 'var(--cyan)' : 'var(--text)',
            textDecoration: 'none',
            fontWeight: location.pathname === '/demo' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          Demo
        </Link>
        <Link
          to="/charts"
          style={{
            color: location.pathname === '/charts' ? 'var(--cyan)' : 'var(--text)',
            textDecoration: 'none',
            fontWeight: location.pathname === '/charts' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          Charts
        </Link>
        <Link
          to="/how-it-works"
          style={{
            color: location.pathname === '/how-it-works' ? 'var(--cyan)' : 'var(--text)',
            textDecoration: 'none',
            fontWeight: location.pathname === '/how-it-works' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          How It Works
        </Link>
        <Link
          to="/about"
          style={{
            color: location.pathname === '/about' ? 'var(--cyan)' : 'var(--text)',
            textDecoration: 'none',
            fontWeight: location.pathname === '/about' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          About
        </Link>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        fontSize: '14px',
        color: 'var(--text)'
      }}>
        {healthStatus === 'checking' && <Loader size={16} className="spin" />}
        <div style={{
          padding: '6px 12px',
          borderRadius: '20px',
          background: healthStatus === 'connected' ? 'rgba(0,255,136,0.1)' : 
                      healthStatus === 'failed' ? 'rgba(255,68,68,0.1)' : 
                      'rgba(96,96,170,0.1)',
          border: `1px solid ${healthStatus === 'connected' ? 'var(--green)' : 
                              healthStatus === 'failed' ? 'var(--red)' : 
                              'var(--muted)'}`,
          color: healthStatus === 'connected' ? 'var(--green)' : 
                 healthStatus === 'failed' ? 'var(--red)' : 
                 'var(--muted)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center'
        }}>
          {getStatusDisplay()}
        </div>
        {parameters && (
          <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
            {parameters.toLocaleString()} params
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
