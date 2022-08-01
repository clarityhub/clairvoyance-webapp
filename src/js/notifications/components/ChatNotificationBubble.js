import { connect } from 'react-redux';
import { branch, renderNothing } from 'recompose';

import Bubble from './Bubble';

const enhance = branch(
  props => !props.hasNotifications,
  renderNothing,
);

export default connect(
  (state) => {
    return {
      // TODO filter chat notifications
      hasNotifications: state.notifications.items.length > 0,
    };
  }
)(enhance(Bubble));
