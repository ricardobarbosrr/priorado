import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaNewspaper, FaUsers, FaBullseye, FaHandshake } from 'react-icons/fa';
import './TermosUso.css'; // Reusing the same CSS as Terms of Use

const SobreNos = () => {
  return (
    <div className="termos-container">
      <div className="termos-content">
        <div className="termos-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Voltar para a página inicial
          </Link>
          <h1>Sobre Nós</h1>
          <p>Conheça mais sobre o Priorado e nossa missão</p>
        </div>

        <div className="termos-section">
          <div className="mb-10">
            <h2 className="flex items-center">
              <FaNewspaper className="inline-icon" /> Nossa História
            </h2>
            <p className="mb-4">
              O Priorado nasceu da paixão por jornalismo de qualidade e do compromisso com a verdade. 
              Fundado em 2025, nosso objetivo sempre foi trazer informações precisas, análises profundas 
              e cobertura jornalística imparcial para nossos leitores.
            </p>
            <p>
              Ao longo da nossa história, nos tornaremos referência em jornalismo independente, conquistando a confiança 
              de milhares de leitores que buscam notícias confiáveis e análises criteriosas sobre os principais 
              acontecimentos do Brasil e do mundo.
            </p>
          </div>

          <div className="termos-section">
            <h2 className="flex items-center">
              <FaUsers className="inline-icon" /> Nossa Equipe
            </h2>
            <p className="mb-4">
              Contamos com uma equipe de jornalistas experientes e especializados em diversas áreas, 
              comprometidos com a ética jornalística e a busca pela verdade. Nossos repórteres, 
              editores e colunistas trabalham incansavelmente para trazer informações precisas e análises aprofundadas.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Jornalismo de Qualidade</h3>
                <p className="text-gray-700">
                  Nossos jornalistas são especializados em diferentes editorias, garantindo cobertura 
                  aprofundada e análise criteriosa de cada assunto.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Compromisso com a Verdade</h3>
                <p className="text-gray-700">
                  Priorizamos a apuração cuidadosa e a checagem rigorosa de fatos, mantendo-nos fiéis 
                  aos princípios do bom jornalismo.
                </p>
              </div>
            </div>
          </div>

          <div className="termos-section">
            <h2 className="flex items-center">
              <FaBullseye className="inline-icon" /> Nossa Missão
            </h2>
            <p className="mb-4">
              Nossa missão é fornecer informações precisas, análises imparciais e cobertura jornalística 
              de qualidade, contribuindo para uma sociedade mais bem informada e consciente.
            </p>
            <p>
              Acreditamos que o acesso à informação de qualidade é essencial para o exercício da cidadania 
              e para a construção de uma democracia mais forte e participativa.
            </p>
          </div>

          <div className="termos-section">
            <h2 className="flex items-center">
              <FaHandshake className="inline-icon" /> Valores
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Ética:</strong> Compromisso com a verdade e a integridade jornalística.</li>
              <li><strong>Imparcialidade:</strong> Apresentação de fatos e opiniões de forma equilibrada.</li>
              <li><strong>Transparência:</strong> Clareza sobre nossas fontes e métodos de apuração.</li>
              <li><strong>Responsabilidade:</strong> Consciência do impacto de nosso trabalho na sociedade.</li>
              <li><strong>Inovação:</strong> Busca constante por novas formas de contar histórias e engajar nosso público.</li>
            </ul>
          </div>

          <div className="termos-section">
            <h2>Entre em Contato</h2>
            <p className="mb-4">
              Valorizamos o diálogo com nossos leitores. Se você tem sugestões, críticas ou dúvidas, 
              não hesite em nos contatar.
            </p>
            <p>
              <strong>E-mail:</strong> <a href="mailto:contato@priorado.com" className="text-blue-600 hover:underline">contato@priorado.com</a>
            </p>
            <p>
              <strong>Redes Sociais:</strong> Siga-nos para ficar por dentro das últimas notícias e atualizações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;
