import {
  READ,
  UPDATE,
} from '../constants/billing';
import clarity from 'clarity/dist';

/**
 * Get the billing info for the user's current account
 * 
 * ```js
 * dispatch(get());
 * ```
 * 
 * @return ClarityRequest
 */
export const get = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.billing}/me`, {}, READ);
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
      .put(`${paths.billing}/me`, data, UPDATE);
  };
};
