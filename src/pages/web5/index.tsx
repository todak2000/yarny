/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import React, { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  SigninHandler,
  SignupHandler,
  web5SignUpHandler,
} from '@/pages/api/firebase';

export default function Web5Page() {
  const handleSignup = async () => {
    // setLoading(true);
    const data = {
      email: 'test@test.com',
      password: 'password',
      firstname: faker.internet.userName(),
      lastname: faker.internet.userName(),
      username: faker.internet.userName(),
    };
    const auth = await SignupHandler(data);
    if (auth.statusCode === 200) {
      console.log('auth', auth);
    }
  };

  const handleSignin = async () => {
    // setLoading(true);
    const data = { email: 'test@test.com', password: 'password' };
    const auth = await SigninHandler(data);
    if (auth.statusCode === 200) {
      console.log('auth', auth);
    }
  };

  useEffect(() => {
    console.log('hiii---');
    // handleSignin();xwxs
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <p>Message Schema Test</p>
            <button className='bg-green-500 p-4' onClick={handleSignin}>
              Login
            </button>

            <button className='bg-red-500 p-4' onClick={handleSignup}>
              Register
            </button>

            <button className='bg-blue-500 p-4' onClick={web5SignUpHandler}>
              Wbe5 signup
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
