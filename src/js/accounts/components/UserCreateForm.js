import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import Button from 'theme-claire/src/atoms/Button';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import CheckEmail from 'theme-claire/src/molecules/CheckEmail';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { create as createUser } from '../actions/users';

class UserCreateForm extends Component {
  static propTypes = {
    close: func.isRequired,
    createUser: func.isRequired,
    error: string,
    onChangeDirty: func.isRequired,
  }

  state = {
    error: null,
  }

  handleInput = () => {
    const { onChangeDirty } = this.props;
    const isDirty = Array.from(this.form.getElementsByTagName('input'))
      .map(input => input.value !== '')
      .reduce((a, b) => a || b);

    onChangeDirty(isDirty);
  }

  handleEmailTaken = (taken) => {
    this.setState({
      emailAvailable: !taken,
      error: null,
    });
  }

  handleSubmit = (e) => {
    const { close, createUser, onChangeDirty } = this.props;
    const { emailAvailable, waiting } = this.state;

    e.preventDefault();

    if (waiting) {
      return;
    }

    // Full user (there is a password)
    if (this.form.password.value !== this.form.passwordConfirm.value) {
      this.setState({
        error: 'Your passwords are not the same',
      });
      return;
    }

    if (!emailAvailable) {
      this.setState({
        error: 'That email is already being used by a user',
      });
      return;
    }

    const payload = {
      name: this.form.name.value,
      email: this.form.email.value,
      password: this.form.password.value,
    };

    this.clarityRequest = createUser(payload);
    this.clarityRequest.response.then(({ res, body }) => {
      onChangeDirty(false);
      close();
      this.setState({
        waiting: false,
      });
    }).catch((err) => {
      this.setState({
        waiting: false,
        error: err.reason,
      });
    });
  }

  componentWillUnmount() {
    if (this.clarityRequest) {
      this.clarityRequest.cancel();
    }
  }

  render() {
    const { error: propError } = this.props;
    const { error, waiting } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        ref={r => (this.form = r)}
      >
        <h2>Create a New User</h2>
        <FormGroup>
          <Input
            label="Name"
            type="text"
            name="name"
            onInput={this.handleInput}
          />
        </FormGroup>
        <FormGroup>
          <CheckEmail onEmailTaken={this.handleEmailTaken}>
            <Input
              label="Email"
              type="email"
              name="email"
              onInput={this.handleInput}
            />
          </CheckEmail>
        </FormGroup>

        <FormGroup>
          <Input
            label="Password (optional)"
            type="password"
            name="password"
            onInput={this.handleInput}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Confirm Password (optional)"
            type="password"
            name="passwordConfirm"
            onInput={this.handleInput}
          />
        </FormGroup>

        <ErrorBlock>{error || propError}</ErrorBlock>

        <FormActions>
          <Button primary loading={waiting} type="submit">Create</Button>
        </FormActions>
      </form>
    );
  }
}

export default connect(
  state => ({
    error: state.users.error,
  }),
  {
    createUser,
  }
)(UserCreateForm);
