import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import WeatherWidget from './WeatherWidget';
import { articlesAPI } from '../services/api';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [popularArticles, setPopularArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        setLoading(true);
        const response = await articlesAPI.getAll({ limit: 5 });
        setPopularArticles(response.articles || []);
      } catch (error) {
        console.error('Error fetching popular articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularArticles();
  }, []);

  return (
    <aside className="sidebar" style={{
      width: isMobile ? '100%' : '300px',
      marginTop: isMobile ? '2rem' : '0',
      borderTop: isMobile ? '1px solid #e5e7eb' : 'none',
      paddingTop: isMobile ? '2rem' : '0'
    }}>
      <h2 className="sidebar-title">
        Mais Lidas
      </h2>
      
      <div>
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#6b7280'
          }}>
            <div style={{ 
              width: '30px', 
              height: '30px', 
              border: '2px solid #f3f4f6', 
              borderTop: '2px solid #dc2626', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            Carregando...
          </div>
        ) : popularArticles.length > 0 ? (
          popularArticles.map((article, index) => (
            <div key={article._id} className="sidebar-item">
              <span className="sidebar-number">
                {index + 1}
              </span>
              <NewsCard article={article} variant="sidebar" />
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#6b7280'
          }}>
            <p>Nenhum artigo encontrado</p>
          </div>
        )}
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
      <WeatherWidget />
    </aside>
  );
};

export default Sidebar;
