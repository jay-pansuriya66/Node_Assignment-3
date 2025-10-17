import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import ConditionalRendering from './components/ConditionalRendering'
import ListsAndNested from './components/ListsAndNested'
import ChildrenContainment from './components/ChildrenContainment'
import FormComponent from './components/FormComponent'
import DigitalClock from './components/DigitalClock'
import LiveValidation from './components/LiveValidation'
import LiveDataFilter from './components/LiveDataFilter'
import CrudOperations from './components/CrudOperations'

function App() {
  return (
    <div className="min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            🚀 React Vite App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/conditional">Conditional Rendering</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lists">Lists & Nested</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/children">Children/Containment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forms">Forms (useState/useRef)</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clock">Digital Clock</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/validation">Live Validation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/filter">Data Filter</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crud">CRUD Operations</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conditional" element={<ConditionalRendering />} />
          <Route path="/lists" element={<ListsAndNested />} />
          <Route path="/children" element={<ChildrenContainment />} />
          <Route path="/forms" element={<FormComponent />} />
          <Route path="/clock" element={<DigitalClock />} />
          <Route path="/validation" element={<LiveValidation />} />
          <Route path="/filter" element={<LiveDataFilter />} />
          <Route path="/crud" element={<CrudOperations />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
