// Import React, Next.js, Formik, and Yup
import React, { useState } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ISignupValues } from '@/types';
import { IoWalletOutline } from "react-icons/io5";
import { LoginFormArr, YarnyLogo } from '@/constant';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { SigninHandler, SignupHandler } from '@/pages/api/firebase';
// Define the data type for the signup form values
import { YarnyLogoBlackIcon } from '@/constant';
import { setUser, clearUser } from '@/store';
import BgImage from '@/pages/components/BgImage';
import Image from 'next/image';
import { RegisterFormArr } from '@/constant';
import { useRouter } from 'next/router';
import useImageWidth from '@/utils/useImageWidthHook';
import Loader from '@/components/loader';
// Define the Yup schema to validate the form values
const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
});

// Define the signup component as a Next.js page
const Signin: NextPage = () => {
    const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const {showMobile} = useImageWidth()
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  // Define the initial values for the form
  const initialValues: ISignupValues = {
    email: '',
    password: ''
  };

  // Define the function to handle the form submission
  const handleSubmit = async (values: ISignupValues) => {
    console.log(values, 'form values');
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

      <div className='absolute top-0 grid h-[100vh] w-full grid-cols-1 sm:grid-cols-2'>
        <div className=' flex w-full flex-col items-center justify-center px-4 py-6'>
          {user.username ? 
          <>
          <p className="text-main text-lg font-primary">Welcome {user?.username}</p>
          <div className="flex flex-row">
            <button disabled={loading2} onClick={()=>{
                setLoading(true)
                push('/media/dashboard')
            }}  className='border border-1 rounded-lg hover:bg-main border-main h-[100px] w-[100px] mr-2 hover:text-white text-xs flex flex-col  justify-center items-center'>
            {loading ? <Loader />:<Image  className="mb-2" src={YarnyLogoBlackIcon} alt='yarny logo' width={17} height={17} />}
                Social Media
            </button>
            <button disabled={loading} onClick={()=>{
                setLoading2(true)
                push('/wallet/dashboard')
            }} className='border border-1 rounded-lg hover:bg-secondary border-secondary h-[100px] w-[100px] ml-2 text-xs flex flex-col  justify-center items-center'>
            {loading2 ? <Loader />:<IoWalletOutline className="text-3xl text-black mb-2"/>}
                Web 5 wallet
                </button>
          </div>
          </>
          :
          <>
          <Image onClick={()=>push('/')} src={YarnyLogo} alt='yarny logo' width={100} height={100} />

<p className="text-secondary text-lg font-bold font-primary">Login</p>
<Formik
  initialValues={initialValues}
  validationSchema={SigninSchema}
  onSubmit={handleSubmit}
>
  {({ isSubmitting }) => (
    <Form className='w-full sm:w-2/3'>
      {LoginFormArr.map(({id, type, name}: {id: string, type: string, name: string})=>{
          return (
              <span key={id} className='relative'>
          <label htmlFor={name} className='my-2 block text-sm capitalize'>
          {name} 
      </label>
      <Field
        type={showPassword ? 'text': type} 
        name={name} 
        id={name} 
        className='border-1 mb-2 w-full rounded-sm border border-secondary'
      />
      {name === 'password' &&
      <span className='absolute bottom-0 right-4'>
      {!showPassword ? <FaRegEye onClick={()=>setShowPassword(true)}/>: <FaRegEyeSlash onClick={()=>setShowPassword(false)}/>}
      </span>
      }
      <ErrorMessage
        name={name}
        component='div'
        className='mb-2 text-xs text-red-500'
      />
          </span>
          )
      })}
      <button
        disabled={isSubmitting}
        type='submit'
        className='hover:border-1 my-3 bg-main px-5 py-2 font-thin text-white hover:border hover:border-main hover:bg-white hover:text-main h-12 w-full sm:w-auto'
      >
        {loading ?  <Loader /> : 'Submit'}
      </button>
      <p className='text-xs text-left'>Yet to register? <span className='text-main cursor-pointer' onClick={()=>push('/auth/register')}>Register here</span></p>
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
