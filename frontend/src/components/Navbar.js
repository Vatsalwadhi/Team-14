import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navigation bar component.
 * Highlights the active route link.
 */
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">👥</span>
          <span className="logo-text">TeamHub</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            id="nav-home"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}
            id="nav-add"
          >
            Add Member
          </Link>
        </li>
        <li>
          <Link
            to="/members"
            className={`nav-link ${location.pathname.startsWith('/members') ? 'active' : ''}`}
            id="nav-members"
          >
            Members
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
