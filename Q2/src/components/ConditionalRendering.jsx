import { useState } from 'react'

// Login component
function LoginMessage({ onLogin }) {
  return (
    <div className="alert alert-warning">
      <h4>🔒 Please Login</h4>
      <p>You need to login to access the dashboard</p>
      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  )
}

// Dashboard component
function Dashboard({ user, onLogout }) {
  return (
    <div className="alert alert-success">
      <h4>✅ Welcome, {user.name}!</h4>
      <p>You are successfully logged in as {user.role}</p>
      <button className="btn btn-danger" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

// User status component with conditional rendering
function UserStatus({ status }) {
  if (status === 'loading') {
    return <div className="spinner-border text-primary" role="status"></div>
  }

  if (status === 'error') {
    return <div className="alert alert-danger">❌ Error loading data</div>
  }

  if (status === 'success') {
    return <div className="alert alert-success">✅ Data loaded successfully</div>
  }

  return null
}

function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [status, setStatus] = useState('idle')
  const [theme, setTheme] = useState('light')

  const handleLogin = () => {
    setIsLoggedIn(true)
    setUser({ name: 'John Doe', role: 'Administrator' })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  const simulateLoading = () => {
    setStatus('loading')
    setTimeout(() => setStatus('success'), 2000)
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2>🔀 Conditional Rendering Examples</h2>
        </div>
        <div className="card-body">
          
          {/* Example 1: Login/Logout Conditional Rendering */}
          <section className="mb-5">
            <h4 className="mb-3">1. Login/Dashboard Conditional Rendering</h4>
            {isLoggedIn ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <LoginMessage onLogin={handleLogin} />
            )}
          </section>

          {/* Example 2: Toggle Details with && operator */}
          <section className="mb-5">
            <h4 className="mb-3">2. Toggle Details (using && operator)</h4>
            <button 
              className="btn btn-info"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </button>
            {showDetails && (
              <div className="card mt-3 bg-light">
                <div className="card-body">
                  <h5>📊 Additional Details</h5>
                  <p>This content is conditionally rendered using the && operator</p>
                  <ul>
                    <li>React Version: 18.2.0</li>
                    <li>Vite Version: 5.0.8</li>
                    <li>Bootstrap Version: 5.3.2</li>
                  </ul>
                </div>
              </div>
            )}
          </section>

          {/* Example 3: Loading Status */}
          <section className="mb-5">
            <h4 className="mb-3">3. Status-based Rendering</h4>
            <button 
              className="btn btn-secondary"
              onClick={simulateLoading}
              disabled={status === 'loading'}
            >
              Simulate Loading
            </button>
            <div className="mt-3">
              <UserStatus status={status} />
            </div>
          </section>

          {/* Example 4: Ternary with Inline Styles */}
          <section className="mb-5">
            <h4 className="mb-3">4. Theme Toggle (Ternary Operator)</h4>
            <button 
              className="btn btn-warning"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
            <div 
              className="card mt-3"
              style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#2c3e50',
                color: theme === 'light' ? '#000000' : '#ffffff'
              }}
            >
              <div className="card-body">
                <h5>Current Theme: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}</h5>
                <p>This card's style changes based on the selected theme</p>
              </div>
            </div>
          </section>

          {/* Example 5: Multiple Conditions */}
          <section>
            <h4 className="mb-3">5. Multiple Conditions</h4>
            <div className="alert alert-info">
              {isLoggedIn ? (
                <>
                  <strong>Status:</strong> Online 🟢<br />
                  <strong>User:</strong> {user?.name}<br />
                  <strong>Theme:</strong> {theme}
                </>
              ) : (
                <>
                  <strong>Status:</strong> Offline 🔴<br />
                  <strong>Message:</strong> Please login to continue
                </>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default ConditionalRendering
