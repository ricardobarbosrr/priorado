import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articlesAPI } from '../services/api';
import Header from './Header';
import Footer from './Footer';

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await articlesAPI.getById(id);
        console.log('API Response:', response); // Debug log
        
        // Handle different response formats
        if (response.article) {
          setArticle(response.article);
        } else if (response.data) {
          setArticle(response.data);
        } else if (response._id) {
          // Direct article object
          setArticle(response);
        } else {
          console.error('Unexpected response format:', response);
          setError('Formato de resposta inesperado');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Artigo não encontrado');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

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
      <div className="app">
        <Header />
        <main className="main-content">
          <div className="main-container">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px',
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
                Carregando artigo...
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="app">
        <Header />
        <main className="main-content">
          <div className="main-container">
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#dc2626'
            }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {error || 'Artigo não encontrado'}
              </h1>
              <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
                O artigo que você está procurando não existe ou foi removido.
              </p>
              <button 
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Voltar ao início
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="main-container">
          <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '2rem' }}>
              <button 
                onClick={() => navigate('/')}
                style={{
                  color: '#dc2626',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Voltar para o início
              </button>
            </nav>

            {/* Article Header */}
            <header style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {article.category}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {article.readTime} de leitura
                </span>
              </div>

              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                lineHeight: '1.2',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                {article.title}
              </h1>

              {article.summary && (
                <p style={{
                  fontSize: '1.25rem',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  {article.summary}
                </p>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>
                  Por {article.author}
                </span>
                <time style={{ color: '#6b7280' }}>
                  {formatDate(article.publishedAt || article.createdAt)}
                </time>
              </div>
            </header>

            {/* Article Image */}
            {article.imageUrl && (
              <div style={{ marginBottom: '2rem' }}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            )}

            {/* Article Content */}
            <div style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }} />
              ) : (
                <p>Conteúdo não disponível.</p>
              )}
            </div>

            {/* Article Footer */}
            <footer style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Publicado em {formatDate(article.publishedAt || article.createdAt)}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => window.history.back()}
                    style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Voltar
                  </button>
                  
                  <button
                    onClick={() => navigate('/')}
                    style={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Mais notícias
                  </button>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleView;
