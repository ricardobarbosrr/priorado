import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { canPublish, isAuthenticated, user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <header className="header">
      <div className="header-container" style={{ 
        display: 'flex', 
        justifyContent: isMobile ? 'center' : 'space-between', 
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Left spacer for balance - only visible on desktop */}
        {!isMobile && <div style={{ flex: 1 }}></div>}
        
        {/* Centered Logo */}
        <div className="flex items-center" style={{
          position: isMobile ? 'absolute' : 'relative',
          left: isMobile ? '50%' : 'auto',
          transform: isMobile ? 'translateX(-50%)' : 'none'
        }}>
          <img 
            src="/PRIORADO.png" 
            alt="PRIORADO" 
            className="logo-image"
          />
        </div>

        {/* Action Buttons */}
        <div className="header-actions" style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'flex-end',
          visibility: isMobile ? 'hidden' : 'visible' 
        }}>

          {/* Publish button - only for redator/admin */}
          {canPublish() && !isMobile && (
            <Link 
              to="/publicar" 
              style={{
                color: '#dc2626',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                transition: 'all 0.2s ease',
                opacity: 0.8,
                display: isMobile ? 'none' : 'inline-block',
                marginRight: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#b91c1c';
                e.target.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#dc2626';
                e.target.style.opacity = '0.8';
              }}
            >
              Publicar
            </Link>
          )}

          {/* Authentication buttons */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {!isMobile && (
                <span style={{ color: '#374151', fontSize: '0.875rem', display: isMobile ? 'none' : 'inline' }}>
                  Olá, {user?.name || user?.email}
                </span>
              )}
              {!isMobile && (
                <button 
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.25rem',
                    transition: 'color 0.2s ease',
                    display: isMobile ? 'none' : 'inline-block'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#374151'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Sair
                </button>
              )}
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="login-btn"
              >
                Login
              </Link>
              
              <Link 
                to="/assinar" 
                className="subscribe-btn"
              >
                Assinar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
