import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI } from '../services/api';

const PublishArticle = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Política',
    author: '',
    imageUrl: '',
    readTime: '5 min'
  });

  const [showToolbar, setShowToolbar] = useState(false);

  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Política', 'Economia', 'Mundo', 'Tecnologia', 'Esportes', 
    'Cultura', 'Saúde', 'Educação', 'Meio Ambiente'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.title || !formData.summary || !formData.content || !formData.author) {
        setError('Por favor, preencha todos os campos obrigatórios');
        setLoading(false);
        return;
      }

      // Save article to MongoDB
      const response = await articlesAPI.create({
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        category: formData.category,
        imageUrl: formData.imageUrl,
        readTime: formData.readTime
      });

      setSuccess('Artigo publicado com sucesso!');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          summary: '',
          content: '',
          category: 'Política',
          author: '',
          imageUrl: '',
          readTime: '5 min'
        });
        setSuccess('');
        // Redirect to home page
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      console.error('Error publishing article:', error);
      setError(error.message || 'Erro ao publicar artigo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const insertFormatting = (type, value = '') => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    let newText = '';

    switch (type) {
      case 'highlight':
        newText = `<mark class="highlight-animated">${selectedText || 'texto destacado'}</mark>`;
        break;
      case 'bold':
        newText = `<strong>${selectedText || 'texto em negrito'}</strong>`;
        break;
      case 'italic':
        newText = `<em>${selectedText || 'texto em itálico'}</em>`;
        break;
      case 'quote':
        newText = `<blockquote class="article-quote">${selectedText || 'Citação importante aqui...'}</blockquote>`;
        break;
      case 'image':
        const imageUrl = prompt('Digite a URL da imagem:');
        if (imageUrl) {
          newText = `<img src="${imageUrl}" alt="Imagem do artigo" class="article-image" />`;
        }
        break;
      case 'video':
        const videoUrl = prompt('Digite a URL do vídeo (YouTube, Vimeo, etc.):');
        if (videoUrl) {
          let embedUrl = videoUrl;
          if (videoUrl.includes('youtube.com/watch?v=')) {
            const videoId = videoUrl.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          } else if (videoUrl.includes('youtu.be/')) {
            const videoId = videoUrl.split('youtu.be/')[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          }
          newText = `<div class="video-container"><iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe></div>`;
        }
        break;
      default:
        return;
    }

    const newContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end);

    setFormData({ ...formData, content: newContent });
    
    // Reposicionar cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 10);
  };

  const renderPreviewContent = (content) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.includes('<blockquote')) {
          return <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
        }
        if (paragraph.includes('<img')) {
          return <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
        }
        if (paragraph.includes('<div class="video-container">')) {
          return <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
        }
        return (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        );
      });
  };

  if (isPreview) {
    return (
      <div className="publish-container">
        <div className="publish-header">
          <Link to="/" className="back-link">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao PRIORADO
          </Link>
          <div className="publish-actions">
            <button onClick={togglePreview} className="preview-btn secondary">
              Editar
            </button>
            <button onClick={handleSubmit} className="publish-btn" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar Artigo'}
            </button>
          </div>
        </div>

        <div className="preview-container">
          <article className="preview-article">
            <div className="preview-meta">
              <span className="preview-category">{formData.category}</span>
              <span className="preview-read-time">{formData.readTime} de leitura</span>
            </div>
            
            <h1 className="preview-title">{formData.title || 'Título do artigo'}</h1>
            
            {formData.imageUrl && (
              <img 
                src={formData.imageUrl} 
                alt={formData.title}
                className="preview-image"
              />
            )}
            
            <p className="preview-summary">{formData.summary || 'Resumo do artigo...'}</p>
            
            <div className="preview-author">
              <span>Por {formData.author || 'Autor'}</span>
              <time>{new Date().toLocaleDateString('pt-BR')}</time>
            </div>
            
            <div className="preview-content">
              {renderPreviewContent(formData.content)}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="publish-container">
      <div className="publish-header">
        <Link to="/" className="back-link">
          <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao PRIORADO
        </Link>
        <div className="publish-actions">
          <button onClick={togglePreview} className="preview-btn">
            Visualizar
          </button>
          <button onClick={handleSubmit} className="publish-btn" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Artigo'}
          </button>
        </div>
      </div>

      <div className="publish-form-container">
        <div className="publish-form-header">
          <img 
            src="/PRIORADO.png" 
            alt="PRIORADO" 
            className="publish-logo"
          />
          <h1 className="publish-title">Publicar Novo Artigo</h1>
          <p className="publish-subtitle">Compartilhe suas notícias e análises com nossa audiência</p>
        </div>

        {error && (
          <div style={{ 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca', 
            borderRadius: '0.375rem', 
            padding: '1rem', 
            margin: '1rem 0',
            color: '#b91c1c'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            backgroundColor: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            borderRadius: '0.375rem', 
            padding: '1rem', 
            margin: '1rem 0',
            color: '#166534'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="publish-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Título do Artigo *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Digite o título do seu artigo..."
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="summary" className="form-label">
                Resumo *
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
                placeholder="Escreva um resumo atrativo do seu artigo..."
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="category" className="form-label">
                Categoria *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group half">
              <label htmlFor="author" className="form-label">
                Autor *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="form-input"
                placeholder="Seu nome"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="imageUrl" className="form-label">
                URL da Imagem
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            <div className="form-group half">
              <label htmlFor="readTime" className="form-label">
                Tempo de Leitura
              </label>
              <select
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="form-select"
              >
                <option value="2 min">2 min</option>
                <option value="3 min">3 min</option>
                <option value="5 min">5 min</option>
                <option value="7 min">7 min</option>
                <option value="10 min">10 min</option>
                <option value="15 min">15 min</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Conteúdo do Artigo *
            </label>
            
            {/* Rich Text Toolbar */}
            <div className="rich-text-toolbar">
              <button 
                type="button" 
                onClick={() => insertFormatting('bold')}
                className="toolbar-btn"
                title="Negrito"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormatting('italic')}
                className="toolbar-btn"
                title="Itálico"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormatting('highlight')}
                className="toolbar-btn highlight-btn"
                title="Destacar texto"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3l-1.5 1.5L12 6l1.5-1.5L12 3zm6.5 2.5L17 7l1.5 1.5L20 7l-1.5-1.5zM21 11h-3l1.5 1.5L21 11zM17 17l1.5-1.5L17 14l-1.5 1.5L17 17zM12 21l1.5-1.5L12 18l-1.5 1.5L12 21zM7 17l-1.5-1.5L7 14l1.5 1.5L7 17zM3 11h3L4.5 9.5L3 11zM7 7L5.5 5.5L7 4l1.5 1.5L7 7z"/>
                </svg>
              </button>
              
              <div className="toolbar-divider"></div>
              
              <button 
                type="button" 
                onClick={() => insertFormatting('quote')}
                className="toolbar-btn"
                title="Citação"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormatting('image')}
                className="toolbar-btn"
                title="Inserir imagem"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </button>
              
              <button 
                type="button" 
                onClick={() => insertFormatting('video')}
                className="toolbar-btn"
                title="Inserir vídeo"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
              </button>
            </div>
            
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              onFocus={() => setShowToolbar(true)}
              className="form-textarea content-editor"
              rows="15"
              placeholder="Escreva o conteúdo completo do seu artigo aqui..."
              required
            />
            <div className="editor-help">
              <p>💡 Selecione texto e use os botões acima para formatação. Use quebras de linha duplas para separar parágrafos.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishArticle;
