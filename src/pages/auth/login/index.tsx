/* eslint-disable @typescript-eslint/no-explicit-any */
// Import React, Next.js, Formik, and Yup
import { ErrorMessage,Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import * as Yup from 'yup';

import Layout from '@/components/layout/Layout';
import Loader from '@/components/loader';
import Seo from '@/components/Seo';

import {setUser } from '@/store';

import { LoginFormArr, YarnyLogo } from '@/constant';
import { SigninHandler } from '@/pages/api/firebase';
import BgImage from '@/pages/components/BgImage';
import useImageWidth from '@/utils/useImageWidthHook';

import { ISignupValues } from '@/types';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
});

const Signin: NextPage = () => {
    const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const {showMobile} = useImageWidth()
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
 
  const initialValues: ISignupValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (values: ISignupValues) => {

    setLoading(true);
    const auth = await SigninHandler(values);
    if (auth.statusCode === 200) {
      setLoading(false);
      dispatch(
        setUser({
          name: `${auth?.user?.firstname} ${auth?.user?.lastname} `,
          email: auth?.user?.email,
          userDid: auth?.user?.userDid,
          userRecordId: auth?.user?.userRecordId,
          uid: auth?.user?.id,
          isVerified: auth?.user?.isVerified,
          username: auth?.user?.username,
          web5DBData:auth?.fromDWN
        } as any)
      );
        Swal.fire({
            title: "Success!",
            text: "Login successful!",
            icon: "success",
          });
    
    }
    else{
        setLoading(false);
        Swal.fire({
            title: "Error!",
            text: auth.message,
            icon: "error",
        });
    }
  };

  return (
    <Layout>
      <Seo templateTitle='Yarny:Home' />
      {!showMobile && <BgImage />}

      <div className='absolute top-0 grid h-[100vh] w-full grid-cols-1 sm:grid-cols-2 bg-black md:bg-transparent'>
        <div className=' flex w-full flex-col items-center justify-center px-4 py-6'>
          {user.username ? 
          <>
          <p className="text-main text-lg font-primary">Welcome {user?.username}</p>
          <div className="flex flex-row">
            <button disabled={loading2} onClick={()=>{
                setLoading(true)
                push('/media/dashboard')
            }}  className='border border-1 rounded-lg text-white hover:bg-main border-main h-[100px] w-[100px] mr-2 hover:text-secondary text-xs flex flex-col  justify-center items-center'>
            {loading ? <Loader />:<Image  className="mb-2" src={YarnyLogo} alt='yarny logo' width={17} height={17} />}
                Social Media
            </button>
            <button disabled={loading} onClick={()=>{
                setLoading2(true)
                push('/wallet/dashboard')
            }} className='border border-1 rounded-lg text-white hover:bg-secondary border-secondary hover:text-main h-[100px] w-[100px] ml-2 text-xs flex flex-col  justify-center items-center'>
            {loading2 ? <Loader />:<IoWalletOutline className="text-3xl text-white mb-2"/>}
                Web 5 wallet
                </button>
          </div>
          </>
          :
          <>
          <Image onClick={()=>push('/')} src={YarnyLogo} alt='yarny logo' width={30} height={30} />

<p className="text-secondary text-lg font-bold font-primary">Login</p>
<Formik
  initialValues={initialValues}
  validationSchema={SigninSchema}
  onSubmit={handleSubmit}
>
  {({ isSubmitting }) => (
    <Form className='w-full sm:w-2/3'>
      {LoginFormArr.map(({id, type, name, placeholder}: {id: string; type: string; name: string; placeholder: string})=>{
          return (
              <span key={id} className='relative'>
          <label htmlFor={name} className='my-2 block text-sm capitalize'>
          {name} 
      </label>
      <Field
        type={showPassword ? 'text': type} 
        name={name} 
        id={name} 
        autocomplete='off'
        placeholder={placeholder}
        className='border-1 h-[48px] mb-1 w-full rounded-sm border-[0.3px] border-main bg-[#0C0C0C] text-white'
      />
      {name === 'password' &&
      <span className='absolute bottom-0 right-4'>
       {!showPassword ? <FaRegEye className='text-main cursor-pointer' onClick={()=>setShowPassword(true)}/>: <FaRegEyeSlash className='text-main cursor-pointer' onClick={()=>setShowPassword(false)}/>}
      </span>
      }
      <ErrorMessage
        name={name}
        component='div'
        className='mb-1 text-xs text-yellow-500'
      />
          </span>
          )
      })}
      <button
        disabled={isSubmitting}
        type='submit'
        className='rounded-3xl hover:border-1 my-3 bg-main px-10 py-2 font-thin text-white hover:border hover:border-main hover:bg-white hover:text-main h-12 w-full sm:w-auto'
      >
        {loading ?  <Loader /> : 'Submit'}
      </button>
      <p className='text-lg text-left text-white mt-2'>Yet to register? <span className='text-main cursor-pointer' onClick={()=>push('/auth/register')}>Register here</span></p>
    </Form>
  )}
</Formik>
          </>
          }
        </div>
        <div className='hidden sm:flex'></div>
      </div>
    </Layout>
  );
};

export default Signin;
