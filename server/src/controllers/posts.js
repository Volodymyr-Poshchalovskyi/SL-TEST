const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// * Handler to create a new post
const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    // * Input validation
    if (!title || !text) {
      return res.status(400).json({ message: 'Title and text are required' }); // * Translated message
    }

    const post = await prisma.post.create({
      data: {
        title,
        text,
        authorId: req.userId, // * Use ID from authentication middleware
      },
    });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create post' }); // * Translated message
  }
};

// * Handler to get all posts for the authenticated user (with pagination)
// * Route: GET /posts?page=1&limit=10
const getMyPosts = async (req, res) => {
    // * Pagination parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // * Fetch posts for the current user
    const posts = await prisma.post.findMany({
        where: { authorId: req.userId },
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: limit,
    });
    
    // * Get total count for pagination metadata
    const total = await prisma.post.count({ where: { authorId: req.userId } });

    res.json({ data: posts, total, page, totalPages: Math.ceil(total / limit) });
};

// * Handler to get a single post by ID (for viewing/editing)
const getOnePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({ where: { id: Number(id) } });

        if (!post) return res.status(404).json({ message: 'Post not found' }); // * Translated message
        
        // * Authorization check: ensure the post belongs to the user
        if (post.authorId !== req.userId) {
            return res.status(403).json({ message: 'Access denied: This is not your post' }); // * Translated message
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post' }); // * Translated message
    }
};

// * Handler to update an existing post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text } = req.body;

        // * Input validation
        if (!title || !text) {
            return res.status(400).json({ message: 'Fields cannot be empty' }); // * Translated message
        }

        // * Authorization check (pre-update)
        const existingPost = await prisma.post.findUnique({ where: { id: Number(id) } });
        if (!existingPost) return res.status(404).json({ message: 'Post not found' }); // * Translated message
        if (existingPost.authorId !== req.userId) {
            return res.status(403).json({ message: 'Access denied' }); // * Translated message
        }

        // * Perform update
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, text },
        });

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update post' }); // * Translated message
    }
};

// * Handler to delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // * Find post and perform authorization check
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) return res.status(404).json({ message: 'Post not found' }); // * Translated message
    
    if (post.authorId !== req.userId) {
      return res.status(403).json({ message: 'Access denied: This is not your post' }); // * Translated message
    }

    // * Perform deletion
    await prisma.post.delete({ where: { id: Number(id) } });

    res.json({ message: 'Post deleted' }); // * Translated message
  } catch (error) {
    res.status(500).json({ message: 'Deletion error' }); // * Translated message
  }
};

module.exports = { createPost, getMyPosts, getOnePost, updatePost, deletePost };