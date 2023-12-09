// pages/index.tsx
import { NextPage } from 'next';
import React from 'react';

import UserBar from '@/pages/components/UserBar';
import YarnBar from '@/pages/components/YarnBar';

import MediaLayout from '../layout';

const Home: NextPage = () => {
  return (
    <MediaLayout title="Home">
      <div className="flex flex-col sm:flex-row justify-between w-full h-[100vh] bg-gray-400">
        <YarnBar />
        <UserBar />
      </div>
      
    </MediaLayout>
  );
};

export default Home;
