// // src/components/LoginForm.jsx
// import React, { useState } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/user/login', {
//         user_email: form.email,
//         user_password: form.password,
//       });
//       alert('Login successful!');
//       setError('');
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-400"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-400"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
//         >
//           Login
//         </button>

//         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default LoginForm;



import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/login', {
        user_email: form.email,
        user_password: form.password,
      });

      console.log('Login response:', res.data);

      // Example after login API response
localStorage.setItem("user", JSON.stringify({
        user_id: res.data.user.user_id,
        user_name: res.data.user.user_name,
        user_email: res.data.user.user_email,
        
      }));

      // alert('Login successful!');
      toast.success('Login successful!');
      setError('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Log in to Twitter
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-full px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-full px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition duration-300"
        >
          Log In
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
