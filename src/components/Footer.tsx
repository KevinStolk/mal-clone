import React from 'react';
import ThemeToggle from './ThemeToggle';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF, FaGithub, FaTiktok, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='border-t bg-primary px-2 w-full mt-8 pt-8 text-primary'>
      <div className='text-center'>
        <div className='w-full flex justify-center'>
          <div className='w-full md:w-[300px] py-4 relative'>
            <div className='flex justify-center md:justify-center py-4 md:py-0 md:pb-4 mt-[-1rem]'>
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
      <p className='text-center py-4'>Powered by Jikan Moe & MyAnimeList</p>
    </div>
  );
};

export default Footer;
