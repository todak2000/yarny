/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import React, { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  createNewFollower,
  deleteFollower,
  getFollowers,
  getSingleFollower,
} from '@/web5/yarnySchema/followers';

export default function Web5Page() {
  const today = new Date();
  const date = today.toJSON().slice(0, 10).replace(/-/g, '/');

  useEffect(() => {
    console.log('hiii---');
    const data = {
      alias: '@gobelization',
      followerDid:
        'bafyreibyiu56chqqa7b4bninjblcnprvamy77gaqkjslqopqcic7if2zcy',
      name: 'Daniel Testing',
    };
    const allFollowers = async () => {
      getFollowers().then((users) => console.log(users, 'users record'));
    };
    const userId =
      'bafyreig64jto3lqurp4aixenfxgdxjdlidy5arsga3ickhougurmlnw74m';

    const singleFollower = async () => {
      getSingleFollower(userId).then((user) =>
        console.log(user, 'user record')
      );
    };
    const createNewFollowerData = async () => {
      createNewFollower(data).then((user) =>
        console.log(user, 'create follower result')
      );
    };
    const deleteFollowerData = async () => {
      const deleteId =
        'bafyreiekyljaabopy4j5dpbvru4zte7ojquxlbwby4fes4mmtcfb5eyfcu';
      deleteFollower(deleteId);
    };

    // createNewFollowerData();
    // singleFollower();
    // deleteUserData();
    allFollowers();
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <p>Followers Schema Test</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
