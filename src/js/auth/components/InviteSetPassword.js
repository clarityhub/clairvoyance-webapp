import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { branch, renderComponent } from 'recompose';
import UrlSearchParams from 'url-search-params';

import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import Button from 'theme-claire/src/atoms/Button';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import SuccessBlock from 'theme-claire/src/atoms/SuccessBlock';
import { reset } from '../actions';

import {
  resetView,
  resetFormContainer,
  resetForm,
  resetError,
  resetSuccess,
  resetRegister,
} from './InviteSetPassword.scss';

// XXX refactor with ResetPassword
class InviteSetPassword extends Component {
  static propTypes = {
    handleReset: func.isRequired,
  }

  state = {
    sent: false,
  }

  handleReset = (e) => {
    e && e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;

    if (password !== confirmPassword) {
      this.setState({
        error: 'Your passwords are not the same',
      });
      return;
    }

    const searchParams = new UrlSearchParams(window.location.search);
    const uuid = searchParams.get('uuid');
    const request = this.props.handleReset(uuid, password);

    request.response.then(() => {
      // Clean up cuz Chrome won't
      this.form.password.value = '';
      this.form.confirm_password.value = '';

      this.setState({
        sent: true,
      });
    }).catch((e) => {
      this.setState({
        error: e.message,
      });
    });
  }

  renderSuccess = () => {
    return (
      <div className={resetView}>
        <div className={resetFormContainer}>
          <SuccessBlock className={resetSuccess}>You've successfully set your password!</SuccessBlock>

          <div className={resetRegister}>
            <p>
              <Link to="login">Login</Link>
            </p>
          </div>
        </div>

      </div>
    );
  }

  render() {
    const { error, sent } = this.state;
    const { errorProps } = this.props;

    if (sent) {
      return this.renderSuccess();
    }

    return (
      <div className={resetView}>
        <div className={resetFormContainer}>
          <h3>Set Your Password</h3>
          <p>Activate your account my creating a password</p>
          <form
            className={resetForm}
            onSubmit={this.handleReset}
            ref={r => { this.form = r; }}
          >
            <FormGroup>
              <Input
                label="Password"
                type="password"
                name="password"
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Confirm Password"
                type="password"
                name="confirm_password"
              />
            </FormGroup>

            <ErrorBlock className={resetError}>{error || errorProps}</ErrorBlock>

            <Button block primary type="submit">Set Password</Button>
          </form>
        </div>
      </div>
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

export default connect(
  (state) => ({
    error: state.auth.error,
    token: state.auth.token,
  }),
  (dispatch) => ({
    handleReset: (uuid, password) => dispatch(reset(uuid, password)),
  })
)(redirectIfLoggedIn(InviteSetPassword));
