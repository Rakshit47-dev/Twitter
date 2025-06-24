import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

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
      const res = await axios.get("http://13.62.71.215:3000/api/v1/post");
      setTweets(res.data);
      console.log(res)
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
      await axios.post(`${import.meta.env.VITE_API_URL}/post`, {
        user_id: userId,
        post_content: tweetText,
      });

      setTweetText("");
      fetchTweets();
    } catch (error) {
      console.error("Error posting tweet", error);
      toast.error(error.response?.data?.details[0].msg || "Failed to post tweet");
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Home":
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="p-4 m-4 bg-gray-800 border border-gray-700 rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TweetInput
                tweetText={tweetText}
                setTweetText={setTweetText}
                handleTweet={handleTweet}
                maxChars={maxChars}
                tweetInputRef={tweetInputRef}
              />
            </motion.div>

            <div>
              {loading ? (
                <p className="text-center text-gray-500 mt-10">Loading tweets...</p>
              ) : (
                <AnimatePresence>
                  {tweets.map((tweet) => (
                    <motion.div
                      key={tweet.post_id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TweetCard
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        );

      case "Profile":
        return (
          <motion.div key="profile" {...pageVariants}>
            <UserPosts />
          </motion.div>
        );

      case "Post":
        return (
          <motion.div
            key="post"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-4 m-4"
          >
            <TweetInput
              tweetText={tweetText}
              setTweetText={setTweetText}
              handleTweet={handleTweet}
              maxChars={maxChars}
              tweetInputRef={tweetInputRef}
            />
          </motion.div>
        );

      case "Settings":
        return (
          <motion.div key="settings" {...pageVariants}>
            <Settings />
          </motion.div>
        );

      default:
        return (
          <motion.p className="p-4" {...pageVariants}>
            Not Found
          </motion.p>
        );
    }
  };

  return (
   <div className="flex flex-col min-h-screen bg-black text-white">
  <div className="flex flex-1">
    {/* Sidebar Slide-in from Left with Delay */}
    <motion.div
      initial={{ x: -150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.2 }}
    >
      <Sidebar onSelect={setSelectedTab} />
    </motion.div>

    {/* Main Content */}
    <main className="flex-1 max-w-2xl border-r border-gray-800">
      {/* Header with delay */}
      <motion.div
        className="p-4 border-b border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1 className="text-xl font-bold">{selectedTab}</h1>
      </motion.div>

      {/* Page Content */}
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </main>

    {/* Right Sidebar Slide-in from Right with Delay */}
    <motion.div
      initial={{ x: 150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.3 }}
    >
      <RightSidebar />
    </motion.div>
  </div>

  <footer className="border-t border-gray-800 text-center py-4 text-sm text-white">
    © 2025 Simple Twitter Clone by Rakshit Sharma. All rights reserved.
  </footer>
</div>

  );
}
