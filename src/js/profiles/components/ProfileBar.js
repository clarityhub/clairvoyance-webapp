import React from 'react';

import AvatarUrl from './AvatarUrl';
import * as ph from './ProfileBar.scss';

class ProfileBar extends React.Component {
  render() {
    const { name, email, avatarUrl, previousChats } = this.props;
    return (
      <div className={ph.profileBar}>
        <div className={ph.profileHeadingSection}>
          <div className={ph.profileHeadingAvatar}>
            <AvatarUrl name={name} url={avatarUrl} />
          </div>
          <div className={ph.profileHeadingTextContainer}>
            <h4>{name}</h4>
            <p>{email}</p>
          </div>
        </div>

        {/* TODO styles already exist for this
        <div>
          <h3>Start a Chat</h3>
          <div className={ph.profileBarIntegrationIcons}>
          </div>
        </div>
        */}
        <div>
          <h3>Previous Chats</h3>
          {previousChats
            ? <p> There should be some chats here</p>
            : <p className={ph.defaultChatsText}>No previous chats</p>
          }
        </div>
        <div>
          <h3>Shared Notes</h3>
          <textarea rows="8" cols="36" />
        </div>
        <div>
          <h3>Your Notes (Private)</h3>
          <textarea rows="8" cols="36" />
        </div>
      </div>
    );
  }
};

export default ProfileBar;
