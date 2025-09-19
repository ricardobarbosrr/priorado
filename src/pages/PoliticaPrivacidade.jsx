import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaUserLock, FaDatabase, FaEnvelope } from 'react-icons/fa';
import './TermosUso.css'; // Reutilizando o mesmo CSS da página de Termos

const PoliticaPrivacidade = () => {
  return (
    <div className="termos-container">
      <div className="termos-content">
        <div className="termos-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Voltar para a página inicial
          </Link>
          <h1>Política de Privacidade</h1>
          <p>Última atualização: 19 de setembro de 2025</p>
        </div>

        <div className="termos-section">
          <div>
            <h2><FaShieldAlt className="inline-icon" /> 1. Introdução</h2>
            <p>
              A sua privacidade é importante para nós. Esta Política de Privacidade explica como o Priorado coleta, 
              usa, armazena e protege as informações dos usuários do nosso site e serviços.
            </p>
          </div>

          <div className="termos-section">
            <h2><FaUserLock className="inline-icon" /> 2. Dados que Coletamos</h2>
            <p>Podemos coletar as seguintes informações quando você usa nossos serviços:</p>
            <ul>
              <li><strong>Informações de cadastro:</strong> nome, e-mail, data de nascimento.</li>
              <li><strong>Dados de pagamento:</strong> informações de cartão de crédito (processadas de forma segura pelo nosso processador de pagamento).</li>
              <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas acessadas, tempo gasto no site.</li>
              <li><strong>Dados de interação:</strong> artigos lidos, preferências de conteúdo, comentários.</li>
            </ul>
          </div>

          <div className="termos-section">
            <h2><FaDatabase className="inline-icon" /> 3. Como Usamos Seus Dados</h2>
            <p>Utilizamos suas informações para:</p>
            <ul>
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Processar transações e enviar notificações relacionadas</li>
              <li>Personalizar sua experiência no site</li>
              <li>Enviar comunicações importantes sobre sua conta</li>
              <li>Prevenir fraudes e melhorar a segurança</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </div>

          <div className="termos-section">
            <h2>4. Compartilhamento de Dados</h2>
            <p>Não vendemos suas informações pessoais. Podemos compartilhar dados com:</p>
            <ul>
              <li>Prestadores de serviços que nos auxiliam nas operações do site</li>
              <li>Autoridades legais, quando exigido por lei</li>
              <li>Em caso de fusão, aquisição ou venda de ativos</li>
            </ul>
          </div>

          <div className="termos-section">
            <h2>5. Cookies e Tecnologias Semelhantes</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar tráfego 
              e personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do navegador.
            </p>
          </div>

          <div className="termos-section">
            <h2>6. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra 
              acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </div>

          <div className="termos-section">
            <h2>7. Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Acessar suas informações pessoais</li>
              <li>Solicitar correção de dados incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Revogar consentimentos fornecidos</li>
              <li>Opor-se ao processamento de dados</li>
              <li>Solicitar a portabilidade de dados</li>
            </ul>
          </div>

          <div className="termos-section">
            <h2>8. Armazenamento de Dados</h2>
            <p>
              Seus dados serão armazenados pelo tempo necessário para cumprir as finalidades descritas nesta política, 
              a menos que um período de retenção mais longo seja exigido ou permitido por lei.
            </p>
          </div>

          <div className="termos-section">
            <h2>9. Menores de Idade</h2>
            <p>
              Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente 
              informações de crianças sem o consentimento dos pais ou responsáveis.
            </p>
          </div>

          <div className="termos-section">
            <h2>10. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre 
              quaisquer alterações publicando a nova política nesta página.
            </p>
          </div>

          <div className="termos-section">
            <h2><FaEnvelope className="inline-icon" /> 11. Contato</h2>
            <p>
              Se tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, 
              entre em contato conosco em: <a href="mailto:privacidade@priorado.com">privacidade@priorado.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
