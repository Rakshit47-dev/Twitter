
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserPost from './pages/UserPost';





function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/user/:userId/post" element={<UserPost />} />


      </Routes>
    </Router>
    

  );
}

export default App;
