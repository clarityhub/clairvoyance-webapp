import {
  READ,
} from '../constants/plans';
import clarity from 'clarity/dist';

export const get = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
      })
      .get(`${paths.billing}/plans`, {}, READ);
  };
};
