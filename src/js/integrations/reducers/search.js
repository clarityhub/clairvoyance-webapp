import clarity from 'clarity/dist';
import {
  SEARCH,
} from '../constants/search';

export default clarity
  .listen([
    SEARCH,
  ])
  .initial({
    items: [],
    query: '',
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case SEARCH:
        return {
          items: action.payload.integrations,
          query: action.query,
        };

      default:
        return {};
    }
  });
