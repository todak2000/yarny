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
import { MdPersonPin } from "react-icons/md";
const UserBar: React.FC = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();


  const [showDropDown, setShowDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const { showMobile, imageWidth } = useImageWidth();
  const user = useSelector((state: any) => state.user);
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       const userData = {
  //         name: user.displayName,
  //         email: user.email,
  //         photo: user.photoURL,
  //         uid: user.uid,
  //       };
  //       dispatch(setUser(userData as any));
  //     } else {
  //       dispatch(clearUser());
  //       // handleLink('/auth/login');
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);


  const handleLink = (link: string) => {
    push(link);
  };

  return (
    <div
      className={`${
        showSideBar && !showMobile
          ? 'w-[450px] bg-[#C4DFE6] py-12 h-[100vh]'
          : showMobile && showSideBar
          ? 'w-full bg-white py-4'
          : 'w-[100px] bg-[#C4DFE6] py-12 h-[100vh]'
      }  flex flex-col  `}
    >
      {showMobile ? (
        
        null
      ) : (
        <div className='flex flex-row items-center justify-end px-6'>
          
          <div>
          <p className="text-lg text-right font-medium">{user.name}</p>
          <p className="text-xs text-right text-gray-600">{user.username}</p>
          </div>
          <div
            className='flex flex-shrink-0 cursor-pointer flex-row ml-4  items-center'
            onClick={() => handleLink('/')}
          >
            <MdPersonPin className="text-5xl text-main"/>
          </div>
        </div>
      )}

           
    </div>
  );
};

export default React.memo(UserBar);
