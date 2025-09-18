import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { articlesAPI } from '../services/api';
import { useCategory } from '../contexts/CategoryContext';

const NewsGrid = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { selectedCategory } = useCategory();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let response;
        
        if (selectedCategory === 'Últimas') {
          response = await articlesAPI.getAll({ limit: 12 });
        } else {
          response = await articlesAPI.getByCategory(selectedCategory, 12);
        }
        
        setArticles(response.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Erro ao carregar notícias');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  if (loading) {
    return (
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="section-title">
          Principais Notícias
        </h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '200px',
          color: '#6b7280'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid #f3f4f6', 
              borderTop: '3px solid #dc2626', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            Carregando notícias...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="section-title">
          Principais Notícias
        </h2>
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#dc2626',
          backgroundColor: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="section-title">
          Principais Notícias
        </h2>
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#6b7280'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
            Nenhuma notícia encontrada
          </h3>
          <p>Seja o primeiro a publicar uma notícia no PRIORADO!</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 className="section-title">
        Principais Notícias
      </h2>
      <div className="news-grid">
        {articles.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
