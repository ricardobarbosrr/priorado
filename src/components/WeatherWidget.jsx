import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // OpenWeatherMap API key - você precisará criar uma conta gratuita em openweathermap.org
  const API_KEY = (typeof process !== 'undefined' && process.env?.REACT_APP_WEATHER_API_KEY) || 'YOUR_API_KEY_HERE';

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        setLoading(true);
        
        // Primeiro, tenta obter a localização do usuário
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await fetchWeatherByCoords(latitude, longitude);
            },
            async (error) => {
              console.log('Geolocation error:', error);
              // Fallback para IP-based location ou cidade padrão
              await fetchWeatherByCity('São Paulo');
            }
          );
        } else {
          // Navegador não suporta geolocalização
          await fetchWeatherByCity('São Paulo');
        }
      } catch (error) {
        console.error('Error getting weather:', error);
        setError('Erro ao carregar clima');
        setLoading(false);
      }
    };

    getLocationAndWeather();
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      
      if (!response.ok) {
        throw new Error('Weather API error');
      }
      
      const data = await response.json();
      setWeather(data);
      setLocation(data.name);
    } catch (error) {
      console.error('Error fetching weather by coords:', error);
      // Fallback para cidade padrão
      await fetchWeatherByCity('São Paulo');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      
      if (!response.ok) {
        throw new Error('Weather API error');
      }
      
      const data = await response.json();
      setWeather(data);
      setLocation(data.name);
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      // Fallback para dados estáticos se a API falhar
      setWeather({
        main: { temp: 23 },
        weather: [{ description: 'Parcialmente nublado' }]
      });
      setLocation(cityName);
    } finally {
      setLoading(false);
    }
  };

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

  if (error || !weather) {
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
