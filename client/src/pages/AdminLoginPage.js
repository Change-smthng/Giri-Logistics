import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../config';
import './AdminLoginPage.css';

const ADMIN_TOKEN_KEY = 'giri_admin_token';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setStatus('success');
      navigate('/admin/dashboard', { replace: true });
    } catch (submitError) {
      setStatus('error');
      setError(submitError.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <p className="admin-login-tag">Admin Access</p>
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-subtitle">Sign in to access your logistics admin panel.</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label className="admin-login-label" htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            className="admin-login-input"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter admin username"
            required
          />

          <label className="admin-login-label" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="admin-login-input"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <button className="admin-login-button" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in…' : 'Login'}
          </button>

          {status === 'error' && <p className="admin-login-error">{error}</p>}
        </form>
      </section>
    </main>
  );
}
