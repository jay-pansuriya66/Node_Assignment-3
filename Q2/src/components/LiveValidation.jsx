import { useState, useEffect } from 'react'

function LiveValidation() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    age: ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  // Validation rules
  const validateField = (name, value) => {
    let error = ''

    switch (name) {
      case 'username':
        if (!value) {
          error = 'Username is required'
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters'
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers, and underscores'
        }
        break

      case 'email':
        if (!value) {
          error = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format'
        }
        break

      case 'password':
        if (!value) {
          error = 'Password is required'
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain uppercase, lowercase, and number'
        }
        break

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password'
        } else if (value !== formData.password) {
          error = 'Passwords do not match'
        }
        break

      case 'phone':
        if (value && !/^\d{10}$/.test(value.replace(/[-\s]/g, ''))) {
          error = 'Phone number must be 10 digits'
        }
        break

      case 'website':
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          error = 'Invalid URL format (must start with http:// or https://)'
        }
        break

      case 'age':
        if (value && (isNaN(value) || value < 1 || value > 120)) {
          error = 'Age must be between 1 and 120'
        }
        break

      default:
        break
    }

    return error
  }

  // Validate all fields
  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    return newErrors
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validate field on change if it has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Handle blur (mark field as touched)
  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, formData[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  // Check if form is valid
  useEffect(() => {
    const allErrors = validateForm()
    const hasErrors = Object.values(allErrors).some(error => error !== '')
    const hasRequiredFields = formData.username && formData.email && 
                              formData.password && formData.confirmPassword
    setIsFormValid(!hasErrors && hasRequiredFields)
  }, [formData])

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = {}
    Object.keys(formData).forEach(key => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    // Validate all fields
    const allErrors = validateForm()
    setErrors(allErrors)

    if (Object.values(allErrors).every(error => !error)) {
      alert('Form submitted successfully! ✅\nCheck console for data.')
      console.log('Form Data:', formData)
    }
  }

  // Get input class based on validation status
  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return 'form-control'
    return errors[fieldName] 
      ? 'form-control is-invalid' 
      : 'form-control is-valid'
  }

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password
    if (!password) return { strength: 0, label: 'No password', color: 'secondary' }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    const levels = [
      { strength: 1, label: 'Very Weak', color: 'danger' },
      { strength: 2, label: 'Weak', color: 'warning' },
      { strength: 3, label: 'Fair', color: 'info' },
      { strength: 4, label: 'Good', color: 'primary' },
      { strength: 5, label: 'Strong', color: 'success' }
    ]

    return levels[strength - 1] || levels[0]
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white">
          <h2>✅ Live Form Validation</h2>
        </div>
        <div className="card-body">

          <div className="row">
            <div className="col-md-8">
              <form onSubmit={handleSubmit} noValidate>
                
                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={getInputClass('username')}
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter username"
                  />
                  {touched.username && errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                  {touched.username && !errors.username && formData.username && (
                    <div className="valid-feedback">Looks good!</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={getInputClass('email')}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="example@email.com"
                  />
                  {touched.email && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  {touched.email && !errors.email && formData.email && (
                    <div className="valid-feedback">Email format is correct!</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className={getInputClass('password')}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small>Password Strength:</small>
                        <span className={`badge bg-${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="progress" style={{ height: '5px' }}>
                        <div 
                          className={`progress-bar bg-${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className={getInputClass('confirmPassword')}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                  {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                    <div className="valid-feedback">Passwords match!</div>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone (Optional)</label>
                  <input
                    type="tel"
                    className={getInputClass('phone')}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="1234567890"
                  />
                  {touched.phone && errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                {/* Website */}
                <div className="mb-3">
                  <label htmlFor="website" className="form-label">Website (Optional)</label>
                  <input
                    type="url"
                    className={getInputClass('website')}
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://example.com"
                  />
                  {touched.website && errors.website && (
                    <div className="invalid-feedback">{errors.website}</div>
                  )}
                </div>

                {/* Age */}
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age (Optional)</label>
                  <input
                    type="number"
                    className={getInputClass('age')}
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter age"
                  />
                  {touched.age && errors.age && (
                    <div className="invalid-feedback">{errors.age}</div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={!isFormValid}
                >
                  {isFormValid ? '✅ Submit Form' : '❌ Please fix errors'}
                </button>
              </form>
            </div>

            {/* Validation Status Sidebar */}
            <div className="col-md-4">
              <div className="card bg-light sticky-top">
                <div className="card-body">
                  <h5 className="card-title">Validation Status</h5>
                  <hr />
                  
                  <div className="mb-3">
                    <strong>Form Valid:</strong>
                    <span className={`badge ms-2 ${isFormValid ? 'bg-success' : 'bg-danger'}`}>
                      {isFormValid ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>

                  <h6>Field Status:</h6>
                  <ul className="list-group list-group-flush">
                    {Object.keys(formData).map(key => (
                      <li key={key} className="list-group-item d-flex justify-content-between align-items-center p-2">
                        <small className="text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</small>
                        {!touched[key] ? (
                          <span className="badge bg-secondary">Not touched</span>
                        ) : errors[key] ? (
                          <span className="badge bg-danger">❌</span>
                        ) : formData[key] ? (
                          <span className="badge bg-success">✅</span>
                        ) : (
                          <span className="badge bg-warning">Empty</span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3">
                    <h6>Validation Features:</h6>
                    <ul className="small">
                      <li>Real-time validation</li>
                      <li>Password strength meter</li>
                      <li>Visual feedback</li>
                      <li>Touch-based validation</li>
                    </ul>
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

export default LiveValidation
