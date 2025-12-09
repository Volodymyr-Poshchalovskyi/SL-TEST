// * Module Imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// * Controller Imports
const { register, login } = require('./src/controllers/auth');
const { createPost, getMyPosts, deletePost } = require('./src/controllers/posts');

// * Middleware Imports
const checkAuth = require('./src/middleware/checkAuth');

// * Environment Configuration
dotenv.config();

// * Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// * Global Middlewares
app.use(cors()); // * Enable Cross-Origin Resource Sharing
app.use(express.json()); // * Enable JSON body parsing

// --- API Endpoints ---

// * 1. Authentication Routes
app.post('/auth/register', register);
app.post('/auth/login', login);

// * 2. Protected Post Routes (Require checkAuth Middleware)
app.get('/posts', checkAuth, getMyPosts);
app.post('/posts', checkAuth, createPost);
app.delete('/posts/:id', checkAuth, deletePost);

// * 3. Root Endpoint (Health Check)
app.get('/', (req, res) => {
  res.json({ message: 'Server is working' });
});

// * Start Server Listener
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});