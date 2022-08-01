import React from 'react';
import MessagesMolecule from 'theme-claire/src/molecules/Messages';

import ChatBubbles from 'js/app/components/icons/ChatBubbles';
import Messages from './Messages';
import Suggestions from 'js/suggestions/components/Suggestions';
import TabHeader from 'js/tabs/components/TabHeader';
import MessageAvatar from './MessageAvatar';

export default ({
  chatUuid,
  created,
  participant,
  isSelfParticipant,
  messages,
  typing,
  groups,
  usingSuggestionUuid,
  withRef,
  withSuggestionRef,

  maybeScrollToBottom,
}) => (
  <Messages withRef={withRef}>
    <TabHeader
      title="Website Chat"
      createdAt={created}
      icon={<ChatBubbles />}
    />
    <MessagesMolecule
      groups={groups}
      Avatar={MessageAvatar}
    />

    {
      isSelfParticipant && messages.length > 0
        ? <Suggestions
          messageUuid={messages[messages.length - 1].uuid}
          participant={participant}
          maybeScrollToBottom={maybeScrollToBottom}
        />
        : null
    }

  </Messages>
);
