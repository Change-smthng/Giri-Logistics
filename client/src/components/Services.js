import React from 'react';
import './Services.css';

const services = [
  {
    icon: '🚛',
    title: 'Full Truckload (FTL)',
    desc: 'Dedicated truck for your entire shipment. Fastest transit, zero handling, maximum security for large consignments.',
    num: '01',
  },
  {
    icon: '📦',
    title: 'Part Load (LTL)',
    desc: 'Share the truck, share the cost. Ideal for small to mid-sized shipments with fixed delivery schedules.',
    num: '02',
  },
  {
    icon: '⚡',
    title: 'Express Delivery',
    desc: 'Time-critical freight handled with urgency. Priority routing and dedicated drivers for same-day or next-day delivery.',
    num: '03',
  },
  {
    icon: '🏭',
    title: 'Heavy & ODC Cargo',
    desc: 'Oversized and overweight cargo transport with specialised trailers, escorts, and compliance management.',
    num: '04',
  },
  {
    icon: '🌡️',
    title: 'Temperature Controlled',
    desc: 'Reefer trucks for perishables, pharmaceuticals, and cold-chain cargo — maintaining integrity end-to-end.',
    num: '05',
  },
  {
    icon: '📍',
    title: 'Live Tracking',
    desc: 'GPS-enabled fleet with real-time tracking and instant status updates so you always know where your cargo is.',
    num: '06',
  },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="services-header">
        <div>
          <p className="section-tag">What We Offer</p>
          <h2 className="section-title">Our Services</h2>
        </div>
        <p className="services-sub">
          Every cargo is different. We offer flexible transport solutions built around your business needs.
        </p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.num} className="service-card">
            <span className="service-icon">{s.icon}</span>
            <div className="service-title">{s.title}</div>
            <p className="service-desc">{s.desc}</p>
            <span className="service-num">{s.num}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
