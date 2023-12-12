# Yarny Socila Media Platform API documentation

This is the Offical API documentation for Yarny Social Media platform project built using Next.js, React, TypeScript,Web5 and other technologies. The project aims to create a user-friendly website where users own their content, have and manage their privacy, and enables seamless content monetization

API endpoints can be found [here](src/pages/api/index.tsx) at `src/pages/api/index.tsx`.

ONCE AGAIN ensure that you have a Firebase account and a project with Firestore database enabled as it would require that the Firebase api keys and other variables be used. Kindly refer to `.env.example` for guidance.

## Installation

Provided you follow the instructions [here](README.md): `README.md`. you have nothing else to do

## Web 5 Features Endpoints

, deleteUser, getSingleUser, getUsers, updateUser
This project implements the following web 5 features endpoints:

### Creating New User Data (DID) on the DWN

**createNewUser()**

**Description:**

The `createNewUser` function is used sign up users into the web5 network seamlessly providng the following data.

**Parameters:**
{
personalDetails: {
firstname: string;
lastname: string;
phone: string;
email: string;
photo: string;
dateOfBirth: string;
gender: string;
};
web5: {
didResolverName: string;
didResolverPassword: string;
identifier: string;
};
others: {
datePublished: string;
};
}

**Returns:**

```
<!-- success result -->
  {
    status: number,
    message: string,
    recordId: string,
    userDiD: string,
  }
  <!-- OR -->
  <!-- failure result -->
  {
      status: number;
      message: string;
  }
```

### clearing User Data (DID) on the DWN

**handleSignOut()**

**Description:**

The `handleSignOut` function is used to disconnect and logout of the web5 network seamlessly providng the following data.

**Returns:**

```
<!-- success result -->
  {
    status: number,
    message: string,
  }
  <!-- OR -->
  <!-- failure result -->
  {
      status: number;
      message: string;
  }
```

### create Yarn Comment Data (DID) on the DWN

**createComment()**

**Description:**

The `createComment` function is used create Yarn comments in the local/remote DWN on the web5 network seamlessly providing the following data.

**Parameters:**
data{
text: string,
isComment: boolean,
isReyarn: boolean,
username: string,
userRecordId: string,
parentYarnRecordId: strng,
}

**Returns:**

```
<!-- success result -->
  {
    data: object,
    status: number,
    message: string,
    recordId: string,
    userDiD: string,
  }
  <!-- OR -->
  <!-- failure result -->
  {
      status: number;
      message: string;
  }
```

### toggle like in User Yarn Data (DID) on the DWN

**toggleLikeYarn()**

**Description:**

The `toggleLikeYarn` function is used to toggle between liking and un_liking a Yarn in the local/remote DWN on the web5 network seamlessly providing the following data.

**Parameters:**
data{
yarnId: string,
UserId: string,
}

**Returns:**

```
<!-- success result -->
  {
    data:
    status: number,
    message: string,
    recordId: string,
    userDiD: string,
  }
  <!-- OR -->
  <!-- failure result -->
  {
      status: number;
      message: string;
  }
```

### getting all Yarn Data (DID) on the DWN

**getYarn()**

**Description:**

The `getYarn` function is used to get all the Yarns available from the local/remote DWN on the web5 network seamlessly providng the following data.

**Parameters:**

```
  {
    recordId: string,
    updateData: {
      personalDetails: {
        firstname: string;
        lastname: string;
        phone: string;
        email: string;
        photo: string;
        dateOfBirth: string;
        gender: string;
      };
      web5: {
        didResolverName: string;
        didResolverPassword: string;
        identifier: string;
      };
      others: {
        datePublished: string;
      };
    }
  }

```

**Returns:**

A promise that resolves with the following object:

```{
    yarn: array
    status: number,
    message: string,
    recordId: string,
    userDiD: string,
  }
 <!-- success/failure result -->
  {
      status: number;
      message: string;
  }

```

### creates new Yarn Data (DID) on the DWN

**createNewYarnn()**

**Description:**

The `createNewYarn` function is used to create new Yarn data on the local/remote DWN on the web5 network seamlessly providng the following data.

**Parameters:**

```
  {
    recordId: string,
    data: {
          text: string,
          isComment: boolean
          isReyarn: boolean,
          username: string,
      };
      web5: {
        didResolverName: string;
        didResolverPassword: string;
        identifier: string;
      };
      others: {
        datePublished: string;
      };
    }

```

**Returns:**

A promise that resolves with the following object:

```{
    text: string
    status: number,
    message: string,
    recordId: string,
    userDiD: string,
    username: string,
  }
 <!-- success/failure result -->
  {
      status: number;
      message: string;
  }

```

##### Few available API ,which are not consumed

### Updating Existing User Data (DID) on the DWN

**updateUser()**

**Description:**

The `updateUser` function is used update user data exisitng in their local/remote DWN on the web5 network seamlessly providng the following data.

**Parameters:**

```
  {
    recordId: string,
    updateData: {
      personalDetails: {
        firstname: string;
        lastname: string;
        phone: string;
        email: string;
        photo: string;
        dateOfBirth: string;
        gender: string;
      };
      web5: {
        didResolverName: string;
        didResolverPassword: string;
        identifier: string;
      };
      others: {
        datePublished: string;
      };
    }
  }

```

**Returns:**

A promise that resolves with the following object:

```
 <!-- success/failure result -->
  {
      status: number;
      message: string;
  }

```

### Deleting Existing User Data (DID) on the DWN

**deleteUser()**

**Description:**

The `deleteUser` function is used remove user data exisitng in their local/remote DWN on the web5 network seamlessly providng the following data.

**Parameters:**

```
  recordId: string

```

**Returns:**

A promise that resolves with the following object:

```
 <!-- success/failure result -->
  {
      status: number;
      message: string;
  }
```

### Get Single User Data (DID) on the DWN

**getSingleUser()**

**Description:**

The `getSingleUser` function is used get a user data exisitng in their local/remote DWN on the web5 network seamlessly providng the following data.

**Parameters:**

```
recordId: string
```

**Returns:**

A promise that resolves with the following object:

```
  {
      status: number,
      message: string,
      userData: {
    '@context': string,
    '@type': string,
    personalDetails: {
      firstname: string,
      lastname: string,
      phone: string,
      email: string,
      photo: string,
      dateOfBirth: string,
      gender: string,
    },
    web5: {
      didResolverName: string,
      identifier: string
    },
    others: {
      datePublished: string
    }
  },
    }
```

**Status:**

The status of the responses. Possible values are:

- 200 - request successfull.
- 201 - request created.
- 405 - failed request.
- 409 - Conflicting request (exising data and refuse to duplicate)
- 500 - Internal Server Error

## Technologies Used

This project uses the following technologies:

- 🎉 Firebase - A platform that provides various backend services such as authentication, database, storage, etc.
- 🎉 React Query - A library for fetching, caching, and updating data in React applications.
- 🎉 Web5 - A web technology that allow users more autnonomy over their data.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

Web5 Hackathon Team
[Obadaki Emmanuel](https://github.com/Gudnuel) FrontEnd
[David Grace](Product Manager)
[Oludiya Daniel](Product Designer)
[Olagunju Daniel ](https://github.com/todak2000) FrontEnd and BackEnd
