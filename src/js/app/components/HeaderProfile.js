import React from 'react';

import { headerProfile } from './HeaderProfile.scss';

export default ({ children }) => (
  <div className={headerProfile}>
    {children}
  </div>
);
