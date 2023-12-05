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

function YarnCard({name,text, likes, isLiked, reyarn}: {name: string; text: string; likes: string; isLiked: boolean; reyarn: string}) {
// const YarnCard: React.FC = ({name,text, likes, isLiked, reyarn}: {name: string; text: string; likes: string; isLiked: boolean; reyarn: string}) => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();


  return (
    <div className='rounded-lg border border-[#D9D9D9] p-3 mt-6'>
      {/* top card */}
      <div className='flex flex-row items-center '>
        <BsPersonCircle className='text-3xl text-main mr-1' />
        <div>
          {/* <p className='text-right text-xs font-medium'>Daniel Olagunju</p> */}
          <p className='text-right text-xs text-gray-600'>@{name}</p>
        </div>
        <button className="bg-white flex flex-row items-center hover:text-main px-5 py-2 my-3 text-gray-600 font-medium ml-4 text-xs">Follow <MdOutlinePersonAdd  className="ml-1"/></button>
      </div>
      {/* text card */}
      <div className="text-xs my-2">
      {text}
      </div>
      <div className='flex flex-row items-center justify-between'>
        
        <div className="flex flex-row items-center my-4">
          <p className='text-right text-xs font-normal flex flex-row items-center mr-6'> <AiFillLike className={`${isLiked ? 'text-red-700':'text-gray-700'} text-sm  mr-1`} />  {likes} Likes</p>
          <p className='text-right text-xs font-normal flex flex-row items-center'> <FaRetweet className='text-sm text-gray-700 mr-1' /> {reyarn} Reyarns</p>
        </div>
        
        {/* <button className="bg-white flex flex-row items-center hover:text-main px-5 py-2 my-3 text-gray-600 font-medium ml-4 text-xs">Follow <MdOutlinePersonAdd  className="ml-1"/></button> */}
      </div>

    </div>
  );
};

export default React.memo(YarnCard);
