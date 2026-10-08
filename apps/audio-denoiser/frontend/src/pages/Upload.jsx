import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AudioDropzone from '../components/AudioDropzone';
import WaveformPlayer from '../components/WaveformPlayer';
import MetricsRow from '../components/MetricsRow';
import SoundWaveBg from '../components/SoundWaveBg';
import { denoiseAudio } from '../api/client';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleDenoise = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await denoiseAudio(file);
      setResult(response);
    } catch (err) {
      if (err.response?.status === 415) {
        setError('Unsupported file format. Please use WAV, MP3, M4A, FLAC, OGG, AIFF, or AAC.');
      } else if (err.response?.status === 413) {
        setError('File too large. Maximum size is 50 MB.');
      } else if (err.response?.status === 500) {
        setError('Server error during processing. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 relative">
      <SoundWaveBg />
      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Upload & Denoise</h1>
          <p className="text-gray-400">Upload your audio file and let SONAR Shield remove the noise</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <AudioDropzone onFileSelect={handleFileSelect} />
          </motion.div>

          {file && !result && !processing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={handleDenoise}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 0 rgba(0, 255, 209, 0)', '0 0 20px rgba(0, 255, 209, 0.3)', '0 0 0 rgba(0, 255, 209, 0)'] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                className="px-8 py-4 bg-cyan text-background font-semibold rounded-full hover:bg-cyan/90 transition-all"
              >
                Denoise Audio
              </motion.button>
            </motion.div>
          )}

          {processing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <div className="inline-block relative">
                <motion.div
                  className="w-16 h-16 border-4 border-cyan/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16 border-4 border-cyan border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <motion.p
                className="mt-4 text-cyan font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                SONAR Shield is analyzing...
              </motion.p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-6 p-4 bg-red/10 border border-red/30 rounded-xl text-red"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-8 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <WaveformPlayer
                  audioUrl={result.original_audio_url}
                  label="Original"
                  color="red"
                />
                <WaveformPlayer
                  audioUrl={result.enhanced_audio_url}
                  label="Denoised"
                  color="cyan"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
              >
                <MetricsRow result={result} />
              </motion.div>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
