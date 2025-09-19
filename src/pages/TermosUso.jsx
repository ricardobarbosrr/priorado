import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './TermosUso.css';

const TermosUso = () => {
  return (
    <div className="termos-container">
      <div className="termos-content">
        <div className="termos-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Voltar para a página inicial
          </Link>
          <h1>Termos de Uso</h1>
          <p>Última atualização: 19 de setembro de 2025</p>
        </div>

        <div className="termos-section">
          <div>
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o Priorado, você concorda em cumprir estes Termos de Uso, 
              nossa Política de Privacidade e todas as leis e regulamentos aplicáveis. 
              Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
            </p>
          </div>

          <div className="termos-section">
            <h2>2. Uso da Plataforma</h2>
            <p>
              O Priorado é uma plataforma de notícias e análises. Você concorda em usar o site apenas 
              para fins legais e de acordo com estes Termos de Uso.
            </p>
            <ul>
              <li>Não utilize o site de forma que possa danificar, desativar ou sobrecarregar a plataforma.</li>
              <li>Não tente obter acesso não autorizado a qualquer parte do site ou a qualquer sistema ou rede conectada.</li>
              <li>Não utilize o site para fins ilegais, fraudulentos ou que possam violar direitos de terceiros.</li>
            </ul>
          </div>

          <div className="termos-section">
            <h2>3. Conteúdo</h2>
            <p>
              Todo o conteúdo disponibilizado no Priorado é para fins informativos e não constitui 
              aconselhamento financeiro, jurídico ou de qualquer outra natureza.
            </p>
            <p>
              Reservamo-nos o direito de modificar ou descontinuar, temporária ou permanentemente, 
              o site ou qualquer parte dele, com ou sem aviso prévio.
            </p>
          </div>

          <div className="termos-section">
            <h2>4. Assinaturas e Pagamentos</h2>
            <p>
              As assinaturas são renovadas automaticamente no final de cada período de cobrança, 
              a menos que canceladas antes da renovação. Os pagamentos são processados por meio 
              de processadores de pagamento terceirizados e estão sujeitos aos termos e condições desses serviços.
            </p>
          </div>

          <div className="termos-section">
            <h2>5. Limitação de Responsabilidade</h2>
            <p>
              Em nenhuma circunstância o Priorado será responsável por quaisquer danos diretos, indiretos, 
              incidentais, consequenciais, especiais ou exemplares decorrentes do uso ou incapacidade 
              de uso do serviço.
            </p>
          </div>

          <div className="termos-section">
            <h2>6. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações 
              entrarão em vigor imediatamente após a publicação no site. O uso continuado do site 
              após tais alterações constitui sua aceitação dos novos Termos.
            </p>
          </div>

          <div className="termos-section">
            <h2>7. Contato</h2>
            <p>
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco através do 
              e-mail: <a href="mailto:contato@priorado.com">contato@priorado.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermosUso;
