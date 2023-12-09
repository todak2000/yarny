export interface IUserSchemaProps {
  personalDetails: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    photo?: string;
    dateOfBirth?: string;
    gender?: string;
  };
  web5: {
    didResolverName?: string;
    identifier: string;
  };
  others?: {
    datePublished: string;
  };
}

export interface IFollowerSchemaProps {
  alias: string;
  followerDid: string;
  name: string;
}

export interface IYarnSchemaProps {
  text: string;
  viewCount?: string;
  isComment: boolean; //is yarn as a comment
  ownerId?: string;
  isReyarn: boolean; // is a reyarn
  likes?: string[];
  reyarn?: string[];
  username?: string;
  parentYarnRecordId?: string;
  userRecordId?: string;
}

export interface IMessageSchemaProps {
  senderDetails: {
    alias: string;
    recordId: string;
    did: string;
  };
  recipientDetails: {
    alias: string;
    recordId: string;
    did: string;
  };
  message: {
    text: string;
    isRead: boolean;
  };
}

export interface ISignupValues {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  username?: string;
}

export interface IInitialValues {
  name: string;
  email: string;
  userDid: string;
  userRecordId: string;
  uid: string;
  isVerified: string;
  username: string;
  web5DBData: any;
}