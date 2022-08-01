import {
  ME,
  READ_META,
  UPDATE_META,
} from '../constants';
import clarity from 'clarity/dist';

export const getMe = () => {
  return (dispatch, getState, { paths }) => {
    const request = clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/accounts/users/me`, {}, ME);

    request.response.then(({ body, res }) => {
      if (window.Bugsnag) {
        window.Bugsnag.user = {
          id: body.uuid,
          name: body.name,
          email: body.email,
        };
      }
    });
    return request;
  };
};

export const getMeta = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.accounts}/users/me/meta`, {}, READ_META);
  };
};

export const updateMeta = (data) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .patch(`${paths.accounts}/users/me/meta`, data, UPDATE_META);
  };
};
