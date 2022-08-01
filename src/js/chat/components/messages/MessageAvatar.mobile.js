import React from 'react';
import AvatarUrl from 'js/profiles/components/AvatarUrl';

import { avatarOther } from './MessageAvatar.scss';

export default ({ isSelf, ...rest }) => {
  if (isSelf) {
    return null;
  }

  return (
    <div className={avatarOther}>
      <AvatarUrl {...rest} />
    </div>
  );
};
