/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillSendFill } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import { IoMdNotifications } from 'react-icons/io';
import YarnCard from './YarnCard';
import { createNewYarn, getYarns } from '../api';
import { useGetDashboardYarnData } from '@/utils/yarnHooks';
import Image from 'next/image';
import { MdOutlineCommentsDisabled } from "react-icons/md";

const YarnBar: React.FC = () => {
  const { push, pathname } = useRouter();
  const user = useSelector((state: any) => state.user);
  const [yarnData, setYarnData] = useState<any>();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [referesh, setRefresh] = useState<boolean>(false);
  const { data, isError } = useGetDashboardYarnData();
  const handleLink = (link: string) => {
    push(link);
  };

  const allYarns = async () => {
    setLoading(true);
    getYarns().then((users) => {
      setYarnData(users);
      setTimeout(() => {
        setRefresh(false);
        setLoading(false);
      }, 3000);
    });
  };
  console.log(data, 'data from react qury');
  const createNewYarnData = async () => {
    setCreateLoading(true);
    const data = {
      text,
      isComment: false, //is yarn as a comment
      isReyarn: false, // is a reyar
      username: user?.username,
    };
    createNewYarn(data).then((user) => {
      // allYarns()
      setText('');
      setCreateLoading(false);
      console.log(user, 'create yarn result');
    });
  };

  useEffect(() => {
    allYarns();
  }, []);

  useEffect(() => {
    if (!createLoading) {
      allYarns();
      console.log('called---');
    }
  }, [createLoading, referesh, yarnData?.yarnData?.length]);

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
          ></textarea>

          <div className='flex flex-row justify-between  p-1'>
            <p className='mt-1 text-xs text-yellow-500'>{1000 - text.length} characters left</p>
            <button
              onClick={createNewYarnData}
              className={`${
                text === '' ? 'bg-transparent md:bg-[#E5E5E5] border-[0.2px] md:border-0 border-main' : 'bg-main'
              } rounded-sm hover:border-1 flex flex-row items-center px-5 font-thin text-white hover:border hover:border-main hover:bg-white hover:text-main h-10`}
              disabled={createLoading || text === ''}
            >
              {createLoading ? (
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
      {data?.yarnData.length === 0 ? (
              <div className='flex w-full flex-col items-center justify-center text-center'>
                <MdOutlineCommentsDisabled  className='text-xl'/>

                <p className='text-gray-500 text-sm'>Yarn no dey! Start am</p>
              </div>
            ) : (
              data?.yarnData
                ?.map((data: any) => {
                  
                  const c = {
                    name: data?.name || 'username',
                    text: data?.text,
                    likes: data?.likes,
                    isReyarn: data?.isReyarn,
                    reyarn: data?.reyarn,
                    recordId: data?.recordId,
                  };
                  return (
                    <YarnCard
                    setRefresh={setRefresh}
                      key={data?.recordId}
                      name={c.name}
                      text={c.text}
                      likes={c.likes}
                      isReyarn={c.isReyarn}
                      reyarn={c.reyarn}
                      recordId={c.recordId}
                    />
                  );
                })
                .reverse()
            )}
        {/* {loading && (
          <div className='flex h-20 w-full flex-col items-center justify-center'>
            <ImSpinner2 className='animate-spin' />
          </div>
        )}

        {!loading && (
          <>
            {yarnData?.yarnData.length < 0 ? (
              <div className='flex w-full flex-col items-center justify-center text-center'>
                <Image
                  src={emptyYarnImage}
                  alt='empty yarn image'
                  width={300}
                  height={300}
                />
                <h2 className='text-gray-500'>No Yarn Available, Yarn!</h2>
              </div>
            ) : (
              yarnData?.yarnData
                ?.map((data: any) => {
                  
                  const c = {
                    name: data?.name || 'username',
                    text: data?.text,
                    likes: data?.likes,
                    isReyarn: data?.isReyarn,
                    reyarn: data?.reyarn,
                    recordId: data?.recordId,
                  };
                  return (
                    <YarnCard
                    setRefresh={setRefresh}
                      key={data?.recordId}
                      name={c.name}
                      text={c.text}
                      likes={c.likes}
                      isReyarn={c.isReyarn}
                      reyarn={c.reyarn}
                      recordId={c.recordId}
                    />
                  );
                })
                .reverse()
            )}
          </>
        )} */}


      </div>
    </div>

  );
};

export default React.memo(YarnBar);
