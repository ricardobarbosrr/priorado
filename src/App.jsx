import React from 'react';
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
                  <div className="content-grid">
                    <div className="main-column">
                      <FeaturedArticle />
                      <NewsGrid />
                    </div>
                    <Sidebar />
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
