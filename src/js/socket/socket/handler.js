import { store } from 'js/store';
import * as SOCKET from '../constants';
import { incomingMessage } from 'js/chat/actions/messages';
import { getAll } from 'js/notifications/actions';

import { latestSocket } from './Socket';

// Hey heads up, don't dispatch bro, just call me directly man
export const emitEvent = (event) => {
  if (latestSocket && latestSocket.socket) {
    latestSocket.socket.emit(event.name, event.data);
  } else {
    // Try to emit in a few seconds
    setTimeout(() => {
      emitEvent(event);
    }, 1000);
  }
};

export const handleEvent = (raw) => {
  const type = raw.data[1].event;
  const data = raw.data[1].meta;

  switch (type) {
    case SOCKET.CHAT_CREATED:
      return store.dispatch({
        type: SOCKET.SOCKET_CHAT_CREATED,
        payload: data,
      });
    case SOCKET.CHAT_UPDATED:
      return store.dispatch({
        type: SOCKET.SOCKET_CHAT_UPDATED,
        payload: data,
      });
    case SOCKET.PARTICIPANT_UPDATED:
      return store.dispatch({
        type: SOCKET.SOCKET_PARTICIPANT_UPDATED,
        payload: data,
      });
    case SOCKET.CHAT_PARTICIPANT_JOINED:
      return store.dispatch({
        type: SOCKET.SOCKET_PARTICIPANT_JOINED,
        payload: data,
      });
    case SOCKET.PARTICIPANT_TYPING:
      return store.dispatch({
        type: SOCKET.SOCKET_PARTICIPANT_TYPING,
        payload: data,
      });
    case SOCKET.PARTICIPANT_TYPING_END:
      return store.dispatch({
        type: SOCKET.SOCKET_PARTICIPANT_TYPING_END,
        payload: data,
      });
    case SOCKET.MESSAGE_CREATED:
      return store.dispatch(incomingMessage(data));
    case SOCKET.MESSAGE_COMPOSED:
      return store.dispatch({
        type: SOCKET.SOCKET_MESSAGE_COMPOSED,
        payload: data,
      });
    case SOCKET.STATUS_UPDATED:
      return store.dispatch({
        type: SOCKET.SOCKET_STATUS_UPDATED,
        payload: data,
      });
    case SOCKET.ALL_STATUSES:
      return store.dispatch({
        type: SOCKET.SOCKET_ALL_STATUSES,
        payload: data,
      });

    case SOCKET.NOTIFICATION_DELETED:
      // Re-read notifications for now
      store.dispatch(getAll());
      return store.dispatch({
        type: SOCKET.SOCKET_NOTIFICATION_DELETED,
        payload: data,
      });

    case SOCKET.SUGGESTION_CREATED:
      return store.dispatch({
        type: SOCKET.SOCKET_SUGGESTION_CREATED,
        payload: data,
      });
    case SOCKET.SUGGESTION_DELETED:
      return store.dispatch({
        type: SOCKET.SOCKET_SUGGESTION_DELETED,
        payload: data,
      });

    default:
      // Do nothing
  }
};
