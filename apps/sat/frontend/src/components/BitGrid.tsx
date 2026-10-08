import React from 'react'

const BitGrid = ({ 
  bits, 
  referenceBits, 
  type 
}: { 
  bits: number[]
  referenceBits?: number[]
  type: 'before' | 'after'
}) => {
  const getBitClass = (bit: number, referenceBit?: number) => {
    if (bit === referenceBit) {
      return type === 'after' ? 'bit-fixed' : 'bit-correct'
    }
    return 'bit-error'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '4px' }}>
        {type === 'before' ? 'Before Correction:' : 'After Correction:'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px' }}>
        {bits.slice(0, 100).map((bit, index) => (
          <div
            key={index}
            className={`bit-square ${getBitClass(bit, referenceBits?.[index])}`}
          />
        ))}
      </div>
    </div>
  )
}

export default BitGrid
