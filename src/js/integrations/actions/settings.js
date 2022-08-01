import {
  READ,
  UPDATE,
} from '../constants/settings';
import clarity from 'clarity/dist';

export const get = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ uuid })
      .get(`${paths.api}/integrations/${uuid}/settings`, {}, READ);
  };
};

export const update = (uuid, settings) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ uuid })
      .put(`${paths.api}/integrations/${uuid}/settings`, { settings }, UPDATE);
  };
};
