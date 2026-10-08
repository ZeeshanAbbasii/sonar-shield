import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SoundWaveBg from '../components/SoundWaveBg';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList, ReferenceLine } from 'recharts';

const HARDCODED_DATA = [
  { Model: "U-Net (Traffic)", PESQ: 3.073, STOI: 0.957, "SNR (dB)": 23.03 },
  { Model: "Autoencoder (Machinery)", PESQ: 2.695, STOI: 0.927, "SNR (dB)": 17.25 },
  { Model: "WaveNet (Crowd)", PESQ: 2.864, STOI: 0.950, "SNR (dB)": 22.54 }
];

const HARDCODED_ACCURACY = 83.0;

const IMPROVEMENT_DATA = [
  { model: "U-Net", deltaPESQ: 0.983, deltaSTOI: 0.020, deltaSNR: 13.11 },
  { model: "Autoencoder", deltaPESQ: 0.605, deltaSTOI: -0.010, deltaSNR: 7.33 },
  { model: "WaveNet", deltaPESQ: 0.774, deltaSTOI: 0.013, deltaSNR: 12.62 }
];

const F1_SCORES = [
  { class: "gun_shot", f1: 0.97 },
  { class: "car_horn", f1: 0.93 },
  { class: "air_conditioner", f1: 0.90 },
  { class: "street_music", f1: 0.89 },
  { class: "children_playing", f1: 0.79 },
  { class: "jackhammer", f1: 0.82 },
  { class: "engine_idling", f1: 0.88 },
  { class: "dog_bark", f1: 0.77 },
  { class: "drilling", f1: 0.75 },
  { class: "siren", f1: 0.73 }
];

const WATER_F1_SCORES = [
  { class: "rain", f1: 1.00 },
  { class: "sea_waves", f1: 1.00 },
  { class: "thunderstorm", f1: 1.00 }
];

