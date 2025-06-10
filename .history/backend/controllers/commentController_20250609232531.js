// backend/controllers/commentController.js
const { Comment, Post, User } = require('../models');

exports.getCommentsByPost = async (req, res) => {
  const postId = req.params.postId;

  try {
    // Check post exists
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comments = await Comment.findAll({
      where: { post_id: postId, disabled: 0 },
      include: [{ model: User, attributes: ['user_id', 'user_name'] }],
      order: [['created_at', 'ASC']]
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

exports.createComment = async (req, res) => {
  // const postId = req.params.postId;
  const { user_id, comment, post_id } = req.body;
  

  // Validate post and user
  const post = await Post.findByPk(postId);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const user = await User.findByPk(user_id);
  if (!user) return res.status(400).json({ error: 'Invalid user_id' });

  try {
    const newComment = await Comment.create({ post_id: pos, user_id, comment });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;

  try {
    const existingComment = await Comment.findByPk(commentId);
    if (!existingComment) return res.status(404).json({ error: 'Comment not found' });

    existingComment.comment = comment;
    existingComment.updated_at = new Date();
    await existingComment.save();

    res.json(existingComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const [deleted] = await Comment.update({ disabled: 1 }, {
      where: { comment_id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment disabled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
