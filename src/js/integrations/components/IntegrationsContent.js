import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { emptyEnhancer, loadingEnhancer } from 'clarity/dist/enhancers';
import loader from 'clarity/dist/loader';
import Loading from 'theme-claire/src/atoms/Loading';
import { create } from 'js/tabs/actions';
import IntegrationTabData from '../models/IntegrationTabData';
import { getAllIntegrations } from '../actions';
import IntegrationsList from './IntegrationsList';
import { emptyIntegrationsContent } from './IntegrationsContent.scss';

const IntegrationsContent = ({ items, handleClick }) => (
  <div>
    <IntegrationsList apps={items} onClick={handleClick} />
  </div>
);

const EmptyIntegrationsContent = () => (
  <div className={emptyIntegrationsContent}>
    <p>
      Integrations let you use 3rd party functionality in Clarity Hub.
    </p>

    <p>
      Get started by <strong>searching for an integration</strong> above and we'll walk you through
      how to add it.
    </p>
  </div>
);

const enhanceLoading = loadingEnhancer(Loading);
const enhanceEmpty = emptyEnhancer(EmptyIntegrationsContent);

export default bind(
  loader(getAllIntegrations)(),
  connect(
    state => ({
      state: state.integrations.state,
      items: Object.values(state.integrations.items)
        .filter(v => !v.deleted)
        .filter(v => v.active)
        .sort((a, b) => {
          // TODO pretty sure this should be a localeCompare
          return a.createdAt > b.createdAt ? -1 : 1;
        }),
    }),
    dispatch => ({
      handleClick: (uuid) => (e) => {
        e && e.preventDefault();

        dispatch(
          create({
            ...IntegrationTabData,
            active: true,
            params: {
              uuid,
            },
          }),
        );
      },
    }),
  )
)(enhanceLoading(enhanceEmpty(IntegrationsContent)));
