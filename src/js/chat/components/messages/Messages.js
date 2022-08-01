import React from 'react';

import { messages, messageScrollWrapper } from './Messages.scss';

export default ({ children, withRef }) => (
  <div className={messages} ref={withRef}>
    <div className={messageScrollWrapper}>
      {children}
    </div>
  </div>
);
