import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SoundWaveBg from '../components/SoundWaveBg';
import { Cpu, Layers, Database, ArrowRight, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SoundWaveBg />
      <div className="relative z-10 w-full py-12 px-5">
        <Navbar />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 mt-24"
        >
          <h1 className="text-5xl font-bold text-white mb-4">About SONAR Shield</h1>
          <p className="text-cyan opacity-70">Learn about our AI-powered noise detection and removal system</p>
        </motion.div>

        {/* Section 1 - How it works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mb-16 w-full pl-5 pr-5"
        >
          <h2 className="text-xl font-semibold text-white mb-6">How it works</h2>
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-4xl">
            SONAR Shield receives any audio file and runs two classifiers simultaneously — one trained on urban environmental sounds, 
            one trained on water sounds. Whichever classifier returns higher confidence determines both the noise category and which 
            specialized denoising model is applied. The system covers 13 distinct noise classes across two acoustic domains.
          </p>
        </motion.div>

        {/* Section 2 - Pipeline diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mb-16 w-full pl-5 pr-5"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Pipeline Architecture</h2>
          
          <div className="overflow-x-auto">
            <div className="flex flex-col items-center gap-4 min-w-max">
              {/* Audio Input */}
              <div className="px-6 py-3 border border-cyan/30 rounded-lg text-white font-medium text-center min-w-64">
                Audio Input (WAV, MP3, M4A, FLAC, OGG, AIFF, AAC)
              </div>
              
              <ArrowRight className="w-5 h-5 text-cyan rotate-90" />
              
              {/* Log-mel spectrogram */}
              <div className="px-6 py-3 border border-cyan/30 rounded-lg text-white font-medium text-center min-w-64">
                Log-mel spectrogram extraction
              </div>
              
              <ArrowRight className="w-5 h-5 text-cyan rotate-90" />
              
              {/* Two classifiers */}
              <div className="flex gap-4">
                <div className="px-6 py-3 border border-cyan/30 rounded-lg text-white font-medium text-center min-w-48">
                  Urban Classifier — 10 classes
                </div>
                <div className="px-6 py-3 border border-cyan/30 rounded-lg text-white font-medium text-center min-w-48">
                  Water Classifier — 3 classes
                </div>
              </div>
              
              <ArrowRight className="w-5 h-5 text-cyan rotate-90" />
              
              {/* Highest confidence */}
              <div className="px-6 py-3 border border-cyan/30 rounded-lg text-white font-medium text-center min-w-64">
                Highest confidence wins
              </div>
              
              <ArrowRight className="w-5 h-5 text-cyan rotate-90" />
              
              {/* Noise type identified */}
              <div className="px-6 py-3 border border-cyan/30 rounded-lg text-white font-medium text-center min-w-64">
                Noise type identified + denoiser selected
              </div>
              
              <ArrowRight className="w-5 h-5 text-cyan rotate-90" />
              
              {/* Four denoisers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="px-4 py-2 border border-cyan/30 rounded-lg text-white font-medium text-center text-sm">
                  U-Net Traffic
                </div>
                <div className="px-4 py-2 border border-cyan/30 rounded-lg text-white font-medium text-center text-sm">
                  Autoencoder Machinery
                </div>
                <div className="px-4 py-2 border border-cyan/30 rounded-lg text-white font-medium text-center text-sm">
                  WaveNet Crowd
                </div>
                <div className="px-4 py-2 border border-cyan/30 rounded-lg text-white font-medium text-center text-sm">
                  U-Net Water
                </div>
              </div>
              
              <ArrowRight className="w-5 h-5 text-cyan rotate-90" />
              
              {/* Enhanced output */}
              <div className="px-6 py-3 border border-cyan/30 rounded-lg text-white font-medium text-center min-w-64">
                Enhanced audio output
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3 - Two domain cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mb-16 w-full pl-5 pr-5"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Domain Classifiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Urban Noise Card */}
            <div className="rounded-xl p-6">
              <h3 className="text-lg font-semibold text-cyan mb-4">Urban Noise</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Dataset:</span>
                  <span className="text-white ml-2">UrbanSound8K — 8,732 labeled clips, 10 classes, ≤4 seconds each</span>
                </div>
                <div>
                  <span className="text-gray-400">Classifier:</span>
                  <span className="text-white ml-2">ResNet-18 pretrained — Test accuracy 83.0%</span>
                </div>
                <div className="pt-2">
                  <p className="text-gray-400 mb-2">10 classes with their denoiser assignments:</p>
                  <div className="space-y-1 text-xs">
                    <div><span className="text-cyan">car horn, siren, engine idling</span> → U-Net Traffic</div>
                    <div><span className="text-cyan">air conditioner, drilling, jackhammer, gun shot</span> → Autoencoder Machinery</div>
                    <div><span className="text-cyan">children playing, street music, dog bark</span> → WaveNet Crowd</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Water Sounds Card */}
            <div className="rounded-xl p-6">
              <h3 className="text-lg font-semibold text-cyan mb-4">Water Sounds</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Dataset:</span>
                  <span className="text-white ml-2">ESC-50 (water subset, augmented) — 800 samples, 3 classes</span>
                </div>
                <div>
                  <span className="text-gray-400">Classifier:</span>
                  <span className="text-white ml-2">ResNet-18 pretrained — Test accuracy 100%</span>
                </div>
                <div className="pt-2">
                  <p className="text-gray-400 mb-2">3 classes:</p>
                  <div className="space-y-1 text-xs">
                    <div><span className="text-cyan">rain, sea waves, thunderstorm</span> → all route to U-Net Water denoiser</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4 - Four denoiser cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mb-16 w-full pl-5 pr-5"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Denoiser Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'Traffic',
                architecture: 'U-Net with skip connections',
                handles: 'Car horn, siren, engine idling',
                pesq: '+0.983',
                snr: '+13.11 dB',
                best: true
              },
              {
                name: 'Machinery',
                architecture: 'Convolutional Autoencoder',
                handles: 'Air conditioner, drilling, jackhammer, gun shot',
                pesq: '+0.605',
                snr: '+7.33 dB',
                best: false
              },
              {
                name: 'Crowd',
                architecture: 'WaveNet-style dilated CNN',
                handles: 'Children playing, street music, dog bark',
                pesq: '+0.774',
                snr: '+12.62 dB',
                best: false
              },
              {
                name: 'Water',
                architecture: 'U-Net with skip connections',
                handles: 'Rain, sea waves, thunderstorm',
                pesq: '+0.969',
                snr: '+12.52 dB',
                best: false
              }
            ].map((denoiser) => (
              <div
                key={denoiser.name}
                className="rounded-xl p-4 hover:shadow-lg hover:shadow-cyan/8 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-white mb-2">{denoiser.name}</h4>
                <p className="text-gray-400 text-xs mb-3">{denoiser.architecture}</p>
                <p className="text-gray-400 text-xs mb-3">Handles: {denoiser.handles}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 text-xs">PESQ Gain</span>
                    <p className={`font-semibold ${denoiser.best ? 'text-cyan' : 'text-white'}`}>{denoiser.pesq}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">SNR Gain</span>
                    <p className={`font-semibold ${denoiser.best ? 'text-cyan' : 'text-white'}`}>{denoiser.snr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 5 - Dataset info cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mb-16 w-full pl-5 pr-5"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Datasets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'UrbanSound8K',
                description: '8,732 audio clips, 10 urban noise classes, ≤4s clips, CC BY-NC 3.0 license, New York University 2014, used for urban noise classifier training'
              },
              {
                title: 'ESC-50 (water subset)',
                description: '2,000 total clips, 800 water-class clips used (augmented to 800), 3 water sound classes, 5s clips, CC BY-NC license, ACM Multimedia 2015'
              },
              {
                title: 'VoiceBank-DEMAND',
                description: '11,572 training pairs, 824 test pairs, 16kHz, used to train all 4 denoisers by mixing clean speech with noise at 0–15 dB SNR'
              }
            ].map((dataset) => (
              <div key={dataset.title} className="rounded-xl p-4">
                <h4 className="text-lg font-semibold text-white mb-2">{dataset.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{dataset.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 6 - Publication targets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="mb-16 w-full pl-5 pr-5"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Publication Targets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl p-6">
              <h4 className="text-lg font-semibold text-cyan mb-2">IEEE Transactions on Audio, Speech and Language Processing</h4>
              <p className="text-gray-400 text-sm">IEEE TASLP - Premier journal for audio and speech processing research</p>
            </div>
            <div className="rounded-xl p-6">
              <h4 className="text-lg font-semibold text-cyan mb-2">ICASSP 2025</h4>
              <p className="text-gray-400 text-sm">International Conference on Acoustics, Speech and Signal Processing</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
