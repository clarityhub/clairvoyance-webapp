import React from 'react';

import { Grid, Header, HeaderColumn } from 'theme-claire/src/atoms/Grid';
import IntegrationsItem from './IntegrationsItem';

export default ({ apps, onClick }) => (
  <Grid>
    <Header>
      <HeaderColumn flex={1}>
        <p>Active Integrations</p>
      </HeaderColumn>
      <HeaderColumn width="120px" />
    </Header>

    {apps.map((app) => (
      <IntegrationsItem key={app.uuid} {...app} onClick={onClick} />
    ))}
  </Grid>
);
