import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoveragePage from './pages/CoveragePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PageTransition from './components/PageTransition';
import './components/PageTransition.css';

const ADMIN_TOKEN_KEY = 'giri_admin_token';

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

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
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={(
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            )}
          />
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
