import React from 'react';
import './Hero.css';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="hero-glow" />
      <div className="hero-road" />

      {/* Night highway SVG scene */}
      <svg className="hero-scene" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="skyGrad" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#0d1825"/>
            <stop offset="60%" stopColor="#080f18"/>
            <stop offset="100%" stopColor="#030609"/>
          </radialGradient>
          <radialGradient id="headlightL" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.9"/>
            <stop offset="40%" stopColor="#ffd060" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#f06a00" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a"/>
            <stop offset="100%" stopColor="#0a0a0a"/>
          </linearGradient>
          <linearGradient id="horizonGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f06a00" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#f06a00" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="cabGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b83020"/>
            <stop offset="100%" stopColor="#7a1a10"/>
          </linearGradient>
          <linearGradient id="trailerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a3a"/>
            <stop offset="100%" stopColor="#1e1e1e"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="softglow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1400" height="900" fill="url(#skyGrad)"/>

        {/* Stars */}
        <g opacity="0.7">
          <circle cx="80" cy="40" r="1.2" fill="white" opacity="0.8"/>
          <circle cx="200" cy="80" r="0.8" fill="white" opacity="0.6"/>
          <circle cx="340" cy="30" r="1" fill="white" opacity="0.9"/>
          <circle cx="420" cy="90" r="1.4" fill="white" opacity="0.7"/>
          <circle cx="560" cy="50" r="0.9" fill="white" opacity="0.8"/>
          <circle cx="650" cy="20" r="1.1" fill="white" opacity="0.6"/>
          <circle cx="780" cy="70" r="0.8" fill="white" opacity="0.9"/>
          <circle cx="900" cy="35" r="1.3" fill="white" opacity="0.7"/>
          <circle cx="1020" cy="60" r="1" fill="white" opacity="0.8"/>
          <circle cx="1140" cy="25" r="1.5" fill="white" opacity="0.6"/>
          <circle cx="1260" cy="85" r="0.9" fill="white" opacity="0.9"/>
          <circle cx="1350" cy="45" r="1.1" fill="white" opacity="0.7"/>
        </g>

        {/* Horizon glow */}
        <rect x="0" y="460" width="1400" height="120" fill="url(#horizonGlow)"/>

        {/* Road */}
        <path d="M0 580 L400 520 L1000 520 L1400 580 L1400 900 L0 900 Z" fill="url(#roadGrad)"/>
        <line x1="700" y1="520" x2="700" y2="900" stroke="#f06a00" strokeWidth="2" strokeOpacity="0.15" strokeDasharray="40 30"/>

        {/* Truck group */}
        <g transform="translate(320, 530)">
          {/* Trailer */}
          <rect x="15" y="20" width="670" height="218" rx="4" fill="url(#trailerGrad)" stroke="#2a2a2a" strokeWidth="1.5"/>
          <rect x="15" y="20" width="670" height="12" rx="4" fill="#444"/>
          <text x="350" y="142" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="38" fontWeight="800" fill="#f06a00" opacity="0.25" letterSpacing="6">GIRI LOGISTICS</text>
          {/* Rear wheels */}
          <circle cx="120" cy="238" r="46" fill="#111" stroke="#2a2a2a" strokeWidth="2.5"/>
          <circle cx="120" cy="238" r="30" fill="#0a0a0a"/>
          <circle cx="120" cy="238" r="16" fill="#181818"/>
          <circle cx="120" cy="238" r="7" fill="#2a2a2a"/>
          <circle cx="200" cy="238" r="46" fill="#111" stroke="#2a2a2a" strokeWidth="2.5"/>
          <circle cx="200" cy="238" r="30" fill="#0a0a0a"/>
          <circle cx="200" cy="238" r="16" fill="#181818"/>
          <circle cx="200" cy="238" r="7" fill="#2a2a2a"/>
          {/* Tail lights */}
          <rect x="16" y="30" width="14" height="32" rx="3" fill="#cc1010" opacity="0.9" filter="url(#softglow)"/>
          <rect x="16" y="175" width="14" height="32" rx="3" fill="#cc1010" opacity="0.9" filter="url(#softglow)"/>

          {/* Cab */}
          <rect x="620" y="0" width="170" height="228" rx="8" fill="url(#cabGrad)"/>
          <rect x="630" y="10" width="100" height="70" rx="6" fill="#1a3a5a" opacity="0.85"/>
          {/* Headlights */}
          <ellipse cx="800" cy="60" rx="80" ry="55" fill="url(#headlightL)" opacity="0.6"/>
          <rect x="788" y="40" width="18" height="24" rx="3" fill="#fffbe0" filter="url(#glow)"/>
          <rect x="788" y="80" width="18" height="16" rx="3" fill="#ffd060" filter="url(#softglow)"/>
          {/* Marker lights */}
          {[0,25,50,75,100,125,150].map((x, i) => (
            <circle key={i} cx={630 + x} cy="5" r="5" fill="#f06a00" opacity="0.9" filter="url(#softglow)"/>
          ))}
          {/* Front wheel */}
          <circle cx="680" cy="238" r="46" fill="#111" stroke="#2a2a2a" strokeWidth="2.5"/>
          <circle cx="680" cy="238" r="30" fill="#0a0a0a"/>
          <circle cx="680" cy="238" r="16" fill="#181818"/>
          <circle cx="680" cy="238" r="7" fill="#2a2a2a"/>
          {/* Fuel tanks */}
          <rect x="622" y="150" width="50" height="38" rx="7" fill="#777"/>
          <rect x="624" y="152" width="46" height="9" rx="4" fill="#999"/>
        </g>
      </svg>

      <div className="hero-content">
        <p className="hero-eyebrow">Door to Door Service — Pan-India Road Transport</p>
        <h1 className="hero-title">
          Giri <span className="accent">Logistics</span><br />
          <span className="stroke">Delivers.</span>
        </h1>
        <p className="hero-desc">
          Your trusted partner for road freight across India. From full truckloads to last-mile door-to-door delivery — we move your cargo safely, on time, every time.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('contact')}>Request a Quote</button>
          <button className="btn-ghost" onClick={() => scrollTo('services')}>Our Services</button>
        </div>
      </div>

      <div className="hero-brand-overlay">
        <span className="hero-brand-main">
          <span className="brand-giri">Giri</span>
          <span className="brand-logistics">Logistics</span>
        </span>
        <span className="hero-brand-line" />
        <span className="hero-brand-tagline">Door · To · Door · Service</span>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">350+</div>
          <div className="stat-label">Routes Covered</div>
        </div>
        <div className="stat">
          <div className="stat-num">12+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat">
          <div className="stat-num">99%</div>
          <div className="stat-label">On-Time Rate</div>
        </div>
      </div>
    </section>
  );
}
