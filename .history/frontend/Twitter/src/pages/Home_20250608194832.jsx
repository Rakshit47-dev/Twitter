import React from 'react';
import { Link } from 'react-router-dom';
import birdImage from '../assets/TwitterBird.jpg'; 

import logo from '../assets/logo.jpg'; 


const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="text-xl font-bold text-white flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-35" />
          
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-1 border border-white bg-blue-500 rounded-full hover:bg-blue-600 transition">Log in</button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-1 bg-blue-500 text-white border border-white rounded-full hover:bg-blue-600 transition">Sign up</button>
          </Link>
        </div>
      </header>

      
      <main className="flex flex-col md:flex-row justify-center items-center h-[calc(100vh-80px)] px-6">
        

        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-6xl font-bold">Happening now</h1>
          <h2 className="text-2xl font-semibold">Join Twitter today.</h2>
          <Link to="/register">
            <button className="w-full md:w-auto px-6 py-3 border border-white bg-blue-500 rounded-full text-white text-lg font-medium hover:bg-blue-600">
              Sign up with phone or email
            </button>
          </Link>
          <p className="text-sm text-white mt-4">
            By signing up, you agree to the Terms of Service and Privacy Policy.
          </p>
          <div>
            <p className="font-semibold mb-2">Already have an account?</p>
            <Link to="/login">
              <button className="w-full md:w-auto px-6 py-2 border border-white bg-blue-500 rounded-full hover:bg-blue-600">
                Sign in
              </button>
            </Link>
          </div>
        </div>

        
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={logo}
            alt="Acade"
            className="w-3/4 md:w-[400px] rounded-xl"
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
