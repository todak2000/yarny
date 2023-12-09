/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SlClose } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";

import { MediaSideBarArr, YarnyLogo, YarnyLogoIcon } from '@/constant';
import { Avatar } from '@/constant';
import useImageWidth from '@/utils/useImageWidthHook';

import { handleSignOut } from '../api/firebase';
import { clearUser } from '../../store';
const SideBar: React.FC = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const [showDropDown, setShowDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const { showMobile } = useImageWidth();

  const handleOut = () => {
    Swal.fire({
      title: "Are you sure you want to signout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const out: any = await handleSignOut();
        if (out.statusCode === 200) {
          dispatch(clearUser());
          push('/auth/login')
          Swal.fire({
            title: "Success!",
            text: "Logout successfully!",
            icon: "success",
          });
        } else {
          Swal.fire("Oops an error occured", "", "info");
        }
      }
    });
  };

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  const handleLink = (link: string) => {
    push(link);
  };
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div
      className={`${
        showSideBar && !showMobile
          ? 'w-[150px] bg-black py-12 h-[100vh]'
          : showMobile && showSideBar
          ? 'w-full bg-black py-4'
          : 'w-[80px] bg-black py-12 h-[100vh]'
      }  flex flex-col  `}
    >
      {showMobile ? (
        <div className='flex flex-row  items-center justify-between px-6'>
          <div className='flex flex-row'>
          <Image
              src={Avatar}
              alt='avatar'
              width={25}
              height={25}
            />
            <p className='text-white ml-2'>{user?.username ? user.username : '@anonymous'}</p>
          </div>
          <Image src={YarnyLogo} alt='yarny logo' width={13} height={13} />
          {showDropDown ? (
            <SlClose
              onClick={handleClick}
              className='flex text-lg text-white md:hidden cursor-pointer'
            />
          ) : (
            <RxHamburgerMenu
              className='flex text-lg text-white md:hidden cursor-pointer'
              onClick={handleClick}
            />
          )}
        </div>
      ) : (
        <div className='flex flex-row items-center justify-between px-6'>
          <div
            className='flex flex-shrink-0 cursor-pointer flex-row  items-center'
          >
            <Image
              src={showSideBar ? YarnyLogo : YarnyLogoIcon}
              alt='yarny logo'
              width={showSideBar ? 30 : 13}
              height={showSideBar ? 30 : 13}
              onClick={() => handleLink('/')}
              className='cursor-pointer'
            />
          </div>

          {showSideBar ? (
            <IoIosArrowBack
              className='text-2xl text-white cursor-pointer'
              onClick={toggleSideBar}
            />
          ) : (
            <IoIosArrowForward
              className='text-2xl text-white cursor-pointer'
              onClick={toggleSideBar}
            />
          )}
        </div>
      )}

      <div
        className={` ${
          showMobile && showDropDown
            ? 'absolute top-16 right-0 grid w-1/2 grid-cols-1 gap-4 bg-white text-main py-4 drop-shadow-sm '
            : showMobile && !showDropDown
            ? 'hidden'
            : 'my-3 flex-col items-center py-4 '
        }`}
      >
        {MediaSideBarArr.map(
          ({ id, icon, text, redirect }: { id: string; icon: any; text: string, redirect: string }) => {
            return (
              <p
                key={id}
                onClick={() => { text === "Logout" ? handleOut(): text=== 'Home'?
                  handleLink(redirect): null;
                }}
                className={`${text !== "Logout" && text !== 'Home'?
                'text-gray-500': 'text-main md:text-white hover:bg-main'} mx-4 flex cursor-pointer flex-row items-center rounded-lg py-3 px-3 text-sm font-thin `}
              >
                {icon}
                {
                    !showSideBar && !showMobile
                    ? ''
                    : <span className='ml-2'>{text}</span>
                }
                
              </p>
            );
          }
        )}
      </div>
    </div>
  );
};

export default React.memo(SideBar);
