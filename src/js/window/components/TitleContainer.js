import { connect } from 'react-redux';

import Title from './Title';

export default connect(
  (state) => {
    return {
      unread: state.notifications.items.length,
    };
  }
)(Title);
