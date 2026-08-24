import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = ({ onHome, onHowItWorks, onInput }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = useCallback(() => setMenuOpen(false), []);

  const handleHome = useCallback(() => {
    onHome?.();
    close();
  }, [onHome, close]);

  const handleHowItWorks = useCallback(() => {
    onHowItWorks?.();
    close();
  }, [onHowItWorks, close]);

  const handleInput = useCallback(() => {
    onInput?.();
    close();
  }, [onInput, close]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="navbar"
      >
        {/* Logo */}
        <div className="navbar-logo" onClick={handleHome}>
          <Heart size={20} color="var(--primary)" fill="var(--primary)" />
          <span>Love Percentile</span>
        </div>

        {/* Desktop links */}
        <div className="navbar-links">
          <span onClick={handleHome}>Home</span>
          <span onClick={handleHowItWorks}>How it Works</span>
          <span>About</span>
        </div>

        {/* Desktop CTA */}
        <button onClick={handleInput} className="navbar-cta navbar-cta-desktop">
          Find Your Percentile
        </button>

        {/* Hamburger button — mobile only */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="mobile-menu-links">
                <button className="mobile-menu-item" onClick={handleHome}>
                  Home
                </button>
                <button className="mobile-menu-item" onClick={handleHowItWorks}>
                  How it Works
                </button>
                <button className="mobile-menu-item" onClick={close}>
                  About
                </button>
              </nav>
              <button onClick={handleInput} className="navbar-cta mobile-menu-cta">
                Find Your Percentile
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
