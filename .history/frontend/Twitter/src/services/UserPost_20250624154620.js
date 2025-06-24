import axios from 'axios';

export const fetchPostsByUser = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/post/user/${userId}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
