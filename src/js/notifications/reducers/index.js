import {
  READ,
  DELETE_ALL_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  DELETE_NOTIFICATION,
} from '../constants';
import {
  SOCKET_MESSAGE_CREATED,
  SOCKET_NOTIFICATION_DELETED,
} from 'js/socket/constants';
import clarity from 'clarity/dist';

export default clarity
  .listen([
    READ,
    DELETE_ALL_NOTIFICATIONS,
    DELETE_NOTIFICATIONS,
    DELETE_NOTIFICATION,
    SOCKET_MESSAGE_CREATED,
    SOCKET_NOTIFICATION_DELETED,
  ])
  .initial({
    items: [],
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
        return {
          items: action.payload.items,
        };
      case DELETE_ALL_NOTIFICATIONS:
        return {
          items: [],
        };
      case DELETE_NOTIFICATIONS:
        return {
          items: state.items.filter((item) => {
            if (action.notificationType === 'chat') {
              return !(item.eventType === 'message' && item.eventClean.chatUuid === action.payload.query);
            } else if (action.notificationType === 'message') {
              return !(item.eventType === 'message' && item.eventClean.meta.uuid === action.payload.query);
            } else {
              return true;
            }
          }),
        };
      case DELETE_NOTIFICATION:
        return {
          items: state.items.filter((item) => item.uuid !== action.payload.uuid),
        };

      case SOCKET_MESSAGE_CREATED: {
        const newItem = {
          uuid: -1,
          eventType: 'message',
          eventClean: action.payload,
        };

        return {
          items: [newItem, ...state.items],
        };
      }
      case SOCKET_NOTIFICATION_DELETED:
        // Do nothing for now, since notifications will be re-read
        return {};
      default:
        return {};
    }
  });
