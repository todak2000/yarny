/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web5Constructor } from '@/web5/constructor';
import { convertImage2base64 } from '@/utils';

import { IUserSchemaProps } from '@/types';

const user = new Web5Constructor('Users');

const today = new Date();
const date = today.toJSON().slice(0, 10).replace(/-/g, '/');

const ConstructUser = async (data: IUserSchemaProps) => {
  return {
    '@context': user.context,
    '@type': user.type,
    personalDetails: {
      firstname: data.personalDetails.firstname,
      lastname: data.personalDetails.lastname,
      phone: data.personalDetails.phone,
      email: data.personalDetails.email || '',
      photo: data?.personalDetails?.photo
        ? convertImage2base64(data.personalDetails.photo)
        : '',
      dateOfBirth: data.personalDetails.dateOfBirth || '',
      gender: data.personalDetails.gender || '',
    },
    web5: {
      didResolverName: data.web5.didResolverName, // alias associated with the userDid
      identifier: await user.createDID(), //userDid
    },
    others: {
      datePublished: date,
    },
  };
};

// Get Users
export const getUsers = async (): Promise<any> => {
  try {
    const data = await user.getData();
    const users: any[] = [];
    if (data) {
      data.map(async (d: any) => {
        // console.log(d, d._recordId, 'recordsId');

        const y = await d.data.json();
        y.recordId = d._recordId;
        users.push(y);
      });
      return {
        status: 200,
        message: 'All Users data retrieved successfully',
        userData: users,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Oops! an error occurred',
    };
  }
};

// Get Single user
export const getSingleUser = async (recordId: string): Promise<any> => {
  const web5 = await user.web5();
  const response = await web5.dwn.records.read({
    message: {
      filter: {
        recordId,
      },
    },
  });

  if (response.status.code === 200) {
    return {
      status: 200,
      message: 'User data retrieved successfully',
      userData: await response.record.data.json(),
    };
  }
  return {
    status: response.status.code,
    message: 'Oops! an error occurred',
  };
};

// Create New User Function
export const createNewUser = async (
  newData: IUserSchemaProps
): Promise<any> => {
  const records = await user.getData();

  const isExisting: boolean = records.some(
    (record: any) => record.author === newData.web5.identifier
  );

  if (isExisting) {
    return { status: 409, message: 'User Exists' };
  } else {
    const web5 = await user.web5();
    const newUser = await ConstructUser(newData);
    const response = await web5.dwn.records.create({
      data: newUser,
      message: {
        schema: user.uri,
        dataFormat: 'application/json',
        published: true,
      },
    });

    if (response.status.code === 202) {
      return {
        status: 201,
        message: 'New User Created Successfully on Web5',
        recordId: response.record._recordId,
        userDid: response.record.author,
      };
    } else {
      return {
        status: response.status.code,
        message: 'Oops! an error occurred',
      };
    }
  }
};

//Update User Data
export const updateUser = async (
  recordId: string,
  updateData: IUserSchemaProps
) => {
  const web5 = await user.web5();
  const { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });
  const { status } = await record.update({
    data: await ConstructUser(updateData),
  });

  if (status.code === 202) {
    return { status: 200, message: 'User Data updated Successfully on Web5' };
  } else {
    return { status: status.code, message: 'Oops! an error occurred' };
  }
};

export const isDataExistingByRecordId = async (
  id: string
): Promise<boolean> => {
  const web5 = await user.web5();
  const response = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: id,
      },
    },
  });
  if (response.status.code === 200) {
    return true;
  }
  return false;
};

//Delete User data
export const deleteUser = async (recordId: string) => {
  const web5 = await user.web5();
  const response = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });

  await response.record.delete();
  return { status: 200, message: 'User Data deleted Successfully on Web5' };
};
