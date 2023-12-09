import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Header from './components/Header';
import Hero from './components/Hero';
import BgImage from './components/BgImage';
import BgImageMobile from './components/BgImageMobile';
import useImageWidth from '@/utils/useImageWidthHook';
// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

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
