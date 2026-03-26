import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo-text">
        <span className="footer-giri">Giri</span>
        <span className="footer-logistics"> Logistics</span>
      </span>
      <p className="footer-copy">© {new Date().getFullYear()} Giri Logistics. All rights reserved.</p>
    </footer>
  );
}
