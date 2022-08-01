import React from 'react';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';
import ChatRoomBubble from 'js/notifications/components/ChatRoomBubble';

import { get } from '../../actions';
import GetChatParticipantClient from '../GetChatParticipantClient';
import { bubble } from './ChatRoomTitle.scss';

const ChatRoomTitle = ({ uuid, participantUuids }) => (
  <span>
    <ChatRoomBubble className={bubble} alwaysDisplay={false} uuid={uuid} />
    <GetChatParticipantClient participants={participantUuids}>
      {(participant) => (
        (participant.name ? participant.name : 'No Name') + ' – '
      )}
    </GetChatParticipantClient>
    Chat
  </span>
);

const enhanceLoading = branch(
  props => !props.chat,
  renderComponent(() => <span />)
);

export default bind(
  loader(get, ({ uuid }) => ([uuid]))(),
  connect(
    (state, props) => {
      const chat = state.chats.items[props.uuid];

      return {
        chat,
        participants: (chat ? chat.participants : [])
          .map(p => state.participants.items[p]),
        participantUuids: chat ? chat.participants : [],
      };
    }
  )
)(enhanceLoading(ChatRoomTitle));
