import React from 'react';
import './CoveragePage.css';

export default function CoveragePage() {
  return (
    <main className="coverage-page">
      <iframe
        title="Giri Logistics Coverage"
        src="/coverage.html"
        className="coverage-frame"
      />
    </main>
  );
}
