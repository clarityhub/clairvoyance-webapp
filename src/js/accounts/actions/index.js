import {
  READ,
  UPDATE,
} from '../constants';
import clarity from 'clarity/dist';

export const get = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.accounts}/me`, {}, READ);
  };
};

export const update = (data) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .put(`${paths.accounts}/me`, data, UPDATE);
  };
};
