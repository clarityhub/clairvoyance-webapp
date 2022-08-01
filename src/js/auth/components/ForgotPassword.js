import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { branch, renderComponent } from 'recompose';

import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import Button from 'theme-claire/src/atoms/Button';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import SuccessBlock from 'theme-claire/src/atoms/SuccessBlock';
import { forgot } from '../actions';

import {
  forgotView,
  forgotFormContainer,
  forgotForm,
  forgotRegister,
  forgotError,
  forgotSuccess,
} from './ForgotPassword.scss';

class ForgotPassword extends Component {
  static propTypes = {
    handleReset: func.isRequired,
  }

  state = {
    sent: false,
  }

  componentWillUnmount() {
    // Clean up cuz Chrome won't
    this.form.email.value = '';
  }

  handleReset = (e) => {
    e && e.preventDefault();

    const email = e.target.email.value;

    const request = this.props.handleReset(email);

    request.response.then(() => {
      this.setState({
        sent: true,
      });
    });
  }

  renderSuccess = () => {
    return (
      <div className={forgotView}>
        <div className={forgotFormContainer}>
          <SuccessBlock className={forgotSuccess}>Check your inbox for your reset link!</SuccessBlock>
        </div>
      </div>
    );
  }

  render() {
    const { error } = this.props;
    const { sent } = this.state;

    if (sent) {
      return this.renderSuccess();
    }

    return (
      <div className={forgotView}>
        <div className={forgotFormContainer}>
          <h3>Forgot Password</h3>
          <p>Forgot your password? No problem! We'll send
            you a one time password reset link to your inbox.</p>
          <form
            className={forgotForm}
            onSubmit={this.handleReset}
            ref={r => { this.form = r; }}
          >
            <FormGroup>
              <Input
                label="Email"
                type="email"
                name="email"
              />
            </FormGroup>

            <ErrorBlock className={forgotError}>{error}</ErrorBlock>

            <Button block primary type="submit">Send Reset Link</Button>
          </form>
          <div className={forgotRegister}>
            <p>
              Or{' '}
              <Link to="login">Login</Link>
            </p>

          </div>
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
  // mapStateToProps
  (state) => ({
    error: state.auth.error,
    token: state.auth.token,
  }),
  // mapDispatchToProps
  (dispatch) => ({
    handleReset: (email) => dispatch(forgot(email)),
  })
)(redirectIfLoggedIn(ForgotPassword));
