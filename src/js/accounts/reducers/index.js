import {
  READ,
  UPDATE,
} from '../constants';
import clarity from 'clarity/dist';

export default clarity
  .listen([
    READ,
    UPDATE,
  ])
  .initial({
    name: '',
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
      case UPDATE:
        return {
          name: action.payload.name,
        };
      default:
        return {};
    }
  });
