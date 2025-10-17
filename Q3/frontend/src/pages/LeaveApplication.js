import React, { useState, useEffect } from 'react';
import { leaveAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './LeaveApplication.css';

const LeaveApplication = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    reason: '',
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await leaveAPI.getAll();
      setLeaves(response.data.leaves);
    } catch (err) {
      setError('Error loading leave applications');
      console.error('Leave fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const response = await leaveAPI.apply(formData);
      setSuccess(response.data.message);
      setFormData({ date: '', reason: '' });
      setShowForm(false);
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting leave application');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Navbar />

        <div className="card">
          <div className="card-header">
            <h2>📝 Leave Application</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Apply for Leave'}
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {showForm && (
            <div className="leave-form-container">
              <h3>Apply for New Leave</h3>
              <form onSubmit={handleSubmit} className="leave-form">
                <div className="form-group">
                  <label htmlFor="date">Leave Date <span style={{color: 'red'}}>*</span></label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reason">Reason for Leave <span style={{color: 'red'}}>*</span></label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please provide a reason for your leave request..."
                    required
                    disabled={submitting}
                    rows="4"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="section-title">Leave History</h3>

          {loading ? (
            <div className="loading">Loading leave history...</div>
          ) : leaves.length > 0 ? (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Leave Date</th>
                    <th>Reason</th>
                    <th>Applied On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>
                        {new Date(leave.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td>{leave.reason}</td>
                      <td>
                        {new Date(leave.appliedDate).toLocaleDateString('en-IN')}
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusColor(leave.status)}`}>
                          {leave.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No Leave Applications</h3>
              <p>You haven't applied for any leave yet. Click "Apply for Leave" to submit a request.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
