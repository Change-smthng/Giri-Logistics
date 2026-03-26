import React from 'react';
import './Navbar.css';

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-text">
          <span className="logo-giri">Giri</span>
          <span className="logo-logistics"> Logistics</span>
        </span>
      </div>
      <ul className="nav-links">
        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a></li>
        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a></li>
        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
      </ul>
      <button className="nav-cta" onClick={() => scrollTo('contact')}>Get a Quote</button>
    </nav>
  );
}
