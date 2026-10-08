import React from 'react'
import { Link } from 'react-router-dom'
import MetricCard from '../components/MetricCard'
import StarfieldCanvas from '../components/StarfieldCanvas'
import { Zap, RefreshCw, Shield, Settings, BarChart2, Target } from 'lucide-react'

const Home = () => {
  const viterbiComparison = [
    { snr: 0, hamming: 0.18483, reedSolomon: 0.13800, viterbi: 0.11776, lstm: 0.17976, biGru: 0.16832, rank: '#2/5' },
    { snr: 1, hamming: 0.15243, reedSolomon: 0.10968, viterbi: 0.03204, lstm: 0.07727, biGru: 0.06751, rank: '#2/5' },
    { snr: 2, hamming: 0.12274, reedSolomon: 0.08466, viterbi: 0.00416, lstm: 0.02051, biGru: 0.01539, rank: '#2/5' },
    { snr: 3, hamming: 0.09138, reedSolomon: 0.06078, viterbi: 0.00024, lstm: 0.00260, biGru: 0.00256, rank: '#2/5' },
    { snr: 4, hamming: 0.06561, reedSolomon: 0.04176, viterbi: 0.00008, lstm: 0.00030, biGru: 0.00020, rank: '#2/5' },
    { snr: 5, hamming: 0.04239, reedSolomon: 0.02576, viterbi: 0.00000, lstm: 0.00000, biGru: 0.00000, rank: '#1/5' },
    { snr: 6, hamming: 0.02437, reedSolomon: 0.01354, viterbi: 0.00000, lstm: 0.00000, biGru: 0.00000, rank: '#1/5' }
  ]

  const getRowColor = (snr: number) => {
    return 'transparent'
  }

  return (
    <div style={{ textAlign: 'center', padding: '48px' }}>
      <StarfieldCanvas />
      
      {/* Hero Section */}
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          position: 'relative',
          width: '240px',
          height: '240px',
          marginBottom: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Earth in center */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            position: 'absolute',
            background: 'radial-gradient(circle at 30% 30%, #4a90d9, #1e3a5f, #0a1628)',
            boxShadow: '0 0 30px rgba(65, 105, 225, 0.5), inset 0 0 20px rgba(0,0,0,0.3)',
            overflow: 'hidden'
          }}>
            {/* Simple earth representation with CSS */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 70% 60%, rgba(34, 139, 34, 0.6) 0%, transparent 40%)',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 30% 40%, rgba(34, 139, 34, 0.4) 0%, transparent 30%)',
              borderRadius: '50%'
            }} />
          </div>
          
          {/* Satellite orbiting around earth */}
          <div style={{ 
            fontSize: '40px', 
            animation: 'orbit 4s linear infinite',
            position: 'absolute'
          }}>
            🛰️
          </div>
        </div>
        
        <h1 style={{ 
          color: 'white', 
          fontSize: 'clamp(2rem, 5vw, 4rem)', 
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, var(--cyan), var(--green))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Sonar Shield
        </h1>
        
        <p style={{ 
          color: 'var(--muted)', 
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', 
          textAlign: 'center',
          marginBottom: '48px',
          maxWidth: '600px',
          lineHeight: 1.6
        }}>
          AI-Powered Error Correction System for Satellite Communication
          <br />
          <span style={{ color: 'var(--cyan)' }}>Research by Zeeshan Ahmad Abbasi & Mohammad Arqam Malik</span>
          <br />
          <span style={{ color: 'var(--muted)' }}>Bahria University</span>
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link 
            to="/demo"
            style={{
              padding: '16px 32px',
              background: 'transparent',
              color: 'var(--cyan)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.2s',
              border: '2px solid var(--cyan)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--cyan)'
              e.currentTarget.style.color = '#000'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--cyan)'
            }}
          >
            Try Live Demo
          </Link>
          
          <Link 
            to="/how-it-works"
            style={{
              padding: '16px 32px',
              background: 'transparent',
              color: 'var(--cyan)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.2s',
              border: '2px solid var(--cyan)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--cyan)'
              e.currentTarget.style.color = '#000'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--cyan)'
            }}
          >
            How It Works
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ 
        padding: '80px 24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '48px', 
            textAlign: 'center' 
          }}>
            Key Achievements
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '32px' 
          }}>
            <MetricCard 
              value={6216196} 
              label="Model Parameters" 
              suffix=""
            />
            <MetricCard 
              value={1000000} 
              label="Training Frames" 
              suffix=""
            />
            <MetricCard 
              value={105} 
              label="Speedup vs Viterbi" 
              suffix="x"
            />
            <MetricCard 
              value={7.7} 
              label="Burst Robustness" 
              suffix="x"
            />
          </div>
        </div>
      </div>

      {/* Why Not Viterbi Section */}
      <div style={{ 
        padding: '80px 24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '48px', 
            textAlign: 'center' 
          }}>
            Why Not Traditional Viterbi?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px' 
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Zap size={24} color="var(--cyan)" />
                <h3 style={{ color: 'var(--cyan)', margin: 0 }}>Speed</h3>
              </div>
              <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
                Bi-GRU processes frames in parallel, achieving 105x speedup over sequential Viterbi decoding at batch size 64.
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <RefreshCw size={24} color="var(--cyan)" />
                <h3 style={{ color: 'var(--cyan)', margin: 0 }}>Parallelization</h3>
              </div>
              <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
                Neural networks leverage GPU acceleration, while Viterbi is limited to sequential processing.
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Shield size={24} color="var(--cyan)" />
                <h3 style={{ color: 'var(--cyan)', margin: 0 }}>Burst Robustness</h3>
              </div>
              <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
                Bi-GRU maintains performance under burst noise, while Viterbi degrades by 8.5x under heavy interference.
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Settings size={24} color="var(--cyan)" />
                <h3 style={{ color: 'var(--cyan)', margin: 0 }}>Adaptability</h3>
              </div>
              <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
                Neural networks learn complex channel patterns and adapt to varying conditions automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div style={{ 
        padding: '80px 24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '48px', 
            textAlign: 'center' 
          }}>
            BER Performance Comparison
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              background: 'transparent',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{}}>
                  <th style={{ padding: '16px', textAlign: 'left', color: 'var(--cyan)' }}>SNR (dB)</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>Hamming</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>Reed-Solomon</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>Viterbi</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>LSTM</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: 'var(--cyan)' }}>Bi-GRU (Ours)</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: 'var(--green)' }}>Rank</th>
                </tr>
              </thead>
              <tbody>
                {viterbiComparison.map((row, index) => (
                  <tr key={index} style={{ 
                    background: getRowColor(row.snr),
                    borderBottom: '1px solid var(--border)'
                  }}>
                    <td style={{ padding: '16px', color: 'white', fontWeight: '600' }}>{row.snr}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>
                      {row.hamming < 0.01 ? row.hamming.toExponential(2) : row.hamming.toFixed(4)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>
                      {row.reedSolomon < 0.01 ? row.reedSolomon.toExponential(2) : row.reedSolomon.toFixed(4)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>
                      {row.viterbi < 0.01 ? row.viterbi.toExponential(2) : row.viterbi.toFixed(4)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text)' }}>
                      {row.lstm < 0.01 ? row.lstm.toExponential(2) : row.lstm.toFixed(4)}
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      textAlign: 'center', 
                      color: row.snr === 2 ? '#4CAF50' : 'var(--cyan)', 
                      fontWeight: '600',
                      background: row.snr === 2 ? 'rgba(76,175,80,0.1)' : 'transparent'
                    }}>
                      {row.biGru < 0.01 ? row.biGru.toExponential(2) : row.biGru.toFixed(4)}
                      {row.snr === 2 && (
                        <div style={{ fontSize: '11px', color: '#4CAF50', marginTop: '4px', fontWeight: 'normal' }}>
                          8× better than Hamming<br/>5.5× better than Reed-Solomon
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'var(--green)', fontWeight: '700' }}>
                      {row.rank}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p style={{ 
            marginTop: '24px', 
            fontSize: '16px', 
            color: 'var(--text)', 
            textAlign: 'center',
            lineHeight: '1.6',
            maxWidth: '900px',
            margin: '24px auto'
          }}>
            Real benchmark results — each method uses its own encoder and decoder pipeline. Bi-GRU achieves rank 2 at all SNR levels, outperforming Hamming and Reed-Solomon across the full range.
          </p>
          
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link 
              to="/charts"
              style={{
                color: 'var(--cyan)',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <BarChart2 size={20} />
              View Detailed Charts
            </Link>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div style={{ 
        padding: '80px 24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '48px' 
          }}>
            Key Findings
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px' 
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Target size={24} color="var(--green)" />
                <h3 style={{ color: 'var(--green)', margin: 0 }}>Perfect Recovery</h3>
              </div>
              <p style={{ color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                Achieves zero bit error rate at SNR ≥ 5dB, outperforming all traditional methods.
              </p>
            </div>
            
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Shield size={24} color="var(--green)" />
                <h3 style={{ color: 'var(--green)', margin: 0 }}>Burst Resilience</h3>
              </div>
              <p style={{ color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                7.7x more robust than Viterbi under heavy burst noise conditions.
              </p>
            </div>
            
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Zap size={24} color="var(--green)" />
                <h3 style={{ color: 'var(--green)', margin: 0 }}>Real-time Processing</h3>
              </div>
              <p style={{ color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                Sub-10ms inference time enables real-time satellite communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
