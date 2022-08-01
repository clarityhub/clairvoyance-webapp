import React from 'react';
import { connect } from 'react-redux';

import Status from './Status';

/**
 * Usage:
 * 
 * ```jsx
 * <UserStatus uuid={user.uuid} />
 * ```
 */
const UserStatus = ({ status, ...props }) => (
  <Status {...props} status={status} />
);

export default connect(
  (state, props) => {
    return {
      status: state.statuses.items[props.uuid] || 'offline',
    };
  },
)(UserStatus);
