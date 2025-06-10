// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost } = require('../middleware/validation');
const { Like } = require('../models');

// ✅ Like a post
router.post('/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const [like, created] = await Like.findOrCreate({
      where: { userId, postId }
    });

    if (created) {
      res.status(201).json({ message: 'Post liked' });
    } else {
      res.status(200).json({ message: 'Already liked' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// ✅ Unlike a post
router.delete('/:postId/unlike', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const deleted = await Like.destroy({ where: { userId, postId } });

    if (deleted) {
      res.status(200).json({ message: 'Post unliked' });
    } else {
      res.status(404).json({ error: 'Like not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unlike post' });
  }
});

// ✅ Get like count and user's like status
router.get('/:postId/likes', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;

  try {
    const count = await Like.count({ where: { postId } });
    const likedByUser = await Like.findOne({ where: { postId, userId } });

    res.status(200).json({
      totalLikes: count,
      likedByUser: !!likedByUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch like info' });
  }
});

// GET all posts
router.get('/', postController.getAllPosts);

// POST create new post
router.post('/', validatePost, postController.createPost);

// PUT update post by id
router.put('/:id', validatePost, postController.updatePost);

// DELETE post by id
router.delete('/:id', postController.deletePost);

router.get('/user/:userId', postController.getPostsByUserId);


module.exports = router;
