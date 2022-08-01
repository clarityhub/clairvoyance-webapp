import clarity from 'clarity/dist';
import {
  SOCKET_CHAT_CREATED,
  SOCKET_PARTICIPANT_UPDATED,
  SOCKET_PARTICIPANT_JOINED,
} from 'js/socket/constants';
import {
  JOIN,
  READ as CHATS_READ,
  READ_ALL as CHATS_READ_ALL,
} from '../constants';

export default clarity
  .listen([
    CHATS_READ,
    CHATS_READ_ALL,
    SOCKET_CHAT_CREATED,
    SOCKET_PARTICIPANT_UPDATED,
    JOIN,
    SOCKET_PARTICIPANT_JOINED,
  ])
  .initial({
    items: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case CHATS_READ_ALL:
        return {
          items: {
            ...state.items,
            ...action.payload.chats.reduce((arr, c) => {
              c.participants.forEach((p) => {
                arr[p.uuid] = p;
              });
              return arr;
            }, {}),
          },
        };

      case CHATS_READ:
      case SOCKET_CHAT_CREATED:
        return {
          items: {
            ...state.items,
            ...action.payload.participants.reduce((r, p) => {
              r[p.uuid] = p;
              return r;
            }, {}),
          },
        };

      case SOCKET_PARTICIPANT_UPDATED:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: action.payload,
          },
        };

      case JOIN:
        return {
          items: {
            ...state.items,
            [action.payload.participant.uuid]: action.payload.participant,
          },
        };

      case SOCKET_PARTICIPANT_JOINED:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: action.payload,
          },
        };

      default:
        return {};
    }
  });
