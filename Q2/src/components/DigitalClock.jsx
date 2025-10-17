import { useState, useEffect } from 'react'

function DigitalClock() {
  const [time, setTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(true)
  const [showSeconds, setShowSeconds] = useState(true)
  const [timezone, setTimezone] = useState('local')

  // Update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(intervalId)
      console.log('Clock cleanup: interval cleared')
    }
  }, []) // Empty dependency array means this runs once on mount

  // Format time based on settings
  const formatTime = () => {
    let hours = time.getHours()
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')
    
    let ampm = ''
    if (!is24Hour) {
      ampm = hours >= 12 ? ' PM' : ' AM'
      hours = hours % 12 || 12
    }
    
    hours = hours.toString().padStart(2, '0')
    
    return showSeconds 
      ? `${hours}:${minutes}:${seconds}${ampm}`
      : `${hours}:${minutes}${ampm}`
  }

  // Format date
  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return time.toLocaleDateString('en-US', options)
  }

  // Get timezone offset
  const getTimezoneOffset = () => {
    const offset = -time.getTimezoneOffset() / 60
    return `UTC${offset >= 0 ? '+' : ''}${offset}`
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-danger text-white">
          <h2>⏰ Digital Clock (useState & useEffect)</h2>
        </div>
        <div className="card-body">

          {/* Main Clock Display */}
          <div className="text-center mb-5">
            <div className="digital-clock mb-3">
              {formatTime()}
            </div>
            <h4 className="text-white mb-2">{formatDate()}</h4>
            <p className="text-white-50">Timezone: {getTimezoneOffset()}</p>
          </div>

          {/* Clock Controls */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Time Format</h5>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="formatSwitch"
                      checked={is24Hour}
                      onChange={(e) => setIs24Hour(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="formatSwitch">
                      {is24Hour ? '24-Hour' : '12-Hour'} Format
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Show Seconds</h5>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="secondsSwitch"
                      checked={showSeconds}
                      onChange={(e) => setShowSeconds(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="secondsSwitch">
                      {showSeconds ? 'Hide' : 'Show'} Seconds
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Current Status</h5>
                  <p className="mb-0">
                    <span className="badge bg-success me-2">🟢 Live</span>
                    Updates every second
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Components Breakdown */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h1 className="display-4">{time.getHours().toString().padStart(2, '0')}</h1>
                  <p className="text-muted mb-0">Hours</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h1 className="display-4">{time.getMinutes().toString().padStart(2, '0')}</h1>
                  <p className="text-muted mb-0">Minutes</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h1 className="display-4">{time.getSeconds().toString().padStart(2, '0')}</h1>
                  <p className="text-muted mb-0">Seconds</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h1 className="display-4">{time.getMilliseconds().toString().padStart(3, '0')}</h1>
                  <p className="text-muted mb-0">Milliseconds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Time Info */}
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title mb-3">📊 Additional Time Information</h5>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Day of Week:</strong>
                      <span>{time.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Month:</strong>
                      <span>{time.toLocaleDateString('en-US', { month: 'long' })}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Year:</strong>
                      <span>{time.getFullYear()}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Day of Month:</strong>
                      <span>{time.getDate()}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Day of Year:</strong>
                      <span>{Math.floor((time - new Date(time.getFullYear(), 0, 0)) / 86400000)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Week Number:</strong>
                      <span>{Math.ceil(Math.floor((time - new Date(time.getFullYear(), 0, 0)) / 86400000) / 7)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Code Explanation */}
          <div className="alert alert-info mt-4">
            <h5 className="alert-heading">💡 How it Works</h5>
            <ul className="mb-0">
              <li><strong>useState:</strong> Manages the current time and display settings</li>
              <li><strong>useEffect:</strong> Sets up an interval that updates time every second</li>
              <li><strong>Cleanup:</strong> Returns a cleanup function to clear the interval on unmount</li>
              <li><strong>Re-rendering:</strong> Component re-renders every second when state updates</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DigitalClock
