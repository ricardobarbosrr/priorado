import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TickerTape.css';

// Símbolos das ações brasileiras (limite de 5 para o plano gratuito)
const STOCK_SYMBOLS = [
  'PETR4.SAO',  // Petrobras
  'VALE3.SAO',  // Vale
  'ITUB4.SAO',  // Itaú
  'BBDC4.SAO',  // Bradesco
  'BBAS3.SAO'   // Banco do Brasil
];

// Dados estáticos de fallback
const STATIC_DATA = [
  { symbol: 'PETR4', price: '32.45', change: '0.25', changePercent: '0.78' },
  { symbol: 'VALE3', price: '68.90', change: '-0.50', changePercent: '-0.72' },
  { symbol: 'ITUB4', price: '30.10', change: '0.15', changePercent: '0.50' },
  { symbol: 'BBDC4', price: '15.75', change: '-0.10', changePercent: '-0.63' },
  { symbol: 'BBAS3', price: '55.20', change: '0.30', changePercent: '0.55' }
];

// Configuração da API
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE;
const API_URL = '/api/alpha-vantage/query';

if (!API_KEY) {
  console.warn('Chave da API Alpha Vantage não encontrada. Usando dados estáticos.');
}

const TickerTape = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(0);
  const [tickerSpeed, setTickerSpeed] = useState(50); // pixels por segundo

  useEffect(() => {
    const fetchStockData = async () => {
      // Se não tiver chave de API, usa dados estáticos
      if (!API_KEY) {
        console.warn('Usando dados estáticos - Chave da API não configurada');
        setStocks(STATIC_DATA);
        setError('Dados estáticos - Atualização em tempo real desativada');
        setLoading(false);
        return;
      }

      try {
        console.log('Buscando dados das ações...');
        
        // Usa BATCH_QUOTE para buscar todas as ações de uma vez
        const response = await axios.get(API_URL, {
          params: {
            function: 'BATCH_STOCK_QUOTES',
            symbols: STOCK_SYMBOLS.join(','),
            apikey: API_KEY,
            datatype: 'json'
          },
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Resposta da API:', response.data);
        
        // Verifica se a API retornou um aviso de limite de requisições
        if (response.data['Note'] || response.data['Information']) {
          console.warn('Limite de requisições atingido. Usando dados estáticos.');
          setStocks(STATIC_DATA);
          setError('Limite de requisições atingido. Dados podem estar desatualizados.');
          return;
        }

        // Processa os dados da resposta
        if (response.data['Stock Quotes'] && Array.isArray(response.data['Stock Quotes'])) {
          const stockData = response.data['Stock Quotes'].map(stock => {
            const symbol = stock['1. symbol'].replace('.SAO', '');
            const price = parseFloat(stock['2. price']).toFixed(2);
            const change = (parseFloat(stock['3. change'])).toFixed(2);
            const changePercent = (parseFloat(stock['4. change percent'].replace('%', ''))).toFixed(2);
            
            return { symbol, price, change, changePercent };
          });
          
          console.log('Dados processados:', stockData);
          setStocks(stockData);
          setError(null);
        } else {
          throw new Error('Formato de dados inválido da API');
        }
      } catch (error) {
        console.error('Erro ao buscar dados das ações:', error);
        setStocks(STATIC_DATA);
        setError('Erro ao buscar dados em tempo real. Dados podem estar desatualizados.');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    // Aumenta o intervalo para 5 minutos para evitar atingir o limite de requisições
    const interval = setInterval(fetchStockData, 300000);

    return () => clearInterval(interval);
  }, []);

  // Efeito para animar o ticker
  useEffect(() => {
    if (stocks.length === 0) return;

    const tickerWidth = stocks.length * 250; // Largura aproximada de cada item do ticker
    const animationDuration = (tickerWidth / tickerSpeed) * 1000; // Converter para milissegundos

    const animation = setInterval(() => {
      setPosition(prevPosition => {
        const newPosition = prevPosition - 1;
        // Resetar a posição quando o ticker chegar ao final
        return newPosition <= -tickerWidth ? 0 : newPosition;
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(animation);
  }, [stocks, tickerSpeed]);

  if (loading && stocks.length === 0) {
    return (
      <div className="ticker-tape">
        <div className="ticker-content">
          <div className="ticker-item">Carregando cotações em tempo real...</div>
        </div>
      </div>
    );
  }

  // Mostra os dados mesmo com erro, pois temos dados estáticos como fallback
  if (error) {
    console.warn('Aviso:', error);
  }

  return (
    <div className="ticker-tape">
      <div className="ticker-label">Mercado:</div>
      <div className="ticker-container">
        <div 
          className="ticker-content" 
          style={{ transform: `translateX(${position}px)` }}
        >
          {stocks.map((stock, index) => (
            <div key={index} className="ticker-item">
              <span className="symbol">{stock.symbol}</span>
              <span className="price">R$ {stock.price}</span>
              <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.change)} ({Math.abs(stock.changePercent)}%)
              </span>
            </div>
          ))}
          {/* Duplicar os itens para criar um loop contínuo */}
          {stocks.map((stock, index) => (
            <div key={`duplicate-${index}`} className="ticker-item">
              <span className="symbol">{stock.symbol}</span>
              <span className="price">R$ {stock.price}</span>
              <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.change)} ({Math.abs(stock.changePercent)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TickerTape;
