import React from 'react';

import View from 'theme-claire/src/atoms/Scaffolding/View';
import TabHeader from 'js/tabs/components/TabHeader';
import ChatsToolbar from './ChatsToolbar';
import ChatsContent from './ChatsContent';

export default () => (
  <View>
    <TabHeader
      title="Chat"
    />

    <ChatsToolbar />

    <ChatsContent />
  </View>
);
