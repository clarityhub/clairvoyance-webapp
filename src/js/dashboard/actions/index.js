import {
  READ,
} from '../constants';
import clarity from 'clarity/dist';

export const getWaitTimes = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.analytics}/chats`, {}, READ);
  };
};
