const { Like } = require('../models');

exports.likePost = async (req, res) => {
  const { postd } = req.params;
  const { userId } = req.body.user_id;
  console.log(req.body.user_id)
  console.log(postId,userId)

  try {
    const created = await Like.findOrCreate({
      where: { user_id:userId, post_id:postId }
    });

    if (created) {
      return res.status(201).json({ message: 'Post liked' });
    } else {
      return res.status(200).json({ message: 'Already liked' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to like post' });
  }
};

exports.unlikePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const deleted = await Like.destroy({ where: { userId, postId } });

    if (deleted) {
      return res.status(200).json({ message: 'Post unliked' });
    } else {
      return res.status(404).json({ error: 'Like not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to unlike post' });
  }
};

exports.getLikes = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;

  try {
    const count = await Like.count({ where: { postId } });
    const likedByUser = await Like.findOne({ where: { postId, userId } });

    return res.status(200).json({
      totalLikes: count,
      likedByUser: !!likedByUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get likes' });
  }
};
