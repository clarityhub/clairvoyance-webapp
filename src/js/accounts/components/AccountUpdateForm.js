import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import Button from 'theme-claire/src/atoms/Button';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { update } from '../actions';

class AccountUpdateForm extends Component {
  static propTypes = {
    close: func.isRequired,
    error: string,
    name: string,
    onChangeDirty: func.isRequired,
    update: func.isRequired,
  }

  static defaultProps = {
    onChangeDirty: () => {},
  }

  state = {
    error: null,
    waiting: false,
  }

  handleInput = (e) => {
    const { onChangeDirty, name } = this.props;

    onChangeDirty(this.form.name.value !== name);
  }

  handleSubmit = (e) => {
    const { close, update, onChangeDirty } = this.props;
    const { waiting } = this.state;

    e.preventDefault();

    if (waiting) {
      return;
    }

    // TODO validate
    const payload = {
      name: this.form.name.value,
    };

    this.setState({
      waiting: true,
    });

    this.clarityRequest = update(payload);
    this.clarityRequest.response.then(({ res, body }) => {
      onChangeDirty(false);
      close();
      this.setState({
        waiting: false,
      });
    }).catch((err) => {
      this.setState({
        error: err.reason,
        waiting: false,
      });
    });
  }

  componentWillUnmount() {
    if (this.clarityRequest) {
      this.clarityRequest.cancel();
    }

    if (this.form) {
      this.form.name.value = '';
    }
  }

  render() {
    const { error: propError, name } = this.props;
    const { error } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        ref={r => (this.form = r)}
      >
        <h2>Update Your Account</h2>
        <FormGroup>
          <Input
            defaultValue={name}
            label="Name"
            type="text"
            name="name"
            placeholder="Your account name"
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
    error: state.accounts.error,
  }),
  {
    update,
  }
)(AccountUpdateForm);
