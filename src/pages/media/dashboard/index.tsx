// pages/index.tsx
import React from 'react';
import { NextPage } from 'next';
import { MediaLayout } from '../layout';
import UserBar from '@/pages/components/UserBar';
import YarnBar from '@/pages/components/YarnBar';
// Define the props for the page component
interface HomeProps {
  posts: any[]; // assuming you have a Post type defined somewhere
}

// Define the page component
const Home: NextPage<HomeProps> = ({ posts }) => {
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
