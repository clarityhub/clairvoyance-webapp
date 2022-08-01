import clarity from 'clarity/dist';
import {
  RECONNECTING,
  RECONNECTED,
  RECONNECT_FAILED,
} from '../constants';
import { emitEvent } from '../socket/handler';

export const reconnecting = () => ({
  type: RECONNECTING,
});

export const reconnected = () => ({
  type: RECONNECTED,
});

export const reconnectFailed = () => ({
  type: RECONNECT_FAILED,
});

export const registerDevice = (registrationToken) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.rtc}/devices/register`, { registrationToken }, 'IGNORE');
  };
};

export const subscribeToChat = (uuid) => {
  emitEvent({
    name: 'chat.subscribe',
    data: {
      meta: {
        uuid,
      },
    },
  });
};
