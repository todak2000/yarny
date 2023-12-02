/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web5Constructor } from '@/pages/web5/constructor';

import { IMessageSchemaProps } from '@/types';

const message = new Web5Constructor('Messages');

const today = new Date();
const date = today.toJSON().slice(0, 10).replace(/-/g, '/');

const ConstructMessage = async (data: IMessageSchemaProps) => {
  return {
    '@context': message.context,
    '@type': message.type,
    senderDetails: {
      alias: data.senderDetails.alias,
      recordId: data.senderDetails.recordId,
      did: data.senderDetails.did,
    },
    recipientDetails: {
      alias: data.recipientDetails.alias,
      recordId: data.recipientDetails.recordId,
      did: data.recipientDetails.did,
    },
    message: {
      text: data.message.text,
      isRead: data.message.isRead ? data.message.isRead : false,
    },
    web5: {
      identifier: await message.createDID(), //userDid
    },
    others: {
      datePublished: date,
      app: 'yarny',
    },
  };
};

// Get All Messages
export const getUserMessages = async (userRecordId: string): Promise<any> => {
  try {
    const data = await message.getData();
    let messages: any[] = [];
    if (data) {
      messages = [
        ...data.filter((obj: any) => {
          // check if the senderDetails or the recipientDetails has the same recordId
          return (
            obj.senderDetails.recordId === userRecordId ||
            obj.recipientDetails.recordId === userRecordId
          );
        }),
      ];

      return {
        status: 200,
        message: 'All messages data retrieved successfully',
        messagesData: messages,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Oops! an error occurred',
    };
  }
};
// Send Function
export const sendMessage = async (
  newData: IMessageSchemaProps
): Promise<any> => {
  const web5 = await message.web5();

  const newMessage = await ConstructMessage(newData);
  const { record } = await web5.dwn.records.write({
    data: newMessage,
    message: {
      protocol: 'https://yarny_app.io/protocol',
      protocolPath: 'Messages',
      schema: message.uri,
      dataFormat: 'application/json',
      published: true,
      recipient: newData.recipientDetails.did,
    },
  });

  const response = await record.send(newData.recipientDetails.did);

  if (response.status.code === 202) {
    return {
      status: 201,
      message: 'New Message Created Successfully on Web5',
      recipientDetails: newData.recipientDetails,
      senderDetails: newData.senderDetails,
    };
  } else {
    return {
      status: response.status.code,
      message: 'Oops! an error occurred',
    };
  }
};
