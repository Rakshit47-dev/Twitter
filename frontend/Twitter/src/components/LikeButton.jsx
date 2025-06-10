import React, { useEffect, useState } from 'react';
import { likePost, unlikePost, fetchLikes } from '../api/likeApi';

const LikeButton = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        const res = await fetchLikes(postId, userId);
        setLiked(res.data.likedByUser);
        setTotalLikes(res.data.totalLikes);
      } catch (err) {
        console.error('Error fetching likes:', err);
      }
    };
    getLikeStatus();
  }, [postId, userId]);

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await unlikePost(postId, userId);
        setLiked(false);
        setTotalLikes((prev) => prev - 1);
      } else {
        await likePost(postId, userId);
        setLiked(true);
        setTotalLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      className={`px-3 py-1 rounded border ${
        liked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100'
      }`}
    >
      {liked ? '💖 Liked' : '🤍 Like'} ({totalLikes})
    </button>
  );
};

export default LikeButton;
