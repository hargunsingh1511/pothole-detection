import React from 'react'
import './AboutUs.module.css'
import { Link } from 'react-router-dom'
import HomeImg from '../assests/_c2eaa92b-3b99-4b27-b486-bde9c7c0616f.jpeg'
export const AboutUs = () => {
  return (
    <div className='h-[400px]    flex justify-between mx-20'>
      <div className=' justify-center  flex flex-col gap-y-4 '>
        <h1 className='text-4xl font-bold mb-2'>About us</h1>
        <p className='text-gray-600 mb-6'>Subheading for description or instructions</p>
        <div id="main" class="flex flex-row justify-evenly">
          <div class="max-w-[500px]"> Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:
            <br />
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</div>

        </div>
      </div>
      <div className='  max-w-[400px] '>
        <img className=' object-cover aspect-square rounded-3xl ' alt='landing page' src={HomeImg} />
      </div>
    </div>
  )
}

