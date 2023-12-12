# Yarny Socila Media Platform

This is the offical documentation for a Yarny Social Media platform project built using Next.js, React, TypeScript,Web5 and other technologies. The project aims to create a user-friendly website where users own their content, have and manage their privacy, and enables seamless content monetization

## URL

<!-- https://yarny-todak2000.vercel.app/ -->

## Built with

- ⚡️ Next.js 13
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3
- ✨ Web5
- ✨ Redux
- ✨ React Query
- ✨ React-Share
- 🃏 Jest — Configured for unit testing

## Features

This project implements the following features:

💎 CRUD Functionality for yarn (post): Users can create and read yarn for now. Each yarn has an a username, content, like yarn button, reyarn, comment buton and a created/updated timestamp. A simple text editor is used for comment . Only a user can comment on a yarn, like yarn and read yarn.

- 💎 Users can Onoboard the Application using user friendly means, Using their prefered email and Password (under the hood, DID which is lengthy to input,control and not memorisable, is store by users, during registration).

- 💎 At login the app only verify the user, email and password.. then All other Security, verification, Storage and retrieval of Data is from the DWN, using the DID of the User.

- 💎 All Data provided at registration are used to initialize the DID and Make Data available in the DWN.

- 💎 Yarny only verify a user email and password, then Pass the DID, to the User under the Hood for DWN calls, no Data is stored or Handled by Yarn.

## Future Features

- 💎 Account Deactivation: if the user deciders to deactivate His/Her account, The DWN holders all there Data, the Account cannot be reactivated, the user can only open another account.

- 💎 Profile Editing: if the user deciders to delete or change any profile data in their DWN.

- 💎 Direct Messaging: if the user deciders to Send a Direct message another user on the platform, they can communicate privately to each other.

- 💎 Analytic: This will provide insight to activities of the user, like the amount of follower, Yarns, Reyarns, Shared Yarns and more.

- 💎 Settings This will be for moderation and control. what to see and not to see

## Getting Started

To run this project locally, you will need to have Node 19 or later, yarn/npm and TypeScript installed on your machine. You will also need to be familar with the Web5 documentation [here](https://developer.tbd.website/docs/web5/).

## Installation

Clone this repository to your local machine:

```

https://github.com/todak2000/yarny.git

```

Navigate to the project directory and install the dependencies:

```

cd yarn
yarn install

```

Create a `.env` file in the root directory and add your Firebase configuration variables or refer to `.env.example` file for reference and guidance:

```

NEXT_PUBLIC_SHOW_LOGGER="true"

```

## Development

To start the development server, run the following command:

```

yarn dev

```

The website will be available at http://localhost:3000.

## API documentation

Refer to the API documentation

`src/pages/api/README.md` - [HERE](src/pages/api/README.md)

## Deployment

To deploy the website to a service like Vercel or Netlify, you will need to connect your GitHub repository to your hosting account and configure the environment variables.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

Web5 Hackathon Team
[Obadaki Emmanuel](https://github.com/Gudnuel) FrontEnd
[David Grace](Product Manager)
[Oludiya Daniel](Product Designer)
[Olagunju Daniel ](https://github.com/todak2000) FrontEnd and BackEnd
