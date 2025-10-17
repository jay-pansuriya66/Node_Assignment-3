import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Profile.css';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(authUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data.employee);
    } catch (err) {
      setError('Error loading profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <Navbar />
          <div className="loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Navbar />

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h2>👤 My Profile</h2>
            <span className={`status-badge status-${profile?.status}`}>
              {profile?.status?.toUpperCase()}
            </span>
          </div>

          <div className="profile-section">
            <h3>📋 Personal Information</h3>
            <div className="profile-grid">
              <div className="profile-item">
                <label>Employee ID</label>
                <div className="value">{profile?.empId}</div>
              </div>
              <div className="profile-item">
                <label>Full Name</label>
                <div className="value">{profile?.name}</div>
              </div>
              <div className="profile-item">
                <label>Email Address</label>
                <div className="value">{profile?.email}</div>
              </div>
              <div className="profile-item">
                <label>Phone Number</label>
                <div className="value">{profile?.phone || 'N/A'}</div>
              </div>
              {profile?.address && (
                <div className="profile-item full-width">
                  <label>Address</label>
                  <div className="value">{profile?.address}</div>
                </div>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>💼 Employment Details</h3>
            <div className="profile-grid">
              <div className="profile-item">
                <label>Department</label>
                <div className="value">{profile?.department}</div>
              </div>
              <div className="profile-item">
                <label>Position</label>
                <div className="value">{profile?.position}</div>
              </div>
              <div className="profile-item">
                <label>Joining Date</label>
                <div className="value">
                  {new Date(profile?.joiningDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="profile-item">
                <label>Status</label>
                <div className="value">
                  <span className={`status-badge status-${profile?.status}`}>
                    {profile?.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>💰 Salary Information</h3>
            <div className="salary-breakdown">
              <div className="salary-row">
                <span>Base Salary:</span>
                <span>₹{profile?.baseSalary?.toFixed(2)}</span>
              </div>
              <div className="salary-row">
                <span>Allowances:</span>
                <span className="positive">+ ₹{profile?.allowances?.toFixed(2)}</span>
              </div>
              <div className="salary-row">
                <span>Deductions:</span>
                <span className="negative">- ₹{profile?.deductions?.toFixed(2)}</span>
              </div>
              <div className="salary-row total">
                <span>Net Monthly Salary:</span>
                <span>₹{profile?.salary?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
