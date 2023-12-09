/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from '@firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@/constant';
import useImageWidth from '@/utils/useImageWidthHook';

import { getSingleUser } from '../api';
import { auth, db  } from '../../firebase';
import { clearUser,setUser } from '../../store';
const UserBar: React.FC = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [showSideBar, setShowSideBar] = useState(true);
  const { showMobile } = useImageWidth();
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
              userRecordId: querySnapshot.data().userRecordId,
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
    return () => unsubscribe();
   
  }, []);


  const handleLink = (link: string) => {
    push(link);
  };

  return (
    <div
      className={`${
        showSideBar && !showMobile
          ? 'w-[450px] bg-black py-12 h-[100vh]'
          : showMobile && showSideBar
          ? 'w-full bg-black py-4'
          : 'w-[100px] bg-black py-12 h-[100vh]'
      }  flex flex-col  `}
    >
      {showMobile ? (
        
        null
      ) : (
        <div className='flex flex-row items-center justify-end px-6'>
          
          <div>
          <p className="text-lg text-right font-medium text-white">{user.name}</p>
          <p className="text-xs text-right text-[#f1f1f1]">{user.username}</p>
          </div>
          <div
            className='flex flex-shrink-0 cursor-pointer flex-row ml-4  items-center'
            onClick={() => handleLink('/')}
          >
            <Image
              src={Avatar}
              alt='avatar'
              width={40}
              height={40}
            />
          </div>
        </div>
      )}

           
    </div>
  );
};

export default React.memo(UserBar);
