import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaAd, FaChartLine, FaUsers, FaEnvelope, FaPhoneAlt, FaBullhorn, FaMobileAlt, FaDesktop } from 'react-icons/fa';
import './TermosUso.css'; // Reusing the same CSS as Terms of Use

const Publicidade = () => {
  return (
    <div className="termos-container">
      <div className="termos-content">
        <div className="termos-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Voltar para a página inicial
          </Link>
          <h1>Publicidade no Priorado</h1>
          <p>Soluções personalizadas para sua marca alcançar o público certo</p>
        </div>

        <div className="termos-section">
          <div className="mb-10">
            <h2 className="flex items-center">
              <FaBullhorn className="inline-icon" /> Por que anunciar no Priorado?
            </h2>
            <p className="mb-6">
              O Priorado oferece um ambiente premium para sua marca se conectar com um público qualificado e engajado. 
              Nossos leitores são formadores de opinião, tomadores de decisão e consumidores atentos que buscam 
              informações confiáveis e análises aprofundadas.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8 mb-10">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center text-blue-600 text-2xl mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">Público Qualificado</h3>
                </div>
                <p className="text-gray-700 mt-2">
                  Alcance profissionais, empresários e tomadores de decisão que valorizam conteúdo de qualidade.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center text-blue-600 text-2xl mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">Alto Engajamento</h3>
                </div>
                <p className="text-gray-700 mt-2">
                  Taxas de cliques e tempo de permanência acima da média do mercado.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center text-blue-600 text-2xl mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">Formatos Diversificados</h3>
                </div>
                <p className="text-gray-700 mt-2">
                  Oferecemos diferentes formatos publicitários para atender às necessidades da sua campanha.
                </p>
              </div>
            </div>
          </div>

          <div className="termos-section">
            <h2 className="flex items-center">
              <FaDesktop className="inline-icon" /> Nossos Formatos Publicitários
            </h2>
            
            <div className="space-y-6 mt-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Banners</h3>
                <p className="text-gray-700 mb-3">
                  Destaque sua marca com nossos banners em tamanhos variados, posicionados estrategicamente em páginas de alto tráfego.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Banner Topo (970x90px)</li>
                  <li>Banner Lateral (300x250px ou 300x600px)</li>
                  <li>Banner Rodapé (728x90px)</li>
                </ul>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Patrocínios de Conteúdo</h3>
                <p className="text-gray-700 mb-3">
                  Conteúdos patrocinados que se integram perfeitamente à experiência do leitor, oferecendo valor real.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Newsletter</h3>
                <p className="text-gray-700 mb-3">
                  Seja visto por nossa base de assinantes altamente segmentada com anúncios em nossas newsletters diárias.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Soluções Personalizadas</h3>
                <p className="text-gray-700">
                  Desenvolvemos campanhas sob medida para atender aos objetivos específicos da sua marca.
                </p>
              </div>
            </div>
          </div>

          <div className="termos-section bg-blue-50 p-6 rounded-lg">
            <h2 className="flex items-center">
              <FaEnvelope className="inline-icon" /> Entre em Contato
            </h2>
            <p className="mt-4 text-gray-700">
              Estamos prontos para ajudar a criar a campanha ideal para sua marca. Entre em contato com nossa equipe comercial para:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>Solicitar um portfólio completo</li>
              <li>Consultar disponibilidade e tarifas</li>
              <li>Desenvolver campanhas personalizadas</li>
              <li>Agendar uma apresentação</li>
            </ul>
            
            <div className="mt-6 space-y-3">
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" />
                <a href="mailto:publicidade@priorado.com" className="text-blue-600 hover:underline">
                  publicidade@priorado.com
                </a>
              </p>
              <p className="flex items-center">
                <FaPhoneAlt className="mr-2 text-blue-600" />
                <a href="tel:+5541992882034" className="text-blue-600 hover:underline">
                  +55 (41) 99288-2034
                </a>
              </p>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-2">Horário de Atendimento</h3>
              <p className="text-gray-700">Segunda a Sexta, das 9h às 18h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publicidade;
