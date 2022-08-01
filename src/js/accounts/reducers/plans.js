import {
  READ,
} from '../constants/plans';

import clarity from 'clarity/dist';

export default clarity
  .listen([
    READ,
  ])
  .initial({})
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
        return {
          items: action.payload,
        };
      default:
        return {};
    }
  });
