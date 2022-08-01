import React from 'react';
import MinutesSince from 'theme-claire/src/atoms/DateTime/MinutesSince';
import { Link } from 'react-router-dom';

import {
  item,
  itemGroup,
  itemName,
  itemMessage,
  itemCreated,
} from './ChatsItem.mobile.scss';

import GetChatParticipantClient from '../GetChatParticipantClient';
import GetLatestMessage from '../GetLatestMessage';

export default ({ uuid, createdAt, status, participants }) => (
  <Link className={item} to={`/chats/${uuid}`}>
    <div className={itemGroup}>
      <div className={itemName}>
        <GetChatParticipantClient participants={participants}>
          {(participant) => {
            return <span>{participant.name ? participant.name : 'No Name'}</span>;
          }}
        </GetChatParticipantClient>
      </div>
      <div className={itemMessage}>
        <GetLatestMessage chatUuid={uuid}>
          {({ text }) => {
            return <span>{text}</span>;
          }}
        </GetLatestMessage>
      </div>
    </div>
    <div className={itemCreated}>
      <MinutesSince>{createdAt}</MinutesSince>
    </div>
  </Link>
);
