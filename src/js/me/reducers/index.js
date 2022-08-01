import {
  ME,
  READ_META,
  UPDATE_META,
} from '../constants';
import {
  DEFAULT_AVATAR_URL,
} from 'js/profiles/constants';
import clarity from 'clarity/dist';

export default clarity
  .listen([
    ME,
    READ_META,
    UPDATE_META,
  ])
  .initial({
    name: '',
    avatarUrl: DEFAULT_AVATAR_URL,
    status: 'offline',
    meta: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case ME:
        return {
          ...state,
          uuid: action.payload.uuid,
          name: action.payload.name,
          email: action.payload.email,
          status: 'online',
        };
      case READ_META:
      case UPDATE_META:
        return {
          ...state,
          meta: action.payload,
        };
      default:
        return {};
    }
  });
