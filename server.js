const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'priorado_secret_key_2025';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/priorado', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'editor'], default: 'user' },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Article Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Política', 'Economia', 'Mundo', 'Tecnologia', 'Esportes', 'Cultura', 'Saúde', 'Educação', 'Meio Ambiente']
  },
  author: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String, default: '' },
  readTime: { type: String, default: '5 min' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// Get All Articles
app.get('/api/articles', async (req, res) => {
  try {
    const { category, featured, limit = 10, page = 1 } = req.query;
    
    let filter = { published: true };
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';

    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('authorId', 'name avatar');

    const total = await Article.countDocuments(filter);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar artigos', error: error.message });
  }
});

// Get Single Article
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('authorId', 'name avatar');
    if (!article) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar artigo', error: error.message });
  }
});

// Create Article (Protected)
app.post('/api/articles', authenticateToken, async (req, res) => {
  try {
    const { title, summary, content, category, imageUrl, readTime } = req.body;

    const article = new Article({
      title,
      summary,
      content,
      category,
      author: req.user.name || 'Autor Anônimo',
      authorId: req.user.userId,
      imageUrl,
      readTime,
      updatedAt: new Date()
    });

    await article.save();

    res.status(201).json({
      message: 'Artigo criado com sucesso',
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar artigo', error: error.message });
  }
});

// Update Article (Protected)
app.put('/api/articles/:id', authenticateToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

    // Check if user owns the article or is admin
    if (article.authorId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Sem permissão para editar este artigo' });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    res.json({
      message: 'Artigo atualizado com sucesso',
      article: updatedArticle
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar artigo', error: error.message });
  }
});

// Delete Article (Protected)
app.delete('/api/articles/:id', authenticateToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

    // Check if user owns the article or is admin
    if (article.authorId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Sem permissão para deletar este artigo' });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({ message: 'Artigo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar artigo', error: error.message });
  }
});

// User Profile Routes
app.route('/api/user/profile')
  // Get user profile
  .get(authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message });
    }
  })
  // Update user profile
  .put(authenticateToken, async (req, res) => {
    try {
      const { name, email, bio, location, website, avatar } = req.body;
      
      // Get current user
      const currentUser = await User.findById(req.user.userId);
      if (!currentUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Update user data
      const updateData = {
        name: name || currentUser.name,
        bio: bio || currentUser.bio,
        location: location || currentUser.location,
        website: website || currentUser.website,
        avatar: avatar || currentUser.avatar,
        updatedAt: new Date()
      };

      // Only update email if it's different and user is admin
      if (email && email !== currentUser.email && req.user.role === 'admin') {
        updateData.email = email;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(500).json({ message: 'Erro ao atualizar perfil' });
      }

      res.status(200).json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        user: updatedUser
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
  });

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ message: 'PRIORADO API funcionando!', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
});
