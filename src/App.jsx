import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FeaturedArticle from './components/FeaturedArticle';
import NewsGrid from './components/NewsGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Login from './components/Login';
import PublishArticle from './components/PublishArticle';
import { featuredArticle, sidebarNews } from './data/mockNews';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/publicar" element={<PublishArticle />} />
          <Route path="/" element={
            <>
              <Header />
              <Navigation />
              <main className="main-content">
                <div className="main-container">
                  <div className="content-grid">
                    <div className="main-column">
                      <FeaturedArticle article={featuredArticle} />
                      <NewsGrid />
                    </div>
                    <Sidebar news={sidebarNews} />
                  </div>
                </div>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
