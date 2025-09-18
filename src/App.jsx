import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FeaturedArticle from './components/FeaturedArticle';
import NewsGrid from './components/NewsGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Auth from './components/Auth';
import PublishArticle from './components/PublishArticle';
import ArticleView from './components/ArticleView';
import { sidebarNews } from './data/mockNews';
import './index.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/cadastro" element={<Auth />} />
          <Route path="/publicar" element={<PublishArticle />} />
          <Route path="/artigo/:id" element={<ArticleView />} />
          <Route path="/" element={
            <>
              <Header />
              <Navigation />
              <main className="main-content">
                <div className="main-container">
                  {/* Toggle Sidebar Button */}
                  <button
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                    style={{
                      position: 'fixed',
                      top: '50%',
                      right: sidebarVisible ? '320px' : '20px',
                      transform: 'translateY(-50%)',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      zIndex: 100,
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={sidebarVisible ? 'Ocultar barra lateral' : 'Mostrar barra lateral'}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{
                        transform: sidebarVisible ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <div className="content-grid" style={{
                    display: 'flex',
                    justifyContent: sidebarVisible ? 'space-between' : 'center',
                    gap: sidebarVisible ? '2rem' : '0',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="main-column" style={{
                      maxWidth: sidebarVisible ? 'none' : '800px',
                      width: sidebarVisible ? 'auto' : '100%'
                    }}>
                      <FeaturedArticle />
                      <NewsGrid />
                    </div>
                    {sidebarVisible && <Sidebar />}
                  </div>
                </div>
              </main>
              <Footer />
            </>
          } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
