import React from 'react';

import FlexView from 'theme-claire/src/atoms/Scaffolding/FlexView';
import ChatsItem from './ChatsItem';
import { Grid } from 'theme-claire/src/atoms/Grid';

import {
  listContent,
  listFill,
} from './ChatsList.scss';

export default ({ chats, onClick }) => (
  <FlexView className={listFill}>
    <div className={listContent}>
      <Grid>
        {chats.map((chat) => (
          <ChatsItem key={chat.uuid} {...chat} onClick={onClick} />
        ))}
      </Grid>
    </div>
  </FlexView>
);
