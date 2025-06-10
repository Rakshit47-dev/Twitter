const { Like } = require('../models');

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { user_id } = req.body;
 

  try {
    const created = await Like.findOrCreate({
      where: { user_id:user_id, post_id:postId }
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
  const { user_id } = req.body;

  try {
    const deleted = await Like.destroy({ where: { user_id, post_id: postId } });

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
  const { user_id } = req.query;
console.log(postId,)
  try {
    const count = await Like.count({ where: {post_id: postId } });
    const likedByUser = await Like.findOne({ where: { post_id:postId, user_id } });

    return res.status(200).json({
      totalLikes: count,
      likedByUser: !!likedByUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get likes' });
  }
};
