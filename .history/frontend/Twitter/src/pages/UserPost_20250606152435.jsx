import React, { useEffect, useState } from 'react';
import { fetchPostsByUser } from '../services/UserPost';
import { UserCircle2 } from 'lucide-react'; // optional: for avatar icon

const UserPosts = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.user_id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const userPosts = await fetchPostsByUser(userId);
        setPosts(userPosts);
        console.log('Fetched posts:', userPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [userId]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (posts.length === 0)
    return <p className="text-center mt-10 text-gray-500">No posts found for this user.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Posts by <span className="text-blue-600">{posts[0]?.User?.user_name}</span>
      </h2>

      <div className="space-y-6 ">
        {posts.map((post) => (
          <div
            key={post.post_id}
            className=" shadow-md rounded-xl p-5 border bg-gray-800 border-gray-200 hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center space-x-3 mb-3">
              <UserCircle2 className="text-blue-500 w-6 h-6" />
              <div>
                <p className="font-medium text-red-600">{post.User?.user_name}</p>
                <p className="text-sm text-white">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-white text-base text-center">{post.post_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
