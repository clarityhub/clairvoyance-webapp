import { combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';

import requestReducer from 'clarity/dist/reducers';
import accountsReducer from './accounts/reducers';
import usersReducer from './accounts/reducers/users';
import billingReducer from './accounts/reducers/billing';
import plansReducer from './accounts/reducers/plans';
import authReducer from './auth/reducers';
import chatReducer from './chat/reducers';
import dashboardReducer from './dashboard/reducers';
import integrations from './integrations/reducers';
import integrationSearch from './integrations/reducers/search';
import participantReducer from './chat/reducers/participants';
import messagesReducer from './chat/reducers/messages';
import notificationsReducer from './notifications/reducers';
import tabsReducer from './tabs/reducers';
import meReducer from './me/reducers';
import socketReducer from './socket/reducers';
import statusesReducer from './statuses/reducers';
import suggestions from './suggestions/reducers';
import paths from './paths';
import chatSounds from './chat/services/sounds';

export const reducers = combineReducers({
  accounts: accountsReducer,
  auth: authReducer,
  billing: billingReducer,
  chats: chatReducer,
  dashboard: dashboardReducer,
  integrations,
  integrationSearch,
  me: meReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  participants: participantReducer,
  plans: plansReducer,
  requests: requestReducer,
  socket: socketReducer,
  statuses: statusesReducer,
  suggestions,
  tabs: tabsReducer,
  users: usersReducer,
});

export const middleware = compose(
  applyMiddleware(thunk.withExtraArgument({
    paths,
    chatSounds,
  })),
  autoRehydrate(),
  applyMiddleware(
    createActionBuffer(REHYDRATE) // make sure to apply this after redux-thunk et al.
  )
);
