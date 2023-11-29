const express = require('express');
const postController = require('../controllers/postcontroller');

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.put('/:postId', postController.updatePostById);
router.delete('/:postId', postController.deletePostById);

module.exports = router;