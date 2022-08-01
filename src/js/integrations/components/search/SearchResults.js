import React from 'react';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import { FETCHING } from 'clarity/dist/constants/state';
import View from 'theme-claire/src/atoms/Scaffolding/View';
import Loading from 'theme-claire/src/atoms/Loading';
import IntegrationsItem from '../IntegrationsItem';

const handleClick = (uuid) => (e) => {
  e && e.preventDefault();

  const win = window.open(`https://app.${process.env.REACT_APP_BASE_URL}/oauth/authorize?uuid=${uuid}`);
  win.focus();
};

const SearchResults = ({ integrations }) => (
  <View>
    {
      integrations.map((integration) => (
        <IntegrationsItem {...integration} onClick={handleClick} />
      ))
    }
  </View>
);

const enhanceLoading = branch(
  ({ state, integrations }) => (state === FETCHING) && !integrations,
  renderComponent(Loading)
);

export default connect(
  (state) => ({
    state: state.integrationSearch.state,
    integrations: state.integrationSearch.items,
  })
)(enhanceLoading(SearchResults));
