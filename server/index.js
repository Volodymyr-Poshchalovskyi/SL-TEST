const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// * Import Controllers
const { register, login } = require('./src/controllers/auth');
const { createPost, getMyPosts, getOnePost, updatePost, deletePost } = require('./src/controllers/posts');
// * Import Middleware
const checkAuth = require('./src/middleware/checkAuth');

// * Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware setup
app.use(cors()); // * Enable Cross-Origin Resource Sharing
app.use(express.json()); // * Parse incoming JSON payloads

// * --- Authentication Routes ---
app.post('/auth/register', register);
app.post('/auth/login', login);

// * --- Post Management Routes (All require checkAuth middleware) ---
app.get('/posts', checkAuth, getMyPosts); // * Get all posts for the authenticated user
app.get('/posts/:id', checkAuth, getOnePost); // * Get a single post by ID
app.post('/posts', checkAuth, createPost); // * Create a new post
app.put('/posts/:id', checkAuth, updatePost); // * Update an existing post by ID
app.delete('/posts/:id', checkAuth, deletePost); // * Delete a post by ID

// * --- Health Check Route ---
app.get('/', (req, res) => {
  res.json({ message: 'Server is working' });
});

// * Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});