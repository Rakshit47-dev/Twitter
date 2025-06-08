import React, { useEffect, useState } from "react";
import { fetchPostsByUser } from "../services/UserPost";
import { UserCircle2 } from "lucide-react"; // optional: for avatar icon
import TweetCard from "../components/TweetCard";

const UserPosts = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user_id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const userPosts = await fetchPostsByUser(userId);
        setPosts(userPosts);
        console.log("Fetched posts:", userPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [userId]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (posts.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No posts found for this user.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Posts by{" "}
        <span className="text-blue-600">{posts[0]?.User?.user_name}</span>
      </h2>

      <div className="space-y-6 ">
        {posts.map((post) => (
          <TweetCard
            key={tweet.post_id}
            tweet={tweet}
            comments={comments}
            newComment={newComment}
            setComments={setComments}
            setNewComment={setNewComment}
            handleCommentSubmit={handleCommentSubmit}
            onDelete={(deletedId) =>
              setTweets((prev) => prev.filter((t) => t.post_id !== deletedId))
            }
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
