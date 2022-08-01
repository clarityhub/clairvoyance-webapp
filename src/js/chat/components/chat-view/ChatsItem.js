import React from 'react';
import classnames from 'classnames';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import MinutesSince from 'theme-claire/src/atoms/DateTime/MinutesSince';
import { Item, ItemColumn } from 'theme-claire/src/atoms/Grid';

import AvatarUrl from 'js/profiles/components/AvatarUrl';
import ChatRoomBubble from 'js/notifications/components/ChatRoomBubble';

import {
  item,
  itemStatus,
  itemStatusActive,
  itemStatusOpen,
  itemStatusClosed,
  itemName,
  itemText,
  itemMessage,
  itemCreated,
} from './ChatsItem.scss';

import {
  OPEN,
  ACTIVE,
  CLOSED,
} from '../../constants/roomStatuses';

import GetChatParticipantClient from '../GetChatParticipantClient';
import GetLatestMessage from '../GetLatestMessage';

const icon = (uuid, status) => {
  switch (status) {
    case ACTIVE:
      return <ChatRoomBubble uuid={uuid} />;
    case CLOSED:
      return <FaCheckCircle />;
    case OPEN:
    default:
      return <ChatRoomBubble uuid={uuid} />;
  }
};

export default ({ uuid, createdAt, status, participants, onClick }) => (
  <Item className={item} clickable>
    <button onClick={onClick(uuid)}>
      <ItemColumn width="22px" className={classnames(itemStatus, {
        [itemStatusOpen]: status === OPEN,
        [itemStatusActive]: status === ACTIVE,
        [itemStatusClosed]: status === CLOSED,
      })}>
        {icon(uuid, status)}
      </ItemColumn>
      <ItemColumn width="60px">
        <GetChatParticipantClient participants={participants}>
          {(participant) => {
            return <AvatarUrl src={participant.avatarUrl || ''} />;
          }}
        </GetChatParticipantClient>
      </ItemColumn>

      <ItemColumn flex={1} className={itemText}>
        <div className={itemMessage}>
          <GetLatestMessage chatUuid={uuid}>
            {({ text }) => text }
          </GetLatestMessage>
        </div>
        <div className={itemName}>
          <GetChatParticipantClient participants={participants}>
            {(participant) => participant.name}
          </GetChatParticipantClient>
        </div>
      </ItemColumn>
      <ItemColumn className={itemCreated} width="105px">
        <MinutesSince>{createdAt}</MinutesSince>
      </ItemColumn>
    </button>
  </Item>
);
