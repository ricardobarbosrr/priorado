import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Subscribe = () => {
  const [plan, setPlan] = useState('anual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Redireciona para o link do Stripe baseado no plano selecionado
      const stripeLinks = {
        mensal: 'https://buy.stripe.com/9B6bJ14KLcPB8JcgR1ffy03',
        anual: 'https://buy.stripe.com/8x2eVdb99aHt3oS44fffy02'
      };
      
      // Adiciona o email como parâmetro na URL se estiver preenchido
      const emailParam = email ? `?prefilled_email=${encodeURIComponent(email)}` : '';
      setRedirecting(true);
      // Pequeno atraso para garantir que o estado seja atualizado antes do redirecionamento
      setTimeout(() => {
        window.open(`${stripeLinks[plan]}${emailParam}`, '_blank');
      }, 100);
    } catch (err) {
      setError('Ocorreu um erro ao processar sua assinatura. Tente novamente.');
      setLoading(false);
    }
  };

  const plans = {
    mensal: {
      price: '29,90',
      period: 'mês',
      description: 'Plano mensal com acesso ilimitado a todo o conteúdo',
      features: [
        'Acesso a todas as notícias',
        'Conteúdo exclusivo',
        'Newsletter diária',
        'Suporte prioritário',
        'Acesso ao arquivo histórico'
      ]
    },
    anual: {
      price: '299',
      period: 'ano',
      description: 'Economize 20% com o plano anual',
      features: [
        'Tudo do plano mensal',
        '2 meses grátis',
        'Acesso a eventos exclusivos',
        'Desconto em produtos parceiros',
        'Conteúdo exclusivo para assinantes anuais'
      ]
    }
  };

  const selectedPlan = plans[plan];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img 
            src="/PRIORADO.png" 
            alt="PRIORADO" 
            className="auth-logo"
          />
          <h1 className="auth-title">Assine o PRIORADO</h1>
          <p className="auth-subtitle">Tenha acesso ilimitado ao melhor jornalismo investigativo do Brasil</p>
        </div>

        {error && (
          <div className="error-message" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <div className="plan-selector" style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => setPlan('mensal')}
            className={`plan-button ${plan === 'mensal' ? 'active' : ''}`}
            style={{
              padding: '0.75rem 1.5rem',
              border: `2px solid ${plan === 'mensal' ? '#2563eb' : '#e5e7eb'}`,
              backgroundColor: plan === 'mensal' ? '#eff6ff' : 'white',
              color: plan === 'mensal' ? '#2563eb' : '#4b5563',
              borderRadius: '0.5rem 0 0 0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            Mensal
          </button>
          <button
            onClick={() => setPlan('anual')}
            className={`plan-button ${plan === 'anual' ? 'active' : ''}`}
            style={{
              padding: '0.75rem 1.5rem',
              border: `2px solid ${plan === 'anual' ? '#2563eb' : '#e5e7eb'}`,
              borderLeft: 'none',
              backgroundColor: plan === 'anual' ? '#eff6ff' : 'white',
              color: plan === 'anual' ? '#2563eb' : '#4b5563',
              borderRadius: '0 0.5rem 0.5rem 0',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            Anual (20% off)
          </button>
        </div>

        <div className="plan-card" style={{
          background: 'white',
          borderRadius: '0.75rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: '#1f2937' }}>
              R${selectedPlan.price}
            </span>
            <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
              /{selectedPlan.period}
            </span>
          </div>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
            {selectedPlan.description}
          </p>
          <ul style={{ marginBottom: '2rem', paddingLeft: '1.25rem' }}>
            {selectedPlan.features.map((feature, index) => (
              <li key={index} style={{ color: '#4b5563', marginBottom: '0.5rem', listStyleType: 'disc' }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/*<div className="form-group">
            <input
              type="text"
              placeholder="Nome completo"
              required
              className="auth-input"
            />
          </div>*/}
          <div className="form-group">
            <input
              type="email"
              placeholder="E-mail"
              required
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>{/*
          <div className="form-group">
            <input
              type="text"
              placeholder="CPF (somente números)"
              required
              className="auth-input"
              pattern="\d{11}"
              title="Digite um CPF válido (apenas números)"
            />
          </div>*/}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '48px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            {redirecting ? 'Abrindo checkout...' : (loading ? 'Processando...' : `Pagar R$ ${selectedPlan.price}${selectedPlan.period === 'mês' ? '/mês' : '/ano'}`)}
          </button>
        </form>

        {redirecting && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '0.5rem',
            color: '#166534',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0', fontWeight: '500' }}>✔ Redirecionando para o checkout seguro</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
              Após o processamento do pagamento, seus benefícios serão ativados automaticamente em até 5 minutos.
            </p>
          </div>
        )}
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280' }}>
          Ao assinar, você concorda com nossos{' '}
          <a href="/termos" style={{ color: '#2563eb', textDecoration: 'none' }}>Termos de Uso</a> e{' '}
          <a href="/privacidade" style={{ color: '#2563eb', textDecoration: 'none' }}>Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
