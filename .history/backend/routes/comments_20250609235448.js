// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { validateComment } = require('../middleware/validation');

// GET comments for a post
router.get('/posts/:postId', commentController.getCommentsByPost);

// POST comment for a post
router.post('/posts/:id', validateComment, commentController.createComment);

// PUT update comment by id
router.put('/:id', validateComment, commentController.updateComment);

// DELETE comment by id
router.delete('/:id', commentController.deleteComment);

module.exports = router;
