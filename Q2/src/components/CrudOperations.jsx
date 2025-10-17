import { useState, useEffect } from 'react'
import axios from 'axios'

function CrudOperations() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User'
  })

  const API_URL = '/api/users'

  // Fetch all items
  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(API_URL)
      setItems(response.data)
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend server is running.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load items on component mount
  useEffect(() => {
    fetchItems()
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Create new item
  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(API_URL, formData)
      setItems([...items, response.data])
      resetForm()
      alert('✅ User created successfully!')
    } catch (err) {
      setError('Failed to create user')
      console.error('Create error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update existing item
  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.put(`${API_URL}/${currentItem.id}`, formData)
      setItems(items.map(item => item.id === currentItem.id ? response.data : item))
      resetForm()
      setIsEditing(false)
      setCurrentItem(null)
      alert('✅ User updated successfully!')
    } catch (err) {
      setError('Failed to update user')
      console.error('Update error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    
    setLoading(true)
    setError(null)
    
    try {
      await axios.delete(`${API_URL}/${id}`)
      setItems(items.filter(item => item.id !== id))
      alert('✅ User deleted successfully!')
    } catch (err) {
      setError('Failed to delete user')
      console.error('Delete error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Start editing
  const startEdit = (item) => {
    setIsEditing(true)
    setCurrentItem(item)
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      role: item.role
    })
  }

  // Cancel edit
  const cancelEdit = () => {
    setIsEditing(false)
    setCurrentItem(null)
    resetForm()
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'User'
    })
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white">
          <h2>🔧 CRUD Operations with Express API</h2>
        </div>
        <div className="card-body">

          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              <strong>Error:</strong> {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
              ></button>
            </div>
          )}

          <div className="row">
            {/* Form Section */}
            <div className="col-md-4">
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">
                    {isEditing ? '✏️ Edit User' : '➕ Add New User'}
                  </h5>
                  
                  <form onSubmit={isEditing ? handleUpdate : handleCreate}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">Role</label>
                      <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                      </select>
                    </div>

                    <div className="d-grid gap-2">
                      {isEditing ? (
                        <>
                          <button 
                            type="submit" 
                            className="btn btn-warning"
                            disabled={loading}
                          >
                            {loading ? 'Updating...' : '💾 Update User'}
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          type="submit" 
                          className="btn btn-success"
                          disabled={loading}
                        >
                          {loading ? 'Adding...' : '➕ Add User'}
                        </button>
                      )}
                    </div>
                  </form>

                  <hr />
                  
                  <div className="text-center">
                    <button 
                      className="btn btn-sm btn-info w-100"
                      onClick={fetchItems}
                      disabled={loading}
                    >
                      🔄 Refresh Data
                    </button>
                  </div>

                  <div className="alert alert-info mt-3 mb-0">
                    <small>
                      <strong>Total Users:</strong> {items.length}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table Section */}
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-3">👥 Users List</h5>
                  
                  {loading && !items.length ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2">Loading data...</p>
                    </div>
                  ) : items.length === 0 ? (
                    <div className="alert alert-warning">
                      <h6>No users found</h6>
                      <p className="mb-0">Add your first user using the form.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover table-striped">
                        <thead className="table-dark">
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map(item => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>
                                <span className={`badge ${
                                  item.role === 'Admin' ? 'bg-danger' : 
                                  item.role === 'Moderator' ? 'bg-warning' : 
                                  'bg-primary'
                                }`}>
                                  {item.role}
                                </span>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() => startEdit(item)}
                                    disabled={loading}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(item.id)}
                                    disabled={loading}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* API Information */}
              <div className="card mt-3 bg-light">
                <div className="card-body">
                  <h6 className="card-title">📡 API Endpoints</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="badge bg-success me-2">GET</span>
                      <code>/api/users</code> - Fetch all users
                    </li>
                    <li className="list-group-item">
                      <span className="badge bg-primary me-2">POST</span>
                      <code>/api/users</code> - Create new user
                    </li>
                    <li className="list-group-item">
                      <span className="badge bg-warning me-2">PUT</span>
                      <code>/api/users/:id</code> - Update user
                    </li>
                    <li className="list-group-item">
                      <span className="badge bg-danger me-2">DELETE</span>
                      <code>/api/users/:id</code> - Delete user
                    </li>
                  </ul>
                  <div className="alert alert-info mt-3 mb-0">
                    <small>
                      <strong>Backend:</strong> Express.js running on port 3001<br />
                      <strong>Frontend:</strong> React with Axios for HTTP requests
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CrudOperations
