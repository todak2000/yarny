/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import React, {useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsFillSendFill } from 'react-icons/bs';
import { FaRetweet } from "react-icons/fa6";
import { ImSpinner2 } from 'react-icons/im';
import { useSelector } from 'react-redux';

import { Avatar } from '@/constant';

import { createComment, createNewYarn, toggleLikeYarn } from '../api';


function YarnCard({name, setRefresh, comments, text, likes, reyarn, recordId, isReyarn}: {name: string; text: string; likes: string[]; reyarn: string[], recordId: string, comments: any[], isReyarn:boolean, setRefresh: React.Dispatch<React.SetStateAction<boolean>>}) {

  const [show, setShow]= useState<boolean>(false)
  const [comentLoading, setCommentLoading]= useState<boolean>(false)

  const [comment, setComment] = useState<string>('');
  const [localLikes, setLocalLikes] = useState<string[]>(likes)
  const user: any = useSelector((state: any) => state.user);

  const createCommentData = async () => {
    setCommentLoading(true)
    const commentData = {
      text: comment,
      isComment: true, //is yarn as a comment
      isReyarn: false, // is a reyar

      username: user?.username,
      userRecordId: user.userRecordId,
      parentYarnRecordId: recordId,
    };
    createComment(commentData).then((user: any) =>{
      setCommentLoading(false)
      setComment('')
      setRefresh(true)
    });
  };

  const reYarn = async () => {
    const reyarnData = {
      text,
      isComment: false, //is yarn as a comment
      isReyarn: true, // is a reyar
      username: user?.username,
      userRecordId: user.userRecordId,
      parentYarnRecordId: recordId,
    };
    createNewYarn(reyarnData).then((user) =>{
      setRefresh(true)
    });
  };

  const likeYarnData = async () => {
    toggleLikeYarn (recordId, user.userRecordId).then((userr: any) =>{
      if (localLikes.includes(user?.userRecordId as string)){
        setLocalLikes(localLikes.filter(string=> string !==user?.userRecordId))
      }
      else{
        setLocalLikes((prev)=> [...prev, user?.userRecordId])
      }
      setRefresh(true)
    }
      
    );
  };
  return (
    <>
    <div className='rounded-lg px-3 py-5 mb-1 flex flex-row justify-between items-start border-b-[0.6px] border-[#CED5DC]'>
      <div className='flex flex-col justify-center items-center'>
      <Image
        src={Avatar}
        alt='avatar'
        width={35}
        height={35}
      />
      <span className='w-[1px] h-[30px] mt-1 bg-[#CED5DC]'></span>
      </div>
        <div className="text-xs w-[70%] md:w-[90%]">
          <p className='h-[35px] flex flex-row items-center '>
                <span className='px-2 bg-gray-300 text-black rounded-xl mb-2 mr-1'>{name}</span> 
                </p>
        {text}
        </div>
      

      <div className='flex flex-col items-center justify-center '>
      <p className='text-right text-xs font-normal flex flex-row items-center'> <AiFillLike onClick={likeYarnData} className={`${localLikes.includes(user?.userRecordId) ? 'text-red-700':'text-gray-700'} text-xl  mr-1 cursor-pointer`} />  {localLikes ? localLikes?.length : 0}</p>
          <p className='text-right text-xs font-normal flex flex-row items-center'> <FaRetweet  onClick={isReyarn ? ()=>null : reYarn} className={`${isReyarn ? 'text-main':'text-gray-100'} text-xl  mr-1 cursor-pointer`}  /> {reyarn ? reyarn?.length : 0}</p>
          <p className='text-right text-xs font-normal flex flex-row items-center'> <BiSolidCommentDetail  onClick={()=>setShow(!show)} className="text-gray-100 text-xl  mr-1 cursor-pointer" /> {comments ? comments?.length : 0}</p>
        
      </div>
      

    </div>
    {show &&
      <div className=' max-h-[180px] overflow-y-auto w-full  relative'>
        <textarea
            className='h-12 w-[70%] md:w-[80%] text-xs rounded-sm border-0 border-transparent bg-[#D9D9D9] text-black'
            placeholder='Yarn untop this yarn...'
            value={comment}
            maxLength={1000}
            onChange={(e: any) => setComment(e.target.value)}
          />
          <div className='flex flex-row justify-between  p-1 w-[20%]'>
            <button

              onClick={createCommentData}
              className={`${
                text === '' ? 'bg-transparent md:bg-[#E5E5E5] border-[0.2px] md:border-0 border-main' : 'bg-main'
              } absolute top-0 right-0 rounded-sm hover:border-1 flex flex-row items-center px-5 font-thin text-white hover:border hover:border-main hover:bg-white hover:text-main h-12`}
              disabled={comentLoading || comment === ''}
            > 
              {comentLoading ? (
                <ImSpinner2 className='animate-spin' />
              ) : (
                <>
                  <BsFillSendFill className='text-sm' />
            <span className='ml-2 text-xs text-white'>{1000 - comment.length}</span>
                </>
              )}{' '}
            </button>
          </div>
        {comments?.length > 0 && comments?.map(comment =>{
          return <div key={comment?.recordId} className='rounded-sm w-full md:ml-12 bg-gray-100 px-3 py-3 md:py-5 mb-1 flex flex-row items-start border-b-[0.6px] border-[#CED5DC]'>
          <div className='flex flex-col justify-center items-center'>
          <Image
            src={Avatar}
            alt='avatar'
            width={35}
            height={35}
          />
          </div>
            <div className="text-xs w-[70%] ml-4">
              <p className='h-[35px] flex flex-row items-center '>
                <span className='px-2 bg-green-200 rounded-xl mb-2 mr-1'>{comment?.username}</span> 
                </p>
            {comment.text}
            </div>
    
        </div>
        })
        
        }  
      </div>
      }
    </>
  );
};

export default React.memo(YarnCard);
