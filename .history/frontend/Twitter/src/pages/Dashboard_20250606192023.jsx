import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import TweetInput from "../components/TweetInput";
import TweetCard from "../components/TweetCard";
import RightSidebar from "../components/RightSidebar";
import UserPosts from "../pages/UserPost";
import Settings from "../pages/Settings";
import useComments from "../hooks/useComments";

export default function SimpleTwitterDashboard() {
  const navigate = useNavigate();
  const tweetInputRef = useRef(null);
  const maxChars = 280;

  const [selectedTab, setSelectedTab] = useState("Home");
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");

  const [loading, setLoading] = useState(false);


  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user_id;
  const userName = storedUser?.user_name || "You";

  const {
    comments,
    newComment,
    setComments,
    setNewComment,
    fetchComments,
    handleCommentSubmit,
  } = useComments(userId);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/post");
      setTweets(res.data);

      // Fetch comments for each tweet
      res.data.forEach((tweet) => fetchComments(tweet.post_id));
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTweet = async () => {
    if (!tweetText.trim() || tweetText.length > maxChars) return;

    try {
      const res = await axios.post("http://localhost:3000/api/v1/post", {
        user_id: userId,
        post_content: tweetText,
      });

      setTweetText("");
      fetchTweets(); // Refresh after posting
    } catch (error) {
      console.error("Error posting tweet", error);
      toast.error("Failed to post tweet.");
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case "Home":
        return (
          <>
            <div className="p-4 m-4 bg-gray-800 border border-gray-700 rounded-xl shadow-md">
              <TweetInput
                tweetText={tweetText}
                setTweetText={setTweetText}
                handleTweet={handleTweet}
                maxChars={maxChars}
                tweetInputRef={tweetInputRef}
              />
            </div>
            <div>
              {loading ? (
  <p className="text-center text-gray-500 mt-10">Loading tweets...</p>
) : (
              tweets.map((tweet) => (
                <TweetCard
                  key={tweet.post_id}
                  tweet={tweet}
                  comments={comments}
                  newComment={newComment}
                  setComments={setComments}
                  setNewComment={setNewComment}
                  handleCommentSubmit={handleCommentSubmit}
                  onDelete={(deletedId) =>
                    setTweets((prev) =>
                      prev.filter((t) => t.post_id !== deletedId)
                    )
                  }
                  userId={userId}
                />
              ))}
              )}
            </div>
          </>
        );
      case "Profile":
        return <UserPosts />;
      case "Post":
        return (
          <TweetInput
            tweetText={tweetText}
            setTweetText={setTweetText}
            handleTweet={handleTweet}
            maxChars={maxChars}
            tweetInputRef={tweetInputRef}
          />
        );
      case "Settings":
        return <Settings />;
      default:
        return <p className="p-4">Not Found</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex flex-1">
        <Sidebar onSelect={setSelectedTab} />

        {/* Main Content */}
        <main className="flex-1 max-w-2xl border-r border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">{selectedTab}</h1>
          </div>
          {renderContent()}
        </main>

        <RightSidebar />
      </div>

      <footer className="border-t border-gray-800 text-center py-4 text-sm text-white">
        © 2025 Simple Twitter Clone by Rakshit Sharma. All rights reserved.
      </footer>
    </div>
  );
}
