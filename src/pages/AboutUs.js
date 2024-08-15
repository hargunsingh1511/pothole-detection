import React from 'react';
import { Link } from 'react-router-dom';
import HomeImg from '../assests/_c2eaa92b-3b99-4b27-b486-bde9c7c0616f.jpeg';

export const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-20 my-10 md:my-20">
      <div className="flex justify-center flex-col gap-y-4 mb-10 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">About Us</h1>
        <p className="text-gray-600 mb-6">Subheading for description or instructions</p>
        <div className="flex flex-col md:flex-row justify-evenly">
          <div className="max-w-full md:max-w-[500px]">
            Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:
            <br />
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
          </div>
        </div>
      </div>
      <div className="max-w-full md:max-w-[400px]">
        <img className="w-full object-cover aspect-square rounded-3xl" alt="landing page" src={HomeImg} />
      </div>
    </div>
  );
};

export default AboutUs;
