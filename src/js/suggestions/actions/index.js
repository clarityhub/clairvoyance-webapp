import clarity from 'clarity/dist';
import {
  READ,
  CHOOSE,
} from '../constants';

export const get = (messageUuid) => {
  if (!messageUuid) {
    // eslint-disable-next-line
    debugger;
  }

  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ messageUuid })
      .get(`${paths.api}/suggestions/messages/${messageUuid}`, {}, READ);
  };
};

export const chooseAction = (suggestionUuid, actionValue) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.api}/suggestions/${suggestionUuid}`, { actionValue }, CHOOSE);
  };
};
