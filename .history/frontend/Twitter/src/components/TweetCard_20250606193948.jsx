import React, { useState } from "react";
import { Trash2, Edit2, Save, X } from "lucide-react";
import axios from "axios";

export default function TweetCard({
  tweet,
  comments,
  setComments, 
  newComment,
  setNewComment,
  handleCommentSubmit,
  userId,
  onDelete,
  onExpand
}) {
  const [isEditingTweet, setIsEditingTweet] = useState(false);
  const [editedTweetText, setEditedTweetText] = useState(tweet.post_content);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    if (!expanded) onExpand?.(tweet.post_id); // Lazy fetch comments
    setExpanded(!expanded);
  };

  const handleUpdateTweet = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/post/${tweet.post_id}`, {
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
      await axios.delete(`http://localhost:3000/api/v1/post/${tweet.post_id}`);
      if (onDelete) onDelete(tweet.post_id);
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
        console.log("Updating comment:", commentId, editedCommentText);
      await axios.put(`http://localhost:3000/api/v1/comment/${commentId}`, {
        post_id: tweet.post_id,
        user_id:tweet.user_id,
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
      await axios.delete(`http://localhost:3000/api/v1/comment/${commentId}`);

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

  return (
    <div className="p-4 border-b border-gray-800 cursor-pointer" onClick={toggleExpand}>
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
            <p className="mt-2" >{tweet.post_content}</p>
            <div className="mt-2">
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          if (!expanded) toggleExpand(); 
        }}
        className="text-blue-400 hover:text-blue-500 text-sm"
      >
        💬 Comment
      </button>
    </div>
    <
    
          )}

          {/* Comment Section */}
          {expanded && (
          <div className="mt-4 space-y-2">
            {comments[tweet.post_id]?.map((comment) => (
                console.log("Rendering comment:", comment),
              <div
                key={comment.comment_id}
                className="p-2 border border-gray-700 rounded-lg bg-gray-900 text-sm flex justify-between items-start"
              >
                <div className="flex-1 flex flex-row space-x-2">
                  <p className="font-bold text-red-600">{comment.User.user_name}: </p>
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
                          handleEditComment(comment.comment_id, comment.comment)
                        }
                        className="text-yellow-400"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.comment_id)}
                        className="text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
              </div>
            ))}

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
          </div>
          )}

          
        </div>
       
      </div>
       <p className="text-gray-500 mt-4">comments</p>
    </div>
  );
}
