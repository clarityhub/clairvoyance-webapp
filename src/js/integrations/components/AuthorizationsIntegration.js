import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';

import FaRefresh from 'react-icons/lib/fa/refresh';
import loader from 'clarity/dist/loader';
import Card from 'theme-claire/src/atoms/Card';
import Loading from 'theme-claire/src/atoms/Loading';
import Button from 'theme-claire/src/atoms/Button';
import { branch, renderComponent } from 'recompose';
import Scopes from './Scopes';

import { iconButton } from './SettingsIntegration.scss';

import { getAuthorizations } from '../actions';

const handleReauth = (uuid) => (e) => {
  e && e.preventDefault();

  const win = window.open(`https://app.${process.env.REACT_APP_BASE_URL}/oauth/authorize?uuid=${uuid}`);
  win.focus();
};

const AuthorizationsIntegration = ({ authorization, uuid }) => (
  <Card>
    <h2>Authorizations</h2>

    <p>
      <Scopes scopes={authorization.scopes} />
    </p>

    <Button onClick={handleReauth(uuid)} primary className={iconButton}>
      <FaRefresh /> <span>Reactivate</span>
    </Button>
  </Card>
);

const enhanceLoading = branch(
  ({ authorization }) => !authorization,
  renderComponent(Loading),
);

export default bind(
  loader(getAuthorizations, ({ uuid }) => ([ uuid ]))(),
  connect(
    (state, props) => ({
      authorization: state.integrations.authorizations[props.uuid],
    })
  )
)(enhanceLoading(AuthorizationsIntegration));
