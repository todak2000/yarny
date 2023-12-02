export const createProtocolDefinition = () => {
  const yarnyProtocolDefinition = {
    protocol: 'https://yarny_app.io/protocol',
    published: true,
    types: {
      Yarns: {
        schema: 'https://yarny_app.io/protocol/schemas/yarnsSchema',
        dataFormats: ['application/json'],
      },
      Users: {
        schema: 'https://yarny_app.io/protocol/schemas/usersSchema',
        dataFormats: ['application/json'],
      },
      Followers: {
        schema: 'https://yarny_app.io/protocol/schemas/followersSchema',
        dataFormats: ['application/json'],
      },
      Messages: {
        schema: 'https://yarny_app.io/protocol/schemas/messagesSchema',
        dataFormats: ['application/json'],
      },
    },
    structure: {
      Yarns: {
        $actions: [
          {
            who: 'anyone',
            can: 'read',
          },
          {
            who: 'anyone',
            can: 'write',
          },
        ],
        Users: {
          $actions: [
            {
              who: 'author',
              of: 'Users',
              can: 'write',
            },
            {
              who: 'anyone',
              can: 'read',
            },
          ],
        },
        Followers: {
          $actions: [
            {
              who: 'author',
              of: 'Followers',
              can: 'write',
            },
            {
              who: 'anyone',
              can: 'read',
            },
          ],
        },
        Messages: {
          $actions: [
            { who: 'anyone', can: 'write' },
            { who: 'author', of: 'Messages', can: 'read' },
            { who: 'recipient', of: 'Messages', can: 'read' },
          ],
        },
      },
    },
  };
  return yarnyProtocolDefinition;
};
