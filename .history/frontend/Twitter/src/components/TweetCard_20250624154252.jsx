
import React, { useState } from "react";
import { Trash2, Edit2, Save, X, ThumbsUp } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function TweetCard({
  tweet,
  comments,
  setComments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  userId,
  onDelete,
  onExpand,
}) {
  const [isEditingTweet, setIsEditingTweet] = useState(false);
  const [editedTweetText, setEditedTweetText] = useState(tweet.post_content);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [likesCount, setLikesCount] = useState(tweet.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleExpand = () => {
    if (!expanded) onExpand?.(tweet.post_id);
    setExpanded(!expanded);
  };


  const handleUpdateTweet = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/post/${tweet.post_id}`, {
        user_id: tweet.user_id,
        post_content: editedTweetText,
      });
      setIsEditingTweet(false);
      tweet.post_content = editedTweetText;
    } catch (error) {
      console.error("Failed to update tweet:", error);
    }
  };

  const handleDeleteTweet = async () => {
    try {
      await axios.delete(`http://13.62.71.215:3000/api/v1/post/${tweet.post_id}`);
      onDelete?.(tweet.post_id);
    } catch (error) {
      console.error("Failed to delete tweet:", error);
    }
  };

  const handleEditComment = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(currentText);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(`http://13.62.71.215:3000/api/v1/comment/${commentId}`, {
        post_id: tweet.post_id,
        user_id: tweet.user_id,
        comment: editedCommentText,
      });

      setComments((prev) => ({
        ...prev,
        [tweet.post_id]: prev[tweet.post_id].map((c) =>
          c.comment_id === commentId ? { ...c, comment: editedCommentText } : c
        ),
      }));
      setEditingCommentId(null);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://13.62.71.215:3000/api/v1/comment/${commentId}`);
      setComments((prev) => ({
        ...prev,
        [tweet.post_id]: prev[tweet.post_id].filter(
          (c) => c.comment_id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

 
const handleLike = async (postId,userId) => {
  console.log(postId,userId)
  try {
    if (!isLiked) {
      // Like the post
      await axios.post(`http://13.62.71.215:3000/api/v1/likes/${postId}/like`, {
        userId: userId, 
      });
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    } else {
      // Unlike the post
      await axios.delete(`http://13.62.71.215:3000/api/v1/likes/${postId}/unlike`, {
        data: { userId: userId }, 
      });
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    }
  } catch (err) {
    console.error("Like/unlike failed:", err.response?.data || err.message);
  }
};


useEffect(() => {
  const fetchLikes = async (postId) => {
    try {
      const res = await axios.get(`http://13.62.71.215:3000/api/v1/likes/${postId}/likes`);
      setLikesCount(res.data.totalLikes);
      // setIsLiked(res.data?.likedByUser.includes(userId)); 
    } catch (err) {
      console.error(err);
    }
  };

  fetchLikes(tweet.post_id);
}, [tweet.post_id, userId]);

  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex space-x-3">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
          alt="user"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-x-2 text-sm text-gray-400 items-center">
              <span className="font-bold text-white">
                {tweet.User?.user_name || "Anonymous"}
              </span>
              <span>@user{tweet.user_id}</span>
              <span className="text-gray-500">
                ·{" "}
                {new Date(tweet.created_at).toLocaleString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            {userId === tweet.user_id && (
              <div className="flex space-x-2">
                {isEditingTweet ? (
                  <>
                    <button
                      onClick={handleUpdateTweet}
                      className="text-green-400"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={() => setIsEditingTweet(false)}
                      className="text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditingTweet(true)}
                      className="text-yellow-400"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={handleDeleteTweet}
                      className="text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {isEditingTweet ? (
            <textarea
              className="mt-2 w-full bg-transparent border border-gray-600 text-white p-2 rounded-md"
              rows="2"
              value={editedTweetText}
              onChange={(e) => setEditedTweetText(e.target.value)}
            />
          ) : (
            <>
              <p className="mt-2">{tweet.post_content}</p>
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                <button
                 onClick={() => handleLike(tweet.post_id, userId)}
                  className={`flex items-center space-x-1 ${
                    isLiked ? "text-blue-400" : "text-gray-400"
                  } hover:text-blue-500 transition`}
                >
                  <ThumbsUp size={16} />
                  <span>{likesCount}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand();
                  }}
                  className="hover:text-blue-400"
                >
                  💬 Comment
                </button>
              </div>
            </>
          )}
          
 {/* Comment Section with Animation */}
           <AnimatePresence>
             {expanded && (
              <motion.div
                key="comments"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-2 overflow-hidden"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {comments[tweet.post_id]?.map((comment) => (
                    <motion.div
                      key={comment.comment_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 border border-gray-700 rounded-lg bg-gray-900 text-sm flex justify-between items-start"
                    >
                      <div className="flex-1 flex flex-row space-x-2">
                        <p className="font-bold text-red-600">
                          {comment.User.user_name}:
                        </p>
                        {editingCommentId === comment.comment_id ? (
                          <>
                            <textarea
                              value={editedCommentText}
                              onChange={(e) =>
                                setEditedCommentText(e.target.value)
                              }
                              rows="1"
                              className="w-full mt-1 bg-transparent border border-gray-600 text-white p-1 rounded"
                            />
                            <div className="flex space-x-2 mt-1">
                              <button
                                onClick={() =>
                                  handleUpdateComment(comment.comment_id)
                                }
                                className="text-green-400"
                              >
                                <Save size={14} />
                              </button>
                              <button
                                onClick={() => setEditingCommentId(null)}
                                className="text-red-400"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="">{comment.comment}</p>
                        )}
                      </div>
                      {userId === comment.user_id &&
                        editingCommentId !== comment.comment_id && (
                          <div className="flex space-x-2 ml-2">
                            <button
                              onClick={() =>
                                handleEditComment(
                                  comment.comment_id,
                                  comment.comment
                                )
                              }
                              className="text-yellow-400"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteComment(comment.comment_id)
                              }
                              className="text-red-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment[tweet.post_id]}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        [tweet.post_id]: e.target.value,
                      }))
                    }
                    className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCommentSubmit(tweet.post_id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded"
                  >
                    Comment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
