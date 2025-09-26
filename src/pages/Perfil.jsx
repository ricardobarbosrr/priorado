import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaUserCog, 
  FaSignOutAlt, 
  FaEdit, 
  FaHistory, 
  FaBookmark, 
  FaComment, 
  FaBell, 
  FaLock,
  FaGlobe,
  FaTrash,
  FaSave
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import './Profile.css';

const Perfil = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Carregando...',
    email: user?.email || 'Carregando...',
    bio: user?.bio || 'Biografia sua aqui.',
    location: user?.location || 'Brasil',
    website: user?.website || 'https://meusite.com',
    avatar: user?.avatar || ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock data for user activity
  const [userStats] = useState({
    articlesRead: 42,
    comments: 18,
    savedArticles: 7,
    following: 24
  });

  useEffect(() => {
    // Carrega os dados do perfil ao montar o componente
    const loadProfile = async () => {
      try {
        const profileData = await authAPI.getProfile();
        if (profileData) {
          setFormData({
            name: profileData.name || user?.name || '',
            email: profileData.email || user?.email || '',
            bio: profileData.bio || '',
            location: profileData.location || 'Brasil',
            website: profileData.website || '',
            avatar: profileData.avatar || ''
          });
          
          // Atualiza o contexto de autenticação com os dados mais recentes
          if (updateUser) {
            updateUser({
              ...user,
              ...profileData
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };
    
    loadProfile();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    
    try {
      // Prepare the data to send (only include fields we want to update)
      const updateData = {
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        avatar: formData.avatar
      };
      
      // Only include email if user is admin and it's different
      if (user?.role === 'admin' && formData.email !== user?.email) {
        updateData.email = formData.email;
      }
      
      console.log('Sending update request with data:', updateData);
      
      // Call the API to update the profile
      const response = await authAPI.updateProfile(updateData);
      
      if (response && response.success) {
        // Update the user context with the new data
        const updatedUser = { 
          ...user, 
          ...response.user,
          // Ensure we don't override the token
          token: user.token 
        };
        
        // Update the user in the auth context
        if (updateUser) {
          updateUser(updatedUser);
        }
        
        setSaveSuccess(true);
        setIsEditing(false);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } else {
        throw new Error(response?.message || 'Falha ao atualizar o perfil');
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveError(error.message || 'Ocorreu um erro ao atualizar o perfil. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Back Button and Header */}
        <div className="mb-6">
          <Link to="/" className="back-link">
            <FaArrowLeft className="inline mr-2" />
            Voltar para a página inicial
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </div>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.avatar ? (
              <img 
                src={formData.avatar} 
                alt={formData.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'U')}&background=random`;
                }}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser size={60} className="text-gray-400" />
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="profile-info">
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group has-icon" style={{"--delay": 1}}>
                  <label htmlFor="name">
                    <FaUser size={14} className="text-red-500" />
                    <span>Nome Completo</span>
                  </label>
                  <div className="relative">
                    <div className="input-icon">
                      <FaUser size={16} className="opacity-70" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="w-full pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group" style={{"--delay": 2}}>
                  <label htmlFor="email">
                    <FaEnvelope size={14} className="text-red-500" />
                    <span>E-mail</span>
                  </label>
                  <div className="relative">
                    <div className="input-icon">
                      <FaEnvelope size={16} className="opacity-70" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email || user?.email || ''}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      className="w-full pl-10"
                      disabled={!user?.isAdmin} // Only admins can change email
                    />
                  </div>
                </div>
                
                <div className="form-group" style={{"--delay": 3}}>
                  <label htmlFor="bio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      <path d="m15 5 4 4"/>
                    </svg>
                    <span>Biografia</span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Conte um pouco sobre você..."
                    className="w-full"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.bio ? formData.bio.length : 0}/500 caracteres
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group" style={{"--delay": 3}}>
                    <label htmlFor="avatar">
                      <FaUser size={14} className="text-red-500" />
                      <span>URL da Foto de Perfil</span>
                    </label>
                    <input
                      type="url"
                      id="avatar"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      placeholder="https://exemplo.com/foto.jpg"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="form-group" style={{"--delay": 4}}>
                    <label htmlFor="location">
                      <FaGlobe size={14} className="text-red-500" />
                      <span>Localização</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Cidade, Estado - País"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="form-group" style={{"--delay": 5}}>
                    <label htmlFor="website">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                      <span>Website</span>
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://exemplo.com"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="button-group">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2" /> Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="profile-info">
              <h2>{formData.name || 'Usuário'}</h2>
              <p className="text-gray-600 flex items-center">
                <FaEnvelope className="mr-2" /> {user?.email || 'E-mail não disponível'}
              </p>
              
              {formData.bio && (
                <p className="mt-3 text-gray-700">{formData.bio}</p>
              )}
              
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {formData.location && (
                  <span className="flex items-center text-gray-600">
                    <FaGlobe className="mr-1" /> {formData.location}
                  </span>
                )}
                {formData.website && formData.location && (
                  <span className="text-gray-400">•</span>
                )}
                {formData.website && (
                  <a 
                    href={formData.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    {formData.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
              
              <div className="button-group">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  <FaEdit className="mr-2" /> Editar Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                >
                  <FaSignOutAlt className="mr-2" /> Sair
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card group">
            <div className="stat-icon bg-red-50 text-red-600 group-hover:bg-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="stat-value">{userStats.articlesRead}</div>
            <div className="stat-label">Artigos Lidos</div>
          </div>
          
          <div className="stat-card group">
            <div className="stat-icon bg-blue-50 text-blue-600 group-hover:bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="stat-value">{userStats.comments}</div>
            <div className="stat-label">Comentários</div>
          </div>
          
          <div className="stat-card group">
            <div className="stat-icon bg-amber-50 text-amber-600 group-hover:bg-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="stat-value">{userStats.savedArticles}</div>
            <div className="stat-label">Salvos</div>
          </div>
          
          <div className="stat-card group">
            <div className="stat-icon bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="stat-value">{userStats.following}</div>
            <div className="stat-label">Seguindo</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveTab('perfil')}
          >
            <FaUser className="mr-2" /> Perfil
          </button>
          <button 
            className={`tab ${activeTab === 'atividades' ? 'active' : ''}`}
            onClick={() => setActiveTab('atividades')}
          >
            <FaHistory className="mr-2" /> Atividades
          </button>
          <button 
            className={`tab ${activeTab === 'salvos' ? 'active' : ''}`}
            onClick={() => setActiveTab('salvos')}
          >
            <FaBookmark className="mr-2" /> Salvos
          </button>
          <button 
            className={`tab ${activeTab === 'configuracoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('configuracoes')}
          >
            <FaUserCog className="mr-2" /> Configurações
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'perfil' && (
            <div className="profile-section">
              <h3><FaUser className="inline-icon" /> Sobre Mim</h3>
              <p className="text-gray-700 mb-6">
                {formData.bio || 'Nenhuma biografia adicionada.'}
              </p>
              
              <h3 className="mt-8"><FaHistory className="inline-icon" /> Atividade Recente</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📚</div>
                  <div>
                    <p className="font-medium">Você leu o artigo "Como melhorar sua escrita"</p>
                    <span className="text-sm text-gray-500">2 dias atrás</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">💬</div>
                  <div>
                    <p className="font-medium">Você comentou em "Dicas de produtividade"</p>
                    <span className="text-sm text-gray-500">1 semana atrás</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuracoes' && (
            <div className="profile-section">
              <h3><FaLock className="inline-icon" /> Privacidade</h3>
              <div className="settings-option">
                <h4>Perfil Público</h4>
                <p>Tornar meu perfil visível para outros usuários</p>
                <label className="switch mt-2">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="settings-option">
                <h4>Notificações por E-mail</h4>
                <p>Receber atualizações e notícias por e-mail</p>
                <label className="switch mt-2">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>

              <h3 className="mt-8"><FaBell className="inline-icon" /> Preferências de Notificação</h3>
              <div className="settings-option">
                <h4>Novos Artigos</h4>
                <p>Receber notificações sobre novos artigos</p>
                <label className="switch mt-2">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="settings-option">
                <h4>Comentários e Menções</h4>
                <p>Receber notificações quando alguém mencionar você</p>
                <label className="switch mt-2">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <button className="btn btn-danger">
                  <FaTrash className="mr-2" /> Excluir Conta
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Atenção: Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'atividades' && (
            <div className="profile-section">
              <h3><FaHistory className="inline-icon" /> Sua Atividade</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📚</div>
                  <div>
                    <p className="font-medium">Você leu o artigo "Como melhorar sua escrita"</p>
                    <span className="text-sm text-gray-500">2 dias atrás</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">💬</div>
                  <div>
                    <p className="font-medium">Você comentou em "Dicas de produtividade"</p>
                    <span className="text-sm text-gray-500">1 semana atrás</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📖</div>
                  <div>
                    <p className="font-medium">Você leu o artigo "Tecnologias do Futuro"</p>
                    <span className="text-sm text-gray-500">2 semanas atrás</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'salvos' && (
            <div className="profile-section">
              <h3><FaBookmark className="inline-icon" /> Artigos Salvos</h3>
              <p className="text-gray-500 italic">
                Você ainda não salvou nenhum artigo. Quando salvar, eles aparecerão aqui.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
