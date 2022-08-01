import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import { branch, renderComponent } from 'recompose';

import Loading from 'theme-claire/src/atoms/Loading';
import View from 'theme-claire/src/atoms/Scaffolding/View';
import Card from 'theme-claire/src/atoms/Card';

import { getMeta } from 'js/me/actions';
import { get as getBilling } from 'js/accounts/actions/billing';

import DashboardChart from './DashboardChart';
import GetStarted from './GetStarted';
import Billing from './Billing';

const Dashboard = ({
  isAdmin,
  isGettingStartedDismissed,
  billingIsFree,
  isBillingStartedDismissed,
}) => {
  return (
    <View>
      <h2 style={{'textAlign': 'center'}}>Dashboard</h2>
      {isAdmin && !isGettingStartedDismissed ? <Card><GetStarted uuid={process.env.REACT_APP_WEBSITE_CHAT_UUID} /></Card> : null}
      {isAdmin && !billingIsFree && !isBillingStartedDismissed ? <Card><Billing /></Card> : null}
      <Card>
        <DashboardChart />
      </Card>
    </View>
  );
};

const enhance = branch(
  (props) => props.state === FETCHING,
  renderComponent(Loading)
);

export default bind(
  loader(getMeta)(),
  loader(getBilling)(),
  connect(
    state => ({
      isAdmin: jwtDecode(state.auth.token).privilege === 'admin',
      isGettingStartedDismissed: state.me.meta ? state.me.meta.getStartedDismissed || false : true,
      isBillingStartedDismissed: state.me.meta ? state.me.meta.billingDismissed || false : true,
      billingIsFree: state.billing && state.billing.plan === 'trial',
    }),
  )
)(enhance(Dashboard));
