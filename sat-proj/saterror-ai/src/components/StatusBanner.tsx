import React from 'react'

const StatusBanner = ({ isConnected }: { isConnected: boolean }) => {
  if (isConnected) {
    return (
      <div style={{
        width: '100%',
        background: 'transparent',
        color: 'var(--green)',
        border: '1px solid var(--green)',
        padding: '12px 24px',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        PyTorch Model Active — gru_decoder_best.pt | 6,216,196 params
      </div>
    )
  }

  return (
    <div style={{
      width: '100%',
      background: 'transparent',
      color: 'var(--red)',
      border: '1px solid var(--red)',
      padding: '12px 24px',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '14px'
    }}>
      Backend Offline — Run: uvicorn main:app --port 8000
    </div>
  )
}

export default StatusBanner
