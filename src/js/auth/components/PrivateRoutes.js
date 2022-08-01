import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { branch, renderComponent } from 'recompose';

import Loading from 'theme-claire/src/atoms/Loading';
import FlexView from 'theme-claire/src/atoms/Scaffolding/FlexView';

import checkToken from '../utilities/checkToken';
import { refresh, logout, setTrial } from '../actions';

const LoginRedirect = ({ location }) => (
  <Redirect
    to={{ pathname: '/login', state: { from: location } }}
  />
);

const PassThrough = ({ children }) => (
  <div>{children}</div>
);

class TokenCheck extends Component {
  state = {
    status: 'loading',
  }

  componentDidMount() {
    const { token, handleRefresh, handleSetTrial } = this.props;

    checkToken(token, {
      onRefresh: (trialInfo) => {
        this.clarityRequest = handleRefresh();

        this.clarityRequest.response.then(() => {
          handleSetTrial(trialInfo);
          this.setState({
            status: 'ready',
          });
        }).catch(() => {
          this.invalidate();
          this.setState({
            status: 'invalid',
          });
        });
      },
      onLogout: () => {
        this.invalidate();
        this.setState({
          status: 'logout',
        });
      },
      onValid: (trialInfo) => {
        handleSetTrial(trialInfo);
        this.setState({
          status: 'ready',
        });
      },
    });
  }

  invalidate() {
    this.props.handleLogout();
  }

  render() {
    const { status } = this.state;

    switch (status) {
      case 'ready':
        return <PassThrough {...this.props} />;
      // Fallthrough to the loader. Redux will take care of clearing the token
      // and causing the app to redirect to the Logout page.
      case 'invalid':
      case 'logout':
      default:
        return <FlexView style={{ 'min-height': '100vh' }}><Loading /></FlexView>;
    }
  }
}

const redirectIfNotLoggedIn = branch(
  props => !props.token,
  renderComponent(LoginRedirect),
);

const loading = branch(
  props => !props.hydrated,
  renderComponent(Loading)
);

export default connect(
  state => ({
    token: state.auth.token,
    hydrated: state.auth.hydrated,
  }), {
    handleLogout: logout,
    handleRefresh: refresh,
    handleSetTrial: (args) => setTrial(args),
  }
)(loading(redirectIfNotLoggedIn(TokenCheck)));
