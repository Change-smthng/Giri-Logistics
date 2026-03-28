import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoveragePage from './pages/CoveragePage';
import PageTransition from './components/PageTransition';
import './components/PageTransition.css';

function AppRoutes() {
  const location = useLocation();
  const hasMounted = useRef(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setIsLoadingRoute(true);

    const hideTimer = setTimeout(() => {
      setIsLoadingRoute(false);
    }, 620);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return (
    <PageTransition active={isLoadingRoute}>
      <div className={isLoadingRoute ? 'pt-route-view pt-route-view--loading' : 'pt-route-view'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coverage" element={<CoveragePage />} />
        </Routes>
      </div>
    </PageTransition>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
