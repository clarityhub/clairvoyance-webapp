import React from 'react';
import classnames from 'classnames';

import AvatarUrl from './AvatarUrl';
import * as pc from './ProfileDetails.scss';

export default ({ name, avatarUrl, status }) => (
  <div className={pc.profileCard}>
    <div className={pc.profileCardAvatar}>
      <AvatarUrl name={name} url={avatarUrl} />
    </div>

    <div className={pc.profileCardTextContainer}>
      <div className={pc.profileCardName}>
        {name}
      </div>

      <div className={pc.profileCardStatus}>
        <span className={classnames(pc.status, pc[`status__${status}`])} aria-label={status} />
        {status}
      </div>
    </div>

    {/* TODO other details */}
  </div>
);
