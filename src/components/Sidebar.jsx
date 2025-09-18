import React from 'react';
import NewsCard from './NewsCard';

const Sidebar = ({ news = [] }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">
        Mais Lidas
      </h2>
      
      <div>
        {news.map((article, index) => (
          <div key={article.id} className="sidebar-item">
            <span className="sidebar-number">
              {index + 1}
            </span>
            <NewsCard article={article} variant="sidebar" />
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="newsletter">
        <h3>Newsletter PRIORADO</h3>
        <p>
          Receba as principais notícias direto no seu email
        </p>
        <div>
          <input
            type="email"
            placeholder="Seu email"
            className="newsletter-input"
          />
          <button className="newsletter-btn">
            Assinar
          </button>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="weather">
        <h3>
          <svg className="weather-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Clima - São Paulo
        </h3>
        <div className="weather-content">
          <div>
            <span className="weather-temp">23°C</span>
            <p className="weather-desc">Parcialmente nublado</p>
          </div>
          <div style={{ color: '#1d4ed8' }}>
            <svg style={{ width: '2rem', height: '2rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
