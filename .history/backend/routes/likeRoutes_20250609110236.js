const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// POST: like a post
router.post('/:postId/like', likeController.likePost);

// DELETE: unlike a post
router.delete('/:postId/unlike', likeController.unlikePost);

// GET: total likes and if user liked the post
router.get('/:postId/likes', likeController.getLikes);

module.exports = router;
