const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// * Create Post Controller
const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    // * Input validation
    if (!title || !text) {
      return res.status(400).json({ message: 'Title and text are required' });
    }

    // * Create post in database, using authenticated user ID
    const post = await prisma.post.create({
      data: {
        title,
        text,
        authorId: req.userId, // * User ID attached by checkAuth middleware
      },
    });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// * Get All Posts for the Authenticated User
const getMyPosts = async (req, res) => {
  try {
    // * Fetch posts, filtering by the authenticated authorId
    const posts = await prisma.post.findMany({
      where: { authorId: req.userId }, 
      orderBy: { createdAt: 'desc' },  // * Sort by creation date (newest first)
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// * Delete Post Controller
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // * 1. Find the post to verify ownership
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // * 2. Ownership check
    if (post.authorId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // * 3. Delete the post
    await prisma.post.delete({ where: { id: Number(id) } });

    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

module.exports = { createPost, getMyPosts, deletePost };