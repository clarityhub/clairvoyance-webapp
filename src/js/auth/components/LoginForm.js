import React from 'react';
import { Link } from 'react-router-dom';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import Button from 'theme-claire/src/atoms/Button';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';

import {
  loginView,
  loginFormContainer,
  loginForm,
  loginForgot,
  loginRegister,
  loginError,
} from './LoginForm.scss';

export default ({ error, handleLogin, withRef }) => (
  <div className={loginView}>
    <div className={loginFormContainer}>
      <h2>Welcome to Clarity Hub</h2>
      <form
        className={loginForm}
        onSubmit={handleLogin}
        ref={withRef}
      >
        <FormGroup>
          <Input
            label="Email"
            type="email"
            name="email"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Password"
            type="password"
            name="password"
          />
        </FormGroup>

        <ErrorBlock className={loginError}>{error}</ErrorBlock>

        <Button block primary type="submit">Login</Button>
      </form>
      <div className={loginForgot}>
        <p>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </div>
      <div className={loginRegister}>
        <p>
          Don't have an account?
          {' '}
          <a href={`${process.env.REACT_APP_WWW_URL}/register`} target="blank">Sign up to create one</a>
        </p>

      </div>
    </div>
  </div>
);
