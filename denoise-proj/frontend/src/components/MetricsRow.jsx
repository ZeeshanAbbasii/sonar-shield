import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Clock, Zap } from 'lucide-react';

const MetricsRow = ({ result }) => {
  if (!result) return null;

  const metrics = [
    {
      label: 'Noise Reduction',
      value: `${result.noise_reduction_db} dB`,
      icon: Volume2,
      color: 'text-cyan',
      bgColor: 'bg-cyan/10',
    },
    {
      label: 'Processing Time',
      value: `${result.processing_time_sec}s`,
      icon: Clock,
      color: 'text-purple',
      bgColor: 'bg-purple/10',
    },
    {
      label: 'RMS Reduction',
      value: `${((1 - result.rms_enhanced / result.rms_original) * 100).toFixed(1)}%`,
      icon: Zap,
      color: 'text-red',
      bgColor: 'bg-red/10',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-surface border border-border rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className={`text-lg font-semibold ${metric.color}`}>{metric.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MetricsRow;
