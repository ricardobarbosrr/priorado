import React, { useState } from 'react';
import SearchModal from './SearchModal';
import { useCategory } from '../contexts/CategoryContext';
import TickerTape from './TickerTape';

const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { selectedCategory, setSelectedCategory } = useCategory();
  
  const categories = [
    'Últimas',
    'Política',
    'Economia',
    'Mundo',
    'Tecnologia',
    'Esportes',
    'Cultura',
    'Saúde',
    'Opinião',
    'Artigos',
    'Turismo'
  ];

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-links">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(category);
                }}
                style={{
                  fontWeight: selectedCategory === category ? '600' : '400',
                  borderBottom: selectedCategory === category ? '2px solid #dc2626' : 'none',
                  paddingBottom: selectedCategory === category ? '0.25rem' : '0'
                }}
              >
                {category}
              </a>
            ))}
            
            {/* Search Icon Button */}
            <button 
              className="nav-search-btn"
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0.5rem',
                marginLeft: '1rem',
                borderRadius: '0.25rem',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              title="Pesquisar"
            >
              <svg
                width="18"
                height="18"
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
            </button>
          </div>
          
          <div className="nav-date">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
        
        {/* Search Modal */}
        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      </nav>
      
      {/* Ticker Tape de Cotações */}
      <TickerTape />
    </>
  );
};

export default Navigation;
