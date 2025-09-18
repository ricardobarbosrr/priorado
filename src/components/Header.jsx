import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/PRIORADO.png" 
            alt="PRIORADO" 
            className="logo-image"
          />
          {/*<span className="logo-subtitle">
           A insurgência renova.
          </span>*/}
        </div>

        {/* Search and User Actions */}
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar notícias..."
              className="search-input"
            />
            <svg
              className="search-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <svg
            className="search-icon-mobile"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <Link to="/login" className="login-btn">
            Login
          </Link>
          <button className="subscribe-btn">
            Assinar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
