import React from 'react'
import StarfieldCanvas from '../components/StarfieldCanvas'

const About = () => {
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
        
        {/* Hero Card */}
        <div style={{ textAlign: 'center', marginBottom: '80px', padding: '60px 40px' }}>
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '16px' }}>
            Bahria University
          </h1>
          <p style={{ color: 'var(--cyan)', fontSize: '1.5rem', marginBottom: '8px' }}>
            Islamabad, Pakistan
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>
            Department of Computer Science
          </p>
        </div>

        {/* Team Section */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Research Team
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '3rem',
                fontWeight: '700',
                color: '#000'
              }}>
                ZA
              </div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>
                Zeeshan Ahmad Abbasi
              </h3>
              <p style={{ color: 'var(--cyan)', marginBottom: '8px' }}>
                Lead Developer & Researcher
              </p>
              <p style={{ color: 'var(--muted)' }}>
                Bahria University
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '3rem',
                fontWeight: '700',
                color: 'white'
              }}>
                MA
              </div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>
                Mohammad Arqam Malik
              </h3>
              <p style={{ color: 'var(--cyan)', marginBottom: '8px' }}>
                Co-Researcher
              </p>
              <p style={{ color: 'var(--muted)' }}>
                Bahria University
              </p>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', padding: '48px' }}>
            <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '24px' }}>
              Problem Statement
            </h2>
            <p style={{ color: 'var(--text)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
              Satellite communication is often plagued by data corruption due to environmental noise, 
              interference, and signal degradation over long distances. Traditional FEC techniques 
              lack adaptability to varying error patterns. This project develops an AI-powered system 
              that dynamically adapts to different noise conditions.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Research Objectives
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '12px' }}>
                Objective 1: Predict & Correct Errors
              </h3>
              <p style={{ color: 'var(--text)', marginBottom: '16px', lineHeight: '1.6' }}>
                AI decoder takes corrupted satellite bits and recovers the original data
              </p>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'transparent',
                border: '2px solid var(--cyan)',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--cyan)'
              }}>
                Result: 0 errors at SNR ≥ 4dB
              </div>
            </div>

            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '12px' }}>
                Objective 2: Simulate Real Noise
              </h3>
              <p style={{ color: 'var(--text)', marginBottom: '16px', lineHeight: '1.6' }}>
                AWGN + burst noise tested at SNR 0-6dB
              </p>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'transparent',
                border: '2px solid var(--cyan)',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--cyan)'
              }}>
                Result: 3 channel conditions validated
              </div>
            </div>

            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '12px' }}>
                Objective 3: Improve vs Traditional FEC
              </h3>
              <p style={{ color: 'var(--text)', marginBottom: '16px', lineHeight: '1.6' }}>
                Compared against Hamming, Reed-Solomon, and Viterbi decoders
              </p>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'transparent',
                border: '2px solid var(--cyan)',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--cyan)'
              }}>
                Result: 14x improvement over Hamming
              </div>
            </div>
          </div>
        </div>

        {/* Novelty */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Research Novelty
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '12px' }}>
                Knowledge Distillation
              </h3>
              <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>
                Bi-GRU trained from Viterbi oracle outputs — novel approach for convolutional code decoding
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '12px' }}>
                SNR-Aware Architecture
              </h3>
              <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>
                Model receives channel SNR as input feature, adapting its confidence accordingly
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--cyan)', marginBottom: '12px' }}>
                Burst Noise Robustness
              </h3>
              <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>
                7.7x more robust than Viterbi under heavy burst interference
              </p>
            </div>
          </div>
        </div>

        {/* Key Results */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Key Results Summary
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--cyan)', fontWeight: '700', marginBottom: '8px' }}>
                14x
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Improvement over Hamming
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--cyan)', fontWeight: '700', marginBottom: '8px' }}>
                ∞x
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Improvement at 5-6dB SNR
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--cyan)', fontWeight: '700', marginBottom: '8px' }}>
                1.11x
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Bi-GRU burst degradation
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--cyan)', fontWeight: '700', marginBottom: '8px' }}>
                8.54x
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Viterbi burst degradation
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--cyan)', fontWeight: '700', marginBottom: '8px' }}>
                105x
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Speed advantage over Viterbi
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--cyan)', fontWeight: '700', marginBottom: '8px' }}>
                1M
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Training frames used
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Technology Stack
          </h2>
          
          <div style={{
            padding: '32px'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              {['Python', 'PyTorch', 'FastAPI', 'React', 'NumPy', 'Recharts', 'ONNX', 'Matplotlib'].map((tool) => (
                <div
                  key={tool}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '2px solid var(--cyan)',
                    borderRadius: '25px',
                    color: 'var(--cyan)',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Project Timeline
          </h2>
          
          <div style={{
            padding: '32px'
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {[
                'Week 1-2: Data preprocessing and augmentation',
                'Week 3-4: Model development — LSTM architecture',
                'Week 5-6: 1M frame training with curriculum learning',
                'Week 7: Real-world burst noise scenario testing',
                'Week 8: Fine-tuning on low-SNR data',
                'Week 9-10: Documentation and publication preparation'
              ].map((week, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '120px',
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '2px solid var(--cyan)',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginRight: '24px',
                    flexShrink: 0,
                    color: 'var(--cyan)'
                  }}>
                    {week.split(':')[0]}
                  </div>
                  <div style={{ color: 'var(--text)', fontSize: '16px' }}>
                    {week.split(':')[1]}
                  </div>
                </div>
            ))}
            </div>
          </div>
        </div>

        {/* Publication Targets */}
        <div>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>
            Publication Targets
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3 style={{ color: 'var(--cyan)', fontSize: '1.5rem', marginBottom: '16px' }}>
                IEEE Access
              </h3>
              <p style={{ color: 'var(--muted)' }}>
                Peer-reviewed open access journal covering all areas of electrical engineering
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3 style={{ color: 'var(--cyan)', fontSize: '1.5rem', marginBottom: '16px' }}>
                IEEE Transactions on Communications
              </h3>
              <p style={{ color: 'var(--muted)' }}>
                Premier journal for communication theory and systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About
