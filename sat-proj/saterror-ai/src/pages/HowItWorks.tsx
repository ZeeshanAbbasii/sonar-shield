import React, { useState } from 'react'
import StarfieldCanvas from '../components/StarfieldCanvas'
import { FileText, Settings, Radio, Waves, BarChart2, Cpu, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const pipelineSteps = [
    { id: 'text', icon: <FileText size={20} />, title: 'Text Input', description: 'ASCII text converted to binary (8 bits per character)\n\'H\' = 01001000, \'i\' = 01101001' },
    { id: 'encoder', icon: <Settings size={20} />, title: 'Convolutional Encoder', description: 'Rate 1/2 encoder adds redundancy.\n100 info bits → 212 coded bits.\nGenerators 0o171 and 0o133 (NASA/CCSDS standard).\nConstraint length Kc=7, memory M=6.' },
    { id: 'modulator', icon: <Radio size={20} />, title: 'BPSK Modulator', description: 'Binary Phase Shift Keying.\nBit 0 → +1.0 voltage\nBit 1 → -1.0 voltage' },
    { id: 'channel', icon: <Waves size={20} />, title: 'Satellite Channel', description: 'Two noise types simulated:\nAWGN: Gaussian noise σ²=1/(2·R·SNR)\nBurst: Solar flare simulation — corrupts\nconsecutive chunk with 3x amplitude noise' },
    { id: 'llr', icon: <BarChart2 size={20} />, title: 'LLR Computation', description: 'Log-Likelihood Ratio = 2r/σ²\nLarge positive = confident bit 0\nLarge negative = confident bit 1\nClipped to [-50, 50] for stability' },
    { id: 'lstm', icon: <Cpu size={20} />, title: 'Bi-GRU Decoder', description: 'Bidirectional GRU reads sequence\nforward AND backward simultaneously.\n3 layers, 384 hidden units each direction.\nSNR value fed as extra input feature.\n6,216,196 trainable parameters.\nTrained on 1,000,000 frames.' },
    { id: 'output', icon: <CheckCircle size={20} />, title: 'Corrected Output', description: 'Bits converted back to ASCII text.\nlogit > 0 → bit 0\nlogit ≤ 0 → bit 1' }
  ]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <StarfieldCanvas />
      
      <div style={{ 
        paddingTop: '64px', 
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Section 1: System Pipeline */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>
            System Pipeline
          </h2>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '48px' }}>
            Animated pipeline diagram - boxes glow in sequence
          </p>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '16px',
            alignItems: 'center'
          }}>
            {pipelineSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => setSelectedStep(step.id === selectedStep ? null : step.id)}
                  style={{
                    background: 'transparent',
                    border: selectedStep === step.id ? '2px solid var(--cyan)' : '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'center',
                    minWidth: '140px',
                    animation: `pulse ${2 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index}s`
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{step.icon}</div>
                  <div style={{ color: 'var(--text)', fontSize: '14px', fontWeight: '600' }}>
                    {step.title}
                  </div>
                </div>
                {index < pipelineSteps.length - 1 && (
                  <div style={{ color: 'var(--cyan)', fontSize: '1.5rem' }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>

          {selectedStep && (
            <div style={{ marginTop: '32px', animation: 'fadeInUp 0.3s ease-out' }}>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '16px' }}>
                {pipelineSteps.find(s => s.id === selectedStep)?.title}
              </h3>
              <div style={{ whiteSpace: 'pre-line', color: 'var(--text)', lineHeight: '1.6' }}>
                {pipelineSteps.find(s => s.id === selectedStep)?.description}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Function Call Trace */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>
            Function Call Trace
          </h2>
          
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(0,255,136,0.05))',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.8',
            overflowX: 'auto',
            boxShadow: '0 0 30px rgba(0,212,255,0.1)'
          }}>
            <div style={{ 
              background: 'rgba(0,0,0,0.3)', 
              borderRadius: '12px', 
              padding: '24px',
              border: '1px solid rgba(0,212,255,0.2)',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#e0e0ff',
              textShadow: '0 0 10px rgba(0,212,255,0.3)'
            }}>
              <div>
                <span style={{ color: 'var(--green)', fontWeight: '700' }}>correct_string</span>
                (<span style={{ color: 'var(--cyan)' }}>"hello zeeshan"</span>, snr=<span style={{ color: 'var(--cyan)' }}>3.0</span>)
              </div>
              <div><span style={{ color: 'var(--muted)' }}>│</span></div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>
                <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>text_to_bits()</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: '#888' }}>'h'→01101000, 'e'→01100101...</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--green)' }}>Output: 104 bits</span>
              </div>
              <div><span style={{ color: 'var(--muted)' }}>│</span></div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>
                <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>conv_encode()</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: '#888' }}>Rate 1/2, Kc=7, generators 171/133</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--green)' }}>Output: 212 coded bits per frame</span>
              </div>
              <div><span style={{ color: 'var(--muted)' }}>│</span></div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>
                <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>bpsk_modulate()</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: '#888' }}>bit 0 → +1.0, bit 1 → -1.0</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--green)' }}>Output: 212 symbols</span>
              </div>
              <div><span style={{ color: 'var(--muted)' }}>│</span></div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>
                <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>awgn_channel()</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: '#888' }}>σ² = 1/(2 × 0.5 × 10^(3/10))</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--green)' }}>Output: 212 noisy symbols</span>
              </div>
              <div><span style={{ color: 'var(--muted)' }}>│</span></div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>
                <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>compute_llr()</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: '#888' }}>LLR = clip(2r/σ², -50, 50)</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--green)' }}>Output: 212 LLR values</span>
              </div>
              <div><span style={{ color: 'var(--muted)' }}>│</span></div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>
                <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: 'var(--cyan)', fontWeight: '700' }}>GRUDecoder.forward()</span> <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>← real model</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: '#888' }}>reshape: (214,) → (107, 2)</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: '#888' }}>append SNR: (107, 2) → (107, 3)</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: '#888' }}>BiGRU layer 1: 384 hidden × 2</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: '#888' }}>BiGRU layer 2: 384 hidden × 2</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: '#888' }}>BiGRU layer 3: 384 hidden × 2</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: '#888' }}>LayerNorm(768)</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: '#888' }}>Linear(768 → 1) × 100</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--muted)' }}>└──</span> <span style={{ color: '#888' }}>+ residual from raw LLR</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--green)' }}>Output: 100 logits</span>
              </div>
              <div><span style={{ color: 'var(--muted)' }}>│</span></div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>
                <span style={{ color: 'var(--muted)' }}>├──</span> <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>(logit &gt; 0) → bit 0, else bit 1</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>│</span>     <span style={{ color: 'var(--green)' }}>Output: 100 corrected bits</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>└──</span> <span style={{ color: 'var(--cyan)', fontWeight: '600' }}>bits_to_text()</span>
              </div>
              <div>      <span style={{ color: '#888' }}>01101000→'h', 01100101→'e'...</span></div>
              <div>      <span style={{ color: 'var(--green)', fontWeight: '700' }}>Output: "hello zeeshan"</span> <span style={{ color: 'var(--green)', fontWeight: '700' }}>✅</span></div>
            </div>
          </div>
        </div>

        {/* Section 3: Model Architecture */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>
            Model Architecture
          </h2>
          
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Type</td>
                  <td style={{ padding: '12px' }}>Bidirectional GRU</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Layers</td>
                  <td style={{ padding: '12px' }}>3</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Hidden size</td>
                  <td style={{ padding: '12px' }}>384 per direction (768 total)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Total parameters</td>
                  <td style={{ padding: '12px' }}>6,216,196</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Input</td>
                  <td style={{ padding: '12px' }}>214 LLR values + SNR</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Output</td>
                  <td style={{ padding: '12px' }}>100 bit logits</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Training frames</td>
                  <td style={{ padding: '12px' }}>1,000,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>SNR range</td>
                  <td style={{ padding: '12px' }}>0.0 to 6.0 dB</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Training strategy</td>
                  <td style={{ padding: '12px' }}>Knowledge distillation from Viterbi</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--cyan)' }}>Optimizer</td>
                  <td style={{ padding: '12px' }}>Adam lr=3e-4, Batch size: 256</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Knowledge Distillation */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>
            Knowledge Distillation
          </h2>
          
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              border: '2px solid var(--border)',
              borderRadius: '12px',
              padding: '32px'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: 'var(--cyan)', fontWeight: '600', marginBottom: '8px' }}>
                  TEACHER: Viterbi Decoder
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  (Mathematically optimal)
                </div>
              </div>
              
              <div style={{ fontSize: '2rem', color: 'var(--cyan)', margin: '16px 0' }}>↓</div>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>
                  produces 1,000,000 examples of (corrupted LLR → correct bits)
                </div>
              </div>
              
              <div style={{ fontSize: '2rem', color: 'var(--cyan)', margin: '16px 0' }}>↓</div>
              
              <div>
                <div style={{ color: 'var(--cyan)', fontWeight: '600', marginBottom: '8px' }}>
                  STUDENT: Bi-GRU Network
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  (Learns to replicate teacher)
                </div>
              </div>
              
              <div style={{ fontSize: '2rem', color: 'var(--cyan)', margin: '16px 0' }}>↓</div>
              
              <div>
                <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  trained via BCEWithLogitsLoss on Viterbi outputs not raw bits
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '32px' }}>
            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '16px' }}>
                Why not train on raw bits directly?
              </h3>
              <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>
                Training on raw random bits gives noisy gradients — BER gets stuck at 0.49.
                Viterbi provides clean, reliable targets that the Bi-GRU can learn from effectively.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '16px' }}>
                Why bidirectional GRU?
              </h3>
              <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>
                Regular GRU only sees past context. Error at bit 50 depends on bits 45-55.
                Bidirectional GRU reads both directions, using full sequence context for each bit.
                GRU achieves this with fewer parameters than LSTM — 3 gates instead of 4 — making it faster while maintaining accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Why Our Model Beats Traditional FEC */}
        <div>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>
            Why Our Model Beats Traditional FEC
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Feature</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Hamming</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Reed-Solomon</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Viterbi</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)', fontWeight: '700' }}>Bi-GRU</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>Corrects</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>1 error</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>3 errors</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>Many</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)' }}>Learned</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>Complexity</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>O(n)</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>O(n²)</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>O(2^K)</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)' }}>O(n)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>GPU parallel</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>Yes</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>Yes</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>No</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)' }}>Yes</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>Burst robustness</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>Poor</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>Poor</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>Poor</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)' }}>Medium</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>Adaptable</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>No</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>No</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>No</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)' }}>Yes</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>BER at 2dB</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>0.123</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>0.085</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>0.004</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)' }}>0.015</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontWeight: '600' }}>Speed (batch=1)</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>0.6ms</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>0.004ms</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>194ms</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--cyan)' }}>12ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HowItWorks
