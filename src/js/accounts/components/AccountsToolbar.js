import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import Loading from 'theme-claire/src/atoms/Loading';
import Button from 'theme-claire/src/atoms/Button';
import ModalForm from 'theme-claire/src/molecules/ModalForm';
import Toolbar from 'theme-claire/src/atoms/Toolbar';
import IoEdit from 'react-icons/lib/io/edit';
import FaCreditCardAlt from 'react-icons/lib/fa/credit-card-alt';

import { get } from '../actions';
import AccountUpdateForm from './AccountUpdateForm';
import AccountChangePlan from './AccountChangePlan';

const AccountsToolbar = (account) => (
  <Toolbar>
    <ModalForm overlay={<AccountUpdateForm name={account.name} />}>
      <Button outline small><IoEdit /> Edit Account</Button>
    </ModalForm>

    <ModalForm overlay={<AccountChangePlan />}>
      <Button outline small><FaCreditCardAlt /> Change Plan and Billing</Button>
    </ModalForm>
  </Toolbar>
);

const enhance = branch(
  props => props.state === FETCHING && props.name === '',
  renderComponent(Loading)
);

export default bind(
  loader(get)(),
  connect(
    state => state.accounts,
  )
)(enhance(AccountsToolbar));
