import React from 'react';

import { messages } from './Messages.mobile.scss';

export default ({ children, withRef }) => (
  <div className={messages} ref={withRef}>
    {children}
  </div>
);
