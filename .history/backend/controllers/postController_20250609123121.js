
const { Post, User } = require('../models'); 
const { Op } = require('sequelize');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
       where: { disabled: 0 },
      include: [{ model: User, attributes: ['user_id', 'user_name'] },{
        model:likePost,
      }],
      order: [['created_at', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.createPost = async (req, res) => {
  const { user_id, post_content } = req.body;

  // Check user exists
  const user = await User.findByPk(user_id);
  if (!user) return res.status(400).json({ error: 'Invalid user_id' });

  try {
    const newPost = await Post.create({ user_id, post_content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { post_content } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.post_content = post_content;
    post.updated_at = new Date();
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const [deleted] = await Post.update(
      { disabled: 1 },
      {
        where: { post_id: req.params.id },
      }
    );
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post disabled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPostsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Validate the user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Find posts by user_id and not disabled
    const posts = await Post.findAll({
      where: {
        user_id: userId,
        disabled: 0
      },
      include: [{ model: User, attributes: ['user_id', 'user_name', 'user_email'] }],
      order: [['created_at', 'DESC']]
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts by user' });
  }
};
