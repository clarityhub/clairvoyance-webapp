import React from 'react';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';

import { getIntegration } from '../actions';

const ChatRoomTitle = ({ item }) => (
  <span>
    {item.name} – Integration
  </span>
);

const enhanceLoading = branch(
  props => !props.item,
  renderComponent(() => <span />)
);

export default bind(
  loader(getIntegration, ({ uuid }) => ([uuid]))(),
  connect(
    (state, props) => {
      return {
        item: state.integrations.items[props.uuid],
      };
    }
  )
)(enhanceLoading(ChatRoomTitle));
