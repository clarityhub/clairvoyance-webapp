import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoutes from './auth/components/PrivateRoutes';

import Login from './auth/components/Login';
import Register from './auth/components/Register';
import ForgotPassword from './auth/components/ForgotPassword';
import ResetPassword from './auth/components/ResetPassword';
import InviteSetPassword from './auth/components/InviteSetPassword';
import AuthorizeIntegration from './integrations/components/AuthorizeIntegration';
import SearchIntegrations from './integrations/components/search/View';
import App from './app/components/App';
import paths from './paths';

export default () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset" exact component={ResetPassword} />
      <Route path="/invite" exact component={InviteSetPassword} />

      <PrivateRoutes>
        <Route path="/oauth/authorize" exact component={AuthorizeIntegration} />
        <Route path="/integrations/search" exact component={SearchIntegrations} />
        <Route path="/" exact render={() => (
          <App paths={paths} />
        )} />
      </PrivateRoutes>
    </Switch>
  </Router>
);
