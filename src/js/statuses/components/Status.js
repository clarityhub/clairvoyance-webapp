import React from 'react';
import classnames from 'classnames';

import * as s from './Status.scss';

export default ({ className, status, withAvatar }) => (
  <span
    className={classnames(s.status, s[`status__${status}`], {
      [s.statusFloater]: withAvatar,
    }, className)}
    aria-label={status}
  />
);
