import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, RefreshCw, Heart } from 'lucide-react';

const ResultView = ({ name1, name2, result, onTryAnother }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const percentile = result?.percentile ?? 0;

  // Animated count-up
  useEffect(() => {
    if (!percentile) return;

    let start = 0;
    const duration = 2000;
    const incrementTime = 20;
    const totalSteps = duration / incrementTime;
    const increment = percentile / totalSteps;

    timerRef.current = setInterval(() => {
      start += increment;
      if (start >= percentile) {
        setDisplayCount(percentile);
        clearInterval(timerRef.current);
      } else {
        setDisplayCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [percentile]);

  const handleShare = async () => {
    const text = `${name1} ♥ ${name2} scored ${result.percentile}% on Love Percentile! 💕`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Love Percentile', text });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopy = async () => {
    const text = `${name1} ♥ ${name2}\nLove Percentile: ${result.percentile}%\nSequence: ${result.sequence?.join(' ')}\nFinal: ${result.finalNumbers?.join(' ')}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Stats driven entirely by result prop
  const stats = [
    { label: name1, value: result?.numbers1?.join(' ') ?? '', color: 'var(--primary)' },
    { label: name2, value: result?.numbers2?.join(' ') ?? '', color: 'var(--secondary)' },
    { label: 'LOVE', value: result?.love?.join(' ') ?? '', color: 'var(--accent)' },
    { label: 'Sequence', value: result?.sequence?.join(' ') ?? '', color: '#FFB020' },
    { label: 'Final Numbers', value: result?.finalNumbers?.join(' ') ?? '', color: 'var(--primary)' },
  ];

  // SVG ring calculations
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(displayCount / 100) * circumference}, ${circumference}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="result-view"
    >
      <div className="glow-bg" style={{ width: '80vw', height: '80vw' }}></div>

      <div className="glass-card result-card">
        <h2 className="result-label">Your Love Percentile</h2>
        
        {/* Progress Ring */}
        <div className="result-ring-container">
        <svg className="result-ring-svg" viewBox="0 0 200 200">
            <circle 
              cx="100" cy="100" r={radius}
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="8" fill="none" 
            />
            <motion.circle 
              cx="100" cy="100" r={radius}
              stroke="url(#resultGradient)" 
              strokeWidth="8" fill="none" 
              strokeLinecap="round"
              initial={{ strokeDasharray: '0, 600' }}
              animate={{ strokeDasharray }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="result-ring-value">
            <span className="result-number">{displayCount}</span>
            <span className="result-percent">%</span>
          </div>
        </div>

        {/* Names */}
        <div className="result-names">
          <span>{name1}</span>
          <Heart color="var(--primary)" fill="var(--primary)" size={20} />
          <span>{name2}</span>
        </div>

        {/* Stats Grid */}
        <div className="result-stats">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="result-stat-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + (i * 0.2) }}
            >
              <div className="result-stat-header" style={{ marginBottom: 0 }}>
                <span className="result-stat-label">{stat.label}</span>
                <span className="result-stat-value" style={{ color: stat.color, letterSpacing: '2px', fontSize: '1.1rem' }}>{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Share Section */}
        <motion.div 
          className="result-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <h3 className="result-actions-title">Like your result?</h3>
          <div className="result-buttons">
            <button className="result-btn result-btn-share" onClick={handleShare}>
              <Share2 size={16} /> Share Result
            </button>
            <button className="result-btn result-btn-copy" onClick={handleCopy}>
              <Copy size={16} /> {copied ? 'Copied!' : 'Copy Result'}
            </button>
            <button className="result-btn result-btn-retry" onClick={onTryAnother}>
              <RefreshCw size={16} /> Try Another
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultView;
