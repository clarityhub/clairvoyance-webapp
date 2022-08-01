import React from 'react';

import FlexView from 'theme-claire/src/atoms/Scaffolding/FlexView';
import ChatRoomContent from './ChatRoomContent';

export default ({ uuid, tabUuid }) => (
  <FlexView>
    <ChatRoomContent uuid={uuid} />
  </FlexView>
);
