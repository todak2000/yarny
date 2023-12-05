/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { BsFillSendFill } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import YarnCard from './YarnCard';
import { createNewYarn, getYarns } from '../api';
import { useGetDashboardYarnData } from '@/utils/yarnHooks';
const YarnBar: React.FC = () => {
  const { push, pathname } = useRouter();
  const user = useSelector((state: any) => state.user);
  const [yarnData, setYarnData] = useState<any>();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
const {data, isError} = useGetDashboardYarnData()
  const handleLink = (link: string) => {
    push(link);
  };

  
  
  const allYarns = async () => {
    setLoading(true)
    getYarns().then((users) => 
    {
    setYarnData(users)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
    }
    );
  };
  console.log(data, 'data from react qury')
  const createNewYarnData = async () => {
    setCreateLoading(true)
    const data = {
      text,
      isComment: false, //is yarn as a comment
      isReyarn: false, // is a reyar
      username: user?.username
    };
    createNewYarn(data).then((user) =>{
      // allYarns()
      setText('')
      setCreateLoading(false)
      console.log(user, 'create yarn result')
      

    });
  };

  
  useEffect(() => {
    allYarns();
  }, []);
  
  useEffect(() => {
    if(!createLoading){
      allYarns();
      console.log('called---')
    }
    
  }, [createLoading]);

  return (
    <div className="bg-white p-6 h-[100vh]  w-full">
      {user?.username &&
      <div className="border-[0.5px]  rounded-lg border-[#D9D9D9]">
          <textarea 
          className='border-transparent w-full bg-[#F8F8FA] h-20' 
          placeholder="Yarn wetin dey your mind"
          value={text}
          onChange={(e:any)=>setText(e.target.value)}
          >

          </textarea>

        <div className='flex flex-row justify-end  p-1'>
          <button
          onClick={createNewYarnData}
          className={`${text=== '' ? 'bg-slate-500':'bg-main'}  hover:bg-white hover:text-main hover:border hover:border-1 hover:border-main px-5 py-2 text-white font-thin flex flex-row items-center`}
          disabled={createLoading || text=== ''}
          >
            {createLoading ? 
            <ImSpinner2 className="animate-spin" />
            :
            <>
            Yarn <BsFillSendFill className="ml-3"/>
            </>
            } </button>
        {/* <p className="text-sm mr-4 flex flex-row items-center text-[#232323]">Yarn wetin dey your mind <TfiWrite className="ml-2"/></p> */}
          {/* <p className="text-sm flex flex-row items-center">Notification <IoMdNotifications  className="ml-2"/></p> */}
        </div>
      </div>
      }
      <div className="overflow-y-auto py-6 h-[90vh]">
        {loading && <div className='w-full h-20 flex flex-col items-center justify-center'>
          <ImSpinner2 className="animate-spin" />
          </div>}
        {!loading && yarnData?.yarnData?.map((data:any)=>{
          const c = {
            name: data?.name || 'username',
            text: data?.text,
            likes: data?.likes,
            isLiked: false,
            reyarn : data?.reyarn
          }
          return <YarnCard key={data?.recordId} name={c.name} text={c.text} likes={c.likes} isLiked={c.isLiked} reyarn={c.reyarn}/>
        }).reverse()}
      
      {/* <YarnCard />
      <YarnCard />
      <YarnCard />
      <YarnCard />
      <YarnCard /> */}
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
