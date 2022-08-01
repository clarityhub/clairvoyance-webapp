import { connect } from 'react-redux';
import { branch, renderNothing } from 'recompose';

import Bubble from './Bubble';

const enhance = branch(
  props => !props.hasNotifications,
  renderNothing,
);

export default connect(
  (state, props) => {
    const { filter } = props;
    const { chats, notifications } = state;

    const filteredChats = Object.keys(chats.items)
      .map(k => {
        const v = chats.items[k];
        return v;
      })
      .filter(v => v.status === filter)
      .filter(v => !v.deleted);

    const hasNotifications = notifications.items.some(n => {
      const thereIsAChat = filteredChats.some(c => {
        return c.uuid === n.eventClean.chatUuid;
      });

      return n.eventType === 'message' && thereIsAChat;
    });

    return {
      hasNotifications,
    };
  }
)(enhance(Bubble));
