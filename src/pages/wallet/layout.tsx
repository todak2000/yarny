// pages/media/layout
import React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import SideBar from '@/pages/components/SideBar';

interface WalletLayoutProps {
  children: React.ReactNode;
  title: string;
}

// Define the component with the name of the file
function WalletLayout({ children, title }: WalletLayoutProps) {
  return (
    <Layout>
      <Seo templateTitle={`Yarny Wallet:${title}`} />
      <main className='w-full'>
        <SideBar />
        <div className='w-[calc(100% - 200px)]'>{children}</div>
      </main>
    </Layout>
  );
}

export default WalletLayout; // Export the component as default
