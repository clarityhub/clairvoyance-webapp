import clarity from 'clarity/dist';
import {
  LOGIN,
  LOGOUT,
  REFRESH,
  FORGOT,
  RESET,
  SET_TRIAL,
} from '../constants';

export default clarity
  .listen([
    LOGIN,
    LOGOUT,
    REFRESH,
    FORGOT,
    RESET,
    SET_TRIAL,
    'persist/REHYDRATE',
  ])
  .initial({
    token: null,
    hydrated: false,
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case 'persist/REHYDRATE':
        return {
          hydrated: true,
          token: action.payload.auth ? action.payload.auth.token : null,
        };
      case LOGIN:
        return {
          token: action.payload.token,
        };
      case LOGOUT:
        return {
          token: null,
        };
      case REFRESH:
        return {
          token: action.payload.token,
        };
      case SET_TRIAL:
        return {
          trial: {
            ...state.trial,
            ...action.data,
          },
        };
      default:
        return {};
    }
  });
