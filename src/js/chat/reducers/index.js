import clarity from 'clarity/dist';
import {
  READ,
  READ_ALL,
  JOIN,
  FILTER,
  UPDATE,
} from '../constants';
import {
  READ_PAGE as MESSAGES_READ_PAGE,
} from '../constants/messages';
import {
  SOCKET_CHAT_CREATED,
  SOCKET_CHAT_UPDATED,
  SOCKET_PARTICIPANT_JOINED,
} from 'js/socket/constants';
import {
  OPEN,
} from '../constants/roomStatuses';

// XXX ADD READ_PAGE to CHAT reducer and look for paging stuff

export default clarity
  .listen([
    READ,
    READ_ALL,
    JOIN,
    FILTER,
    UPDATE,
    SOCKET_CHAT_CREATED,
    SOCKET_CHAT_UPDATED,
    SOCKET_PARTICIPANT_JOINED,
  ])
  .initial({
    uiStatusFilter: OPEN,
    items: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case MESSAGES_READ_PAGE:
        return {
          items: {
            ...state.items,
            [action.payload.chat.uuid]: {
              ...state.items[action.payload.chat.uuid],
              hasNextPage: action.payload.hasNextPage,
            },
          },
        };

      case READ:
      case SOCKET_CHAT_CREATED:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: {
              ...action.payload,
              typing: {
                isTyping: false,
                message: '',
              },
              // Normalize participants
              participants: action.payload.participants.map((p) => p.uuid),
            },

          },
        };

      case SOCKET_CHAT_UPDATED:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: {
              ...(state.items[action.payload.uuid] || {}),
              ...action.payload,
            },
          },
        };

      case READ_ALL:
        return {
          items: {
            ...state.items,
            ...action.payload.chats.reduce((r, chat) => {
              r[chat.uuid] = {
                ...chat,
                // Normalize participants
                participants: chat.participants.map((p) => p.uuid),
              };
              return r;
            }, {}),
          },
        };

      case JOIN:
        return {
          items: {
            ...state.items,
            [action.payload.chat.uuid]: {
              ...state.items[action.payload.chat.uuid],
              participants: [...state.items[action.payload.chat.uuid].participants, action.payload.participant.uuid],
            },
          },
        };

      case SOCKET_PARTICIPANT_JOINED:
        return {
          items: {
            ...state.items,
            [action.payload.chatId]: {
              ...state.items[action.payload.chatId],
              participants: [...state.items[action.payload.chatId].participants, action.payload.uuid],
            },
          },
        };

      case UPDATE:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: {
              ...state.items[action.payload.uuid],
              ...action.payload,
            },
          },
        };
      case FILTER:
        return {
          uiStatusFilter: action.uiStatusFilter,
        };

      default:
        return {};
    }
  });
