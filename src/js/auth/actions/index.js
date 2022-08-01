import {
  LOGIN,
  LOGOUT_RESPONSE,
  LOGOUT,
  REFRESH,
  FORGOT,
  RESET,
  SET_TRIAL,
} from '../constants';
import { persistor } from 'js/store';
import clarity from 'clarity/dist';

export const login = (email, password) => {
  return (dispatch, _, { paths }) => {
    const payload = {
      email,
      password,
    };

    return clarity
      .with({ dispatch })
      .post(`${paths.auth}/login`, payload, LOGIN);
  };
};

export const logout = () => {
  return (dispatch, getState, { paths }) => {
    const { token } = getState().auth;

    dispatch({
      type: LOGOUT,
    });

    persistor.purge();

    return clarity
      .with({
        dispatch,
        headers: {
          token,
        },
      })
      .post(`${paths.auth}/logout`, {}, LOGOUT_RESPONSE);
  };
};

export const refresh = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.auth}/refresh`, {}, REFRESH);
  };
};

export const setTrial = (data) => {
  return (dispatch, getState, { paths }) => {
    return dispatch({
      type: SET_TRIAL,
      data,
    });
  };
};

export const forgot = (email) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.auth}/forgot`, {
        email,
      }, FORGOT);
  };
};

export const reset = (uuid, password) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.auth}/reset`, {
        uuid,
        password,
      }, RESET);
  };
};
