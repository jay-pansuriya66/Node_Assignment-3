import { useState, useRef } from 'react'

function FormComponent() {
  // useState for controlled components
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    gender: '',
    interests: [],
    newsletter: false
  })

  const [submittedData, setSubmittedData] = useState(null)

  // useRef for uncontrolled components
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const fileRef = useRef(null)
  const [refFormData, setRefFormData] = useState(null)

  // Handle controlled form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox' && name === 'interests') {
      setFormData(prev => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter(item => item !== value)
      }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Handle controlled form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedData(formData)
    console.log('Submitted Data (useState):', formData)
  }

  // Handle uncontrolled form submission (useRef)
  const handleRefSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
      file: fileRef.current.files[0]?.name || 'No file selected'
    }
    setRefFormData(data)
    console.log('Submitted Data (useRef):', data)
  }

  // Reset forms
  const resetControlledForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      country: '',
      gender: '',
      interests: [],
      newsletter: false
    })
    setSubmittedData(null)
  }

  const resetRefForm = () => {
    nameRef.current.value = ''
    emailRef.current.value = ''
    messageRef.current.value = ''
    fileRef.current.value = ''
    setRefFormData(null)
  }

  // Focus on first input
  const focusFirstInput = () => {
    nameRef.current.focus()
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-warning text-dark">
          <h2>📝 Forms using useState & useRef</h2>
        </div>
        <div className="card-body">

          {/* Controlled Form using useState */}
          <section className="mb-5">
            <h4 className="mb-4">1. Controlled Form (useState)</h4>
            <div className="row">
              <div className="col-md-8">
                <form onSubmit={handleSubmit} className="card bg-light p-4">
                  
                  {/* Name Input */}
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

                  {/* Email Input */}
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

                  {/* Password Input */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Country Select */}
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <select
                      className="form-select"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="usa">USA</option>
                      <option value="india">India</option>
                      <option value="uk">UK</option>
                      <option value="canada">Canada</option>
                    </select>
                  </div>

                  {/* Gender Radio */}
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="male">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="female">Female</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="other"
                          value="other"
                          checked={formData.gender === 'other'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="other">Other</label>
                      </div>
                    </div>
                  </div>

                  {/* Interests Checkboxes */}
                  <div className="mb-3">
                    <label className="form-label">Interests</label>
                    <div>
                      {['Sports', 'Music', 'Reading', 'Gaming'].map(interest => (
                        <div key={interest} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="interests"
                            value={interest}
                            id={interest}
                            checked={formData.interests.includes(interest)}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor={interest}>
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Checkbox */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="newsletter"
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="newsletter">
                        Subscribe to newsletter
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={resetControlledForm}>
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-md-4">
                <div className="card bg-info text-white sticky-top">
                  <div className="card-body">
                    <h5>Current Values (Live)</h5>
                    <hr />
                    <small>
                      <strong>Name:</strong> {formData.name || 'N/A'}<br />
                      <strong>Email:</strong> {formData.email || 'N/A'}<br />
                      <strong>Country:</strong> {formData.country || 'N/A'}<br />
                      <strong>Gender:</strong> {formData.gender || 'N/A'}<br />
                      <strong>Interests:</strong> {formData.interests.join(', ') || 'None'}<br />
                      <strong>Newsletter:</strong> {formData.newsletter ? 'Yes' : 'No'}
                    </small>
                  </div>
                </div>

                {submittedData && (
                  <div className="card bg-success text-white mt-3">
                    <div className="card-body">
                      <h6>✅ Submitted!</h6>
                      <small>Check console for details</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Uncontrolled Form using useRef */}
          <section>
            <h4 className="mb-4">2. Uncontrolled Form (useRef)</h4>
            <div className="row">
              <div className="col-md-8">
                <form onSubmit={handleRefSubmit} className="card bg-light p-4">
                  
                  <div className="mb-3">
                    <label htmlFor="refName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="refName"
                      ref={nameRef}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="refEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="refEmail"
                      ref={emailRef}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      ref={messageRef}
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">Upload File</label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      ref={fileRef}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={resetRefForm}>
                      Reset
                    </button>
                    <button type="button" className="btn btn-info" onClick={focusFirstInput}>
                      Focus First Input
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-md-4">
                {refFormData && (
                  <div className="card bg-success text-white">
                    <div className="card-body">
                      <h5>✅ Submitted Data</h5>
                      <hr />
                      <small>
                        <strong>Name:</strong> {refFormData.name}<br />
                        <strong>Email:</strong> {refFormData.email}<br />
                        <strong>Message:</strong> {refFormData.message}<br />
                        <strong>File:</strong> {refFormData.file}
                      </small>
                    </div>
                  </div>
                )}

                <div className="card bg-warning mt-3">
                  <div className="card-body">
                    <h6>💡 useRef Benefits</h6>
                    <ul className="small mb-0">
                      <li>Direct DOM access</li>
                      <li>No re-renders on input</li>
                      <li>Better for large forms</li>
                      <li>Can focus elements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default FormComponent
