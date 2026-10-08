import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Download } from 'lucide-react';

const WaveformPlayer = ({ audioUrl, label, color }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (audioUrl) {
      loadAndDrawWaveform();
    }
  }, [audioUrl]);

  const loadAndDrawWaveform = async () => {
    try {
      if (!audioUrl) {
        console.error('No audioUrl provided');
        return;
      }

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const response = await fetch(audioUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      const data = audioBuffer.getChannelData(0);
      const step = Math.ceil(data.length / width);
      const amp = height / 2;
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color === 'red' ? '#FF4D6D' : '#00FFD1';
      
      for (let i = 0; i < width; i++) {
        let min = 1.0;
        let max = -1.0;
        
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        
        ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
      }
      
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading waveform:', error);
      console.error('Audio URL:', audioUrl);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = label.toLowerCase().replace(/\s+/g, '_') + '.wav';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${color === 'red' ? 'text-red' : 'text-cyan'}`}>
          {label}
        </h3>
        <button
          onClick={handleDownload}
          className="p-2 hover:bg-surface rounded-lg transition-colors"
          title="Download"
        >
          <Download className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
      </div>
      
      <div className="relative mb-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={100}
          className="w-full h-24 bg-background rounded-lg"
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="w-6 h-6 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      
      <audio ref={audioRef} src={audioUrl} onEnded={handleEnded} className="hidden" />
      
      <div className="flex items-center justify-center">
        <button
          onClick={togglePlay}
          disabled={!isLoaded}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            isLoaded
              ? color === 'red'
                ? 'bg-red hover:bg-red/80'
                : 'bg-cyan hover:bg-cyan/80'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default WaveformPlayer;
