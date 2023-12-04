/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordsQueryRequest, Web5 } from '@web5/api';
import { webcrypto } from 'node:crypto';

import { createProtocolDefinition } from '@/web5/protocol';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const { web5, did: userDid } = await Web5.connect({
  sync: '5s',
});

const queryForProtocol = async (web5: any) => {
  return await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'https://yarny_app.io/protocol',
      },
    },
  });
};

const installProtocolLocally = async (web5: any, protocolDefinition: any) => {
  return await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });
};

const configureProtocol = async (web5: any, userDid: any) => {
  const protocolDefinition = await createProtocolDefinition();

  const { protocols: localProtocol, status: localProtocolStatus } =
    await queryForProtocol(web5);
  console.log({ localProtocol, localProtocolStatus });
  if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {
    const { protocol, status } = await installProtocolLocally(
      web5,
      protocolDefinition
    );
    console.log('Protocol installed locally', protocol, status);

    const { status: configureRemoteStatus } = await protocol.send(userDid);
    console.log(
      'Did the protocol install on the remote DWN?',
      configureRemoteStatus
    );
  } else {
    console.log('Protocol already installed');
  }
};
await configureProtocol(web5, userDid);
// Class definition with type annotations

export class Web5Constructor {
  // Class properties
  type: string;
  context: string;
  uri: string;
  end: any;

  // Class constructor
  constructor(type: string) {
    this.type = type.toLowerCase();
    this.context = 'https://yarny_app.io/protocol/schemas/';
    this.uri = this.context + `${this.type}Schema`;
  }

  // READ: get any data based on the type- database parameter
  async getData(): Promise<any> {
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: this.uri,
        },
      },
      dateSort: 'createdAscending',
    } as RecordsQueryRequest);
    return records;
  }

  async createDID(): Promise<any> {
    return userDid;
  }
  async web5(): Promise<any> {
    return web5;
  }
}
