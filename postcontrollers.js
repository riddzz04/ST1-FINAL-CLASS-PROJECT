const Post = require('../models/postmodel');


// Retrieve all posts with pagination
const getAllPosts1 = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const posts = await Post.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      posts,
      page,
      pageSize,
      totalPages,
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Create a new post
const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Retrieve all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a specific post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post by ID
const updatePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a post by ID
const deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};