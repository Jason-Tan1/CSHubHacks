import React from 'react';
import { Link } from 'react-router-dom'
import './LandingPage.css';
import shieldIcon from '/shield-check.svg';
import fileTextIcon from '/file-text.svg';
import mapPinIcon from '/map-pin.svg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Your AI-Powered Housing Rights Advocate</h1>
            <p>
              Instantly scan for unsafe conditions, understand your tenant rights, and find legal support—all in one place.
            </p>
            <Link to="/signup" className="get-started-btn">Get Started for Free</Link>
          </div>
          <div className="hero-image">
            <div className="card-mockup">
              <div className="card-header">
                <div className="card-icon-placeholder"></div>
                <div className="card-line-placeholder"></div>
              </div>
              <div className="card-body-placeholder"></div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
                <img src={shieldIcon} alt="Shield Icon" />
            </div>
            <h2>Detect Unsafe Conditions</h2>
            <p>
              Use your phone's camera to scan for potential hazards like mold, pests, and wiring issues. Our AI provides an instant analysis.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
                <img src={fileTextIcon} alt="File Text Icon" />
            </div>
            <h2>Understand Your Rights</h2>
            <p>
              Get clear, concise summaries of your local housing laws. Our AI translates complex legal jargon into plain language.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
                <img src={mapPinIcon} alt="Map Pin Icon" />
            </div>
            <h2>Find Legal Support</h2>
            <p>
              Instantly locate nearby tenant unions and legal aid clinics on an interactive map. Get contact information and directions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
