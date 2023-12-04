/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SlClose } from 'react-icons/sl';
import { MediaSideBarArr, YarnyLogo, YarnyLogoIcon } from '@/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../../store';
import { BsPersonCircle } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa6";
import { auth } from '../../firebase';
import { AiFillLike } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useImageWidth from '@/utils/useImageWidthHook';
import { MdOutlinePersonAdd } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
const YarnCard: React.FC = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();


  return (
    <div className='rounded-lg border border-[#D9D9D9] p-3 mt-6'>
      {/* top card */}
      <div className='flex flex-row items-center '>
        <BsPersonCircle className='text-3xl text-main mr-1' />
        <div>
          <p className='text-right text-xs font-medium'>Daniel Olagunju</p>
          <p className='text-right text-xs text-gray-600'>@adedaaa</p>
        </div>
        <button className="bg-white flex flex-row items-center hover:text-main px-5 py-2 my-3 text-gray-600 font-medium ml-4 text-xs">Follow <MdOutlinePersonAdd  className="ml-1"/></button>
      </div>
      {/* text card */}
      <div className="text-xs my-2">
      The Tailwind CSS code that you wrote is correct and should work as expected. The width of the div element will be dynamically calculated as 100% minus 200px of the screen width. The background color of the div element will be blue-500, which is a shade of blue from the Tailwind CSS color palette. The children prop will render any content that you pass to the div element. You can find more information and examples on how to use the calc() function in Tailwind CSS in the web search results that I found for you. For example, you can check out
      </div>
      <div className='flex flex-row items-center justify-between'>
        
        <div className="flex flex-row items-center my-4">
          <p className='text-right text-xs font-normal flex flex-row items-center mr-6'> <AiFillLike className='text-sm text-gray-700 mr-1' />  23 Likes</p>
          <p className='text-right text-xs font-normal flex flex-row items-center'> <FaRetweet className='text-sm text-gray-700 mr-1' /> 40 Reyarns</p>
        </div>
        
        {/* <button className="bg-white flex flex-row items-center hover:text-main px-5 py-2 my-3 text-gray-600 font-medium ml-4 text-xs">Follow <MdOutlinePersonAdd  className="ml-1"/></button> */}
      </div>

    </div>
  );
};

export default React.memo(YarnCard);
