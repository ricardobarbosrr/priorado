const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('priorado_token');
};

// Set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('priorado_token', token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('priorado_token');
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Register user
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Logout user
  logout: () => {
    removeAuthToken();
  },

  // Get current user profile
  getProfile: async () => {
    return await apiRequest('/user/profile');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Articles API
export const articlesAPI = {
  // Get all articles
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/articles?${queryString}` : '/articles';
    return await apiRequest(endpoint);
  },

  // Get single article
  getById: async (id) => {
    return await apiRequest(`/articles/${id}`);
  },

  // Create new article
  create: async (articleData) => {
    return await apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  },

  // Update article
  update: async (id, articleData) => {
    return await apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  },

  // Delete article
  delete: async (id) => {
    return await apiRequest(`/articles/${id}`, {
      method: 'DELETE',
    });
  },

  // Get featured articles
  getFeatured: async () => {
    return await apiRequest('/articles?featured=true&limit=1');
  },

  // Get articles by category
  getByCategory: async (category, limit = 10) => {
    return await apiRequest(`/articles?category=${category}&limit=${limit}`);
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return await apiRequest('/health');
  },
};

export default {
  auth: authAPI,
  articles: articlesAPI,
  health: healthAPI,
};
