import React from 'react';

import { avatar } from './SuggestionAvatar.scss';
import AvatarUrl from 'js/profiles/components/AvatarUrl';
import { ROBOT_AVATAR_URL } from '../constants/robot';

export default () => (
  <div className={avatar}>
    <AvatarUrl url={ROBOT_AVATAR_URL} />
  </div>
);
