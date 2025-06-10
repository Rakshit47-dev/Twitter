// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost } = require('../middleware/validation');

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
