import React from 'react';
import { connect } from 'react-redux';
import Button from 'theme-claire/src/atoms/Button';

import { create } from 'js/tabs/actions';
import AccountTabData from 'js/accounts/models/AccountTabData';

const AccountsButton = ({text, handleClickAccount}) =>
  <Button onClick={handleClickAccount} primary>{text}</Button>;

export default connect(
  () => ({}),
  (dispatch) => ({
    handleClickAccount: () => dispatch(
      create({
        ...AccountTabData,
        active: true,
      })
    ),
  })
)(AccountsButton);
