import {
  READ_ALL,
  READ,
  CREATE,
  UPDATE,
  DELETE,
} from '../constants/users';
import clarity from 'clarity/dist';

export const getAll = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.accounts}/users`, {}, READ_ALL);
  };
};

export const get = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.accounts}/users/${uuid}`, {}, READ);
  };
};

export const create = (data) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.accounts}/users`, data, CREATE);
  };
};

export const update = (uuid, data) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .put(`${paths.accounts}/users/${uuid}`, data, UPDATE);
  };
};

export const del = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({
        uuid,
      })
      .delete(`${paths.accounts}/users/${uuid}`, {}, DELETE);
  };
};
