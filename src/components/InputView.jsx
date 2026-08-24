import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

const InputView = ({ onSubmit }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmed1 = name1.trim();
    const trimmed2 = name2.trim();

    if (!trimmed1 && !trimmed2) {
      setError('Please enter both names ❤️');
      return;
    }
    if (!trimmed1) {
      setError('Please enter your name ❤️');
      return;
    }
    if (!trimmed2) {
      setError("Please enter your lover's name ❤️");
      return;
    }

    onSubmit(trimmed1, trimmed2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="input-view"
    >
      <div className="glow-bg"></div>
      <div className="glow-bg-secondary"></div>
      
      <motion.form 
        onSubmit={handleSubmit}
        className="glass-card input-form"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <h2 className="input-title">
          Let's find your <span className="text-gradient">connection</span>
        </h2>
        
        <div className="input-fields">
          {/* Input 1 */}
          <div className="input-group">
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name1}
              onChange={(e) => { setName1(e.target.value); setError(''); }}
              autoFocus
            />
          </div>

          {/* Heart separator */}
          <div className="input-heart-separator">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="heart-bubble"
            >
              <Heart size={20} color="var(--primary)" fill="var(--primary)" />
            </motion.div>
          </div>

          {/* Input 2 */}
          <div className="input-group">
            <label>Your Lover's Name</label>
            <input 
              type="text" 
              placeholder="Enter their name" 
              value={name2}
              onChange={(e) => { setName2(e.target.value); setError(''); }}
            />
          </div>
        </div>

        {/* Inline error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="input-error"
          >
            {error}
          </motion.p>
        )}

        <button type="submit" className="input-submit-btn">
          Reveal Our Connection <ArrowRight size={18} />
        </button>

        <p className="input-disclaimer">Just for fun • No sign-up required</p>
      </motion.form>
    </motion.div>
  );
};

export default InputView;
