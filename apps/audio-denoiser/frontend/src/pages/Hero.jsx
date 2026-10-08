import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SoundWaveBg from '../components/SoundWaveBg';

const Hero = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SoundWaveBg />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            SONAR Shield
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            AI-Powered Noise-Type-Aware Adaptive Denoising
          </p>
          
          <Link
            to="/upload"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-cyan text-background font-semibold rounded-lg hover:bg-cyan/90 transition-colors"
          >
            <span>Try It Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
