import { useState } from 'react'

// Container component that uses children prop
function Card({ children, title, variant = 'primary' }) {
  return (
    <div className={`card border-${variant} mb-3`}>
      <div className={`card-header bg-${variant} text-white`}>
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

// Modal component with children
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tab container component
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="tabs-container">
      <ul className="nav nav-tabs">
        {children.map((child, index) => (
          <li key={index} className="nav-item">
            <button
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {child.props.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content p-3 border border-top-0">
        {children[activeTab]}
      </div>
    </div>
  )
}

// Tab pane component
function TabPane({ children }) {
  return <div>{children}</div>
}

// Alert Box component with children
function AlertBox({ type = 'info', icon, children }) {
  return (
    <div className={`alert alert-${type} d-flex align-items-center`}>
      {icon && <span className="me-2">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}

// Panel component with header, body, and footer slots
function Panel({ header, footer, children }) {
  return (
    <div className="card shadow-sm">
      {header && (
        <div className="card-header bg-dark text-white">
          {header}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer bg-light">
          {footer}
        </div>
      )}
    </div>
  )
}

// Layout component with sidebar and main content
function Layout({ sidebar, children }) {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card bg-light">
          <div className="card-body">
            {sidebar}
          </div>
        </div>
      </div>
      <div className="col-md-9">
        {children}
      </div>
    </div>
  )
}

function ChildrenContainment() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-info text-white">
          <h2>📦 Children & Containment Examples</h2>
        </div>
        <div className="card-body">

          {/* Example 1: Basic Card with Children */}
          <section className="mb-5">
            <h4 className="mb-3">1. Basic Card Component with Children</h4>
            <Card title="Welcome Card" variant="primary">
              <p>This is content passed as children to the Card component.</p>
              <p>You can pass any JSX elements as children!</p>
              <button className="btn btn-primary">Click Me</button>
            </Card>

            <Card title="Information" variant="success">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </Card>
          </section>

          {/* Example 2: Alert Boxes with Different Content */}
          <section className="mb-5">
            <h4 className="mb-3">2. Alert Box with Children</h4>
            <AlertBox type="success" icon="✅">
              <strong>Success!</strong> Your operation completed successfully.
            </AlertBox>

            <AlertBox type="warning" icon="⚠️">
              <strong>Warning!</strong> Please review your input.
            </AlertBox>

            <AlertBox type="danger" icon="❌">
              <strong>Error!</strong> Something went wrong.
              <ul className="mb-0 mt-2">
                <li>Check your network connection</li>
                <li>Verify your credentials</li>
              </ul>
            </AlertBox>
          </section>

          {/* Example 3: Tabs Component */}
          <section className="mb-5">
            <h4 className="mb-3">3. Tabs Component with Children</h4>
            <Tabs>
              <TabPane label="Home">
                <h5>Home Tab Content</h5>
                <p>This is the home tab content. It demonstrates how children can be organized in tabs.</p>
              </TabPane>
              <TabPane label="Profile">
                <h5>Profile Tab Content</h5>
                <div className="row">
                  <div className="col-md-6">
                    <strong>Name:</strong> John Doe
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong> john@example.com
                  </div>
                </div>
              </TabPane>
              <TabPane label="Settings">
                <h5>Settings Tab Content</h5>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="notifications" />
                  <label className="form-check-label" htmlFor="notifications">
                    Enable notifications
                  </label>
                </div>
              </TabPane>
            </Tabs>
          </section>

          {/* Example 4: Modal with Children */}
          <section className="mb-5">
            <h4 className="mb-3">4. Modal Component with Children</h4>
            <button 
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </button>

            <Modal 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
            >
              <h5>Modal Content</h5>
              <p>This modal demonstrates the children pattern.</p>
              <p>You can pass any content as children to this modal!</p>
              <div className="alert alert-info">
                This is a nested alert inside the modal!
              </div>
            </Modal>
          </section>

          {/* Example 5: Panel with Multiple Slots */}
          <section className="mb-5">
            <h4 className="mb-3">5. Panel with Header, Body, and Footer</h4>
            <Panel
              header={
                <div className="d-flex justify-content-between align-items-center">
                  <span>Panel Header</span>
                  <span className="badge bg-light text-dark">New</span>
                </div>
              }
              footer={
                <div className="text-end">
                  <button className="btn btn-sm btn-secondary me-2">Cancel</button>
                  <button className="btn btn-sm btn-primary">Save</button>
                </div>
              }
            >
              <h5>Panel Body Content</h5>
              <p>This panel demonstrates multiple "slots" using props.</p>
              <p>The header, body (children), and footer are all customizable!</p>
            </Panel>
          </section>

          {/* Example 6: Layout with Sidebar */}
          <section className="mb-5">
            <h4 className="mb-3">6. Layout Component with Sidebar</h4>
            <Layout
              sidebar={
                <>
                  <h6>Sidebar Menu</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2">📊 Dashboard</li>
                    <li className="mb-2">👤 Profile</li>
                    <li className="mb-2">⚙️ Settings</li>
                    <li className="mb-2">📝 Documents</li>
                  </ul>
                </>
              }
            >
              <div className="card">
                <div className="card-body">
                  <h5>Main Content Area</h5>
                  <p>This is the main content area. The sidebar is passed as a prop,
                     while this content is passed as children.</p>
                  <p>This pattern is useful for layouts where you have fixed regions
                     (like sidebar) and dynamic content.</p>
                </div>
              </div>
            </Layout>
          </section>

          {/* Example 7: Nested Containment */}
          <section>
            <h4 className="mb-3">7. Nested Containment</h4>
            <Card title="Outer Card" variant="warning">
              <p>This demonstrates nested containment:</p>
              <Card title="Inner Card 1" variant="info">
                <p>Content of inner card 1</p>
              </Card>
              <Card title="Inner Card 2" variant="success">
                <AlertBox type="success" icon="🎉">
                  Even more nesting! An alert inside a card inside a card.
                </AlertBox>
              </Card>
            </Card>
          </section>

        </div>
      </div>
    </div>
  )
}

export default ChildrenContainment