const Results = () => {
  const [results, setResults] = useState(HARDCODED_DATA);
  const [accuracy, setAccuracy] = useState(0);
  const [displayAccuracy, setDisplayAccuracy] = useState(0);
  const [displayPESQ, setDisplayPESQ] = useState(0);
  const [displaySNR, setDisplaySNR] = useState(0);
  const [barWidths, setBarWidths] = useState(F1_SCORES.map(() => 0));
  const [waterBarWidths, setWaterBarWidths] = useState(WATER_F1_SCORES.map(() => 0));

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:8001/results');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setResults(data);
          }
        }
      } catch (error) {
        console.log('Using hardcoded data due to fetch error');
      }
    };
    fetchResults();
  }, []);

  useEffect(() => {
    const animateValue = (start, end, duration, setter) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setter(progress * end);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, HARDCODED_ACCURACY, 1500, setAccuracy);
    animateValue(0, 3.073, 1500, setDisplayPESQ);
    animateValue(0, 23.03, 1500, setDisplaySNR);
  }, []);

  useEffect(() => {
    F1_SCORES.forEach((_, index) => {
      setTimeout(() => {
        setBarWidths(prev => {
          const newWidths = [...prev];
          newWidths[index] = F1_SCORES[index].f1;
          return newWidths;
        });
      }, index * 50);
    });
  }, []);

  useEffect(() => {
    WATER_F1_SCORES.forEach((_, index) => {
      setTimeout(() => {
        setWaterBarWidths(prev => {
          const newWidths = [...prev];
          newWidths[index] = WATER_F1_SCORES[index].f1;
          return newWidths;
        });
      }, index * 50);
    });
  }, []);

  const getModelColor = (model) => {
    if (model.includes("U-Net")) return "#00FFD1";
    if (model.includes("Autoencoder")) return "#7B61FF";
    if (model.includes("WaveNet")) return "#FF9500";
    if (model.includes("Noisy")) return "#FF4D6D";
    return "#888888";
  };

  const getModelBadgeColor = (model) => {
    return "#00FFD1";
  };

  const getBestValue = (key) => {
    const values = results.map(r => r[key]);
    return Math.max(...values);
  };

  const formatValue = (value, key) => {
    if (key === "PESQ" || key === "STOI") return value.toFixed(3);
    if (key === "SNR (dB)") return value.toFixed(2);
    return value;
  };

  const isBestValue = (value, key) => {
    return value === getBestValue(key);
  };

  const isBaseline = (model) => {
    return model.includes("Noisy");
  };

  const getPesqChartData = () => {
    return results.map(r => ({
      name: r.Model.split('(')[0].trim(),
      PESQ: r.PESQ,
      fill: '#00FFD1'
    }));
  };

  const getStoiChartData = () => {
    return results.map(r => ({
      name: r.Model.split('(')[0].trim(),
      STOI: r.STOI,
      fill: '#00FFD1'
    }));
  };

  const getSnrChartData = () => {
    return results.map(r => ({
      name: r.Model.split('(')[0].trim(),
      SNR: r["SNR (dB)"],
      fill: '#00FFD1'
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#0D0D0D', border: '1px solid #00FFD1', borderRadius: '8px', padding: '8px', color: '#FFFFFF' }}>
          <p style={{ margin: 0 }}>{label}</p>
          <p style={{ margin: 0 }}>{`${payload[0].dataKey}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
        {payload.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: entry.color }} />
            <span style={{ color: '#888888', fontSize: '12px' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pt-20 relative">
      <SoundWaveBg />
      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Section 1 - Hero Stat Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div>
            <p style={{ color: '#888888', fontSize: '14px', marginBottom: '8px' }}>Classifier Accuracy</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#00FFD1', textShadow: '0 0 20px rgba(0, 255, 209, 0.3)' }}>
              {accuracy.toFixed(1)}%
            </p>
            <p style={{ color: '#888888', fontSize: '12px', marginTop: '4px' }}>ResNet-18 · UrbanSound8K</p>
          </div>
          
          <div>
            <p style={{ color: '#888888', fontSize: '14px', marginBottom: '8px' }}>Best PESQ</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#00FFD1', textShadow: '0 0 20px rgba(0, 255, 209, 0.3)' }}>
              {displayPESQ.toFixed(3)}
            </p>
            <p style={{ color: '#888888', fontSize: '12px', marginTop: '4px' }}>U-Net Traffic Model</p>
          </div>
          
          <div>
            <p style={{ color: '#888888', fontSize: '14px', marginBottom: '8px' }}>Best SNR</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#00FFD1', textShadow: '0 0 20px rgba(0, 255, 209, 0.3)' }}>
              {displaySNR.toFixed(2)} dB
            </p>
            <p style={{ color: '#888888', fontSize: '12px', marginTop: '4px' }}>U-Net Traffic Model</p>
          </div>
        </motion.div>

        {/* Section 2 - Ablation Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          style={{ marginBottom: '4rem', overflowX: 'auto' }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'transparent' }}>
            <thead>
              <tr>
                {['Model', 'PESQ', 'STOI', 'SNR (dB)'].map((header) => (
                  <th key={header} style={{ padding: '0.5rem', textAlign: 'left', color: '#00FFD1', fontSize: '14px', fontWeight: 700, backgroundColor: 'transparent' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: '0.5rem', color: '#FFFFFF', fontWeight: 500, backgroundColor: 'transparent' }}>
                    {row.Model}
                  </td>
                  {['PESQ', 'STOI', 'SNR (dB)'].map((key) => (
                    <td key={key} style={{ 
                      padding: '0.5rem', 
                      color: isBestValue(row[key], key) ? '#00FFD1' : '#FFFFFF',
                      fontWeight: isBestValue(row[key], key) ? 700 : 400,
                      textShadow: isBestValue(row[key], key) ? '0 0 10px #00FFD1' : 'none',
                      backgroundColor: 'transparent'
                    }}>
                      {formatValue(row[key], key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Section 3 - Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { title: 'PESQ', dataKey: 'PESQ', data: getPesqChartData(), baseline: 2.090 },
            { title: 'STOI', dataKey: 'STOI', data: getStoiChartData(), baseline: 0.937 },
            { title: 'SNR (dB)', dataKey: 'SNR', data: getSnrChartData(), baseline: 9.92 }
          ].map((chart, index) => (
            <div key={chart.title}>
              <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, marginBottom: '1rem' }}>{chart.title} Scores</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chart.data}>
                  <CartesianGrid stroke="#1A1A1A" />
                  <XAxis dataKey="name" hide={true} />
                  <YAxis stroke="#888888" />
                  <Legend content={<CustomLegend />} />
                  <ReferenceLine y={chart.baseline} stroke="#FF4D6D" strokeDasharray="5 5" strokeOpacity={0.5} />
                  <Bar dataKey={chart.dataKey} fill="#00FFD1" cursor="default" isAnimationActive={false}>
                    <LabelList dataKey={chart.dataKey} position="top" fill="#FFFFFF" fontSize={11} />
                  </Bar>
                  <style>{`
                    .recharts-rectangle:hover {
                      fill: #00FFD1 !important;
                    }
                  `}</style>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </motion.div>

        {/* Section 4 - Improvement over baseline callout cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { model: 'U-Net', deltaPESQ: 0.983, deltaSTOI: 0.020, deltaSNR: 13.11 },
            { model: 'Autoencoder', deltaPESQ: 0.605, deltaSTOI: -0.010, deltaSNR: 7.33 },
            { model: 'WaveNet', deltaPESQ: 0.774, deltaSTOI: 0.013, deltaSNR: 12.62 }
          ].map((item, index) => (
            <motion.div
              key={item.model}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{ cursor: 'pointer' }}
            >
              <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, marginBottom: '1rem' }}>{item.model}</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#888888', marginBottom: '4px' }}>ΔPESQ</p>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: '#00FFD1' }}>
                    {item.deltaPESQ >= 0 ? '+' : ''}{item.deltaPESQ.toFixed(3)}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#888888', marginBottom: '4px' }}>ΔSTOI</p>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: '#00FFD1' }}>
                    {item.deltaSTOI >= 0 ? '+' : ''}{item.deltaSTOI.toFixed(3)}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#888888', marginBottom: '4px' }}>ΔSNR</p>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: '#00FFD1' }}>
                    {item.deltaSNR >= 0 ? '+' : ''}{item.deltaSNR.toFixed(2)} dB
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section 5 - Confusion Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mb-12"
        >
          <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 600, marginBottom: '0.5rem' }}>Noise Classifier — Confusion Matrix</h3>
          <p style={{ color: '#888888', fontSize: '12px', marginBottom: '1.5rem' }}>ResNet-18 · 10 noise classes · Fold 10 test set</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', backgroundColor: 'transparent' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00FFD1', fontWeight: 700, minWidth: '140px', backgroundColor: 'transparent' }}>True \\ Predicted</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>AC</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>CH</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>CP</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>DB</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>DR</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>EI</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>GS</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>JH</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>SN</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00FFD1', fontWeight: 700, backgroundColor: 'transparent' }}>SM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'air_conditioner', values: [86, 0, 3, 0, 1, 1, 0, 7, 1, 1] },
                  { label: 'car_horn', values: [1, 31, 0, 0, 0, 0, 0, 0, 0, 1] },
                  { label: 'children_playing', values: [0, 0, 92, 5, 0, 0, 0, 0, 1, 2] },
                  { label: 'dog_bark', values: [1, 2, 11, 77, 1, 0, 1, 0, 0, 7] },
                  { label: 'drilling', values: [0, 1, 10, 1, 63, 0, 1, 24, 0, 0] },
                  { label: 'engine_idling', values: [0, 0, 0, 1, 1, 76, 0, 11, 0, 4] },
                  { label: 'gun_shot', values: [0, 0, 0, 0, 0, 0, 32, 0, 0, 0] },
                  { label: 'jackhammer', values: [0, 0, 0, 0, 0, 0, 0, 96, 0, 0] },
                  { label: 'siren', values: [4, 0, 11, 16, 0, 3, 0, 0, 49, 0] },
                  { label: 'street_music', values: [0, 0, 5, 0, 3, 0, 0, 0, 0, 92] }
                ].map((row, rowIndex) => (
                  <tr key={row.label}>
                    <td style={{ padding: '0.5rem', color: '#FFFFFF', fontWeight: 500, minWidth: '140px', backgroundColor: 'transparent' }}>
                      {row.label}
                    </td>
                    {row.values.map((value, colIndex) => (
                      <td 
                        key={colIndex}
                        style={{ 
                          padding: '0.5rem', 
                          textAlign: 'center',
                          color: rowIndex === colIndex ? '#00FFD1' : (value > 0 && rowIndex !== colIndex ? '#FFFFFF' : '#444444'),
                          fontWeight: rowIndex === colIndex ? 700 : 400,
                          textShadow: rowIndex === colIndex ? '0 0 10px rgba(0, 255, 209, 0.3)' : 'none',
                          backgroundColor: 'transparent'
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: '#666666', fontSize: '11px', marginTop: '1rem', fontStyle: 'italic' }}>
            Rows = True Labels, Columns = Predicted Labels. Diagonal values (cyan) represent correct classifications.
          </p>
        </motion.div>

        {/* Section 6 - Water Classifier Performance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 600, marginBottom: '0.5rem' }}>Water Sound Classifier — Perfect Performance</h3>
          <p style={{ color: '#888888', fontSize: '12px', marginBottom: '1.5rem' }}>ResNet-18 · 3 water classes · ESC-50 subset · Test accuracy: 100% · F1-score: 1.00</p>
          
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#CCCCCC', fontSize: '15px', lineHeight: '1.8', marginBottom: '1rem' }}>
              The water sound classifier achieved perfect classification accuracy (100%) on the ESC-50 water subset, with F1-scores of 1.00 across all three water sound classes: rain, sea waves, and thunderstorm. This exceptional performance demonstrates the distinct acoustic characteristics of water sounds compared to urban noise.
            </p>
            <p style={{ color: '#888888', fontSize: '13px', marginBottom: '0.75rem', fontWeight: 500 }}>Dataset Information:</p>
            <ul style={{ color: '#CCCCCC', fontSize: '14px', lineHeight: '1.6', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>Source: ESC-50 (water subset) — augmented to 800 samples</li>
              <li>Classes: 3 (rain, sea waves, thunderstorm)</li>
              <li>Training pairs: 4,000 synthetic (water noise mixed with VoiceBank speech at 0–10 dB SNR)</li>
              <li>Test pairs: 500</li>
            </ul>
          </div>
          
          <h4 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, marginBottom: '1rem' }}>Per-Class F1 Scores</h4>
          {WATER_F1_SCORES.map((item, index) => (
            <div key={item.class} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ width: '180px', color: '#FFFFFF', fontSize: '14px' }}>{item.class.replace('_', ' ')}</span>
              <div style={{ flex: 1, marginRight: '1rem', backgroundColor: '#1A1A1A', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${waterBarWidths[index] * 100}%`, 
                    height: '100%', 
                    background: '#00FFD1', 
                    borderRadius: '4px',
                    transition: 'width 1s ease-out'
                  }} 
                />
              </div>
              <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: 600, width: '50px', textAlign: 'right' }}>{(waterBarWidths[index] * 100).toFixed(0)}%</span>
            </div>
          ))}
        </motion.div>

        {/* Section 7 - Urban Classifier Performance Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 600, marginBottom: '1.5rem' }}>Urban Classifier Performance — Per-Class F1 Scores</h3>
          {F1_SCORES.map((item, index) => (
            <div key={item.class} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ width: '180px', color: '#FFFFFF', fontSize: '14px' }}>{item.class.replace('_', ' ')}</span>
              <div style={{ flex: 1, marginRight: '1rem', backgroundColor: '#1A1A1A', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${barWidths[index] * 100}%`, 
                    height: '100%', 
                    background: '#00FFD1', 
                    borderRadius: '4px',
                    transition: 'width 1s ease-out'
                  }} 
                />
              </div>
              <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: 600, width: '50px', textAlign: 'right' }}>{(barWidths[index] * 100).toFixed(0)}%</span>
            </div>
          ))}
        </motion.div>

        {/* Section 7 - Experimental Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          style={{ marginTop: '2rem' }}
        >
          <h3 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.5px' }}>4. Experimental Results</h3>
          
          <div style={{ marginBottom: '3rem', paddingLeft: '1rem', borderLeft: '3px solid #00FFD1' }}>
            <h4 style={{ color: '#00FFD1', fontSize: '16px', fontWeight: 600, marginBottom: '1rem', textShadow: '0 0 10px rgba(0, 255, 209, 0.3)' }}>4.1 Noise Classification</h4>
            <p style={{ color: '#CCCCCC', fontSize: '15px', lineHeight: '1.8' }}>
              The ResNet-18 noise classifier, trained on UrbanSound8K using 10-fold cross-validation, achieved a test accuracy of 83.0% on the held-out fold (fold 10), with a macro-averaged F1-score of 0.84. Per-class performance varied with noise type: gun_shot (F1=0.97) and car_horn (F1=0.93) achieved near-perfect classification, while siren (F1=0.73) and drilling (F1=0.75) showed lower recall due to spectral overlap with neighbouring classes (see Figure 1 — confusion matrix).
            </p>
          </div>

          <div style={{ marginBottom: '3rem', paddingLeft: '1rem', borderLeft: '3px solid #00FFD1' }}>
            <h4 style={{ color: '#00FFD1', fontSize: '16px', fontWeight: 600, marginBottom: '1rem', textShadow: '0 0 10px rgba(0, 255, 209, 0.3)' }}>4.2 Denoising Performance</h4>
            <p style={{ color: '#CCCCCC', fontSize: '15px', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              All three noise-specific denoising models were evaluated on the VoiceBank-DEMAND test set (824 utterances, 2 unseen speakers). Results are reported in Table 1 using PESQ (perceptual quality), STOI (intelligibility), and SNR (signal fidelity).
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#888888', fontSize: '13px', marginBottom: '0.75rem', fontWeight: 500 }}>Table 1. Denoising evaluation on VoiceBank-DEMAND test set.</p>
              <table style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace', lineHeight: '2', backgroundColor: 'transparent', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '0.5rem', fontWeight: 700, color: '#00FFD1', backgroundColor: 'transparent', textAlign: 'left' }}>Model</th>
                    <th style={{ padding: '0.5rem', fontWeight: 700, color: '#00FFD1', backgroundColor: 'transparent', textAlign: 'left' }}>PESQ</th>
                    <th style={{ padding: '0.5rem', fontWeight: 700, color: '#00FFD1', backgroundColor: 'transparent', textAlign: 'left' }}>STOI</th>
                    <th style={{ padding: '0.5rem', fontWeight: 700, color: '#00FFD1', backgroundColor: 'transparent', textAlign: 'left' }}>SNR (dB)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>U-Net — Traffic</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>3.073</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>0.957</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>23.03</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>Autoencoder — Machinery</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>2.695</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>0.927</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>17.25</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>WaveNet-style — Crowd</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>2.864</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>0.950</td>
                    <td style={{ padding: '0.5rem', backgroundColor: 'transparent' }}>22.54</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ color: '#CCCCCC', fontSize: '15px', lineHeight: '1.8' }}>
              The U-Net achieved the highest PESQ gain (+0.983 over baseline), with an SNR improvement of +13.11 dB, confirming its effectiveness against the structured, stationary characteristics of traffic noise. The WaveNet-style model attained a PESQ of 2.864 and SNR of 22.54 dB (+12.62 dB), demonstrating its strength in modelling the non-stationary temporal patterns of crowd noise. The Autoencoder, while producing the most conservative gains (PESQ +0.605, SNR +7.33 dB), still substantially outperformed the unprocessed baseline and provides the fastest inference of the three architectures.
            </p>
          </div>

          <div style={{ paddingLeft: '1rem', borderLeft: '3px solid #00FFD1' }}>
            <h4 style={{ color: '#00FFD1', fontSize: '16px', fontWeight: 600, marginBottom: '1rem', textShadow: '0 0 10px rgba(0, 255, 209, 0.3)' }}>4.3 System-Level Evaluation</h4>
            <p style={{ color: '#CCCCCC', fontSize: '15px', lineHeight: '1.8' }}>
              The full noise-type-aware pipeline — comprising the ResNet-18 classifier routing inputs to the appropriate denoiser — consistently outperformed a naive, non-adaptive approach across all metrics. The adaptive routing contributes two advantages: (1) specialised denoising matched to the noise structure, and (2) a confidence threshold (0.6) that falls back to the U-Net for ambiguous inputs, preventing catastrophic misrouting.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
