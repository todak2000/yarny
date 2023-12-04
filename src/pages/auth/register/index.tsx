// Import React, Next.js, Formik, and Yup
import React, { useState } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ISignupValues } from '@/types';
import { YarnyLogo } from '@/constant';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { SignupHandler } from '@/pages/api/firebase';
// Define the data type for the signup form values
import { setUser, clearUser } from '@/pages/store';
import BgImage from '@/pages/components/BgImage';
import Image from 'next/image';
import { RegisterFormArr } from '@/constant';
import { useRouter } from 'next/router';
import useImageWidth from '@/utils/useImageWidthHook';
import Loader from '@/components/loader';
// Define the Yup schema to validate the form values
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
});

// Define the signup component as a Next.js page
const Signup: NextPage = () => {
    const { push, pathname } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const {showMobile} = useImageWidth();

  const handleLink = (link: string) => {
    push(link);
  };
  const dispatch = useDispatch();
//   const user = useSelector((state: any) => state.user);
  // Define the initial values for the form
  const initialValues: ISignupValues = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: '',
  };

  // Define the function to handle the form submission
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
      <div className='absolute top-0 grid h-[100vh] w-full grid-cols-1 sm:grid-cols-2'>
        <div className=' flex w-full flex-col items-center justify-center px-4 py-6'>
          <Image onClick={()=>push('/')} src={YarnyLogo} alt='yarny logo' width={100} height={100} />

          <p className="text-secondary text-lg font-bold font-primary">Register</p>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='w-full sm:w-2/3'>
                {RegisterFormArr.map(({id, type, name}: {id: string, type: string, name: string})=>{
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
                  {loading ? <Loader /> : 'Submit'}
                </button>
                <p className='text-xs text-left'>Already registered? <span className='text-main cursor-pointer' onClick={()=>handleLink('/auth/login')}>Login here</span></p>
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
