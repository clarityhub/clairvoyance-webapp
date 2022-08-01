import React from 'react';
import { headerTabs } from './HeaderTabs.scss';

export default ({ children }) => (
  <div className={headerTabs}>
    {children}
  </div>
);
