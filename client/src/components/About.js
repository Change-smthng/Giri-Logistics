import React from 'react';
import './About.css';

const pillars = [
  { icon: '🛡️', title: 'Safety First', text: 'Fully insured cargo, trained drivers, and regular vehicle maintenance.' },
  { icon: '⏱️', title: 'On-Time', text: "We commit to schedules and deliver — our 99% on-time rate speaks for itself." },
  { icon: '🤝', title: 'Reliability', text: 'A partner you can count on — transparent pricing, no hidden charges.' },
  { icon: '📞', title: 'Support', text: '24/7 customer support. Real people, real answers, always.' },
];

export default function About() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="about">
      <div className="about-visual">
        <div className="about-box">🚚</div>
        <div className="about-badge">
          <div className="about-badge-num">15+</div>
          <div className="about-badge-text">Years on the Road</div>
        </div>
        <div className="about-accent" />
      </div>

      <div className="about-content">
        <p className="section-tag">Who We Are</p>
        <h2 className="section-title">Built on Trust,<br />Driven by Results</h2>
        <p className="about-body">
          Giri Logistics has been connecting businesses across India with reliable door-to-door road transport.
          Starting with a dedicated fleet and a commitment to service, we've grown into a trusted transport partner
          for manufacturers, traders, and retailers of all sizes.
          <br /><br />
          We believe logistics is the backbone of commerce. That's why we invest in our fleet, our people, and
          our processes — so your goods move safely and arrive on time, every time.
        </p>
        <div className="about-pillars">
          {pillars.map((p) => (
            <div key={p.title} className="pillar">
              <div className="pillar-title">{p.icon} {p.title}</div>
              <p className="pillar-text">{p.text}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={() => scrollTo('contact')}>Work With Us</button>
      </div>
    </section>
  );
}
