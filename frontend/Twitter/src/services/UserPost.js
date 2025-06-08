import axios from 'axios';

export const fetchPostsByUser = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/post/user/${userId}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
