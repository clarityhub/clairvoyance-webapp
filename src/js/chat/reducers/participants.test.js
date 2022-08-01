import { expect } from 'chai';
import reducer from './participants';

const { describe, it } = global;

describe('Chat Participants reducer', () => {
  it('reads chats and participants into the store', () => {
    const before = {
      error: null,
      state: 'FETCHING',
      items: {},
    };

    const after = {
      error: null,
      state: 'LOADED',
      items: {
        'f3c83e64-c655-45db-b786-945771ec6825': {
          uuid: 'f3c83e64-c655-45db-b786-945771ec6825',
          realType: 'client',
          realUuid: 'b80175ed-f574-4d8a-aebe-57cfdb0c4240',
          name: 'Peter Danielson',
          email: 'pdanielson@gmail.com',
          createdAt: '2017-11-15T19:24:37.425Z',
          updatedAt: '2017-11-15T19:24:55.186Z',
        },
        'be96b105-4b35-4be3-b0fe-91c563e92ccd': {
          uuid: 'be96b105-4b35-4be3-b0fe-91c563e92ccd',
          realType: 'user',
          realUuid: '180f0cef-12f4-48b4-826d-e8f225b99f66',
          name: 'uisbdafisbfisb',
          email: 'idmontie+90wjgnw0n@gmail.com',
          createdAt: '2017-11-15T19:24:56.840Z',
          updatedAt: '2017-11-15T19:24:56.840Z',
        },
      },
    };

    const action = {
      type: 'CHATS_READ_ALL',
      uiStatusFilter: 'open',
      state: 'SUCCESS',
      payload: {
        count: 1,
        chats: [{
          uuid: 'be35cf61-81dc-4fdc-b52d-53dc5d0217f9',
          accountId: '43',
          participantId: 'f3c83e64-c655-45db-b786-945771ec6825',
          status: 'active',
          createdAt: '2017-11-15T19:24:37.453Z',
          updatedAt: '2017-11-15T19:24:56.902Z',
          participants: [{
            uuid: 'f3c83e64-c655-45db-b786-945771ec6825',
            realType: 'client',
            realUuid: 'b80175ed-f574-4d8a-aebe-57cfdb0c4240',
            name: 'Peter Danielson',
            email: 'pdanielson@gmail.com',
            createdAt: '2017-11-15T19:24:37.425Z',
            updatedAt: '2017-11-15T19:24:55.186Z',
          },
          {
            uuid: 'be96b105-4b35-4be3-b0fe-91c563e92ccd',
            realType: 'user',
            realUuid: '180f0cef-12f4-48b4-826d-e8f225b99f66',
            name: 'uisbdafisbfisb',
            email: 'idmontie+90wjgnw0n@gmail.com',
            createdAt: '2017-11-15T19:24:56.840Z',
            updatedAt: '2017-11-15T19:24:56.840Z',
          }],
          latestMessage: {
            uuid: '1aaf409f-1acb-4c3f-935e-e160db2a0181',
            text: 'Hey there!',
            createdAt: '2017-11-15T19:25:20.630Z',
            updatedAt: '2017-11-15T19:25:20.630Z',
            participantId: 'f3c83e64-c655-45db-b786-945771ec6825',
          },
        }],
      },
    };

    expect(reducer(before, action)).to.be.deep.equal(after);
  });
});
