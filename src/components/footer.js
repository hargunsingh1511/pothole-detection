import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full p-4 bg-white text-gray-600" style={{marginTop: 100}}>
      <hr className="border-gray-200 mb-4" />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-2">
            <div className="text-gray-700 mb-2">Pothole Detection</div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-700">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-700">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-gray-700">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="flex space-x-8">
            <div className="flex flex-col space-y-2">
              <div className="text-gray-700 font-semibold">Topic</div>
              <a href="#" className="text-gray-700">Page</a>
              <a href="#" className="text-gray-700">Page</a>
              <a href="#" className="text-gray-700">Page</a>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-gray-700 font-semibold">Topic</div>
              <a href="#" className="text-gray-700">Page</a>
              <a href="#" className="text-gray-700">Page</a>
              <a href="#" className="text-gray-700">Page</a>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-gray-700 font-semibold">Topic</div>
              <a href="#" className="text-gray-700">Page</a>
              <a href="#" className="text-gray-700">Page</a>
              <a href="#" className="text-gray-700">Page</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
