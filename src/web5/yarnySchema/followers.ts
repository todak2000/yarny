/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web5Constructor } from '@/web5/constructor';

import { IFollowerSchemaProps } from '@/types';

const follower = new Web5Constructor('Followers');

const today = new Date();
const date = today.toJSON().slice(0, 10).replace(/-/g, '/');

const ConstructFollower = async (data: IFollowerSchemaProps) => {
  return {
    '@context': follower.context,
    '@type': follower.type,
    followerDetails: {
      alias: data.alias,
      followerDid: data.followerDid,
      name: data.name,
    },
    web5: {
      identifier: await follower.createDID(), //userDid
    },
    others: {
      datePublished: date,
      app: 'yarny',
    },
  };
};

// Get Followers
export const getFollowers = async (): Promise<any> => {
  try {
    const data = await follower.getData();
    const followers: any[] = [];
    if (data) {
      data.map(async (d: any) => {
        const y = await d.data.json();
        y.recordId = d._recordId;
        followers.push(y);
      });
      return {
        status: 200,
        message: 'All Followers data retrieved successfully',
        FollowersData: followers,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Oops! an error occurred',
    };
  }
};

// Get Single Follower
export const getSingleFollower = async (recordId: string): Promise<any> => {
  const web5 = await follower.web5();
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
      FollowersData: await response.record.data.json(),
    };
  }
  return {
    status: response.status.code,
    message: 'Oops! an error occurred',
  };
};

// Create New Follower Function
export const createNewFollower = async (
  newData: IFollowerSchemaProps
): Promise<any> => {
  const records = await follower.getData();

  let isExisting = false;

  const promises = records.map((record: any) => record.data.json());
  Promise.all(promises).then((results) => {
    for (let i = 0; i < results.length; i++) {
      const data = results[i];
      if (data.followerDetails.followerDid === newData.followerDid) {
        isExisting = true;
      }
    }
  });

  if (isExisting) {
    return { status: 409, message: 'Follower Exists' };
  } else {
    const web5 = await follower.web5();
    const newFollower = await ConstructFollower(newData);
    const response = await web5.dwn.records.create({
      data: newFollower,
      message: {
        schema: follower.uri,
        dataFormat: 'application/json',
        published: true,
      },
    });

    if (response.status.code === 202) {
      return {
        status: 201,
        message: 'New Follower Created Successfully on Web5',
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

//Update Follower Data
// export const updateFollower = async (
//   recordId: string,
//   updateData: IFollowerSchemaProps
// ) => {
//   const web5 = await follower.web5();
//   const { record } = await web5.dwn.records.read({
//     message: {
//       filter: {
//         recordId: recordId,
//       },
//     },
//   });
//   const { status } = await record.update({
//     data: await ConstructFollower(updateData),
//   });

//   if (status.code === 202) {
//     return {
//       status: 200,
//       message: 'Follower Data updated Successfully on Web5',
//     };
//   } else {
//     return { status: status.code, message: 'Oops! an error occurred' };
//   }
// };

export const isDataExistingByRecordId = async (
  id: string
): Promise<boolean> => {
  const web5 = await follower.web5();
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

//Delete Follower data

export const deleteFollower = async (recordId: string) => {
  try {
    const web5 = await follower.web5();
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          recordId: recordId,
        },
      },
    });
    const res = await response.records[0].delete();
    if (res.status.code === 202) {
      return {
        status: 200,
        message: 'Follower Data deleted Successfully on Web5',
      };
    } else {
      return { status: res.status.code, message: 'Oops! an error occurred' };
    }
  } catch (error) {
    return { status: 500, message: error };
  }
};
