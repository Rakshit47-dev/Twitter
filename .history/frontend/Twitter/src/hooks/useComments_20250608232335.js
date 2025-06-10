import { useState } from "react";
import axios from "axios";

export default function useComments(userId) {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/comment/posts/${postId}`);
      setComments((prev) => ({ ...prev, [postId]: res.data }));
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    const text = newComment[postId];
    if (!text?.trim()) return;

    try {
      await axios.post(`http://localhost:3000/api/v1/comment/posts/${postId}`, {
        user_id: userId,
        comment: text,
      });
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      fetchComments(postId);
    } catch (err) {
      console.error("Failed to submit comment:", err.response?.data?.details[0].msg);
    }
  };

  return {
    comments,
    newComment,
    setComments,
    setNewComment,
    fetchComments,
    handleCommentSubmit,
  };
}
