import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/**
 * Home Page — Landing page with welcome message and navigation buttons.
 */
const Home = () => {
  return (
    <div className="home-page" id="home-page">
      {/* Animated background particles */}
      <div className="home-bg-effects">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <div className="home-content">
        <div className="home-badge">🚀 Team Management Platform</div>
        <h1 className="home-title">
          Welcome to <span className="highlight">Team-14</span>
        </h1>
        <p className="home-subtitle">
          Effortlessly manage your student team members. Add profiles, browse
          the roster, and keep your team organized — all in one beautiful place.
        </p>

        <div className="home-actions">
          <Link to="/add" className="home-btn home-btn-primary" id="btn-add-member">
            <span className="btn-icon">➕</span>
            Add Member
          </Link>
          <Link to="/members" className="home-btn home-btn-secondary" id="btn-view-members">
            <span className="btn-icon">👥</span>
            View Members
          </Link>
        </div>

        <div className="home-stats">
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-label">Fast & Modern</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔒</span>
            <span className="stat-label">Secure Storage</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📱</span>
            <span className="stat-label">Fully Responsive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
