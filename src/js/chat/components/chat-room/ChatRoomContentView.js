import React from 'react';
import classnames from 'classnames';
import FlexView from 'theme-claire/src/atoms/Scaffolding/FlexView';
import ProfileBar from 'js/profiles/components/ProfileBar';

import ChatRoomForm from './ChatRoomForm';
import MessageGroups from '../messages/MessageGroups';

import {
  content,
  leftPane,
  rightPane,
  messageContainer,
  messageForm,
} from './ChatRoomContentView.scss';

export default ({ chat, create, isOpen, participant, isSelfParticipant, uuid }) => (
  <div className={content} key={uuid}>
    <div className={classnames(leftPane, messageContainer)}>
      <FlexView>
        <MessageGroups
          chatUuid={uuid}
          created={chat.createdAt}
          onSubmitFormText={(text) => { create(uuid, text); }}
          isSelfParticipant={isSelfParticipant}
          participant={participant}
        />
      </FlexView>

      <div className={messageForm} key={uuid}>
        <ChatRoomForm
          key={uuid}
          isOpen={isOpen}
          isSelfParticipant={isSelfParticipant}
          uuid={uuid}
        />
      </div>
    </div>

    <div className={rightPane}>
      <ProfileBar {...participant} />
    </div>
  </div>
);
