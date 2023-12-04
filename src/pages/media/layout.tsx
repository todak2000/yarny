import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SideBar from '@/pages/components/SideBar';
interface MediaLayoutProps {
    children: React.ReactNode;
    title: string;
  }
import useImageWidth
 from '@/utils/useImageWidthHook';
export const MediaLayout: React.FC<MediaLayoutProps> = ({ children, title }) => {
const {showMobile} = useImageWidth()
  return (
    <Layout>
      <Seo templateTitle={`Yarny Social Media:${title}`} />
      <main className={`w-full flex ${showMobile ? "flex-col": "flex-row"}`}>
        <SideBar />
        <div  className={`w-[100vw] bg-blue-500`}>
        {children}
        </div>
      
      </main>
    </Layout>
  );
}
