import React from 'react';
import { connect } from 'react-redux';
import {
  OPEN,
  ACTIVE,
  CLOSED,
} from '../../constants/roomStatuses.js';
import { filter } from '../../actions';

import {
  toolbar,
  toolbarBubble,
} from './ChatsToolbar.scss';

import Filters from 'theme-claire/src/molecules/Filter/Filters';
import Filter from 'theme-claire/src/molecules/Filter/Filter';
import ChatsFilterNotificationBubble from 'js/notifications/components/ChatsFilterNotificationBubble';

const ChatsToolbar = ({ uiStatusFilter, handleFilter }) => (
  <div className={toolbar}>
    <Filters active={uiStatusFilter} onChange={handleFilter}>
      <Filter key={OPEN}><ChatsFilterNotificationBubble className={toolbarBubble} filter={OPEN} /> Pending</Filter>
      <Filter key={ACTIVE}><ChatsFilterNotificationBubble className={toolbarBubble} filter={ACTIVE} /> Active</Filter>
      <Filter key={CLOSED}> Resolved</Filter>
    </Filters>
  </div>
);

export default connect(
  state => ({
    uiStatusFilter: state.chats.uiStatusFilter,
  }),
  {
    handleFilter: filter,
  }
)(ChatsToolbar);
