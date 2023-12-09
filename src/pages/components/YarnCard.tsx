/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SlClose } from 'react-icons/sl';
import { Avatar, MediaSideBarArr, YarnyLogo, YarnyLogoIcon } from '@/constant';
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
import { createNewYarn, toggleLikeYarn } from '../api';

function YarnCard({name, setRefresh,text, likes, reyarn, recordId, isReyarn}: {name: string; text: string; likes: string[]; reyarn: string[], recordId: string, isReyarn:boolean, setRefresh: React.Dispatch<React.SetStateAction<boolean>>}) {
// const YarnCard: React.FC = ({name,text, likes, isLiked, reyarn}: {name: string; text: string; likes: string; isLiked: boolean; reyarn: string}) => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();
  const [localLikes, setLocalLikes] = useState<string[]>(likes)
  const user: any = useSelector((state: any) => state.user);
  const reYarn = async () => {
    const reyarnData = {
      text,
      isComment: false, //is yarn as a comment
      isReyarn: true, // is a reyar
      username: user?.username,
      userRecordId: user.userRecordId,
      parentYarnRecordId: recordId,
    };
    // console.log(reyarnData, user, 'reyarn data')
    createNewYarn(reyarnData).then((user) =>{
      console.log(user, 'create reyarn result')
      setRefresh(true)
    });
  };

  const likeYarnData = async () => {
    toggleLikeYarn (recordId, user.userRecordId).then((userr) =>{
      if (localLikes.includes(user?.userRecordId as string)){
        setLocalLikes(localLikes.filter(string=> string !==user?.userRecordId))
      }
      else{
        setLocalLikes((prev)=> [...prev, user?.userRecordId])
      }
      setRefresh(true)
      console.log(userr, 'like yarn result successful')
    }
      
    );
  };
  return (
    <div className='rounded-lg px-3 py-5 mb-1 flex flex-row justify-between items-start border-b-[0.6px] border-[#CED5DC]'>
      <div className='flex flex-col justify-center items-center'>
      <Image
        src={Avatar}
        alt='avatar'
        width={35}
        height={35}
      />
      <span className='w-[1px] h-[55px] mt-1 bg-[#CED5DC]'></span>
      </div>
        <div className="text-xs w-[70%]">
          <p>{name} yarn say...</p>
        {text}
        </div>
      

      <div className='flex flex-col items-center justify-center '>
      <p className='text-right text-xs font-normal flex flex-row items-center mb-5'> <AiFillLike onClick={likeYarnData} className={`${localLikes.includes(user?.userRecordId) ? 'text-red-700':'text-gray-700'} text-xl  mr-1 cursor-pointer`} />  {localLikes ? localLikes?.length : 0}</p>
          <p className='text-right text-xs font-normal flex flex-row items-center my-5'> <FaRetweet  onClick={isReyarn ? ()=>null : reYarn} className={`${isReyarn ? 'text-main':'text-gray-700'} text-xl  mr-1 cursor-pointer`}  /> {reyarn ? reyarn?.length : 0}</p>
        
      </div>
      {/* top card */}
      {/* <div className='flex flex-row items-center '>
        <BsPersonCircle className='text-3xl text-main mr-1' />
        <div>
          <p className='text-right text-xs text-gray-600'>@{name}</p>
        </div>
        <button className="bg-white flex flex-row items-center hover:text-main px-5 py-2 my-3 text-gray-600 font-medium ml-4 text-xs">Follow <MdOutlinePersonAdd  className="ml-1"/></button>
      </div>
      {/* text card */}
      {/* <div className="text-xs my-2">
      {text}
      </div>
      <div className='flex flex-row items-center justify-between'>
        
        <div className="flex flex-row items-center my-4">
          <p className='text-right text-xs font-normal flex flex-row items-center mr-6'> <AiFillLike className={`${isLiked ? 'text-red-700':'text-gray-700'} text-sm  mr-1`} />  {likes} Likes</p>
          <p className='text-right text-xs font-normal flex flex-row items-center'> <FaRetweet className='text-sm text-gray-700 mr-1' /> {reyarn} Reyarns</p>
        </div>
        
      </div>  */}

    </div>
  );
};

export default React.memo(YarnCard);
