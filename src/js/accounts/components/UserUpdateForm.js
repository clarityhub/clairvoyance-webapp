import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import Button from 'theme-claire/src/atoms/Button';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { update as updateUser } from '../actions/users';

// TODO allow admins to change:
// - emails (auth)
// - password (auth)
// - bio
// - nickname
class UserUpdateForm extends Component {
  static propTypes = {
    close: func.isRequired,
    error: string,
    name: string,
    onChangeDirty: func.isRequired,
    updateUser: func.isRequired,
    uuid: string.isRequired,
  }

  state = {
    error: null,
  }

  handleInput = () => {
    const { name, onChangeDirty } = this.props;
    const isDirty = this.form.name.value !== name;
    onChangeDirty(isDirty);
  }

  handleSubmit = (e) => {
    const { uuid, close, updateUser, onChangeDirty } = this.props;
    const { waiting } = this.state;

    e.preventDefault();

    if (waiting) {
      return;
    }

    const payload = {
      name: this.form.name.value,
    };

    this.clarityRequest = updateUser(uuid, payload);
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
    const { name, error: propError } = this.props;
    const { error } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        ref={r => (this.form = r)}
      >
        <h2>Update User</h2>
        <FormGroup>
          <Input
            defaultValue={name}
            label="Name"
            type="text"
            name="name"
            onInput={this.handleInput}
          />
        </FormGroup>

        <ErrorBlock>{error || propError}</ErrorBlock>

        <FormActions>
          <Button primary type="submit">Update</Button>
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
    updateUser,
  }
)(UserUpdateForm);
