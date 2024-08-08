import React from 'react';
import HomeImg from '../assests/_c2eaa92b-3b99-4b27-b486-bde9c7c0616f.jpeg';

const ContactUs = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="flex flex-col gap-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold mb-2">Contact us</h1>
          <p className="text-gray-600 mb-6">Subheading for description or instructions</p>
          <form>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label htmlFor="first-name" className="block text-gray-700">First name</label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="Jane"
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="last-name" className="block text-gray-700">Last name</label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  placeholder="Smitherton"
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@janesfakedomain.net"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700">Your message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your question or message"
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="mt-6 md:mt-0 md:w-1/2 max-w-[400px]">
          <img className="object-cover aspect-square rounded-3xl" alt="landing page" src={HomeImg} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
