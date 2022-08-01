import {
  SEARCH,
} from '../constants/search';
import clarity from 'clarity/dist';

export const search = (text) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ query: text })
      .post(`${paths.api}/integrations/search`, { query: text }, SEARCH);
  };
};
