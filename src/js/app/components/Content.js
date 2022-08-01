import React from 'react';
import { content } from './Content.scss';

export default ({ children }) => (
  <div className={content}>
    {children}
  </div>
);
