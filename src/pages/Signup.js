import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpImg from '../assests/SignUp.png';
import CustomAlert from '../components/CustomAlert'; 

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

  const navigate = useNavigate(); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      if (!usernameRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Username must start with a letter and be at least 3 characters long.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
      }
    }

    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Please enter a valid email address.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    }

    if (name === 'password') {
      if (value.length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password must be at least 8 characters long.',
        }));
        setPasswordStrength('');
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        evaluatePasswordStrength(value);
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: 'Passwords do not match.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
      }
    }
  };

  const evaluatePasswordStrength = (password) => {
    let strength = '';
    const strengthCriteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const fulfilledCriteria = Object.values(strengthCriteria).filter(Boolean).length;

    if (fulfilledCriteria <= 2) {
      strength = 'Weak';
    } else if (fulfilledCriteria === 3 || fulfilledCriteria === 4) {
      strength = 'Moderate';
    } else if (fulfilledCriteria === 5) {
      strength = 'Strong';
    }

    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid =
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword;

    if (isFormValid) {
      setAlert({ visible: true, message: 'Sign Up Successful!', type: 'success' });

      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000); 
    } else {
      setAlert({ visible: true, message: 'Please fill out all fields correctly.', type: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ visible: false, message: '', type: '' });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="flex flex-col gap-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-6">Create an account to get started</p>
          <form onSubmit={handleSubmit}>
            {alert.visible && (
              <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
            )}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              {passwordStrength && (
                <p className={`text-sm ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Moderate' ? 'text-yellow-500' : 'text-green-500'}`}>
                  Password Strength: {passwordStrength}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>.
          </p>
        </div>
        <div className="max-w-full md:max-w-[500px]">
          <img alt="sign up page" src={SignUpImg} />
        </div>
      </div>
    </div>
  );
};
