/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SlClose } from 'react-icons/sl';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { MediaSideBarArr, YarnyLogo, YarnyLogoIcon } from '@/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../../store';
import { auth, db  } from '../../firebase';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useImageWidth from '@/utils/useImageWidthHook';
import { MdPersonPin } from "react-icons/md";
import { authCheck } from '../api/firebase';
import { getSingleUser } from '../api';

const UserBar: React.FC = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();


  const [showDropDown, setShowDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const { showMobile, imageWidth } = useImageWidth();
  const user = useSelector((state: any) => state.user);
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if(user){

        const singleItemRef = doc(db, 'Users', user.uid);
        const querySnapshot = await getDoc(singleItemRef);
        if (querySnapshot.exists()) {

          const res: any = await  getSingleUser(
            querySnapshot.data().userRecordId
          );

          dispatch(
            setUser({
              name: `${querySnapshot.data().firstname} ${querySnapshot.data().lastname} `,
              email: querySnapshot.data().email,
              userDid: querySnapshot.data().userDid,
              userRecordId: querySnapshot.data().userRecordIdd,
              uid: user.uid,
              isVerified: querySnapshot.data().isVerified,
              username: querySnapshot.data().username,
              web5DBData:res?.userData
            } as any)
          );
        }
      }
      else{
        dispatch(clearUser());
        push('/auth/login')
      }
    })
    
    // // Cleanup subscription on unmount
    return () => unsubscribe();
   
  }, []);


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
