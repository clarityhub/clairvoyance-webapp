import React from 'react';

import View from 'theme-claire/src/atoms/Scaffolding/View';
import Divider from 'theme-claire/src/atoms/Divider';
import AccountsToolbar from './AccountsToolbar';
import AccountsContent from './AccountsContent';
import AccountsUsersToolbar from './AccountsUsersToolbar';
import AccountsUsersContent from './AccountsUsersContent';

export default () => (
  <View>
    <h2>Your Account</h2>

    <AccountsToolbar />
    <AccountsContent />

    <div style={{ marginTop: '30px', marginBottom: '30px' }}><Divider /></div>

    <h2>Users</h2>
    <AccountsUsersToolbar />
    <AccountsUsersContent />
  </View>
);
