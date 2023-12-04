/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web5Constructor } from '@/web5/constructor';

import { IYarnSchemaProps } from '@/types';

const yarn = new Web5Constructor('Yarns');

const today = new Date();
const date = today.toJSON().slice(0, 10).replace(/-/g, '/');

const ConstructYarn = async (data: IYarnSchemaProps) => {
  return {
    '@context': yarn.context,
    '@type': yarn.type,
    yarnDetails: {
      text: data.text,
      viewCount: data.viewCount ? data.viewCount : 0,
      isComment: data.isComment ? data.isComment : 0, //is yarn as a comment
      ownerId: await yarn.createDID(),
      isReyarn: data.isReyarn, // is a reyarn
      reyarnCount: data.reyarnCount ? data.reyarnCount : 0,
      likes: data.likes ? data.likes : [], // array of userDids
      parentYarnRecordId: data.parentYarnRecordId
        ? data.parentYarnRecordId
        : '',
    },
    web5: {
      identifier: await yarn.createDID(), //userDid
    },
    others: {
      datePublished: date,
      app: 'yarny',
    },
  };
};

// Get All yarns
export const getYarns = async (): Promise<any> => {
  try {
    const data = await yarn.getData();
    const yarns: any[] = [];
    if (data) {
      data.map(async (d: any) => {
        const y = await d.data.json();
        y.recordId = d._recordId;
        yarns.push(y);
      });
      return {
        status: 200,
        message: 'All Yarn data retrieved successfully',
        yarnData: yarns,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Oops! an error occurred',
    };
  }
};

// Get All Comments for a yarn
export const getAllYarnComments = async (
  parentYarnRecordId: string
): Promise<any> => {
  try {
    const data = await yarn.getData();
    const comments: any[] = [];
    if (data) {
      data.map(async (d: any) => {
        const y = await d.data.json();
        if (y.parentYarnRecordId === parentYarnRecordId) {
          y.recordId = d._recordId;
          comments.push(y);
        }
      });
      return {
        status: 200,
        message: 'All Yarn comments retrieved successfully',
        commentsData: comments,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Oops! an error occurred',
    };
  }
};

// Get Single yarn/comment
export const getSingleYarn = async (recordId: string): Promise<any> => {
  const web5 = await yarn.web5();
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
      message: 'Yarn data retrieved successfully',
      yarnsData: await response.record.data.json(),
    };
  }
  return {
    status: response.status.code,
    message: 'Oops! an error occurred',
  };
};

// Create New yarn/comment Function
export const createNewYarn = async (
  newData: IYarnSchemaProps
): Promise<any> => {
  const records = await yarn.getData();

  let isExisting = false;

  const promises = records.map((record: any) => record.data.json());
  Promise.all(promises).then((results) => {
    for (let i = 0; i < results.length; i++) {
      const data = results[i];
      if (data.yarnDetails.text === newData.text) {
        isExisting = true;
      }
    }
  });

  if (isExisting) {
    return { status: 409, message: 'Yarn Exists' };
  } else {
    const web5 = await yarn.web5();
    const newYarn = await ConstructYarn(newData);
    const response = await web5.dwn.records.create({
      data: newYarn,
      message: {
        schema: yarn.uri,
        dataFormat: 'application/json',
        published: true,
      },
    });

    if (response.status.code === 202) {
      return {
        status: 201,
        message: 'New yarn Created Successfully on Web5',
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

// Update yarn Data
export const updateYarn = async (
  recordId: string,
  updateData: IYarnSchemaProps
) => {
  const web5 = await yarn.web5();
  const { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });
  const { status } = await record.update({
    data: await ConstructYarn(updateData),
  });

  if (status.code === 202) {
    return {
      status: 200,
      message: 'Yarn Data updated Successfully on Web5',
    };
  } else {
    return { status: status.code, message: 'Oops! an error occurred' };
  }
};

export const isDataExistingByRecordId = async (
  id: string
): Promise<boolean> => {
  const web5 = await yarn.web5();
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

//Delete yarn data
export const deleteYarn = async (recordId: string) => {
  try {
    const web5 = await yarn.web5();
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          recordId: recordId,
        },
      },
    });
    const res = await response.records[0].delete();
    if (res.status.code === 202) {
      return { status: 200, message: 'Yarn Data deleted Successfully on Web5' };
    } else {
      return { status: res.status.code, message: 'Oops! an error occurred' };
    }
  } catch (error) {
    return { status: 500, message: error };
  }
};

// Toggle Like/Dislike a Yarn
export const toggleLikeYarn = async (
  recordId: string,
  userRecordId: string
) => {
  const web5 = await yarn.web5();

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });

  const likeData = await records[0]?.data?.json();

  let likesArr = likeData.yarnDetails.likes;

  likesArr = likesArr.includes(userRecordId)
    ? likesArr.filter((like: string) => like !== userRecordId)
    : [...likesArr, userRecordId];

  likeData.yarnDetails.likes = likesArr;
  const copyData = { ...likeData };
  const nData = {
    text: copyData.yarnDetails.text,
    viewCount: copyData.yarnDetails.viewCount,
    isComment: copyData.yarnDetails.isComment, //is yarn as a comment
    ownerId: copyData.yarnDetails.ownerId,
    isReyarn: copyData.yarnDetails.isReyarn, // is a reyarn
    reyarnCount: copyData.yarnDetails.reyarnCount,
    likes: copyData.yarnDetails.likes,
    parentYarnRecordId: copyData.yarnDetails.parentYarnRecordId,
  };
  const { status } = await records[0].update({
    data: await ConstructYarn(nData),
  });

  if (status.code === 202) {
    return {
      status: 200,
      data: copyData,
      message: 'Yarn Data updated Successfully on Web5',
    };
  } else {
    return { status: status.code, message: 'Oops! an error occurred' };
  }
};

// Search for Yarn terms
export const searchYarn = async (queryString = '', parameter = 'yarns') => {
  const web5 = await yarn.web5();

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        schema:
          parameter === 'yarns'
            ? 'https://yarny_app.io/protocol/schemas/yarnSchema'
            : parameter === 'users'
            ? 'https://yarny_app.io/protocol/schemas/usersSchema'
            : 'https://yarny_app.io/protocol/schemas/yarnSchema',
      },
      dateSort: 'publishedAscending',
    },
  });

  console.log(records, 'search records');
  // const likeData = await records[0]?.data?.json();

  // let likesArr = likeData.yarnDetails.likes;

  // likesArr = likesArr.includes(userRecordId)
  //   ? likesArr.filter((like: string) => like !== userRecordId)
  //   : [...likesArr, userRecordId];

  // likeData.yarnDetails.likes = likesArr;
  // const copyData = { ...likeData };
  // const nData = {
  //   text: copyData.yarnDetails.text,
  //   viewCount: copyData.yarnDetails.viewCount,
  //   isComment: copyData.yarnDetails.isComment, //is yarn as a comment
  //   ownerId: copyData.yarnDetails.ownerId,
  //   isReyarn: copyData.yarnDetails.isReyarn, // is a reyarn
  //   reyarnCount: copyData.yarnDetails.reyarnCount,
  //   likes: copyData.yarnDetails.likes,
  //   parentYarnRecordId: copyData.yarnDetails.parentYarnRecordId,
  // };
  // const { status } = await records[0].update({
  //   data: await ConstructYarn(nData),
  // });

  // if (status.code === 202) {
  //   return {
  //     status: 200,
  //     data: copyData,
  //     message: 'Yarn Data updated Successfully on Web5',
  //   };
  // } else {
  //   return { status: status.code, message: 'Oops! an error occurred' };
  // }
};
