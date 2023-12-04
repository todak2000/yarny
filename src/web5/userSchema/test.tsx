/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import React, { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  createNewUser,
  getUserMessages,
  getUsers,
  sendMessage,
} from '@/pages/api';
import { SigninHandler, SignupHandler } from '@/pages/api/firebase';

export default function Web5Page() {
  const today = new Date();
  const date = today.toJSON().slice(0, 10).replace(/-/g, '/');
  const userId =
    'did:ion:EiAyoX_owYCek5caxWBMuShFfDcj8dSeTbLdP6OfxXlLQw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiaE9KYkU0NGNwRGJnbHdQZy1PX0dBSXp5MkhYTlMyamtSZkcxa3NZYWlxayJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJIbVdRb3V0aHdUblREWTZwcWctdHJUa29yQ2dBTmswU1lWWGtmUEI1N0hrIiwieSI6IjZab3BESGlMWFV1ZHRVNzlFSlN5RFRNM3p1SVJWZVgyc09raVNWN3hrN28ifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDMUdfRjVOTmR2MVg3YnlISlBJWG5wc1VxRnNPWm9JRjU4Tk5LOTNfLUs3USJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQThQelFBbTZueFkwOWw2aHhVOGlqQjZiMUNlQXBOQ0hrTFNjTTJzb2l6amciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUF4dF9iOGVyWGNOdzNRekNXa2U4RUlvYlM5bUd2NHhvSW1oWi1fdXlySllBIn19';
  const messageData1 = {
    senderDetails: {
      alias: faker.internet.userName(),
      recordId: 'bafyreihtnoezn25rkni6sarigdfetuu4gywhkl3rf5sdoozknmwy3xrjba',
      did: userId,
    },
    recipientDetails: {
      alias: faker.internet.userName(),
      recordId: 'bafyreibaugydsslmbxd4se64ry4hgltm5t2merzxargt2uzawzm5qucjoy',
      did: userId,
    },
    message: {
      text: faker.internet.userName(),
      isRead: false,
    },
  };

  const messageData2 = {
    senderDetails: {
      alias: faker.internet.userName(),
      recordId: 'bafyreibaugydsslmbxd4se64ry4hgltm5t2merzxargt2uzawzm5qucjoy',
      did: userId,
    },
    recipientDetails: {
      alias: faker.internet.userName(),
      recordId: 'bafyreihtnoezn25rkni6sarigdfetuu4gywhkl3rf5sdoozknmwy3xrjba',
      did: userId,
    },
    message: {
      text: faker.internet.userName(),
      isRead: false,
    },
  };

  const getAllUserMessages = async () => {
    getUserMessages(userId).then((users) => console.log(users, 'users record'));
  };

  const getUsersData = async () => {
    getUsers().then((users) => console.log(users, 'users'));
  };
  const sendMessageData1 = async () => {
    sendMessage(messageData1).then((user) =>
      console.log(user, 'create yarn result')
    );
  };
  const sendMessageData2 = async () => {
    sendMessage(messageData2).then((user) =>
      console.log(user, 'create yarn result')
    );
  };

  const data = {
    personalDetails: {
      firstname: faker.internet.userName(),
      lastname: faker.internet.userName(),
      phone: '09039393333',
      email: 'daniel@web5.com',
      photo: faker.internet.avatar(),
      dateOfBirth: '02/01/1998',
      gender: 'male',
    },
    web5: {
      didResolverName: '@updateTest',
      didResolverPassword: 'password',
      identifier: '',
    },
    others: {
      datePublished: date,
    },
  };
  const createNewUserData = async () => {
    createNewUser(data).then((user) => console.log(user, 'create user result'));
  };

  const handleSignup = async () => {
    // setLoading(true);
    const data = {
      email: 'test1@test.com',
      password: 'password',
      firstname: faker.internet.userName(),
      lastname: faker.internet.userName(),
      username: faker.internet.userName(),
    };
    const auth = await SignupHandler(data);
    if (auth.statusCode === 200) {
      console.log('auth', auth);
    }
  };

  const handleSignin = async () => {
    // setLoading(true);
    const data = { email: 'test1@test.com', password: 'password' };
    const auth = await SigninHandler(data);
    if (auth.statusCode === 200) {
      console.log('auth', auth);
    }
  };

  useEffect(() => {
    console.log('hiii---');
    handleSignin();
    // getUsersData();
    // getAllUserMessages();
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <p>Message Schema Test</p>
            <button className='bg-green-500 p-4' onClick={sendMessageData1}>
              Send Message1
            </button>

            <button className='bg-red-500 p-4' onClick={createNewUserData}>
              Create User
            </button>
            <button className='bg-blue-500 p-4' onClick={sendMessageData2}>
              Send Message2
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
