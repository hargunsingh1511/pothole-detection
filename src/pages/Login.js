import React from 'react';
// import HomeImg from '../assets/_c2eaa92b-3b99-4b27-b486-bde9c7c0616f.jpeg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="flex flex-col gap-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold mb-2">Login</h1>
          <p className="text-gray-600 mb-6">Sign in to your account</p>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up here</Link>.
          </p>
        </div>
        <div className="mt-6 md:mt-0 md:w-1/2 max-w-[400px]">
          {/* <img className="object-cover aspect-square rounded-3xl" alt="landing page" src={HomeImg} /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;