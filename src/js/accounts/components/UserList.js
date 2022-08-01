import React from 'react';

import { Grid, Header, HeaderColumn } from 'theme-claire/src/atoms/Grid';
import UserItem from './UserItem';

export default ({ users }) => (
  <Grid>
    <Header>
      <HeaderColumn width="60px" />
      <HeaderColumn flex={1}>
        <p>Name</p>
      </HeaderColumn>
      <HeaderColumn flex={1}>
        <p>Email</p>
      </HeaderColumn>
      <HeaderColumn width="120px" />
    </Header>

    {users.map((user) => (<UserItem {...user} />))}
  </Grid>
);
