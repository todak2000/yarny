/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, getDoc, setDoc } from '@firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
  signOut,
} from 'firebase/auth';

import { db } from '@/firebase';
import { auth } from '@/firebase';
import { createNewUser, getSingleUser } from '@/web5/userSchema';

export async function authCheck() {
  try {
    // get the email and password from the request body

    let singleItem;
    const authh = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const singleItemRef = doc(db, 'Users', user.uid);
        const querySnapshot = await getDoc(singleItemRef);
        if (querySnapshot.exists()) {
          singleItem = {
            id: user.uid,
            firstname: querySnapshot.data().firstname,
            lastname: querySnapshot.data().lastname,
            username: querySnapshot.data().username,
            email: querySnapshot.data().email,
            userRecordId: querySnapshot.data().userRecordId,
            isVerified: querySnapshot.data().isVerified,
            isOnline: querySnapshot.data().isOnline,
            userDid: querySnapshot.data().userDid,
            loginAttempts: querySnapshot.data().loginAttempts,
            location: querySnapshot.data().location,
            device: querySnapshot.data().device,
          };
          const res: any = await getSingleUser(
            querySnapshot.data().userRecordId
          );

          return {
            statusCode: 200,
            user: singleItem,
            fromDWN: res.status === 200 ? res.userData : null,
          };
        }
      } else {
        return {
          statusCode: 400,
        };
      }
    });

    return authh;
  } catch (error: any) {
    const errorMessage = 'Oops! an error occured';
    return {
      statusCode: 405,
      message: errorMessage,
    };
  }
}

export async function SigninHandler(data: any) {
  try {
    // get the email and password from the request body
    const { email, password } = data;
    let singleItem;
    // sign in the user with the email and password using Firebase auth
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const singleItemRef = doc(db, 'Users', userCredentials.user.uid);

    const querySnapshot = await getDoc(singleItemRef);
    if (querySnapshot.exists()) {
      singleItem = {
        id: userCredentials.user.uid,
        firstname: querySnapshot.data().firstname,
        lastname: querySnapshot.data().lastname,
        username: querySnapshot.data().username,
        email: querySnapshot.data().email,
        userRecordId: querySnapshot.data().userRecordId,
        isVerified: querySnapshot.data().isVerified,
        isOnline: querySnapshot.data().isOnline,
        userDid: querySnapshot.data().userDid,
        loginAttempts: querySnapshot.data().loginAttempts,
        location: querySnapshot.data().location,
        device: querySnapshot.data().device,
      };
      const res: any = await getSingleUser(querySnapshot.data().userRecordId);

      return {
        statusCode: 200,
        user: singleItem,
        fromDWN: res.status === 200 ? res.userData : null,
      };
    } else {
      return { statusCode: 200, user: { error: 'No such Item exist!' } };
    }
  } catch (error: any) {
    let errorMessage = 'Oops! an error occured';
    if (error.message === 'Firebase: Error (auth/invalid-credential).') {
      errorMessage = 'Email/Password is incorrect';
    }
    return {
      statusCode: 405,
      message: errorMessage,
    };
  }
}

export async function SignupHandler(data: any) {
  try {
    // get the email and password from the request body
    const { email, password, firstname, lastname, username } = data;

    // sign in the user with the email and password using Firebase auth
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newUser = doc(db, 'Users', userCredentials.user.uid);
    const web5data = {
      personalDetails: {
        firstname: firstname,
        lastname: lastname,
        phone: '',
        email: email,
        photo: '',
        dateOfBirth: '',
        gender: '',
      },
      web5: {
        didResolverName: username, //alias
        identifier: '',
      },
    };
    const res: any = await createNewUser(web5data);

    const userData: any = {
      id: userCredentials.user.uid,
      firstname,
      lastname,
      username, //alias
      email: email.toLocaleLowerCase(),
      isVerified: userCredentials.user.emailVerified,
      isOnline: true,
      userRecordId: res.status === 201 ? res.recordId : '',
      userDid: res.status === 201 ? res.userDid : '',
      loginAttempts: 0,
      location: '',
      device: '',
    };
    await setDoc(newUser, userData, { merge: true });
    await sendEmailVerification(auth.currentUser as User);

    return {
      statusCode: 200,
      user: userData,
    };
  } catch (error: any) {
    return {
      statusCode: 405,
      message: error?.message,
    };
  }
}

export const handleSignOut = async (): Promise<
  | {
      statusCode: number;
      message: string;
    }
  | any
> => {
  try {
    const logout = await signOut(auth);
    return {
      statusCode: 200,
      message: 'Success!',
    };
  } catch (error: any) {
    return {
      statusCode: 405,
      message: error?.message,
    };
  }
};

export async function web5SignUpHandler() {
  try {
    // get the email and password from the request body
    if (auth.currentUser) {
      // console.log(auth.currentUser, "curren");
      const singleItemRef = doc(db, 'Users', auth.currentUser.uid);

      const querySnapshot = await getDoc(singleItemRef);
      if (querySnapshot.exists()) {
        const web5data = {
          personalDetails: {
            firstname: querySnapshot.data().firstname,
            lastname: querySnapshot.data().lastname,
            phone: querySnapshot.data().email ? querySnapshot.data().email : '',
            email: querySnapshot.data().email,
            photo: querySnapshot.data().photo ? querySnapshot.data().photo : '',
            dateOfBirth: querySnapshot.data().dateOfBirth
              ? querySnapshot.data().dateOfBirth
              : '',
            gender: querySnapshot.data().gender
              ? querySnapshot.data().gender
              : '',
          },
          web5: {
            didResolverName: querySnapshot.data().username, //alias
            identifier: '',
          },
        };
        const res: any = await createNewUser(web5data);

        const newUser = doc(db, 'Users', auth.currentUser.uid);
        const userData: any = {
          userRecordId: res.status === 201 ? res.recordId : '',
          userDid: res.status === 201 ? res.userDid : '',
        };
        await setDoc(newUser, userData, { merge: true });
        return {
          statusCode: 200,
          userData: res.status === 200 ? res.userData : null,
        };
      } else {
        return {
          statusCode: 200,
          singleItem: { error: 'No such Item exist!' },
        };
      }
    } else {
      // add an else clause to handle the case when the user is not logged in
      return {
        statusCode: 401,
        message: 'You need to log in to use this feature.',
      };
    }
  } catch (error: any) {
    return {
      statusCode: 405,
      message: error?.message,
    };
  }
}
