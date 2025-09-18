import React from 'react';

const FeaturedArticle = ({ article }) => {
  // Default article if none provided
  if (!article) {
    return null;
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article className="featured-article">
      <img
        src={article.imageUrl}
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
          {article.summary}
        </p>
        
        <div className="article-meta">
          <span>Por {article.author}</span>
          <time>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;
