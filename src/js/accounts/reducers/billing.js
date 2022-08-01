import {
  READ,
  UPDATE,
} from '../constants/billing';
import {
  CREATE as CREATE_USER,
  DELETE as DELETE_USER,
} from '../constants/users';
import clarity from 'clarity/dist';

export default clarity
  .listen([
    READ,
    UPDATE,
    CREATE_USER,
    DELETE_USER,
  ])
  .initial({})
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
      case UPDATE:
        return {
          ...action.payload,
        };
      case CREATE_USER:
        return {
          ...action.payload,
          seats: state.seats + 1,
        };
      case DELETE_USER:
        return {
          ...action.payload,
          seats: state.seats - 1,
        };
      default:
        return {};
    }
  });
