import { connect } from 'react-redux';
import { branch, renderComponent, renderNothing } from 'recompose';

import Bubble from './Bubble';
import EmptyBubble from './EmptyBubble';

const displayEmptyBubble = branch(
  props => props.alwaysDisplay === false,
  renderNothing,
  renderComponent(EmptyBubble)
);

const enhance = branch(
  props => !props.hasNotifications,
  displayEmptyBubble,
);

export default connect(
  (state, props) => {
    const { uuid } = props;
    return {
      hasNotifications: state.notifications.items.some(n => {
        return n.eventType === 'message' && n.eventClean.chatUuid === uuid;
      }),
    };
  }
)(enhance(Bubble));
