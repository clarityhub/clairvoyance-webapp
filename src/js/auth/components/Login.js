import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { branch, renderComponent } from 'recompose';

import { login } from '../actions';
import LoginForm from './LoginForm';

class Login extends Component {
  componentDidMount() {
    // On mount, dispatch action to check for jwt in cookie and login if present
    const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (jwt) {
      // this should take care of redirecting already...
      this.props.handleGetCookie(jwt);
      // delete cookie when done
      document.cookie = `jwt=;domain=${process.env.REACT_APP_BASE_URL};path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }

    if (this.form) {
      this.form.email.focus();
    }
  }

  componentWillUnmount() {
    // Clean up cuz Chrome won't

    this.form.email.value = '';
    this.form.password.value = '';
  }

  ref = (r) => {
    this.form = r;
  }

  render() {
    const { error, handleLogin } = this.props;
    return (
      <LoginForm
        error={error}
        handleLogin={handleLogin}
        withRef={this.ref}
      />

    );
  }
}

const LoginRedirect = ({ location }) => (
  <Redirect
    to={{ pathname: '/', state: { from: location } }}
  />
);

const redirectIfLoggedIn = branch(
  props => props.token,
  renderComponent(LoginRedirect),
);

export default withRouter(connect(
  // mapStateToProps
  (state) => ({
    error: state.auth.error,
    token: state.auth.token,
  }),
  // mapDispatchToProps
  (dispatch, props) => ({
    handleGetCookie: (jwt) => {
      return dispatch({
        type: 'LOGIN',
        payload: {
          token: jwt,
        },
      });
    },
    handleLogin: (e) => {
      e && e.preventDefault();

      const { history, location } = props;

      const email = e.target.email.value;
      const password = e.target.password.value;

      const request = dispatch(login(email, password));
      request.response.then(() => {
        if (location && location.state && location.from) {
          history.push(location.state.from);
        }
      });
    },
  })
)(redirectIfLoggedIn(Login)));
