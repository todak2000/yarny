// pages/index.tsx
import React from 'react';
import { NextPage } from 'next';
import MediaLayout from '../layout';
import UserBar from '@/pages/components/UserBar';
import YarnBar from '@/pages/components/YarnBar';

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
