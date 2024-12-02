import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className='w-full h-[85vh] md:px-[80px] px-[20px] flex flex-col md:items-center justify-center'>
      <h1 className='md:text-5xl text-3xl text-white font-extrabold mb-5 md:text-center'>
        Unlock new possibilities through{" "}
        <span className='md:text-[#C07F00] text-white'>inspiring events</span>
      </h1>
      <p className='mb-2 md:text-center md:text-lg md:text-gray-100 text-white'>
        Be part of a community driven by innovation, where thought leaders, entrepreneurs,
        and visionaries come together to share knowledge, spark ideas, and drive change.
      </p>
      <p className='mb-6 md:text-center md:text-lg md:text-gray-100 text-white'>
        From workshops to networking opportunities, elevate your journey and create meaningful connections.
      </p>
      <Link href='/register'>
        <button className='bg-white md:px-6 px-4 py-4 text-[#C07F00] rounded font-bold'>
          JOIN US TODAY
        </button>
      </Link>
    </div>
  );
};

export default Hero;
