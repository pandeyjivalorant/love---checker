import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-brand">
        Love Percentile
      </div>
      <p className="footer-tagline">
        Made with <Heart size={12} color="var(--primary)" fill="var(--primary)" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 0.25rem' }} /> for every love story out there
      </p>
      <div className="footer-links">
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </footer>
  );
};

export default Footer;
