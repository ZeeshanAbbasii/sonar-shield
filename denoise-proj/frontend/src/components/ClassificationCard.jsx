import React from 'react';
import { motion } from 'framer-motion';

const ClassificationCard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Classification Result</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Predicted Class</span>
          <div className="flex items-center gap-2">
            <span className="text-cyan font-semibold">{result.predicted_class}</span>
            {result.domain && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                result.domain === 'urban' 
                  ? 'bg-cyan/20 text-cyan' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {result.domain === 'urban' ? 'Urban' : 'Water'}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Confidence</span>
          <span className="text-cyan font-semibold">{result.confidence}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassificationCard;
