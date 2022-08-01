import {
  READ,
  DELETE_ALL_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  DELETE_NOTIFICATION,
} from '../constants';
import clarity from 'clarity';

/**
 * Get all notifications for the given user
 */
export const getAll = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.rtc}/notifications`, {}, READ);
  };
};

/**
 * Delete all notifications that this user has access to
 */
export const deleteAll = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .delete(`${paths.rtc}/notifications`, {}, DELETE_ALL_NOTIFICATIONS);
  };
};

/**
 * Delete notifications based on their type and some query
 */
export const deleteSome = (type, query) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ notificationType: type, query })
      .delete(`${paths.rtc}/notifications/${type}/${query}`, {}, DELETE_NOTIFICATIONS);
  };
};

/**
 * Delete a single notification
 */
export const deleteOne = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ uuid })
      .delete(`${paths.rtc}/notifications/${uuid}`, {}, DELETE_NOTIFICATION);
  };
};
