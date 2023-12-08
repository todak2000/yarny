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
import { emptyYarnImage } from '@/constant';
const YarnBar: React.FC = () => {
  const { push, pathname } = useRouter();
  const user = useSelector((state: any) => state.user);
  const [yarnData, setYarnData] = useState<any>();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data, isError } = useGetDashboardYarnData();
  const handleLink = (link: string) => {
    push(link);
  };

  const allYarns = async () => {
    setLoading(true);
    getYarns().then((users) => {
      setYarnData(users);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
  }, [createLoading]);

  return (
    <div className='h-[100vh] w-full bg-white  p-6'>
      {user?.username && (
        <div className='rounded-lg  border-[0.5px] border-[#D9D9D9]'>
          <textarea
            className='h-20 w-full border-transparent bg-[#F8F8FA]'
            placeholder='Yarn wetin dey your mind'
            value={text}
            onChange={(e: any) => setText(e.target.value)}
          ></textarea>

          <div className='flex flex-row justify-end  p-1'>
            <button
              onClick={createNewYarnData}
              className={`${
                text === '' ? 'bg-slate-500' : 'bg-main'
              }  hover:border-1 flex flex-row items-center px-5 py-2 font-thin text-white hover:border hover:border-main hover:bg-white hover:text-main`}
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
            {/* <p className="text-sm mr-4 flex flex-row items-center text-[#232323]">Yarn wetin dey your mind <TfiWrite className="ml-2"/></p> */}
            {/* <p className="text-sm flex flex-row items-center">Notification <IoMdNotifications  className="ml-2"/></p> */}
          </div>
        </div>
      )}
      <div className='h-[90vh] overflow-y-auto py-6'>
        {loading && (
          <div className='flex h-20 w-full flex-col items-center justify-center'>
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {!loading && (
          <div>
            {yarnData?.yarnData.length > 0 ? (
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
                  ``;
                  const c = {
                    name: data?.name || 'username',
                    text: data?.text,
                    likes: data?.likes,
                    isLiked: false,
                    reyarn: data?.reyarn,
                  };
                  return (
                    <YarnCard
                      key={data?.recordId}
                      name={c.name}
                      text={c.text}
                      likes={c.likes}
                      isLiked={c.isLiked}
                      reyarn={c.reyarn}
                    />
                  );
                })
                .reverse()
            )}
          </div>
        )}

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
    // ? 'w-[450px] bg-[#C4DFE6] py-12 h-[100vh]'
    //       : showMobile && showSideBar
    //       ? 'w-full bg-white py-4'
    //       : 'w-[100px] bg-[#C4DFE6] py-12 h-[100vh]'
    //   }  flex flex-col  `}
    // >

    // </div>
  );
};

export default React.memo(YarnBar);
