import { Trash2 } from "lucide-react";

export default function CommentsSection({ tweetId, comments, newComment, setNewComment, handleCommentSubmit, handleCommentDelete, userId }) {
  return (
    <div className="mt-4 ml-2">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={newComment[tweetId] || ""}
          onChange={(e) =>
            setNewComment((prev) => ({
              ...prev,
              [tweetId]: e.target.value,
            }))
          }
          placeholder="Write a coment..."
          className="bg-gray-800 text-white px-3 py-1 rounded-full w-full text-sm"
        />
        <button
          onClick={() => handleCommentSubmit(tweetId)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm"
        >
          Reply
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-300">
        {(comments[tweetId] || []).map((comment) => (
          console.log(comment),
          <div key={comment.comment_id} className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-md">
            <div>
              <span className="font-semibold text-blue-300">
                {comment.User?.user_name || "User"}:
              </span>{" "}
              {comment.comment}
            </div>
            {comment.user_id === userId && (
              <button className="text-red-400 text-xs ml-4" onClick={() => handleCommentDelete(tweetId, comment.comment_id)}>
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
