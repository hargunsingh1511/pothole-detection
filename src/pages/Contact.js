import React, { useState } from 'react';
import ContactUsImg from '../assests/ContactUs.png';
import CustomAlert from '../components/CustomAlert'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Please enter a valid email address.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: value ? '' : 'This field is required.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required.';
      }
    });

    if (Object.keys(newErrors).length === 0 && !errors.email) {
      setAlert({ message: 'Message sent successfully!', type: 'success' });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      setAlert({ message: 'Please fill out all fields correctly.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="flex flex-col gap-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold mb-2">Contact us</h1>
          <p className="text-gray-600 mb-6">Get in touch with us for any inquiries or support.</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label htmlFor="first-name" className="block text-gray-700">First name</label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="last-name" className="block text-gray-700">Last name</label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Smitherton"
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
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
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700">Your message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your question or message"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="mt-6 md:mt-0 md:w-1/2 max-w-[700px]">
          <img style={{ marginTop: 100 }} alt="contact" src={ContactUsImg} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
