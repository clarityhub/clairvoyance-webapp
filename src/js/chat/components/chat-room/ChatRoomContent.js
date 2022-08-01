import { connect } from 'react-redux';
import { branch, renderComponent, lifecycle } from 'recompose';
import { bind } from 'react-hocs';
import deepEqual from 'deep-equal';
import loader from 'clarity/dist/loader';
import Loading from 'theme-claire/src/atoms/Loading';
import { getMe } from 'js/me/actions';
import { deleteSome as deleteSomeNotifications } from 'js/notifications/actions';
import { subscribeToChat } from 'js/socket/actions';

import { create } from '../../actions/messages';
import { get } from '../../actions';
import { CLOSED } from '../../constants/roomStatuses';
import ChatRoomContentView from './ChatRoomContentView';

const clearNotifications = (props) => {
  const { chat, isSelfParticipant, notifications, deleteSomeNotifications } = props;
  const thereAreNotifications = notifications.some((n) => {
    return n.eventType === 'message' && n.eventClean.chatUuid === chat.uuid;
  });

  if (isSelfParticipant && chat && thereAreNotifications) {
    // This timeout here is only because on localhost, you will delete an
    // event before it has been written to the database!
    setTimeout(() => {
      deleteSomeNotifications('chat', chat.uuid);
    }, 30);
  }
};

const enhanceRead = lifecycle({
  componentDidMount() {
    clearNotifications(this.props);
    subscribeToChat(this.props.uuid);
  },

  componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props.notifications, nextProps.notifications)) {
      clearNotifications(nextProps);
    }
  },
});

const enhanceLoading = branch(
  props => !props.chat,
  renderComponent(Loading)
);

export default bind(
  loader(getMe)(),
  loader(get, ({ uuid }) => ([uuid]))(),
  connect(
    (state, props) => {
      const chat = state.chats.items[props.uuid];
      let isSelfParticipant = false;
      let isOpen = false;
      let participant = null;

      if (chat) {
        isSelfParticipant = chat.participants
          .map(pid => state.participants.items[pid])
          .some(p => p.realType === 'user' && p.realUuid === state.me.uuid);

        participant = chat.participants
          .map(pid => state.participants.items[pid])
          .find(p => p.realType === 'client');
        isOpen = chat.status !== CLOSED;
      }

      return {
        participant,
        isSelfParticipant,
        isOpen,
        chat,
        notifications: state.notifications.items,
      };
    },
    {
      create,
      deleteSomeNotifications,
    },
    null,
    {
      pure: true,
    }
  )
)(enhanceLoading(enhanceRead(ChatRoomContentView)));
