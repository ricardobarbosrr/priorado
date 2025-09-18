import React from 'react';
import NewsCard from './NewsCard';
import { topNews } from '../data/mockNews';

const NewsGrid = () => {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 className="section-title">
        Principais Notícias
      </h2>
      <div className="news-grid">
        {topNews.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
