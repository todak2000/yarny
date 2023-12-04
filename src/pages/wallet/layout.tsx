import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SideBar from '@/pages/components/SideBar';
interface WalletLayoutProps {
    children: React.ReactNode;
    title: string;
  }

  
export const WalletLayout: React.FC<WalletLayoutProps> = ({ children, title }) => {

  return (
    <Layout>
      <Seo templateTitle={`Yarny Wallet:${title}`} />
      <main className='w-full'>
        <SideBar />
        <div  className='w-[calc(100% - 200px)]'>
        {children}
        </div>
      
      </main>
    </Layout>
  );
}
