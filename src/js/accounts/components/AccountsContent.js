import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import Loading from 'theme-claire/src/atoms/Loading';

import { get } from '../actions';
import { get as getBilling } from '../actions/billing';
import { accountsContent } from './AccountsContent.scss';

const AccountsContent = ({ name, plan, seats, allowedSeats }) => (
  <div className={accountsContent}>
    <table>
      <tr>
        <td>Account Name</td>
        <td>{name}</td>
      </tr>
      <tr>
        <td>Plan</td>
        <td>{plan}</td>
      </tr>
      <tr>
        <td>Number of Users</td>
        <td>{seats} of {allowedSeats}</td>
      </tr>
    </table>
  </div>
);

const LoadingAccountsContent = () => (
  <div className={accountsContent}>
    <Loading />
  </div>
);

const enhance = branch(
  props => props.state === FETCHING && props.name === '',
  renderComponent(LoadingAccountsContent)
);

export default bind(
  loader(get)(),
  loader(getBilling)(),
  connect(
    state => ({
      ...state.accounts,
      plan: state.billing.plan,
      seats: state.billing.seats,
      allowedSeats: state.billing.allowedSeats,
    }),
  )
)(enhance(AccountsContent));
