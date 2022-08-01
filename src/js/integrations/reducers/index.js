import clarity from 'clarity/dist';
import {
  READ,
  READ_ALL,
  READ_CLIENT_CREDENTIALS,
  READ_CREDENTIAL,
  READ_AUTHORIZATIONS,
  CREATE_CODE,
  DISABLE,
} from '../constants';
import {
  READ as READ_SETTINGS,
  UPDATE as UPDATE_SETTINGS,
} from '../constants/settings';

export default clarity
  .listen([
    READ,
    READ_CLIENT_CREDENTIALS,
    READ_CREDENTIAL,
    READ_AUTHORIZATIONS,
    CREATE_CODE,
    READ_ALL,
    DISABLE,
    READ_SETTINGS,
    UPDATE_SETTINGS,
  ])
  .initial({
    credentials: {},
    items: {},
    authorizations: {},
    settings: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: action.payload,
          },
        };

      case READ_ALL:
        return {
          items: {
            ...state.items,
            ...action.payload.integrations.reduce((r, app) => {
              r[app.uuid] = app;
              return r;
            }, {}),
          },
        };

      case READ_CLIENT_CREDENTIALS:
        return {
          credentials: {
            ...state.items,
            [action.payload.integrationUuid]: action.payload,
          },
        };

      case DISABLE: {
        const integrations = { ...state.items };
        delete integrations[action.uuid];

        return {
          items: integrations,
        };
      }

      case READ_AUTHORIZATIONS:
        return {
          authorizations: {
            ...state.authorizations,
            [action.uuid]: action.payload,
          },
        };

      case READ_SETTINGS:
        return {
          settings: {
            ...state.settings,
            [action.uuid]: action.payload,
          },
        };

      case UPDATE_SETTINGS:
        return {
          settings: {
            ...state.settings,
            [action.uuid]: action.payload,
          },
        };

      case READ_CREDENTIAL:
      case CREATE_CODE:
      default:
        return {};
    }
  });
