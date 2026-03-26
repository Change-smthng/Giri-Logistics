import React from 'react';
import './Ticker.css';

const items = [
  'Full Truckload', 'Part Load', 'Express Delivery',
  'Temperature Control', 'Pan-India Coverage', '24/7 Tracking', 'Heavy Haul',
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
