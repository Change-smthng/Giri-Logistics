import React from 'react';

export default function RouteLoader({ active }) {
  return (
    <div className={active ? 'route-loader route-loader--active' : 'route-loader'}>
      <div className="route-loader__inner">
        <div className="route-loader__label">Switching Route</div>
        <div className="route-loader__track">
          <div className="route-loader__line" />
          <div className="route-loader__truck-wrap">
            <span className="route-loader__truck" role="img" aria-label="Truck in transit">🚛</span>
          </div>
        </div>
      </div>
    </div>
  );
}
