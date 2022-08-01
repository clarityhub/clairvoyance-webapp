import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import Loading from 'theme-claire/src/atoms/Loading';

import UserList from './UserList';
import { getAll } from '../actions/users';

const AccountsUsersContent = ({ users }) => (
  <div>
    <UserList users={users} />
  </div>
);

const enhance = branch(
  props => props.state === FETCHING && (props.users ? props.users.length === 0 : true),
  renderComponent(Loading)
);

export default bind(
  loader(getAll)(),
  connect(
    state => ({
      state: state.users.state,
      users: state.users.items,
    }),
  )
)(enhance(AccountsUsersContent));
