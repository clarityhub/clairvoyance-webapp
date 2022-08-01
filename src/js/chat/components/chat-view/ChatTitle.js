import React from 'react';
import ChatNotificationBubble from 'js/notifications/components/ChatNotificationBubble';

import { bubble } from './ChatTitle.scss';

export default () => (
  <span>
    <ChatNotificationBubble className={bubble} />
    Chats
  </span>
);
