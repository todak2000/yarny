// pages/index.tsx
import React from 'react';
import { NextPage } from 'next';
import { WalletLayout } from '../layout';

// Define the props for the page component
interface HomeProps {
  posts: any[]; // assuming you have a Post type defined somewhere
}

// Define the page component
const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <WalletLayout title="Home">
      <h2>Wallet</h2>
      
    </WalletLayout>
  );
};

export default Home;
