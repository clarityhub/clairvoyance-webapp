import {
  CREATE,
  READ_PAGE,
  COMPOSE,
} from '../constants/messages';
import * as SOCKET from 'js/socket/constants';

import clarity from 'clarity/dist';

export const getPage = (chatUuid, fromDate) => {
  return (dispatch, getState, { paths }) => {
    let path = `${paths.chat}/${chatUuid}/msgs`;

    if (fromDate) {
      path += `?fromDate=${fromDate}`;
    }

    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({
        fromDate,
      })
      .get(path, {}, READ_PAGE);
  };
};

export const create = (chatUuid, text) => {
  return (dispatch, getState, { paths }) => {
    const path = `${paths.chat}/${chatUuid}/msgs`;

    dispatch(compose({
      chatUuid,
      text: '',
    }));

    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({
        chatUuid,
      })
      .post(path, { text }, CREATE);
  };
};

export const incomingMessage = (data) => {
  return (dispatch, getState, { chatSounds }) => {
    const state = getState();

    const chatExists = Boolean(state.messages.items[data.chatUuid]);
    const inChat = chatExists && state.chats.items[data.chatUuid].participants.map((id) => state.participants.items[id]).find(p => p.realUuid === state.me.uuid);
    const isMe = chatExists && state.participants.items[data.participantId] && state.participants.items[data.participantId].realUuid === state.me.uuid;

    if (!window.mute) {
      if (!chatExists) {
        chatSounds.newChat.play();
      } else if (inChat && !isMe) {
        chatSounds.ping.play();
      }
    }

    dispatch({
      type: SOCKET.SOCKET_MESSAGE_CREATED,
      payload: data,
    });
  };
};

export const compose = ({ chatUuid, text }) => ({
  type: COMPOSE,
  payload: {
    chatUuid,
    text,
  },
});
