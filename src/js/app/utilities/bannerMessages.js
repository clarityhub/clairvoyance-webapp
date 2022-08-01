/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import AccountsButton from 'js/accounts/components/AccountsButton';

export const trialExpired = {
  priority: 'high',
  messageComponent: <span>Your free trial has expired. You will not be able to respond to chats until you update your billing information <AccountsButton text="Update Account" /></span>,
};

export const emptyBanner = {
  priority: '',
  messageComponent: '',
};

export const trialLimited = (days) => ({
  priority: 'high',
  messageComponent: <span>Your trial will be expiring in {days ? days : 'a few'} days <AccountsButton text="Update Account"/></span>,
});