import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { getQuestions } from '../services/loverPercentileApi';

const QuestionView = ({ name1, name2, onComplete }) => {
  const [questions, setQuestions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const hasFetched = useRef(false);
  // Stores all 6 answers synchronously to avoid stale closure in handleReveal
  const completedAnswersRef = useRef([]);

  // Fetch questions exactly once
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getQuestions()
      .then(data => setQuestions(data))
      .catch(() => setFetchError(true));
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    const updatedAnswers = [...answers, selectedOption];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex < 5) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // All 6 answered — save to ref then show completion screen
      completedAnswersRef.current = updatedAnswers;
      setShowCompletion(true);
    }
  }, [answers, selectedOption, currentIndex]);

  const handleReveal = useCallback(() => {
    // Use ref to avoid stale closure — completedAnswersRef always has all 6 answers
    onComplete(completedAnswersRef.current);
  }, [onComplete]);

  // Loading state
  if (!questions && !fetchError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="question-view"
      >
        <div className="glass-card question-card" style={{ textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem' }}>Loading questions...</p>
        </div>
      </motion.div>
    );
  }

  // Fetch error
  if (fetchError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="question-view"
      >
        <div className="glass-card question-card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Oops! Something went wrong 💔</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Could not load questions. Please try again.</p>
          <button
            onClick={() => { setFetchError(false); hasFetched.current = false; }}
            className="question-next-btn"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  // Completion screen
  if (showCompletion) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="question-view"
      >
        <div className="glow-bg"></div>
        <motion.div className="glass-card question-card completion-card">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ marginBottom: '2rem' }}
          >
            <Heart size={48} color="var(--primary)" fill="var(--primary)" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="completion-title"
          >
            You two made it through all 6... ❤️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="completion-subtitle"
          >
            Now let's see what the numbers say.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            onClick={handleReveal}
            className="reveal-btn"
          >
            Reveal Our Connection <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex) / 6) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="question-view"
    >
      <div className="glow-bg"></div>

      <div className="glass-card question-card">
        {/* Progress bar */}
        <div className="question-progress-bar">
          <motion.div
            className="question-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <p className="question-counter">Question {currentIndex + 1} of 6</p>

        {/* Names display */}
        <div className="question-names">
          <span>{name1}</span>
          <Heart size={14} color="var(--primary)" fill="var(--primary)" />
          <span>{name2}</span>
        </div>

        {/* Question text with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="question-text">{question.text}</h2>

            <div className="question-options">
              {question.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className={`question-option ${selectedOption === option ? 'selected' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <motion.button
          onClick={handleNext}
          className={`question-next-btn ${selectedOption === null ? 'disabled' : ''}`}
          disabled={selectedOption === null}
          animate={{ opacity: selectedOption !== null ? 1 : 0.4 }}
        >
          {currentIndex < 5 ? 'Next' : 'Finish'} <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuestionView;
