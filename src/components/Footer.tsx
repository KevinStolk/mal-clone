import React from 'react';
import ThemeToggle from './ThemeToggle';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF, FaGithub, FaTiktok, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='border-t bg-primary px-2 w-full mt-8 pt-8 text-primary'>
      <div className='grid md:grid-cols-2'>
        <div className='flex justify-evenly w-full md:max-w-[300px] uppercase'>
          <div>
            <h2 className='font-bold'>Support</h2>
            <ul>
              <li className='text-sm py-2'>Help Center</li>
              <li className='text-sm py-2'>Contact Us</li>
              <li className='text-sm py-2'>API Status</li>
              <li className='text-sm py-2'>Documentation</li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold'>Info</h2>
            <ul>
              <li className='text-sm py-2'>About Us</li>
              <li className='text-sm py-2'>Lorem ipsum</li>
              <li className='text-sm py-2'>Lorem ipsum</li>
              <li className='text-sm py-2'>Lorem Ipsum</li>
            </ul>
          </div>
        </div>

        <div className='text-right'>
          <div className='w-full flex justify-end'>
            <div className='w-full md:w-[300px] py-4 relative'>
              <div className='flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]'>
                <ThemeToggle />
              </div>
              <div className='social-icons flex py-4 justify-between text-accent'>
                <AiOutlineInstagram />
                <FaTiktok />
                <FaFacebookF />
                <FaTwitter />
                <FaGithub />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='text-center py-4'>Powered by Jikan Moe & MyAnimeList</p>
    </div>
  );
};

export default Footer;
