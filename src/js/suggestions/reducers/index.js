import clarity from 'clarity/dist';
import {
  READ,
} from '../constants';
import {
  SOCKET_SUGGESTION_CREATED,
  SOCKET_SUGGESTION_DELETED,
} from 'js/socket/constants';

export default clarity
  .listen([
    READ,
    SOCKET_SUGGESTION_CREATED,
    SOCKET_SUGGESTION_DELETED,
  ])
  .initial({
    items: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
        return {
          items: {
            ...state.items,
            [action.messageUuid]: action.payload.suggestions,
          },
        };

      case SOCKET_SUGGESTION_CREATED: {
        const incoming = action.payload.suggestions;
        const messageUuid = incoming[0].messageUuid;
        const current = state.items[messageUuid];
        let suggestions = [];

        if (current && current.length > 0) {
          suggestions = current;
          // skip any that alrady exist
          incoming.forEach((s) => {
            if (!current.some(c => c.uuid === s.uuid)) {
              // new
              suggestions.push(s);
            }
          });
        } else {
          suggestions = incoming;
        }

        return {
          items: {
            ...state.items,
            [messageUuid]: suggestions,
          },
        };
      }

      case SOCKET_SUGGESTION_DELETED: {
        const {
          messageUuid,
          suggestionUuid,
        } = action.payload;

        const current = state.items[messageUuid];
        let suggestions = [];

        if (current && current.length > 0) {
          suggestions = current.filter((suggestion) => {
            return suggestion.uuid !== suggestionUuid;
          });
        }

        return {
          items: {
            ...state.items,
            [messageUuid]: suggestions,
          },
        };
      }

      default:
        return {};
    }
  });
