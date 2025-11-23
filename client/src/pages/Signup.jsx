import { useState } from 'react'
import '../App.css'

function Signup({ onSignup }) {
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSignup({ fullName, address })
    }, 600)
  }

  return (
    <div className="signup-root">
      <div className="signup-left">
        <div className="signup-logo-row">
          <div className="signup-logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="#2563eb"/>
            </svg>
          </div>
          <span className="signup-logo-text">Tenant Shield</span>
        </div>
        <div className="signup-badge">SMART ADDRESS MATCH</div>
        <h1 className="signup-title">Protecting your<br/>home starts here.</h1>
        <p className="signup-desc">
          We analyze local ordinances based on your specific address to find lease violations that generic tools miss.
        </p>
        <div className="signup-footer-row">
        </div>
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="signup-form-title">Let's get you started</h2>
          <p className="signup-form-desc">We just need a few details to customize your protection plan.</p>
          <div className="signup-form-group">
            <label htmlFor="fullName" className="signup-label">Full Name</label>
            <div className="signup-input-row">
              <span className="signup-input-icon">👤</span>
              <input
                id="fullName"
                className="signup-input"
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="signup-form-group">
            <label htmlFor="address" className="signup-label">Home Address</label>
            <div className="signup-input-row">
              <span className="signup-input-icon">🔍</span>
              <input
                id="address"
                className="signup-input"
                type="text"
                placeholder="e.g. 123 Example Road"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className={`signup-submit${loading ? ' loading' : ''}`}
            type="submit"
            disabled={loading || !fullName || !address}
          >
            {loading ? 'Locating...' : 'Locate Property →'}
          </button>
          <div className="signup-form-footer-row">
            <span className="signup-form-footer-left">🔒 Secure Connection</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
