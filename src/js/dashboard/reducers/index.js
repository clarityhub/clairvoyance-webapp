import clarity from 'clarity/dist';
import {
  READ,
} from '../constants';

export default clarity
  .listen([
    READ,
  ])
  .initial({
    waitTimes: {
      buckets: [
        {
          'totalRooms': 0,
          'avgTime': 0,
        },
      ],
      unjoined: {
        totalRooms: 0,
      },
    },
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
        return {
          waitTimes: action.payload,
        };
      default:
        return {};
    }
  });
