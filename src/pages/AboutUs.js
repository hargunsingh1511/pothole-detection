import React from 'react';
import AboutImg from '../assests/AboutUs.png';

export const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
        <div className="flex flex-col md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 mb-6">Pothole Patrol: Your Road to a Smoother Ride</p>
          <p className="mb-4">
            We're Pothole Patrol, a community-driven initiative dedicated to improving road conditions for everyone. Tired of dodging potholes and risking damage to your vehicle? So were we. That's why we created this platform to empower citizens like you to make a difference.
          </p>
          <p className="font-bold mb-2">How it works:</p>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Report potholes:</strong> Easily share the location of potholes with our user-friendly application.</li>
            <li><strong>Get Alerts:</strong> Receive notifications about potholes in your area, helping you avoid damage and potential accidents.</li>
            <li><strong>Join the community:</strong> Become part of a growing network of people committed to improving road safety.</li>
          </ul>
          <p className="mb-4">
            Our mission is simple: to create a safer and smoother driving experience for all. By working together, we can make a significant impact on our roads. Join us in the fight against potholes!
          </p>
          <p className="font-bold">Report a pothole now!</p>
        </div>
        <div className="max-w-full md:max-w-[700px]">
          <img
            style={{marginTop: 100}}
            alt="About Us"
            src={AboutImg}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
