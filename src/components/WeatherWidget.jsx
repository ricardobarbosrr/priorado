import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('São Paulo');
  const [loading, setLoading] = useState(true);

  // Dados estáticos do clima para diferentes cidades
  const staticWeatherData = {
    'São Paulo': {
      main: { temp: 23 },
      weather: [{ description: 'parcialmente nublado', icon: '02d' }]
    },
    'Rio de Janeiro': {
      main: { temp: 28 },
      weather: [{ description: 'ensolarado', icon: '01d' }]
    },
    'Brasília': {
      main: { temp: 26 },
      weather: [{ description: 'céu limpo', icon: '01d' }]
    },
    'Curitiba': {
      main: { temp: 18 },
      weather: [{ description: 'nublado', icon: '03d' }]
    },
    'Belo Horizonte': {
      main: { temp: 25 },
      weather: [{ description: 'poucas nuvens', icon: '02d' }]
    }
  };

  useEffect(() => {
    // Simula um carregamento de dados
    const timer = setTimeout(() => {
      // Escolhe uma cidade aleatória da lista
      const cities = Object.keys(staticWeatherData);
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      
      setLocation(randomCity);
      setWeather(staticWeatherData[randomCity]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);


  const getWeatherIcon = (weatherCode) => {
    // Mapear códigos do OpenWeatherMap para ícones
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    
    return iconMap[weatherCode] || '☀️';
  };

  if (loading) {
    return (
      <div className="weather">
        <h3>
          <svg className="weather-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Clima
        </h3>
        <div className="weather-content">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '60px',
            color: '#6b7280'
          }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              border: '2px solid #f3f4f6', 
              borderTop: '2px solid #1d4ed8', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather">
        <h3>
          <svg className="weather-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Clima - São Paulo
        </h3>
        <div className="weather-content">
          <div>
            <span className="weather-temp">23°C</span>
            <p className="weather-desc">Parcialmente nublado</p>
          </div>
          <div style={{ color: '#1d4ed8', fontSize: '2rem' }}>
            ☀️
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather">
      <h3>
        <svg className="weather-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Clima - {location}
      </h3>
      <div className="weather-content">
        <div>
          <span className="weather-temp">{Math.round(weather.main.temp)}°C</span>
          <p className="weather-desc">
            {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
          </p>
        </div>
        <div style={{ color: '#1d4ed8', fontSize: '2rem' }}>
          {weather.weather && weather.weather[0] ? 
            getWeatherIcon(weather.weather[0].icon) : 
            '☀️'
          }
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
