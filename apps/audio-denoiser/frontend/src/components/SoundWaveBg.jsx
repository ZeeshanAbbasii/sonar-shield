import React from 'react';
import { motion } from 'framer-motion';

const SoundWaveBg = () => {
  const bars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {bars.map((i) => {
        const x = (i / 20) * 100;
        const delay = i * 0.1;
        
        return (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-t-full"
            style={{
              left: `${x}%`,
              width: '2px',
              background: 'rgba(0, 255, 209, 0.15)',
            }}
            animate={{
              height: ['10%', '25%', '10%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

export default SoundWaveBg;
