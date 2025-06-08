import React from "react";

export default function TweetInput({
  tweetText,
  setTweetText,
  handleTweet,
  maxChars,
  tweetInputRef,
}) {
  return (
    <div className="p-4 border-b border-white">
      <div className="flex space-x-3">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
          alt="avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            ref={tweetInputRef}
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            rows="2"
            maxLength={maxChars}
            placeholder="What's happening?"
            className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
          />
          <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
            <span className={tweetText.length > maxChars ? "text-red-500" : ""}>
              {tweetText.length}/{maxChars}
            </span>
            <button
              onClick={handleTweet}
              disabled={!tweetText.trim() || tweetText.length > maxChars}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 disabled:opacity-50 text-white py-1 px-4 rounded-full"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
