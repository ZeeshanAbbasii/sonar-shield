import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import StatusBanner from '../components/StatusBanner'
import PipelineStep from '../components/PipelineStep'
import BitGrid from '../components/BitGrid'
import StarfieldCanvas from '../components/StarfieldCanvas'
import { TransmitResponse } from '../utils/api'
import { CheckCircle, AlertTriangle, Loader } from 'lucide-react'

const Demo = () => {
  const [isConnected, setIsConnected] = useState(true)
  const [text, setText] = useState('bahria university satellite')
  const [snr, setSnr] = useState(4.0)
  const [useBurst, setUseBurst] = useState(false)
  const [burstProb, setBurstProb] = useState(0.20)
  const [burstLen, setBurstLen] = useState(15)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TransmitResponse | null>(null)
  const [showSteps, setShowSteps] = useState(false)

  useEffect(() => {
    const checkBackend = async () => {
      try {
        console.log('Checking backend health...')
        const response = await api.health()
        console.log('Health response:', response.data)
        setIsConnected(response.data.status === 'ok' && response.data.model_loaded)
      } catch (error) {
        console.error('Health check failed:', error)
        setIsConnected(false)
      }
    }

    checkBackend()
    const interval = setInterval(checkBackend, 5000)
    return () => clearInterval(interval)
  }, [])

  const getSnrLabel = () => {
    return { text: '', color: 'var(--green)' }
  }

  const handleTransmit = async () => {
    setIsLoading(true)
    setShowSteps(false)
    setResult(null)

    try {
      const response = await api.transmit({
        text,
        snr_db: snr,
        use_burst: useBurst,
        burst_prob: burstProb,
        burst_len: burstLen
      })

      setResult(response.data)
      setShowSteps(true)
    } catch (error) {
      console.error('Transmission failed:', error)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  const formatScientific = (num: number) => {
    if (num < 0.01 && num > 0) {
      return num.toExponential(2)
    }
    return num.toFixed(4)
  }

  const getCharacterComparison = () => {
    if (!result) return null
    
    return result.original_text.split('').map((char, index) => {
      const recoveredChar = result.recovered_text[index]
      const isMatch = char === recoveredChar
      
      return (
        <span
          key={index}
          style={{
            color: isMatch ? 'var(--green)' : 'var(--orange)',
            fontWeight: isMatch ? '400' : '700'
          }}
        >
          {recoveredChar || '?'}
        </span>
      )
    })
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <StarfieldCanvas />
      
      <div style={{ 
        paddingTop: '64px', 
        position: 'relative',
        zIndex: 1
      }}>
        <StatusBanner isConnected={isConnected} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 24px',
          display: 'grid',
        gridTemplateColumns: '40% 60%',
        gap: '40px'
      }}>
        {/* Left Panel - Controls */}
        <div>
          <h2 style={{ color: 'white', marginBottom: '32px' }}>Transmission Settings</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text)', marginBottom: '8px', fontWeight: '500' }}>
                Message to Transmit
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type any message..."
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text)',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text)', marginBottom: '8px', fontWeight: '500' }}>
                Signal-to-Noise Ratio: {snr.toFixed(1)} dB
              </label>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={snr}
                onChange={(e) => setSnr(parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, 
                    rgba(255, 100, 100, 0.7) 0%, 
                    rgba(255, 180, 100, 0.7) 25%, 
                    rgba(100, 255, 180, 0.7) 58%, 
                    rgba(100, 255, 180, 0.7) 100%)`,
                  outline: 'none',
                  opacity: '0.8',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                }}
              />
              <div style={{ 
                marginTop: '8px', 
                fontSize: '14px', 
                color: getSnrLabel().color,
                fontWeight: '500'
              }}>
                {getSnrLabel().text}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <label style={{ color: 'var(--text)', fontWeight: '500' }}>Enable Burst Noise</label>
                <button
                  onClick={() => setUseBurst(!useBurst)}
                  style={{
                    width: '48px',
                    height: '24px',
                    background: useBurst ? 'var(--cyan)' : 'var(--border)',
                    border: 'none',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: useBurst ? '26px' : '2px',
                    width: '20px',
                    height: '20px',
                    background: 'white',
                    borderRadius: '50%',
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>

              {useBurst && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeInUp 0.3s ease-out' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text)', marginBottom: '8px', fontSize: '14px' }}>
                      Burst Probability: {burstProb.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.50"
                      step="0.05"
                      value={burstProb}
                      onChange={(e) => setBurstProb(parseFloat(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', color: 'var(--text)', marginBottom: '8px', fontSize: '14px' }}>
                      Burst Length: {burstLen} symbols
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={burstLen}
                      onChange={(e) => setBurstLen(parseInt(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleTransmit}
              disabled={isLoading}
              style={{
                width: '100%',
                fontSize: '16px',
                padding: '16px',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.6 : 1
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = 'white'
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'white'
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="spin" />
                  Processing...
                </>
              ) : (
                'TRANSMIT'
              )}
            </button>
          </div>
        </div>

        {/* Right Panel - Pipeline Visualization */}
        <div>
          <h2 style={{ color: 'white', marginBottom: '32px' }}>Error Correction Pipeline</h2>
          
          {!showSteps ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 24px',
              border: '2px solid var(--border)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
                Configure your settings and click TRANSMIT to see the AI-powered error correction pipeline
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {result && (
                <PipelineStep
                  icon={<div className="step-badge">01</div>}
                  title="STEP 1: ORIGINAL MESSAGE"
                  delay={0}
                  isActive={false}
                >
                  <div style={{ fontFamily: 'monospace', fontSize: '18px', marginBottom: '8px' }}>
                    "{result.original_text}"
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>
                    Binary: {result.frame_results[0]?.original_bits?.slice(0, 8).join(' ')}...
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {result.total_bits} bits | {result.frame_results.length} frames
                  </div>
                </PipelineStep>
              )}

              <div style={{ textAlign: 'center', color: 'var(--cyan)', fontSize: '24px' }}>
                ↓
              </div>

              {result && (
                <PipelineStep
                  icon={<div className="step-badge">02</div>}
                  title="STEP 2: CONVOLUTIONAL ENCODING"
                  delay={400}
                  isActive={false}
                >
                  <div>Rate 1/2 | Kc=7 | Gen: 171, 133</div>
                  <div>212 coded bits per frame</div>
                  {result.frame_results[0] && (
                    <div style={{ marginTop: '8px' }}>
                      {result.frame_results[0].encoded_bits.slice(0, 40).map((bit, i) => (
                        <span key={i} className="bit-square bit-correct" />
                      ))}
                    </div>
                  )}
                </PipelineStep>
              )}

              <div style={{ textAlign: 'center', color: 'var(--cyan)', fontSize: '24px' }}>
                ↓
              </div>

              {result && (
                <PipelineStep
                  icon={<div className="step-badge">03</div>}
                  title="STEP 3: SATELLITE CHANNEL"
                  delay={800}
                  isActive={false}
                >
                  <div>SNR: {result.snr_db} dB</div>
                  <div>{result.use_burst ? "AWGN + Burst" : "AWGN only"}</div>
                  {result.frame_results[0] && (
                    <div style={{ marginTop: '8px' }}>
                      {result.frame_results[0].corrupted_bits.map((bit, i) => (
                        <span 
                          key={i} 
                          className={`bit-square ${
                            bit === result.frame_results[0].original_bits[i] ? 'bit-correct' : 'bit-error'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: '8px', fontSize: '12px' }}>
                    {result.total_errors_in} errors | BER: {formatScientific(result.avg_ber_before)}
                  </div>
                </PipelineStep>
              )}

              <div style={{ textAlign: 'center', color: 'var(--cyan)', fontSize: '24px' }}>
                ↓
              </div>

              {result && (
                <PipelineStep
                  icon={<div className="step-badge">04</div>}
                  title="STEP 4: BI-GRU NEURAL DECODER"
                  delay={1200}
                  isActive={true}
                >
                  <div>gru_decoder_best.pt</div>
                  <div>6,216,196 parameters</div>
                  <div>Inference: {result.avg_inference_ms.toFixed(1)}ms</div>
                  <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--cyan)' }}>
                    Bi-GRU Decoder — 24% better BER than LSTM at 2dB — 1.24× faster
                  </div>
                </PipelineStep>
              )}

              <div style={{ textAlign: 'center', color: 'var(--cyan)', fontSize: '24px' }}>
                ↓
              </div>

              {result && (
                <PipelineStep
                  icon={result.is_perfect ? <CheckCircle size={24} color="var(--green)" /> : <AlertTriangle size={24} color="var(--orange)" />}
                  title="STEP 5: CORRECTED RESULT"
                  delay={1600}
                  isActive={false}
                >
                  <div style={{ fontFamily: 'monospace', fontSize: '18px', marginBottom: '8px' }}>
                    "{result.recovered_text}"
                  </div>
                  {result.frame_results[0] && (
                    <div style={{ marginTop: '8px' }}>
                      {result.frame_results[0].corrected_bits.map((bit, i) => (
                        <span 
                          key={i} 
                          className={`bit-square ${
                            bit === result.frame_results[0].original_bits[i] ? 'bit-fixed' : 'bit-error'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: '8px', fontSize: '12px' }}>
                    {result.total_errors_out} errors remaining | BER: {formatScientific(result.avg_ber_after)}
                  </div>
                  <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--cyan)' }}>
                    Improvement: {result.improvement}
                  </div>
                </PipelineStep>
              )}

              {/* Metrics Row */}
              {result && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '16px',
                  animation: `fadeInUp 0.6s ease-out 2000ms both`
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>BER Before</div>
                    <div style={{ color: 'var(--orange)', fontWeight: '600' }}>
                      {formatScientific(result.avg_ber_before)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>BER After</div>
                    <div style={{ color: 'var(--green)', fontWeight: '600' }}>
                      {formatScientific(result.avg_ber_after)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Improvement</div>
                    <div style={{ color: 'var(--cyan)', fontWeight: '600' }}>
                      {result.improvement}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Confidence</div>
                    <div style={{ color: 'var(--green)', fontWeight: '600' }}>
                      {(result.avg_confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Inference Time</div>
                    <div style={{ color: 'var(--cyan)', fontWeight: '600' }}>
                      {result.avg_inference_ms.toFixed(1)}ms
                    </div>
                  </div>
                </div>
              )}

              {/* Bit Grid Visualization */}
              {result && result.frame_results[0] && (
                <div style={{ animation: `fadeInUp 0.6s ease-out 2400ms both` }}>
                  <h4 style={{ color: 'var(--cyan)', marginBottom: '16px' }}>
                    Bit-Level Visualization (Frame 1)
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <BitGrid
                      bits={result.frame_results[0].corrupted_bits}
                      referenceBits={result.frame_results[0].original_bits}
                      type="before"
                    />
                    <BitGrid
                      bits={result.frame_results[0].corrected_bits}
                      referenceBits={result.frame_results[0].original_bits}
                      type="after"
                    />
                    <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '14px' }}>
                      {result.frame_results[0].errors_in} errors → {result.frame_results[0].errors_out} errors
                    </div>
                  </div>
                </div>
              )}

              {/* Recovered Message Box */}
              {result && (
                <div style={{
                  border: result.is_perfect ? '2px solid var(--green)' : '2px solid var(--orange)',
                  boxShadow: result.is_perfect 
                    ? '0 0 20px rgba(0,255,136,0.3)' 
                    : '0 0 20px rgba(255,107,53,0.3)',
                  textAlign: 'center',
                  padding: '32px',
                  animation: `fadeInUp 0.6s ease-out 2800ms both`
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    background: result.is_perfect ? 'var(--green)' : 'var(--orange)',
                    color: result.is_perfect ? '#000' : 'white'
                  }}>
                    {result.is_perfect ? 'PERFECT RECOVERY' : 'PARTIAL RECOVERY'}
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontFamily: 'monospace',
                    marginBottom: '16px',
                    color: 'white'
                  }}>
                    {result.recovered_text}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    <div>Original:  {result.original_text}</div>
                    <div>Recovered: {getCharacterComparison()}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Demo
