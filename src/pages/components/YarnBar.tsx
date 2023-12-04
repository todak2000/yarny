/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SlClose } from 'react-icons/sl';
import { MediaSideBarArr, YarnyLogo, YarnyLogoIcon } from '@/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../../store';
import { auth } from '../../firebase';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useImageWidth from '@/utils/useImageWidthHook';
import { CgProfile } from "react-icons/cg";
import { TfiWrite } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import YarnCard from './YarnCard';

const YarnBar: React.FC = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();

  const handleLink = (link: string) => {
    push(link);
  };
  

  return (
    <div className="bg-white p-6 h-[100vh]  w-full">
      <div className='flex flex-row border-b border-[#D9D9D9] py-4'>
        <p className="text-sm mr-4 flex flex-row items-center text-[#232323]">Yarn wetin dey your mind <TfiWrite className="ml-2"/></p>
        <p className="text-sm flex flex-row items-center">Notification <IoMdNotifications  className="ml-2"/></p>
      </div>
      <div className="overflow-y-auto py-6 h-[90vh]">
      <YarnCard />
      <YarnCard />
      <YarnCard />
      <YarnCard />
      <YarnCard />
      <YarnCard />
      </div>
    </div>
    // <div
    //   className={`${
    //     showSideBar && !showMobile
    //       ? 'w-[450px] bg-[#C4DFE6] py-12 h-[100vh]'
    //       : showMobile && showSideBar
    //       ? 'w-full bg-white py-4'
    //       : 'w-[100px] bg-[#C4DFE6] py-12 h-[100vh]'
    //   }  flex flex-col  `}
    // >
      
           
    // </div>
  );
};

export default React.memo(YarnBar);
