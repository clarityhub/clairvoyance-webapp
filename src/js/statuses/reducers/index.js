import clarity from 'clarity/dist';
import {
  SOCKET_ALL_STATUSES,
  SOCKET_STATUS_UPDATED,
} from 'js/socket/constants';

export default clarity
  .listen([
    SOCKET_ALL_STATUSES,
    SOCKET_STATUS_UPDATED,
  ])
  .initial({
    items: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case SOCKET_ALL_STATUSES:
        return {
          items: {
            ...state.items,
            // TODO simplify and speed up
            ...(Object.keys(action.payload).map((k) => {
              return { [k]: 'online' };
            })).reduce((a, b) => ({ ...a, ...b }), {}),
          },
        };
      case SOCKET_STATUS_UPDATED:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: action.payload.status,
          },
        };
      default:
        return {};
    }
  });
