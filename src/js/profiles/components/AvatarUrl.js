import React from 'react';
import classnames from 'classnames';

import { DEFAULT_AVATAR_URL } from '../constants';
import { avatar, avatarSmall } from './AvatarUrl.scss';

export default ({ small, name, url }) => (
  <img
    className={classnames(avatar, {
      [avatarSmall]: small,
    })}
    src={url || DEFAULT_AVATAR_URL}
    alt={name ? `${name}'s avatar'` : `A user's avatar`}
  />
);
