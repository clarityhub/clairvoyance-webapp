import React from 'react';

import ChatsItem from './ChatsItem';

export default ({ chats }) => (
  <div>
    {chats.map((chat) => (
      <ChatsItem key={chat.uuid} {...chat} />
    ))}
  </div>
);
