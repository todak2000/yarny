/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { MdOutlineCommentsDisabled } from "react-icons/md";
import { useSelector } from 'react-redux';

import { useCreateYarn, useGetDashboardYarnData } from '@/utils/yarnHooks';

import YarnCard from './YarnCard';
import { getYarns } from '../api';

const YarnBar: React.FC = () => {
  const { push } = useRouter();
  const user = useSelector((state: any) => state.user);
  const [yarnData, setYarnData] = useState<any>();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [referesh, setRefresh] = useState<boolean>(false);
  const { data, isError } = useGetDashboardYarnData();
  const handleLink = (link: string) => {
    push(link);
  };
  const { 
    createNewYarn, 
    isLoading: isCreateLoading, 
    error: createError, 
    isError:isCreateError, 
    isSuccess:isCreateSuccess, 
    data:createData 
  } =
  useCreateYarn();
 
  const handleGetAllYarns = () =>{
    setLoading(true)
    getYarns().then(res=> {
      setTimeout(() => {
        setYarnData(res)
        setLoading(false)
      }, 3000);
      console.log(yarnData, 'data from events')
    })
  }
  useEffect(() => {
    if (isCreateError) {
      console.log(createError, 'error')
    }
    else if(isCreateSuccess || referesh) {
      handleGetAllYarns()
       setText('');
    }
    
  }, [isCreateError, isCreateSuccess, referesh]);

useEffect(() => {
  handleGetAllYarns()
  
}, [])


  console.log(yarnData, 'yarn data dashbaoird dnaata')
  const createNewYarnData = async () => {
    const data = {
      text,
      isComment: false, //is yarn as a comment
      isReyarn: false, // is a reyar
      username: user?.username,
    
      userRecordId: user.userRecordId,
      parentYarnRecordId: '',
    };
    createNewYarn(data)
  }


  return (
    <div className='h-[100vh] w-full bg-black md:bg-white '>
      {user?.username && (
        <div className='rounded-lg m-6'>
          <textarea
            className='h-20 w-full rounded-sm border-[0.1px] border-main md:border-transparent bg-[#0C0C0C] md:bg-[#F8F8FA] text-white md:text-black'
            placeholder='Yarn wetin dey your mind'
            value={text}
            maxLength={1000}
            onChange={(e: any) => setText(e.target.value)}
          />

          <div className='flex flex-row justify-between  p-1'>
            <p className='mt-1 text-xs text-yellow-500'>{1000 - text.length} characters left</p>
            <button

              onClick={createNewYarnData}
              className={`${
                text === '' ? 'bg-transparent md:bg-[#E5E5E5] border-[0.2px] md:border-0 border-main' : 'bg-main'
              } rounded-sm hover:border-1 flex flex-row items-center px-5 font-thin text-white hover:border hover:border-main hover:bg-white hover:text-main h-10`}
              disabled={isCreateLoading || text === ''}
            >
              {isCreateLoading ? (
                <ImSpinner2 className='animate-spin' />
              ) : (
                <>
                  Yarn <BsFillSendFill className='ml-3' />
                </>
              )}{' '}
            </button>
          </div>
        </div>
      )}
      <div className='h-[70vh] overflow-y-auto px-6 py-3 shadow-sm rounded-3xl bg-white'>
      {yarnData?.yarnData.length === 0 ? (
              <div className='flex w-full flex-col items-center justify-center text-center'>
                <MdOutlineCommentsDisabled  className='text-xl'/>

                <p className='text-gray-500 text-sm'>Yarn no dey! Start am</p>
                <button
disabled={loading}
              onClick={handleGetAllYarns}
              className=" bg-main rounded-sm hover:border-1 flex flex-row items-center px-5 font-thin text-white hover:border hover:border-main hover:bg-white hover:text-main h-10"
            >{loading ? (
              <ImSpinner2 className='animate-spin' />
            ) : (
              <>
                Refresh
              </>
            )}{' '}
            </button>
              </div>
            ) : (
              yarnData?.yarnData
                ?.filter((data:any)=> !data.isComment).map((data: any) => {
                  
                  const c = {
                    name: data?.name || 'username',
                    text: data?.text,
                    likes: data?.likes,
                    isReyarn: data?.isReyarn,
                    reyarn: data?.reyarn,
                    recordId: data?.recordId,
                    comments:data?.comments
                  };
                  return (
                    <YarnCard
                    setRefresh={setRefresh}
                      key={data?.recordId}
                      name={c.name}
                      text={c.text}
                      comments={c.comments}
                      likes={c.likes}
                      isReyarn={c.isReyarn}
                      reyarn={c.reyarn}
                      recordId={c.recordId}
                    />
                  );
                })
                .reverse()
            )}
      </div>
    </div>

  );
};

export default React.memo(YarnBar);
