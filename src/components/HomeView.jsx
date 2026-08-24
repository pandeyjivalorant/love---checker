import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Star } from 'lucide-react';

const HomeView = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="home-view"
    >
      <div className="glow-bg"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="hero-text"
        >
          <div className="hero-badge">
            Discover Your Connection Rate
          </div>
          <h1 className="hero-title">
            How strong is <br />
            <span className="text-gradient">your love</span> connection?
          </h1>

          <p className="hero-subtitle">
            Enter two names. Let the numbers tell the story.
          </p>

          <button onClick={onStart} className="hero-cta">
            Calculate Your Love
          </button>

          <div className="hero-social-proof">
            <div className="avatar-stack">
              {[1, 2, 3].map(i => (
                <div key={i} className="avatar-dot" />
              ))}
            </div>
            <p>
              <span style={{ color: '#fff', fontWeight: 600 }}>100+</span> lovers calculated this month.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="hero-visual"
        >
          <div className="hero-glow" />
          <Heart size={200} color="var(--primary)" fill="url(#heroGradient)" className="hero-heart-icon" />
          <svg style={{ width: 0, height: 0 }}>
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4F81" />
                <stop offset="100%" stopColor="#FF2D55" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">How it works</p>
          <h2 className="section-title">
            Three steps. One connection.
          </h2>
        </div>

        <div className="steps-grid">
          {[
            { step: '01', title: 'Enter Names', desc: "Tell us your name and your person's name.", icon: <Heart color="var(--primary)" /> },
            { step: '02', title: 'Let The Numbers Talk', desc: "Your names go through our playful connection system.", icon: <Activity color="var(--accent)" /> },
            { step: '03', title: 'Reveal Your Percentile', desc: "Discover your final love percentile.", icon: <Star color="#FFB020" /> }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="glass-card step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -5, borderColor: 'rgba(255,45,85,0.3)' }}
            >
              <div className="step-number">{item.step}</div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta-section">
        <div className="glass-card bottom-cta-card">
          <div className="bottom-cta-glow" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Find out where you stand</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Takes less than 10 seconds. Share with your person!</p>
            <button onClick={onStart} className="hero-cta">
              Calculate Your Love <Heart size={16} fill="#fff" style={{ display: 'inline', marginLeft: '0.5rem', verticalAlign: 'text-bottom' }} />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomeView;
