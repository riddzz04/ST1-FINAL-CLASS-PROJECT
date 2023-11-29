const Post = require('../models/postmodel');


// Retrieve all comments for a specific post with pagination
const getCommentsForPost1 = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const totalComments = post.comments.length;
    const totalPages = Math.ceil(totalComments / pageSize);

    const comments = post.comments
      .slice((page - 1) * pageSize, page * pageSize);

    res.json({
      comments,
      page,
      pageSize,
      totalPages,
      totalComments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new comment to a post
const addCommentToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = { content: req.body.content, author: req.body.author };
    post.comments.push(comment);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all comments for a specific post
const getCommentsForPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a comment by ID within a post
const updateCommentInPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.set(req.body);
    await post.save();

    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment by ID within a post
const deleteCommentInPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.remove();
    await post.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCommentToPost,
  getCommentsForPost,
  updateCommentInPost,
  deleteCommentInPost,
};
