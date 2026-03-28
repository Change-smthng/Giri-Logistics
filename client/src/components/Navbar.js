import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      
      {/* Logo */}
      <div 
        className="nav-logo" 
        onClick={() => scrollTo('home')}
        style={{ cursor: 'pointer' }}
      >
        <img src={logo} alt="Giri Logistics" className="logo" />
      </div>

      {/* Links */}
      <ul className="nav-links">
        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a></li>
        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a></li>
        <li><Link to="/coverage">Coverage</Link></li>
        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
      </ul>

      {/* CTA */}
      <button className="nav-cta" onClick={() => scrollTo('contact')}>
        Get a Quote
      </button>

    </nav>
  );
}