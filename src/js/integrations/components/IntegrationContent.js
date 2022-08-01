import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';
import Loading from 'theme-claire/src/atoms/Loading';
import Card from 'theme-claire/src/atoms/Card';
import { branch, renderComponent } from 'recompose';
import { FETCHING, INITIAL, LOADED } from 'clarity/dist/constants/state';

import AboutIntegration from './AboutIntegration';
import SettingsIntegration from './SettingsIntegration';
import AuthorizationsIntegration from './AuthorizationsIntegration';
import RevokeIntegration from './RevokeIntegration';

import { getIntegration, disable } from '../actions';

const IntegrationContent = ({ item, uuid, handleDelete }) => (
  <div key={uuid}>
    <h2>{item.name}</h2>
    <AboutIntegration key={uuid + 'about'} item={item} />

    <SettingsIntegration key={uuid + 'settings'} uuid={uuid} />

    <AuthorizationsIntegration key={uuid + 'authorizations'} uuid={uuid} />

    <RevokeIntegration key={uuid + 'revoke'} uuid={uuid} onDelete={handleDelete} />
  </div>
);

const IntegrationNotFound = () => (
  <Card>
    <p>We could not found that integration</p>
  </Card>
);

const enhanceLoading = branch(
  ({ state, item }) => (state === FETCHING || state === INITIAL) && (item === null || typeof item === 'undefined'),
  renderComponent(Loading)
);

const enhanceNotFound = branch(
  ({ state, item }) => (state === LOADED) && (item === null || typeof item === 'undefined'),
  renderComponent(IntegrationNotFound)
);

export default bind(
  loader(getIntegration, (props) => ([props.uuid]))(),
  connect(
    (state, props) => {
      return {
        state: state.integrations.state,
        item: state.integrations.items[props.uuid],
      };
    },
    (dispatch) => ({
      handleDelete: (uuid) => dispatch(disable(uuid)),
    }),
  ),
)(enhanceLoading(enhanceNotFound(IntegrationContent)));
