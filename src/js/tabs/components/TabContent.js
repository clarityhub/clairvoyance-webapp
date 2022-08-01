import React from 'react';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import classnames from 'classnames';

import { content, contentEmpty } from './TabContent.scss';

const TabContent = ({ Type, params, uuid }) => (
  <div className={content}>
    <Type {...params} tabUuid={uuid} />
  </div>
);

const EmptyTabContent = () => (
  <div className={classnames(content, contentEmpty)} />
);

const hideIfNoData = branch(
  props => !(props.Type && props.params),
  renderComponent(EmptyTabContent)
);

export default connect(
  state => state.tabs.find(t => t.active),
)(hideIfNoData(TabContent));
