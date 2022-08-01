import React from 'react';
import classnames from 'classnames';
import { emptyBubble } from './Bubble.scss';

export default ({ className }) => (
  <span className={classnames(emptyBubble, className)} />
);
