import axios from 'axios';

export const likePost = (postId, userId) =>
  axios.post(`/api/likes/${postId}/like`, { userId });

export const unlikePost = (postId, userId) =>
  axios.delete(`/api/likes/${postId}/unlike`, { data: { userId } });

export const fetchLikes = (postId, userId) =>
  axios.get(`/api/likes/${postId}/likes?userId=${userId}`);
