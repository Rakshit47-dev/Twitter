import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  // <-- Import framer motion
import birdImage from '../assets/TwitterBird.jpg'; 
import logo from '../assets/logo_01.svg'; 

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const mainVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" }
  }),
};

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300 }
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <motion.header 
        className="flex justify-between items-center px-6 py-4 border-b border-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-xl font-bold text-white flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-35" />
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <motion.button 
              whileHover={buttonHover} 
              className="px-4 py-1 border border-white bg-blue-500 rounded-full hover:bg-blue-600 transition"
            >
              Log in
            </motion.button>
          </Link>
          <Link to="/register">
            <motion.button 
              whileHover={buttonHover} 
              className="px-4 py-1 bg-blue-500 text-white border border-white rounded-full hover:bg-blue-600 transition"
            >
              Sign up
            </motion.button>
          </Link>
        </div>
      </motion.header>

      <main className="flex flex-col md:flex-row justify-center items-center h-[calc(100vh-80px)] px-6">
        {/* Left content */}
        <motion.div 
          className="md:w-1/2 space-y-6 text-center md:text-left"
          custom={0}
          variants={mainVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-6xl font-bold">Happening now</h1>
          <h2 className="text-2xl font-semibold">Join Twitter today.</h2>
          <Link to="/register">
            <motion.button 
              whileHover={buttonHover} 
              className="w-full md:w-auto px-6 py-3 border border-white bg-blue-500 rounded-full text-white text-lg font-medium hover:bg-blue-600"
            >
              Sign up with phone or email
            </motion.button>
          </Link>
          <p className="text-sm text-white mt-4">
            By signing up, you agree to the Terms of Service and Privacy Policy.
          </p>
          <div>
            <p className="font-semibold mb-2">Already have an account?</p>
            <Link to="/login">
              <motion.button 
                whileHover={buttonHover} 
                className="w-full md:w-auto px-6 py-2 border border-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Log in
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right content */}
        <motion.div 
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
          custom={1}
          variants={mainVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={logo}
            alt="Academian Logo"
            className="w-3/4 md:w-[400px] rounded-xl"
          />
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;
