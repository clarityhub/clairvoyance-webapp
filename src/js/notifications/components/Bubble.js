import React from 'react';
import classnames from 'classnames';
import { bubble } from './Bubble.scss';

export default ({ className }) => (
  <span className={classnames(bubble, className)} />
);
