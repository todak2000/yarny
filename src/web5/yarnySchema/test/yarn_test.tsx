/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import React, { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  createNewYarn,
  deleteYarn,
  getAllYarnComments,
  getSingleYarn,
  getYarns,
  searchYarn,
  toggleLikeYarn,
  updateYarn,
} from '@/pages/api';

export default function Web5Page() {
  const data = {
    text: faker.internet.userName(),
    isComment: false, //is yarn as a comment
    isReyarn: false, // is a reyar
  };
  const parentYarnRecordId =
    'bafyreibuniueg6jrgrbaih7n5vmxv5xuooe6y2zgtc646vw45bwht2dkha';
  const reyarnParent =
    'bafyreickqkgtp7vgntk7owuh7pcsvwfexgyg2tls7dwkvudy2utatqitn4';
  const commentData = {
    text: faker.internet.userName(),
    isComment: true, //is yarn as a comment
    isReyarn: false, // is a reyar
    parentYarnRecordId: reyarnParent,
  };
  const reyarnData = {
    text: faker.internet.userName(),
    isComment: false, //is yarn as a comment
    isReyarn: true, // is a reyar
    parentYarnRecordId,
  };
  const allYarns = async () => {
    getYarns().then((users) => console.log(users, 'users record'));
  };
  const yarnId = 'bafyreictyxismsfbhxiz5f6rsiafhfglyyxrfpir6yuyegckb6r4xgqajm';
  const commentId =
    'bafyreihhticuzym4sly4cwd2o3mytaxe2iwwljuy2t2z7zaq4xffqvjkcy';
  const singleYarn = async () => {
    getSingleYarn(yarnId).then((user) => console.log(user, 'user record'));
  };

  const singleComment = async () => {
    getSingleYarn(commentId).then((user) => console.log(user, 'user record'));
  };
  const createNewYarnData = async () => {
    createNewYarn(data).then((user) => console.log(user, 'create yarn result'));
  };
  const createComment = async () => {
    createNewYarn(commentData).then((user) =>
      console.log(user, 'create comment result')
    );
  };
  const reYarn = async () => {
    createNewYarn(reyarnData).then((user) =>
      console.log(user, 'create reyarn result')
    );
  };
  const getYarnComments = async () => {
    getAllYarnComments(parentYarnRecordId).then((user) =>
      console.log(user, 'create yarn result')
    );
  };

  const userId = 'bafyreiajbj5x6mp6khfij2x327l7txwxtywkmbrjaq4yz2k2vzbstmr44a';
  const likeYarnData = async () => {
    toggleLikeYarn(yarnId, userId).then((user) =>
      console.log(user, 'like yarn result successful')
    );
  };
  const updateNewYarnData = async () => {
    updateYarn(yarnId, data).then((user) =>
      console.log(user, 'update/edit yarn result')
    );
  };
  const deleteYarnData = async () => {
    const deleteId =
      'bafyreihrenhqfybnfngwt52amhkao6f4tf6qquiomfdqvkhw4d5c47onu4';
    deleteYarn(deleteId);
  };

  const searchYarnData = async () => {
    searchYarn();
  };

  useEffect(() => {
    console.log('hiii---');

    // likeYarnData();
    // createNewYarnData();
    // singleYarn();
    // deleteYarnData();
    // updateNewYarnData();
    allYarns();
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <p>Followers Schema Test</p>
            <button className='bg-gray-500 p-4' onClick={allYarns}>
              Get All Yarn
            </button>
            <button className='bg-black p-4 text-white' onClick={singleYarn}>
              Get Single Yarn
            </button>
            <button className='bg-red-500 p-4' onClick={deleteYarnData}>
              Delete Yarn
            </button>
            <button className='bg-green-500 p-4' onClick={createNewYarnData}>
              Create Yarn
            </button>
            <button className='bg-yellow-500 p-4' onClick={likeYarnData}>
              Like Yarn
            </button>
            <button className='bg-blue-500 p-4' onClick={updateNewYarnData}>
              Update Yarn
            </button>
            <button className='bg-blue-500 p-4' onClick={updateNewYarnData}>
              Reyarn
            </button>

            <p>Comments</p>
            <button className='bg-purple-500 p-4' onClick={createComment}>
              Add Comment to one yarn ID
            </button>
            <button className='bg-blue-500 p-4' onClick={getYarnComments}>
              Get All Comments for one Yarn ID
            </button>
            <button className='bg-pink-500 p-4' onClick={singleComment}>
              Get Single Comment
            </button>
            <p>Search ---</p>
            <button
              className='bg-red-500 p-4 text-white'
              onClick={searchYarnData}
            >
              Seach Yarn
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
