import React from 'react';
import { connect } from 'react-redux';

import FaClose from 'react-icons/lib/fa/close';
import Button from 'theme-claire/src/atoms/Button';

import { updateMeta } from 'js/me/actions';
import { create } from 'js/tabs/actions';
import AccountTabData from 'js/accounts/models/AccountTabData';

import {
  container,
  closeButton,
} from './Billing.scss';

const Billing = ({
  handleClickApps,
  handleClickAccount,
  handleDismissCard,
}) => {
  return (
    <div className={container}>
      <Button className={closeButton} icon onClick={handleDismissCard}><FaClose /></Button>
      <p>
        You are currently on a free trial. Please
        update your plan and billing information.
      </p>

      <Button primary onClick={handleClickAccount}>Update Your Billing Info</Button>
    </div>
  );
};

export default connect(
  null,
  (dispatch) => ({
    handleClickAccount: () => dispatch(
      create({
        ...AccountTabData,
        active: true,
      })
    ),
    handleDismissCard: () => {
      dispatch(
        updateMeta({ billingDismissed: true })
      );
    },
  })
)(Billing);
