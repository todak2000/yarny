import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import useImageWidth from '@/utils/useImageWidthHook';

import BgImage from './components/BgImage';
import BgImageMobile from './components/BgImageMobile';
import Header from './components/Header';
import Hero from './components/Hero';

export default function HomePage() {
  const {showMobile} = useImageWidth();
  return (
    <Layout>
      <Seo templateTitle='Yarny:Home' />
      {!showMobile && <BgImage />}
      <main className='absolute top-0 bg-black md:bg-transparent'>
      <Header />
      <Hero />
      {showMobile && <BgImageMobile />}
      
      </main>
    </Layout>
  );
}
