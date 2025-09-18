import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { articlesAPI } from '../services/api';

const FeaturedArticle = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    if (article) {
      navigate(`/artigo/${article._id}`);
    }
  };

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        setLoading(true);
        const response = await articlesAPI.getFeatured();
        if (response.articles && response.articles.length > 0) {
          setArticle(response.articles[0]);
        } else {
          // If no featured articles, get the latest one
          const latestResponse = await articlesAPI.getAll({ limit: 1 });
          if (latestResponse.articles && latestResponse.articles.length > 0) {
            setArticle(latestResponse.articles[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching featured article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticle();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      
      return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Data inválida';
    }
  };

  if (loading) {
    return (
      <article className="featured-article" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '400px',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #f3f4f6', 
            borderTop: '3px solid #dc2626', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Carregando artigo em destaque...
        </div>
      </article>
    );
  }

  if (!article) {
    return (
      <article className="featured-article" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '400px',
        backgroundColor: '#f9fafb',
        textAlign: 'center'
      }}>
        <div style={{ color: '#6b7280' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
            Nenhum artigo em destaque
          </h2>
          <p>Publique o primeiro artigo para aparecer aqui!</p>
        </div>
      </article>
    );
  }

  return (
    <article 
      className="featured-article"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={article.imageUrl || '/placeholder-image.jpg'}
        alt={article.title}
        className="featured-image"
      />
      
      <div className="featured-overlay">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="category-tag">
            {article.category}
          </span>
          <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>{article.readTime} de leitura</span>
        </div>
        
        <h1 className="featured-title">
          {article.title}
        </h1>
        
        <p className="featured-summary">
          {article.summary && article.summary.split(' ').length > 23 
            ? article.summary.split(' ').slice(0, 23).join(' ') + '...'
            : article.summary
          }
        </p>
        
        <div className="article-meta">
          <span>Por {article.author}</span>
          <time>{formatDate(article.publishedAt || article.createdAt)}</time>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;
