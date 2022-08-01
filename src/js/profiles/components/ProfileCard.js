import React from 'react';

import AvatarUrl from './AvatarUrl';
import * as pc from './ProfileCard.scss';

export default ({ name, avatarUrl, status, company }) => (
  <div className={pc.profileCard}>

    <div className={pc.profileCardAvatar}>
      <AvatarUrl name={name} url={avatarUrl} />
    </div>
    <div className={pc.profileCardTextContainer}>

      <div className={pc.profileCardCompanyName}>
        {company}
      </div>

      <div className={pc.profileCardName}>
        <span>
          {name}
        </span>
      </div>
    </div>
  </div>
);
