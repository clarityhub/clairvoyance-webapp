import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';

import { get } from '../actions';

const AccountsContent = ({ name }) => name;

const enhance = branch(
  props => props.state === FETCHING && props.name === '',
  renderComponent(() => <span />)
);

export default bind(
  loader(get)(),
  connect(
    state => ({
      ...state.accounts,
    }),
  )
)(enhance(AccountsContent));
