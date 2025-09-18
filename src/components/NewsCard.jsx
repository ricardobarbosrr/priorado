import React from 'react';

const NewsCard = ({ article, variant = 'default' }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (variant === 'sidebar') {
    return (
      <div className="sidebar-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="sidebar-category">
            {article.category}
          </span>
          <span className="sidebar-time">{article.readTime}</span>
        </div>
        
        <h3 className="sidebar-article-title">
          {article.title}
        </h3>
        
        <time className="sidebar-time">
          {formatDate(article.publishedAt)}
        </time>
      </div>
    );
  }

  return (
    <article className="news-card">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="news-image"
        />
      )}
      
      <div className="news-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span className="news-category">
            {article.category}
          </span>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{article.readTime} de leitura</span>
        </div>
        
        <h2 className="news-title">
          {article.title}
        </h2>
        
        {article.summary && (
          <p className="news-summary">
            {article.summary}
          </p>
        )}
        
        <div className="news-meta">
          <span>Por {article.author}</span>
          <time>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
