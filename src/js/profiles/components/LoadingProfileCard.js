import React from 'react';

import * as pc from './LoadingProfileCard.scss';

export default () => (
  <div className={pc.profileCard}>

    <div className={pc.profileCardTextContainer}>
      <div className={pc.profileCardName} />

      <div className={pc.profileCardStatus} />
    </div>

    <div className={pc.profileCardAvatar}>
      <span />
    </div>
  </div>
);
