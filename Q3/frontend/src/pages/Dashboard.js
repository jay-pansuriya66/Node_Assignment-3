import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Navbar />

        <div className="dashboard-welcome card">
          <h2>Welcome, {user?.name}! 👋</h2>
          <p>Employee ID: <strong>{user?.empId}</strong></p>
          <p>Department: <strong>{user?.department}</strong></p>
          <p>Position: <strong>{user?.position}</strong></p>
        </div>

        <div className="dashboard-grid">
          <Link to="/profile" className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>My Profile</h3>
            <p>View your employee profile and personal information</p>
          </Link>

          <Link to="/leave" className="dashboard-card">
            <div className="card-icon">📝</div>
            <h3>Leave Application</h3>
            <p>Apply for leave and view your leave history</p>
          </Link>

          <div className="dashboard-card info-card">
            <div className="card-icon">💰</div>
            <h3>Salary Information</h3>
            <div className="salary-info">
              <p>Monthly Salary</p>
              <h2>₹{user?.salary?.toFixed(2)}</h2>
            </div>
          </div>

          <div className="dashboard-card info-card">
            <div className="card-icon">📊</div>
            <h3>Account Status</h3>
            <div className="status-info">
              <span className={`status-badge status-${user?.status}`}>
                {user?.status?.toUpperCase()}
              </span>
              <p>Joined: {new Date(user?.joiningDate).toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
