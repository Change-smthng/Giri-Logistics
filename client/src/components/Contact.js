import React, { useState } from 'react';
import { API } from '../config';
import './Contact.css';

const WHATSAPP_NUMBER = '919876543210'; // ← update to real number

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', fromCity: '', toCity: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Save to MongoDB via Express API
      const res = await fetch(`${API}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('API error');

      // 2. Open WhatsApp with prefilled message
      const text = [
        'New logistics enquiry',
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `From: ${form.fromCity || 'N/A'}`,
        `To: ${form.toCity || 'N/A'}`,
        `Details: ${form.message || 'N/A'}`,
      ].join('\n');

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

      setStatus('success');
      setForm({ name: '', phone: '', fromCity: '', toCity: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <p className="section-tag">Reach Out</p>
      <h2 className="section-title" style={{ marginBottom: '3rem' }}>Contact Us</h2>

      <div className="contact-grid">
        {/* Info */}
        <div className="contact-info">
          <p className="contact-info-body">
            Ready to move your cargo? Get in touch for a free quote or to discuss your logistics requirements.
            We respond within a few hours.
          </p>

          <div className="contact-details">
            {[
              { icon: '📞', label: 'Phone', value: <a href="tel:+917891379066">+91 7891379066</a> },
              { icon: '✉️', label: 'Email', value: <a href="mailto:giri.logistics2016@gmail.com ">giri.logistics2016@gmail.com </a> },
              { icon: '💬', label: 'WhatsApp', value: <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a> },
              { icon: '📍', label: 'Office', value: 'Transport Nagar, Bhopal, MP – 462001' },
              { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 8:00 AM – 8:00 PM' },
            ].map((item) => (
              <div key={item.label} className="contact-item">
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Your Name</label>
              <input className="form-input" type="text" name="name" placeholder="Rahul Sharma"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label className="form-label">Phone / WhatsApp</label>
              <input className="form-input" type="tel" name="phone" placeholder="+91 00000 00000"
                value={form.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">From City</label>
              <input className="form-input" type="text" name="fromCity" placeholder="Bhopal"
                value={form.fromCity} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label className="form-label">To City</label>
              <input className="form-input" type="text" name="toCity" placeholder="Mumbai"
                value={form.toCity} onChange={handleChange} />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Message / Cargo Details</label>
            <textarea className="form-textarea" name="message"
              placeholder="Tell us about your cargo — type, weight, dimensions, timeline..."
              value={form.message} onChange={handleChange} />
          </div>

          <button type="submit" className="form-submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send Enquiry →'}
          </button>

          {status === 'success' && (
            <p className="form-feedback success">✅ Enquiry sent! WhatsApp should have opened.</p>
          )}
          {status === 'error' && (
            <p className="form-feedback error">❌ Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
