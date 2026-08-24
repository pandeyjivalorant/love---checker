import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { calculateLoverPercentile } from '../services/loverPercentileApi';

const LOADING_STEPS = [
  "Finding the letters...",
  "Mapping the connection...",
  "Reading your answers...",
  "Checking your chemistry...",
  "Almost there..."
];

const LoadingView = ({ name1, name2, answers, onResult }) => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startTime = Date.now();

    // Animate loading steps
    const stepTimers = LOADING_STEPS.map((_, idx) => {
      return setTimeout(() => {
        setCompletedSteps(prev => [...prev, idx]);
        setActiveStep(idx + 1);
      }, (idx + 1) * 800);
    });

    // Call the API
    calculateLoverPercentile({ name1, name2, answers })
      .then(resultData => {
        // Wait at least until all steps finish animating (min = all steps + buffer)
        const minDuration = (LOADING_STEPS.length + 1) * 800;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(minDuration - elapsed, 500);
        
        setTimeout(() => {
          onResult(resultData);
        }, remaining);
      })
      .catch(() => {
        setError('Something went wrong. Please try again.');
      });

    return () => {
      stepTimers.forEach(t => clearTimeout(t));
    };
  }, [name1, name2, answers, onResult]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="loading-view"
      >
        <div className="glass-card loading-card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '1rem' }}>Oops! 💔</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
          <button
            onClick={() => { setError(null); hasStarted.current = false; }}
            className="question-next-btn"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-view"
    >
      {/* Animated glowing ring */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 3, ease: "linear" },
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="loading-ring"
      />
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="loading-title"
      >
        Reading your connection...
      </motion.h2>

      <p className="loading-subtitle">This won't take long.</p>

      {/* Step list */}
      <div className="loading-steps">
        <AnimatePresence>
          {LOADING_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="loading-step"
            >
              {completedSteps.includes(idx) ? (
                <CheckCircle2 size={18} color="var(--primary)" />
              ) : activeStep === idx ? (
                <div className="loading-step-spinner" />
              ) : (
                <div className="loading-step-dot" />
              )}
              <span style={{ color: completedSteps.includes(idx) ? '#fff' : 'var(--text-muted)' }}>
                {step}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="loading-progress-bar">
        <motion.div
          className="loading-progress-fill"
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(((completedSteps.length) / LOADING_STEPS.length) * 100, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingView;
