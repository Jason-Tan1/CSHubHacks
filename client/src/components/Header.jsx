import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link" aria-label="TenantShield home">
        <div className="logo-container">
          <div className="logo-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l7 4v5c0 5-3.58 9.74-7 11-3.42-1.26-7-6-7-11V6l7-4z" fill="#3B82F6"/>
              <path d="M8.8 12.8l1.9 1.9L15.3 9.1" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div className="logo-text">
            <h1>TenantShield</h1>
            <p>Know Your Rights, AI Will Help</p>
          </div>
        </div>
      </Link>

      <nav className="header-nav">
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <div className="header-actions">
        <Link to="/login" className="ghost-button">Log In</Link>
      </div>
    </header>
  )
}

export default Header
