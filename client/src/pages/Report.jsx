import GoogleMap from '../components/GoogleMap'

function Report({ report, onBack, onRescan }) {
  const {
    summary = '',
    rightsSummary = '',
    applicableLaws = [],
    actions = [],
    landlordMessage = '',
    documentation = '',
    evidenceChecklist = [],
    clinicLinks = [],
    location = '',
  } = report || {}

  const normalizeList = (items) => {
    if (!items) return []
    if (Array.isArray(items)) return items
    return [items]
  }

  const renderList = (items) => {
    const list = normalizeList(items)
    return list && list.length > 0 ? (
      <ul className="report-list">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="muted">No items provided.</p>
    )
  }

  const renderClinics = (links) =>
    links && links.length > 0 ? (
      <div className="clinic-grid">
        {links.map((clinic, idx) => {
          const name = clinic?.name || `Legal aid option ${idx + 1}`
          const href =
            clinic?.link ||
            'https://www.google.com/maps/search/legal+aid+clinic'
          return (
            <a
              key={idx}
              className="clinic-card"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="clinic-name">{name}</div>
              <div className="clinic-link">View in Maps →</div>
            </a>
          )
        })}
      </div>
    ) : (
      <p className="muted">No clinics found. Try searching Google Maps for “legal aid clinic”.</p>
    )

  return (
    <main className="report-content">
      <div className="report-top">
        <div>
          <p className="eyebrow">TenantShield Report</p>
          <h2>Take a photo. Know your rights.</h2>
          <p className="subtitle">AI findings based on your uploads and notes.</p>
        </div>
        <div className="report-actions">
          <button className="ghost-button" onClick={onBack}>
            ← Back
          </button>
          <button className="primary-button" onClick={onRescan}>
            New Scan
          </button>
        </div>
      </div>

      <section className="report-card">
        <div className="card-header">
          <div className="pill pill-blue">Summary</div>
          <span className="status-chip success">Ready</span>
        </div>
        <p className="body-text">{summary || 'No summary provided.'}</p>
      </section>

      <section className="grid-2">
        <div className="report-card">
          <div className="card-header">
            <div className="pill pill-green">Your Rights</div>
          </div>
          <p className="body-text">{rightsSummary || 'No rights information returned.'}</p>
        </div>
        <div className="report-card">
          <div className="card-header">
            <div className="pill pill-amber">Applicable Laws</div>
          </div>
          {renderList(applicableLaws)}
        </div>
      </section>

      <section className="grid-2">
        <div className="report-card">
          <div className="card-header">
            <div className="pill pill-indigo">Actions</div>
          </div>
          {renderList(actions)}
        </div>
        <div className="report-card">
          <div className="card-header">
            <div className="pill pill-slate">Documentation</div>
          </div>
          <p className="body-text">{documentation || 'No documentation guidance provided.'}</p>
          <h4 className="section-title">Evidence checklist</h4>
          {renderList(evidenceChecklist)}
        </div>
      </section>

      <section className="report-card">
        <div className="card-header">
          <div className="pill pill-pink">Draft to Landlord</div>
        </div>
        <div className="draft-box">
          <p>{landlordMessage || 'No draft provided.'}</p>
        </div>
      </section>

      <section className="report-card">
        <div className="card-header">
          <div className="pill pill-cyan">Nearest Clinics</div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <GoogleMap location={location} legalClinics={clinicLinks} />
        </div>
        {renderClinics(clinicLinks)}
      </section>
    </main>
  )
}

export default Report
