import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../config';
import './AdminDashboardPage.css';

const ADMIN_TOKEN_KEY = 'giri_admin_token';

const INITIAL_LOCATION_FORM = {
  city: '',
  state: '',
  officeType: 'Branch',
  latitude: '',
  longitude: '',
  emoji: '📍',
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    totalEnquiries: 0,
    enquiriesToday: 0,
    officeCount: 0,
  });
  const [enquiries, setEnquiries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationForm, setLocationForm] = useState(INITIAL_LOCATION_FORM);
  const [editingLocationId, setEditingLocationId] = useState('');

  const token = useMemo(() => localStorage.getItem(ADMIN_TOKEN_KEY), []);

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    navigate('/admin/login', { replace: true });
  };

  const apiRequest = async (path, options = {}) => {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (response.status === 401) {
      handleLogout();
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed.');
    }

    return data;
  };

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const [analyticsData, enquiriesData, locationsData] = await Promise.all([
        apiRequest('/api/admin/analytics'),
        apiRequest('/api/admin/enquiries'),
        apiRequest('/api/admin/locations'),
      ]);

      setAnalytics(analyticsData);
      setEnquiries(enquiriesData);
      setLocations(locationsData);
    } catch (loadError) {
      setError(loadError.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      handleLogout();
      return;
    }

    loadDashboardData();
  }, []);

  const handleStatusChange = async (enquiryId, status) => {
    try {
      await apiRequest(`/api/admin/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });

      setEnquiries((prev) =>
        prev.map((item) => (item._id === enquiryId ? { ...item, status } : item))
      );
    } catch (statusError) {
      setError(statusError.message || 'Failed to update enquiry status.');
    }
  };

  const handleDeleteEnquiry = async (enquiryId) => {
    try {
      await apiRequest(`/api/admin/enquiries/${enquiryId}`, {
        method: 'DELETE',
      });

      setEnquiries((prev) => prev.filter((item) => item._id !== enquiryId));
      setAnalytics((prev) => ({
        ...prev,
        totalEnquiries: Math.max(prev.totalEnquiries - 1, 0),
      }));
    } catch (deleteError) {
      setError(deleteError.message || 'Failed to delete enquiry.');
    }
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setLocationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditLocation = (location) => {
    setEditingLocationId(location._id);
    setLocationForm({
      city: location.city || '',
      state: location.state || '',
      officeType: location.officeType || 'Branch',
      latitude: location.latitude,
      longitude: location.longitude,
      emoji: location.emoji || '📍',
    });
  };

  const resetLocationForm = () => {
    setEditingLocationId('');
    setLocationForm(INITIAL_LOCATION_FORM);
  };

  const handleLocationSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const payload = {
      ...locationForm,
      latitude: Number(locationForm.latitude),
      longitude: Number(locationForm.longitude),
    };

    if (Number.isNaN(payload.latitude) || Number.isNaN(payload.longitude)) {
      setError('Latitude and longitude must be valid numbers.');
      return;
    }

    try {
      const endpoint = editingLocationId
        ? `/api/admin/locations/${editingLocationId}`
        : '/api/admin/locations';
      const method = editingLocationId ? 'PUT' : 'POST';

      const response = await apiRequest(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      if (editingLocationId) {
        setLocations((prev) =>
          prev.map((item) => (item._id === editingLocationId ? response.location : item))
        );
      } else {
        setLocations((prev) => [response.location, ...prev]);
        setAnalytics((prev) => ({ ...prev, officeCount: prev.officeCount + 1 }));
      }

      resetLocationForm();
    } catch (submitError) {
      setError(submitError.message || 'Failed to save location.');
    }
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      await apiRequest(`/api/admin/locations/${locationId}`, {
        method: 'DELETE',
      });

      setLocations((prev) => prev.filter((item) => item._id !== locationId));
      setAnalytics((prev) => ({
        ...prev,
        officeCount: Math.max(prev.officeCount - 1, 0),
      }));

      if (editingLocationId === locationId) {
        resetLocationForm();
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Failed to delete location.');
    }
  };

  const formatDate = (isoDate) => {
    try {
      return new Date(isoDate).toLocaleString();
    } catch {
      return '-';
    }
  };

  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard-shell">
        <header className="admin-dashboard-header">
          <div>
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>
            <p className="admin-dashboard-subtitle">Manage enquiries, office locations, and analytics.</p>
          </div>
          <div className="admin-dashboard-actions">
            <button className="admin-dashboard-refresh" onClick={loadDashboardData}>
              Refresh
            </button>
            <button className="admin-dashboard-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {error && <p className="admin-error-banner">{error}</p>}

        <section className="admin-analytics-grid">
          <article className="admin-metric-card">
            <p className="admin-metric-label">Total Visits</p>
            <p className="admin-metric-value">{analytics.totalVisits}</p>
          </article>
          <article className="admin-metric-card">
            <p className="admin-metric-label">Total Enquiries</p>
            <p className="admin-metric-value">{analytics.totalEnquiries}</p>
          </article>
          <article className="admin-metric-card">
            <p className="admin-metric-label">Enquiries Today</p>
            <p className="admin-metric-value">{analytics.enquiriesToday}</p>
          </article>
          <article className="admin-metric-card">
            <p className="admin-metric-label">Office Locations</p>
            <p className="admin-metric-value">{analytics.officeCount}</p>
          </article>
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel-title">Enquiries / Leads</h2>

          {loading ? (
            <p className="admin-placeholder">Loading enquiries...</p>
          ) : enquiries.length === 0 ? (
            <p className="admin-placeholder">No enquiries yet.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Route</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry._id}>
                      <td>{enquiry.name}</td>
                      <td>{enquiry.phone}</td>
                      <td>{`${enquiry.fromCity || '-'} → ${enquiry.toCity || '-'}`}</td>
                      <td>{enquiry.message || '-'}</td>
                      <td>
                        <select
                          className="admin-select"
                          value={enquiry.status || 'new'}
                          onChange={(event) => handleStatusChange(enquiry._id, event.target.value)}
                        >
                          <option value="new">new</option>
                          <option value="in-progress">in-progress</option>
                          <option value="closed">closed</option>
                        </select>
                      </td>
                      <td>{formatDate(enquiry.createdAt)}</td>
                      <td>
                        <button
                          className="admin-danger-btn"
                          onClick={() => handleDeleteEnquiry(enquiry._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="admin-panel admin-locations-panel">
          <div>
            <h2 className="admin-panel-title">Office Locations (Map Data)</h2>
            <p className="admin-panel-sub">Add/edit locations used by coverage map data source.</p>

            <form className="admin-location-form" onSubmit={handleLocationSubmit}>
              <input
                className="admin-input"
                name="city"
                placeholder="City"
                value={locationForm.city}
                onChange={handleLocationChange}
                required
              />
              <input
                className="admin-input"
                name="state"
                placeholder="State"
                value={locationForm.state}
                onChange={handleLocationChange}
                required
              />
              <input
                className="admin-input"
                name="officeType"
                placeholder="Office Type (Branch/HQ)"
                value={locationForm.officeType}
                onChange={handleLocationChange}
              />
              <input
                className="admin-input"
                name="latitude"
                placeholder="Latitude (e.g. 23.2599)"
                value={locationForm.latitude}
                onChange={handleLocationChange}
                required
              />
              <input
                className="admin-input"
                name="longitude"
                placeholder="Longitude (e.g. 77.4126)"
                value={locationForm.longitude}
                onChange={handleLocationChange}
                required
              />
              <input
                className="admin-input"
                name="emoji"
                placeholder="Emoji"
                value={locationForm.emoji}
                onChange={handleLocationChange}
              />

              <div className="admin-form-actions">
                <button className="admin-primary-btn" type="submit">
                  {editingLocationId ? 'Update Location' : 'Add Location'}
                </button>
                {editingLocationId && (
                  <button className="admin-secondary-btn" type="button" onClick={resetLocationForm}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            {locations.length === 0 ? (
              <p className="admin-placeholder">No office locations yet.</p>
            ) : (
              <ul className="admin-location-list">
                {locations.map((location) => (
                  <li key={location._id} className="admin-location-item">
                    <div>
                      <p className="admin-location-name">
                        {location.emoji || '📍'} {location.city}, {location.state}
                      </p>
                      <p className="admin-location-meta">
                        {location.officeType || 'Branch'} · {location.latitude}, {location.longitude}
                      </p>
                    </div>
                    <div className="admin-location-actions">
                      <button className="admin-secondary-btn" onClick={() => handleEditLocation(location)}>
                        Edit
                      </button>
                      <button
                        className="admin-danger-btn"
                        onClick={() => handleDeleteLocation(location._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
