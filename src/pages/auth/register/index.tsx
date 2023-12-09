// Import React, Next.js, Formik, and Yup
import { ErrorMessage,Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import Swal from "sweetalert2";
import * as Yup from 'yup';

import Layout from '@/components/layout/Layout';
import Loader from '@/components/loader';
import Seo from '@/components/Seo';

import { YarnyLogo } from '@/constant';
import { RegisterFormArr } from '@/constant';
import { SignupHandler } from '@/pages/api/firebase';
import BgImage from '@/pages/components/BgImage';
import useImageWidth from '@/utils/useImageWidthHook';

import { ISignupValues } from '@/types';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
});

const Signup: NextPage = () => {
    const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const {showMobile} = useImageWidth();

  const handleLink = (link: string) => {
    push(link);
  };

  const initialValues: ISignupValues = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: '',
  };

  const handleSubmit = async (values: ISignupValues) => {
    setLoading(true);
    const auth = await SignupHandler(values);
    if (auth.statusCode === 200) {
      setLoading(false);
      handleLink('/auth/login')
        Swal.fire({
            title: "Success!",
            text: "Welcome onboard!. Please check you email to verify your account before sign in",
            icon: "success",
          });
    
    }
    else{
      setLoading(false);
      Swal.fire({
          title: "Error!",
          text: "Oops! an error occured!", //auth.message,
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
          <Image onClick={()=>push('/')} src={YarnyLogo} alt='yarny logo' width={30} height={30} />

          <p className="text-secondary text-lg font-bold font-primary my-1">Register</p>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='w-full sm:w-2/3'>
                {RegisterFormArr.map(({id, type, name, placeholder}: {id: string, type: string, name: string, placeholder: string})=>{
                    return (
                        <span key={id} className='relative'>
                    <label htmlFor={name} className='my-1 block text-lg text-white capitalize'>
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
                  {loading ? <Loader /> : 'Submit'}
                </button>
                <p className='text-lg text-left text-white mt-2'>Already registered? <span className='text-main cursor-pointer' onClick={()=>handleLink('/auth/login')}>Login here</span></p>
              </Form>
            )}
          </Formik>
        </div>
        <div className='hidden sm:flex'></div>
      </div>
    </Layout>
  );
};

export default Signup;
