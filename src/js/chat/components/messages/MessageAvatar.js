import React from 'react';
import AvatarUrl from 'js/profiles/components/AvatarUrl';

import { avatarSelf, avatarOther } from './MessageAvatar.scss';

export default ({ isSelf, ...rest }) => (
  !isSelf
    ? <div className={isSelf ? avatarSelf : avatarOther}>
      <AvatarUrl {...rest} />
    </div>
    : null
);
