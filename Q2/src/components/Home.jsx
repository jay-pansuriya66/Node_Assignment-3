import { Link } from 'react-router-dom'

function Home() {
  const features = [
    { title: 'Conditional Rendering', path: '/conditional', icon: '🔀', desc: 'Dynamic UI based on conditions' },
    { title: 'Lists & Nested Components', path: '/lists', icon: '📋', desc: 'Rendering lists and nested structures' },
    { title: 'Children/Containment', path: '/children', icon: '📦', desc: 'Component composition patterns' },
    { title: 'Forms (useState/useRef)', path: '/forms', icon: '📝', desc: 'Form handling with hooks' },
    { title: 'Digital Clock', path: '/clock', icon: '⏰', desc: 'Live clock using useEffect' },
    { title: 'Live Validation', path: '/validation', icon: '✅', desc: 'Real-time form validation' },
    { title: 'Data Filter', path: '/filter', icon: '🔍', desc: 'Live filtering of data' },
    { title: 'CRUD Operations', path: '/crud', icon: '🔧', desc: 'Full CRUD with Express API' }
  ]

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold text-white mb-3">
          ⚛️ React Vite Application
        </h1>
        <p className="lead text-white-50">
          Complete demonstration of React concepts with Bootstrap & Router
        </p>
      </div>

      <div className="row g-4">
        {features.map((feature, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <Link to={feature.path} className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <div className="display-4 mb-3">{feature.icon}</div>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="card mt-5 bg-dark text-white">
        <div className="card-body">
          <h3 className="card-title">🎯 Project Features</h3>
          <ul className="list-unstyled mt-3">
            <li>✅ Vite-based React application</li>
            <li>✅ Bootstrap 5 integration</li>
            <li>✅ React Router for navigation</li>
            <li>✅ Function components with hooks</li>
            <li>✅ Express API backend</li>
            <li>✅ Multiple React concepts demonstrated</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
