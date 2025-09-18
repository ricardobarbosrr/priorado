import React from 'react';

const Navigation = () => {
  const categories = [
    'Últimas',
    'Política',
    'Economia',
    'Mundo',
    'Tecnologia',
    'Esportes',
    'Cultura',
    'Saúde',
    'Opinião'
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-links">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="nav-link"
            >
              {category}
            </a>
          ))}
        </div>
        
        <div className="nav-date">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
